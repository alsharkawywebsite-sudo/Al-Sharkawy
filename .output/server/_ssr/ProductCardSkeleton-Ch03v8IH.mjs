import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as getMenuCategories, c as getOffers, i as getFeaturedProducts, l as getProductById, o as getMenuItems, r as getCategories, s as getOfferById } from "./api-BWA94xL_.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as cn } from "./utils-NLkIIbLX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductCardSkeleton-Ch03v8IH.js
var import_jsx_runtime = require_jsx_runtime();
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
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("animate-pulse rounded-md bg-primary/10", className),
		...props
	});
}
var bone = "bg-black/10";
/** Gray pulsing skeleton matching storefront product card dimensions. */
function ProductCardSkeleton({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5", className),
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: cn("aspect-square w-full rounded-none", bone) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-2 p-2.5 sm:p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: cn("h-4 w-3/4", bone) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: cn("h-3 w-full", bone) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: cn("h-3 w-2/3", bone) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex items-center justify-between sm:mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: cn("h-6 w-16", bone) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: cn("h-8 w-8 rounded-full", bone) })]
				})
			]
		})]
	});
}
function ProductCardSkeletonGrid({ count = 8, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid grid-cols-2 gap-2.5 sm:gap-5 md:grid-cols-4", className),
		role: "status",
		"aria-label": "جاري التحميل",
		children: Array.from({ length: count }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCardSkeleton, {}, i))
	});
}
/** Category tile skeleton (square image + label band). */
function CategoryCardSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "aspect-square w-full bg-white p-1.5 sm:p-2.5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: cn("h-full w-full rounded-2xl", bone) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center bg-cream px-2 py-2.5 sm:py-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: cn("h-3 w-16 sm:h-4 sm:w-20", bone) })
		})]
	});
}
function CategoryCardSkeletonGrid({ count = 6, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid grid-cols-3 gap-2.5 sm:gap-4 md:grid-cols-6", className),
		role: "status",
		"aria-label": "جاري التحميل",
		children: Array.from({ length: count }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryCardSkeleton, {}, i))
	});
}
/** Product detail page skeleton (image + details). */
function ProductDetailSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-16 pt-24",
		role: "status",
		"aria-label": "جاري التحميل",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: cn("mb-8 h-10 w-24 rounded-full", bone) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2 md:items-start lg:gap-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: cn("aspect-square w-full rounded-3xl", bone) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: cn("h-8 w-3/4 sm:h-10", bone) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: cn("h-4 w-full", bone) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: cn("h-4 w-5/6", bone) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: cn("mt-2 h-8 w-28", bone) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: cn("h-10 w-20 rounded-full", bone) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: cn("h-10 w-20 rounded-full", bone) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: cn("h-12 w-32 rounded-full sm:h-14", bone) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: cn("h-12 flex-1 rounded-full sm:h-14", bone) })]
					})
				]
			})]
		})]
	});
}
//#endregion
export { Skeleton as a, useMenuCategories as c, useOffers as d, useProduct as f, ProductDetailSkeleton as i, useMenuItems as l, CategoryCardSkeletonGrid as n, useCategories as o, ProductCardSkeletonGrid as r, useFeaturedProducts as s, CategoryCardSkeleton as t, useOffer as u };
