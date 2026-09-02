import { supabase } from "@/lib/supabase";
import type {
  Category,
  CreateOrderPayload,
  MenuCategory,
  Offer,
  Order,
  Product,
  ProductSize,
  Branch,
} from "@/types";

// ---- Categories ---------------------------------------------------------

// ---- Column whitelists (public reads) ------------------------------------
// Trim payloads: skip internal timestamps/audit columns the UI never renders.
const CATEGORY_COLUMNS = "id, name, slug, image_url, sort_order";
const PUBLIC_PRODUCT_SELECT =
  "id, category_id, name, description, image_url, base_price, discount_type, discount_value, is_active, tag, spicy, product_sizes(id, product_id, name, price, is_active)";
const PUBLIC_OFFER_SELECT =
  "id, title, description, image_url, discount_type, discount_value, is_active, is_featured, is_hidden, product_id, old_price, new_price, expires_in, savings";

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select(CATEGORY_COLUMNS)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Category[];
}

export async function getMenuCategories(): Promise<MenuCategory[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("id, slug, name, sort_order")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((c: { id: string; slug: string; name: string }) => ({ id: c.id, slug: c.slug, name: c.name }));
}

export async function createCategory(payload: Partial<Category>): Promise<Category> {
  const { data, error } = await supabase.from("categories").insert(payload).select().single();
  if (error) throw error;
  return data as Category;
}

export async function updateCategory(id: string, updates: Partial<Category>): Promise<Category> {
  const { data, error } = await supabase
    .from("categories")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Category;
}

export async function deleteCategory(id: string): Promise<true> {
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw error;
  return true;
}

// ---- Products -----------------------------------------------------------

const PRODUCT_SELECT = "*, product_sizes(*)";

export async function getMenuItems(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(PUBLIC_PRODUCT_SELECT)
    .eq("is_active", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Product[];
}

export async function getAdminProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Product[];
}

let cachedFeaturedIds: { ids: string[]; timestamp: number } | null = null;
const FEATURED_IDS_CACHE_TTL = 5 * 60 * 1000;

export async function getFeaturedProducts(): Promise<Product[]> {
  let ids: string[] = [];
  const now = Date.now();

  if (cachedFeaturedIds && now - cachedFeaturedIds.timestamp < FEATURED_IDS_CACHE_TTL) {
    ids = cachedFeaturedIds.ids;
  } else {
    const { data: setting } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "featured_products")
      .maybeSingle();

    if (setting?.value) {
      try {
        const parsed = JSON.parse(setting.value);
        if (Array.isArray(parsed)) {
          ids = parsed;
          cachedFeaturedIds = { ids, timestamp: now };
        }
      } catch {}
    }
  }

  if (ids.length > 0) {
    const { data, error } = await supabase
      .from("products")
      .select(PUBLIC_PRODUCT_SELECT)
      .in("id", ids)
      .eq("is_active", true);
    if (error) throw error;
    // Keep order
    return ids
      .map((id) => data.find((p) => p.id === id))
      .filter(Boolean) as Product[];
  }

  // Fallback
  const { data, error } = await supabase
    .from("products")
    .select(PUBLIC_PRODUCT_SELECT)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(8);
  if (error) throw error;
  return (data ?? []) as Product[];
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select(PUBLIC_PRODUCT_SELECT)
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return (data as Product | null) ?? null;
}

export async function createProduct(
  productData: Partial<Product>,
  sizes: Array<Partial<ProductSize>>,
): Promise<Product> {
  const { data: product, error } = await supabase
    .from("products")
    .insert(productData)
    .select()
    .single();
  if (error) throw error;
  if (sizes && sizes.length > 0) {
    const rows = sizes.map((s) => ({ ...s, product_id: (product as any).id }));
    const { error: sizeError } = await supabase.from("product_sizes").insert(rows);
    if (sizeError) throw sizeError;
  }
  return product as Product;
}

export async function updateProduct(
  id: string,
  productData: Partial<Product>,
  sizes: Array<Partial<ProductSize>>,
): Promise<Product> {
  const { data: product, error } = await supabase
    .from("products")
    .update(productData)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;

  // Replace sizes: delete old, insert new.
  const { error: delErr } = await supabase.from("product_sizes").delete().eq("product_id", id);
  if (delErr) throw delErr;
  if (sizes && sizes.length > 0) {
    const rows = sizes.map((s) => ({ ...s, product_id: id }));
    const { error: insErr } = await supabase.from("product_sizes").insert(rows);
    if (insErr) throw insErr;
  }
  return product as Product;
}

export async function deleteProduct(id: string): Promise<true> {
  // Cascade sizes explicitly in case DB does not.
  const { error: sErr } = await supabase.from("product_sizes").delete().eq("product_id", id);
  if (sErr) throw sErr;
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
  return true;
}

// ---- Offers -------------------------------------------------------------

