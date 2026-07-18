import { t as supabase } from "./supabase-Ulv0o2vY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-BWA94xL_.js
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
	const { data, error } = await supabase.functions.invoke("create-order", { body: payload });
	if (error) throw toError(error, "تعذر إنشاء الطلب");
	if (data && data.error) throw new Error(data.error);
	return data;
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
