import { a as getFeaturedProducts, c as getOfferById, i as getCategories, l as getOffers, o as getMenuCategories, s as getMenuItems, u as getProductById } from "./api-DKOcXFly.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useData-DckFcT4d.js
var FIVE_MINUTES = 300 * 1e3;
function useCategories() {
	return useQuery({
		queryKey: ["categories"],
		queryFn: getCategories,
		staleTime: FIVE_MINUTES
	});
}
function useMenuCategories() {
	return useQuery({
		queryKey: ["menuCategories"],
		queryFn: getMenuCategories,
		staleTime: FIVE_MINUTES
	});
}
function useMenuItems() {
	return useQuery({
		queryKey: ["menuItems"],
		queryFn: getMenuItems,
		staleTime: FIVE_MINUTES
	});
}
function useFeaturedProducts() {
	return useQuery({
		queryKey: ["featuredProducts"],
		queryFn: getFeaturedProducts,
		staleTime: FIVE_MINUTES
	});
}
function useOffers() {
	return useQuery({
		queryKey: ["offers"],
		queryFn: getOffers,
		staleTime: FIVE_MINUTES
	});
}
function useProduct(id) {
	return useQuery({
		queryKey: ["product", id],
		queryFn: () => getProductById(id),
		staleTime: FIVE_MINUTES,
		enabled: Boolean(id)
	});
}
function useOffer(id) {
	return useQuery({
		queryKey: ["offer", id],
		queryFn: () => getOfferById(id),
		staleTime: FIVE_MINUTES,
		enabled: Boolean(id)
	});
}
function useSiteSettings() {
	return useQuery({
		queryKey: ["siteSettings"],
		queryFn: () => import("./api-DKOcXFly.mjs").then((n) => n.n).then((n) => n.n).then((m) => m.getSiteSettings()),
		staleTime: FIVE_MINUTES
	});
}
//#endregion
export { useOffer as a, useSiteSettings as c, useMenuItems as i, useFeaturedProducts as n, useOffers as o, useMenuCategories as r, useProduct as s, useCategories as t };
