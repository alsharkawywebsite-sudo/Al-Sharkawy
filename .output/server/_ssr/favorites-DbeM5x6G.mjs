import { r as __toESM } from "../_runtime.mjs";
import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Star, o as ShoppingCart, x as Heart } from "../_libs/lucide-react.mjs";
import { i as useMenuItems } from "./useData-DckFcT4d.mjs";
import { t as Footer } from "./Footer-Bpr8tAUF.mjs";
import { n as useCart, t as Nav } from "./Nav-CSTrzMem.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as ProductCardSkeletonGrid } from "./ProductCardSkeleton-Bqt_gi3A.mjs";
import { t as useFavorites } from "./favorites-CfWs_bXY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/favorites-DbeM5x6G.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FavoritesPage() {
	const { data: menuItems, isLoading, isError } = useMenuItems();
	const { ids, toggle } = useFavorites();
	const { addItem } = useCart();
	const favorites = (0, import_react.useMemo)(() => {
		const set = new Set(ids);
		return (menuItems ?? []).filter((p) => set.has(p.id));
	}, [menuItems, ids]);
	const handleAdd = (p) => {
		const size = p.product_sizes?.[0];
		addItem({
			key: size ? `${p.id}:${size.id}` : p.id,
			productId: p.id,
			sizeId: size?.id ?? null,
			sizeName: size?.name ?? null,
			title: p.name,
			description: p.description,
			imageUrl: p.image_url,
			unitPrice: size ? size.price : p.base_price ?? 0,
			quantity: 1
		});
		toast.success("تمت الإضافة إلى السلة");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-alabaster flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 py-8 sm:py-16 pt-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center mb-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "font-display text-3xl font-bold text-ink sm:text-5xl md:text-6xl mb-4",
							children: ["المنتجات ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-crimson",
								children: "المفضلة"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-ink/70 max-w-2xl mx-auto text-sm sm:text-base",
							children: "كل لحظاتك الشهية التي احتفظت بها في مكان واحد"
						})]
					}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCardSkeletonGrid, { count: 4 }) : isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "py-20 text-center text-ink/60",
						children: "تعذّر تحميل المفضلة."
					}) : favorites.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid grid-cols-2 gap-2.5 sm:gap-5 md:grid-cols-4",
						children: favorites.map((p) => {
							const size = p.product_sizes?.[0];
							const displayPrice = size ? size.price : p.base_price ?? 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pointer-events-none absolute inset-x-1.5 top-1.5 sm:inset-x-2 sm:top-2 z-10 flex items-start justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-1 flex-wrap",
											children: [p.tag && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "pointer-events-auto flex items-center gap-1 rounded-full bg-white/95 py-0.5 px-2 sm:py-1 sm:px-2.5 shadow-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-amber-glow text-amber-glow" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[9px] sm:text-[10px] font-semibold text-ink",
													children: p.tag
												})]
											}), p.spicy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "pointer-events-auto flex items-center gap-1 rounded-full bg-crimson/95 py-0.5 px-2 sm:py-1 sm:px-2.5 shadow-sm",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[9px] sm:text-[10px] font-semibold text-white",
													children: "حار 🌶️"
												})
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-label": "إزالة من المفضلة",
											onClick: () => toggle(p.id),
											className: "pointer-events-auto grid h-6 w-6 sm:h-7 sm:w-7 place-items-center rounded-full bg-white/95 text-ink/60 shadow-sm transition-colors hover:text-crimson",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-3 w-3 sm:h-4 sm:w-4 fill-crimson text-crimson animate-heart-pop" })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/product/$id",
										params: { id: p.id },
										className: "block aspect-square w-full shrink-0 overflow-hidden bg-cream",
										children: p.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: p.image_url,
											alt: p.name,
											loading: "lazy",
											className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-1 flex-col p-2.5 sm:p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/product/$id",
												params: { id: p.id },
												className: "hover:text-crimson transition-colors",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "font-display text-[12px] sm:text-base font-semibold text-ink mb-1 leading-snug",
													children: p.name
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] sm:text-xs text-ink/60 line-clamp-2 leading-relaxed",
												children: p.description
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 sm:mt-4 flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-right font-display font-bold text-crimson",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-base sm:text-xl",
													children: displayPrice
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "mr-1 text-[10px] sm:text-xs font-semibold text-crimson/70",
													children: "ج.م"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												"aria-label": "أضف للسلة",
												onClick: () => handleAdd(p),
												className: "flex items-center gap-1.5 rounded-full bg-crimson px-2 py-1 sm:px-4 sm:py-2 text-alabaster shadow-md transition-all hover:bg-crimson-deep hover:shadow-elevated active:scale-95",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] sm:text-xs font-semibold hidden sm:inline",
													children: "أضف"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-3 w-3 sm:h-3.5 sm:w-3.5" })]
											})]
										})]
									})
								]
							}, p.id);
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center py-20 px-4 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-24 w-24 rounded-full bg-crimson/10 flex items-center justify-center mb-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-10 w-10 text-crimson" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-bold text-ink mb-2",
								children: "لا توجد منتجات مفضلة"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-ink/60 mb-8 max-w-sm",
								children: "لم تقم بإضافة أي منتجات إلى قائمة المفضلة بعد. تصفح المنيو واكتشف أطباقك المفضلة!"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/menu",
								className: "inline-flex h-12 items-center justify-center rounded-full bg-crimson px-8 font-semibold text-white transition-all hover:bg-crimson/90 hover:shadow-lg hover:shadow-crimson/20",
								children: "تصفح المنيو"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { FavoritesPage as component };
