import { t as supabase } from "./supabase-Ulv0o2vY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-BzRK7CvT.js
async function getCategories() {
	const { data, error } = await supabase.from("categories").select("*").order("sort_order", { ascending: true });
	if (error) throw error;
	return data ?? [];
}
async function getMenuCategories() {
	const { data, error } = await supabase.from("categories").select("id, slug, name, sort_order").order("sort_order", { ascending: true });
	if (error) throw error;
	return (data ?? []).map((c) => ({
		id: c.id,
		slug: c.slug,
		name: c.name
	}));
}
async function createCategory(payload) {
	const { data, error } = await supabase.from("categories").insert(payload).select().single();
	if (error) throw error;
	return data;
}
async function updateCategory(id, updates) {
	const { data, error } = await supabase.from("categories").update(updates).eq("id", id).select().single();
	if (error) throw error;
	return data;
}
async function deleteCategory(id) {
	const { error } = await supabase.from("categories").delete().eq("id", id);
	if (error) throw error;
	return true;
}
var PRODUCT_SELECT = "*, product_sizes(*)";
async function getMenuItems() {
	const { data, error } = await supabase.from("products").select(PRODUCT_SELECT).eq("is_active", true).order("created_at", { ascending: false });
	if (error) throw error;
	return data ?? [];
}
async function getAdminProducts() {
	const { data, error } = await supabase.from("products").select(PRODUCT_SELECT).order("created_at", { ascending: false });
	if (error) throw error;
	return data ?? [];
}
async function getFeaturedProducts() {
	const { data, error } = await supabase.from("products").select(PRODUCT_SELECT).eq("is_active", true).order("created_at", { ascending: false }).limit(4);
	if (error) throw error;
	return data ?? [];
}
async function getProductById(id) {
	const { data, error } = await supabase.from("products").select(PRODUCT_SELECT).eq("id", id).maybeSingle();
	if (error) throw error;
	return data ?? null;
}
async function createProduct(productData, sizes) {
	const { data: product, error } = await supabase.from("products").insert(productData).select().single();
	if (error) throw error;
	if (sizes && sizes.length > 0) {
		const rows = sizes.map((s) => ({
			...s,
			product_id: product.id
		}));
		const { error: sizeError } = await supabase.from("product_sizes").insert(rows);
		if (sizeError) throw sizeError;
	}
	return product;
}
async function updateProduct(id, productData, sizes) {
	const { data: product, error } = await supabase.from("products").update(productData).eq("id", id).select().single();
	if (error) throw error;
	const { error: delErr } = await supabase.from("product_sizes").delete().eq("product_id", id);
	if (delErr) throw delErr;
	if (sizes && sizes.length > 0) {
		const rows = sizes.map((s) => ({
			...s,
			product_id: id
		}));
		const { error: insErr } = await supabase.from("product_sizes").insert(rows);
		if (insErr) throw insErr;
	}
	return product;
}
async function deleteProduct(id) {
	const { error: sErr } = await supabase.from("product_sizes").delete().eq("product_id", id);
	if (sErr) throw sErr;
	const { error } = await supabase.from("products").delete().eq("id", id);
	if (error) throw error;
	return true;
}
async function getOffers() {
	const { data, error } = await supabase.from("offers").select("*").eq("is_active", true).order("created_at", { ascending: false });
	if (error) throw error;
	return data ?? [];
}
async function getAdminOffers() {
	const { data, error } = await supabase.from("offers").select("*").order("created_at", { ascending: false });
	if (error) throw error;
	return data ?? [];
}
async function getOfferById(id) {
	const { data, error } = await supabase.from("offers").select("*").eq("id", id).maybeSingle();
	if (error) throw error;
	return data ?? null;
}
async function createOffer(payload) {
	const { data, error } = await supabase.from("offers").insert(payload).select().single();
	if (error) throw error;
	return data;
}
async function updateOffer(id, updates) {
	const { data, error } = await supabase.from("offers").update(updates).eq("id", id).select().single();
	if (error) throw error;
	return data;
}
async function deleteOffer(id) {
	const { error } = await supabase.from("offers").delete().eq("id", id);
	if (error) throw error;
	return true;
}
var UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function asUuidOrNull(value) {
	if (!value || typeof value !== "string") return null;
	const trimmed = value.trim();
	return UUID_RE.test(trimmed) ? trimmed : null;
}
function formatOrderNotes(payload) {
	const { customer } = payload;
	const lines = [
		`الاسم: ${customer.name.trim()}`,
		`الهاتف: ${customer.phone.trim()}`,
		`العنوان: ${customer.address.trim()}`
	];
	if (payload.deliveryFee > 0) lines.push(`رسوم التوصيل: ${payload.deliveryFee}`);
	if (customer.notes?.trim()) lines.push(`ملاحظات: ${customer.notes.trim()}`);
	lines.push("", "الأصناف:");
	for (const item of payload.items) {
		const label = item.title?.trim() || item.productId;
		const size = item.sizeName ? ` (${item.sizeName})` : "";
		lines.push(`- ${label}${size} × ${item.quantity} @ ${item.unitPrice} ج.م`);
	}
	return lines.join("\n");
}
function toError(err, fallback) {
	if (err instanceof Error) return err;
	if (err && typeof err === "object" && "message" in err && typeof err.message === "string") {
		const e = err;
		const details = e.details ? ` (${e.details})` : "";
		return /* @__PURE__ */ new Error(`${e.message}${details}`);
	}
	return new Error(fallback);
}
async function createOrder(payload) {
	if (!payload.items.length) throw new Error("السلة فارغة");
	const finalTotal = payload.subtotal + payload.deliveryFee - (payload.discountTotal ?? 0);
	const { data: order, error } = await supabase.from("orders").insert({
		status: "pending",
		subtotal: payload.subtotal,
		discount_total: payload.discountTotal ?? 0,
		final_total: finalTotal,
		notes: formatOrderNotes(payload)
	}).select().single();
	if (error) throw toError(error, "تعذر إنشاء الطلب");
	if (!order?.id) throw new Error("تعذر إنشاء الطلب: لم يُرجع رقم الطلب");
	const orderId = order.id;
	const candidateProductIds = [...new Set(payload.items.map((item) => asUuidOrNull(item.productId)).filter((id) => Boolean(id)))];
	const candidateSizeIds = [...new Set(payload.items.map((item) => asUuidOrNull(item.sizeId)).filter((id) => Boolean(id)))];
	const validProductIds = /* @__PURE__ */ new Set();
	if (candidateProductIds.length > 0) {
		const { data: products, error: productsError } = await supabase.from("products").select("id").in("id", candidateProductIds);
		if (productsError) {
			await supabase.from("orders").delete().eq("id", orderId);
			throw toError(productsError, "تعذر التحقق من المنتجات");
		}
		for (const row of products ?? []) validProductIds.add(row.id);
	}
	const validSizeIds = /* @__PURE__ */ new Set();
	if (candidateSizeIds.length > 0) {
		const { data: sizes, error: sizesError } = await supabase.from("product_sizes").select("id").in("id", candidateSizeIds);
		if (sizesError) {
			await supabase.from("orders").delete().eq("id", orderId);
			throw toError(sizesError, "تعذر التحقق من أحجام المنتجات");
		}
		for (const row of sizes ?? []) validSizeIds.add(row.id);
	}
	const rows = payload.items.map((item) => {
		const productId = asUuidOrNull(item.productId);
		if (!productId || !validProductIds.has(productId)) return null;
		const sizeId = asUuidOrNull(item.sizeId);
		return {
			order_id: orderId,
			product_id: productId,
			product_size_id: sizeId && validSizeIds.has(sizeId) ? sizeId : null,
			quantity: item.quantity,
			unit_price: item.unitPrice,
			discount_applied: 0
		};
	}).filter((row) => row != null);
	if (rows.length > 0) {
		const { error: itemsError } = await supabase.from("order_items").insert(rows);
		if (itemsError) {
			await supabase.from("orders").delete().eq("id", orderId);
			throw toError(itemsError, "تعذر حفظ أصناف الطلب");
		}
	}
	return order;
}
async function getAdminOrders() {
	const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
	if (error) throw error;
	return data ?? [];
}
var api = {
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
	getAdminOrders
};
//#endregion
export { getMenuCategories as a, getOffers as c, getFeaturedProducts as i, getProductById as l, createOrder as n, getMenuItems as o, getCategories as r, getOfferById as s, api as t };
