import { supabase } from "@/lib/supabase";
import type {
  Category,
  CreateOrderPayload,
  MenuCategory,
  Offer,
  Order,
  Product,
  ProductSize,
} from "@/types";

// ---- Categories ---------------------------------------------------------

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
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
  return (data ?? []).map((c: any) => ({ id: c.id, slug: c.slug, name: c.name }));
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
    .select(PRODUCT_SELECT)
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

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(4);
  if (error) throw error;
  return (data ?? []) as Product[];
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
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
    .select("*")
    .eq("is_active", true)
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
};