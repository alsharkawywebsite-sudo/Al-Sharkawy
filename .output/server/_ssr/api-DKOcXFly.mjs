import { n as __exportAll$1 } from "../_runtime.mjs";
import { t as supabase } from "./supabase-Ulv0o2vY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-DKOcXFly.js
var api_DKOcXFly_exports = /* @__PURE__ */ __exportAll$1({
	a: () => getFeaturedProducts,
	c: () => getOfferById,
	i: () => getCategories,
	l: () => getOffers,
	n: () => api_exports,
	o: () => getMenuCategories,
	r: () => createOrder,
	s: () => getMenuItems,
	t: () => api,
	u: () => getProductById
});
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var api_exports = /* @__PURE__ */ __exportAll({
	api: () => api,
	createCategory: () => createCategory,
	createOffer: () => createOffer,
	createOrder: () => createOrder,
	createProduct: () => createProduct,
	deleteCategory: () => deleteCategory,
	deleteOffer: () => deleteOffer,
	deleteProduct: () => deleteProduct,
	getAdminOffers: () => getAdminOffers,
	getAdminOrders: () => getAdminOrders,
	getAdminProducts: () => getAdminProducts,
	getCategories: () => getCategories,
	getFeaturedProducts: () => getFeaturedProducts,
	getMenuCategories: () => getMenuCategories,
	getMenuItems: () => getMenuItems,
	getOfferById: () => getOfferById,
	getOffers: () => getOffers,
	getProductById: () => getProductById,
	getSiteSettings: () => getSiteSettings,
	updateCategory: () => updateCategory,
	updateOffer: () => updateOffer,
	updateProduct: () => updateProduct,
	updateSiteSetting: () => updateSiteSetting
});
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
async function getSiteSettings() {
	const { data, error } = await supabase.from("site_settings").select("*");
	if (error) throw error;
	return (data ?? []).reduce((acc, curr) => {
		if (curr.value !== null) acc[curr.key] = curr.value;
		return acc;
	}, {});
}
async function updateSiteSetting(key, value) {
	const { error } = await supabase.from("site_settings").upsert({
		key,
		value,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	});
	if (error) throw error;
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
	getAdminOrders,
	getSiteSettings,
	updateSiteSetting
};
//#endregion
export { getFeaturedProducts as a, getOfferById as c, getCategories as i, getOffers as l, api_DKOcXFly_exports as n, getMenuCategories as o, createOrder as r, getMenuItems as s, api as t, getProductById as u };