export async function getOffers(): Promise<Offer[]> {
  const { data, error } = await supabase
    .from("offers")
    .select(PUBLIC_OFFER_SELECT)
    .eq("is_hidden", false)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Offer[];
}

export async function getAdminOffers(): Promise<Offer[]> {
  const { data, error } = await supabase
    .from("offers")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Offer[];
}

export async function getOfferById(id: string): Promise<Offer | null> {
  const { data, error } = await supabase
    .from("offers")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return (data as Offer | null) ?? null;
}

export async function createOffer(payload: Partial<Offer>): Promise<Offer> {
  const { data, error } = await supabase.from("offers").insert(payload).select().single();
  if (error) throw error;
  return data as Offer;
}

export async function updateOffer(id: string, updates: Partial<Offer>): Promise<Offer> {
  const { data, error } = await supabase
    .from("offers")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Offer;
}

export async function deleteOffer(id: string): Promise<true> {
  const { error } = await supabase.from("offers").delete().eq("id", id);
  if (error) throw error;
  return true;
}

// ---- Orders -------------------------------------------------------------

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function asUuidOrNull(value: string | null | undefined): string | null {
  if (!value || typeof value !== "string") return null;
  const trimmed = value.trim();
  return UUID_RE.test(trimmed) ? trimmed : null;
}

function formatOrderNotes(payload: CreateOrderPayload): string {
  const { customer } = payload;
  const lines = [
    `الاسم: ${customer.name.trim()}`,
    `الهاتف: ${customer.phone.trim()}`,
    `العنوان: ${customer.address.trim()}`,
  ];
  if (payload.deliveryFee > 0) {
    lines.push(`رسوم التوصيل: ${payload.deliveryFee}`);
  }
  if (customer.notes?.trim()) {
    lines.push(`ملاحظات: ${customer.notes.trim()}`);
  }

  lines.push("", "الأصناف:");
  for (const item of payload.items) {
    const label = item.title?.trim() || item.productId;
    const size = item.sizeName ? ` (${item.sizeName})` : "";
    lines.push(`- ${label}${size} × ${item.quantity} @ ${item.unitPrice} ج.م`);
  }

  return lines.join("\n");
}

function toError(err: unknown, fallback: string): Error {
  if (err instanceof Error) return err;
  if (err && typeof err === "object" && "message" in err && typeof (err as any).message === "string") {
    const e = err as { message: string; details?: string; code?: string };
    const details = e.details ? ` (${e.details})` : "";
    return new Error(`${e.message}${details}`);
  }
  return new Error(fallback);
}

export async function createOrder(payload: CreateOrderPayload): Promise<Order> {
  const { data, error } = await supabase.functions.invoke("create-order", {
    body: payload,
  });

  if (error) {
    throw toError(error, "تعذر إنشاء الطلب");
  }
  if (data && data.error) {
    throw new Error(data.error);
  }

  return data as Order;
}

export async function getAdminOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Order[];
}

// ---- Settings -------------------------------------------------------------

export async function getSiteSettings(): Promise<Record<string, string>> {
  const { data, error } = await supabase.from("site_settings").select("*");
  if (error) throw error;
  return (data ?? []).reduce((acc: Record<string, string>, curr: { key: string; value: string | null }) => {
    if (curr.value !== null) acc[curr.key] = curr.value;
    return acc;
  }, {});
}

export async function updateSiteSetting(key: string, value: string): Promise<void> {
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key, value, updated_at: new Date().toISOString() });
  if (error) throw error;
  if (key === "featured_products") {
    cachedFeaturedIds = null;
  }
}

// ---- Branches -------------------------------------------------------------

export async function getBranches(): Promise<Branch[]> {
  const { data, error } = await supabase
    .from("branches")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Branch[];
}

export async function getActiveBranches(): Promise<Branch[]> {
  const { data, error } = await supabase
    .from("branches")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Branch[];
}

export async function createBranch(payload: Partial<Branch>): Promise<Branch> {
  const { data, error } = await supabase.from("branches").insert(payload).select().single();
  if (error) throw error;
  return data as Branch;
}

export async function updateBranch(id: string, updates: Partial<Branch>): Promise<Branch> {
  const { data, error } = await supabase
    .from("branches")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Branch;
}

export async function deleteBranch(id: string): Promise<true> {
  const { error } = await supabase.from("branches").delete().eq("id", id);
  if (error) throw error;
  return true;
}

// Convenience aggregate for callers already using the previous `api.*` surface.
export const api = {
  getCategories,
  getMenuCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getMenuItems,
  getAdminProducts,
  getFeaturedProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getOffers,
  getAdminOffers,
  getOfferById,
  createOffer,
  updateOffer,
  deleteOffer,
  createOrder,
  getAdminOrders,
  getSiteSettings,
  updateSiteSetting,
  getBranches,
  getActiveBranches,
  createBranch,
  updateBranch,
  deleteBranch,
};