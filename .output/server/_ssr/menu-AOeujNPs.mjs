import { n as __toESM } from "../_runtime.mjs";
import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Star, c as Search, o as ShoppingCart, y as Heart } from "../_libs/lucide-react.mjs";
import { t as Footer } from "./Footer-Bpr8tAUF.mjs";
import { n as useCart, t as Nav } from "./Nav-CSTrzMem.mjs";
import { t as hero_grill_default } from "./hero-grill-II9PeXys.mjs";
import { n as getProductDisplayPrice } from "./utils-NLkIIbLX.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Skeleton, c as useMenuCategories, l as useMenuItems, r as ProductCardSkeletonGrid } from "./ProductCardSkeleton-Dg0sV5vG.mjs";
import { t as useFavorites } from "./favorites-CfWs_bXY.mjs";
import { t as Route } from "./menu-nbe8RESI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/menu-AOeujNPs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MenuHero({ query, onQueryChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative isolate overflow-hidden pt-20 pb-12 sm:pt-28 sm:pb-16 bg-charcoal",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-0 -z-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: hero_grill_default,
				alt: "",
				className: "h-full w-full object-cover opacity-30"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-t from-charcoal via-charcoal/80 to-transparent" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display text-3xl font-bold text-alabaster sm:text-5xl md:text-6xl drop-shadow-xl",
					children: ["قائمة ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-amber-glow",
						children: "الطعام"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xl mx-auto text-xs sm:text-base text-alabaster/80 leading-relaxed",
					children: "اكتشف تشكيلتنا الواسعة من المشويات المصرية الأصيلة المحضرة بأجود أنواع اللحوم الطازجة والبهارات المميزة."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mt-8 flex w-full max-w-md items-center gap-2 rounded-full p-1.5 shadow-elevated bg-white/5 border border-white/10 glass-panel",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: query,
							onChange: (e) => onQueryChange(e.target.value),
							placeholder: "ابحث عن طبقك المفضل...",
							"aria-label": "بحث",
							className: "w-full bg-transparent py-2 pl-3 pr-10 text-sm text-alabaster placeholder:text-alabaster/70 focus:outline-none"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-alabaster/50" })]
					})
				})
			]
		})]
	});
}
function MenuPage() {
	const { category: activeCategoryId } = Route.useSearch();
	const { data: menuCategories, isLoading: isCatLoading, isError: isCatErr } = useMenuCategories();
	const { data: menuItems, isLoading: isItemsLoading, isError: isItemsErr } = useMenuItems();
	const { addItem } = useCart();
	const { isFavorite, toggle } = useFavorites();
	const [query, setQuery] = (0, import_react.useState)("");
	const categories = menuCategories ?? [];
	const items = menuItems ?? [];
	const filteredItems = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		if (!q) return items;
		return items.filter((it) => {
			return `${it.name ?? ""} ${it.description ?? ""}`.toLowerCase().includes(q);
		});
	}, [items, query]);
	const handleAdd = (p) => {
		const size = p.product_sizes?.[0];
		const { final: unitPrice } = getProductDisplayPrice(p, size);
		addItem({
			key: size ? `${p.id}:${size.id}` : p.id,
			productId: p.id,
			sizeId: size?.id ?? null,
			sizeName: size?.name ?? null,
			title: p.name,
			description: p.description,
			imageUrl: p.image_url,
			unitPrice,
			quantity: 1
		});
		toast.success("تمت الإضافة إلى السلة");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen flex flex-col bg-alabaster",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, { isDarkHero: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 flex flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuHero, {
						query,
						onQueryChange: setQuery
					}),
					(isCatErr || isItemsErr) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "py-32 text-center text-ink/60",
						children: "تعذّر تحميل القائمة."
					}),
					(isCatLoading || isItemsLoading) && !isCatErr && !isItemsErr && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sticky top-16 sm:top-[72px] z-40 bg-alabaster/80 backdrop-blur-xl border-b border-black/5 shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto max-w-7xl px-4 sm:px-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex overflow-x-auto hide-scrollbar py-3 gap-2",
									children: Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-20 shrink-0 rounded-full bg-black/10" }, i))
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-alabaster flex-1 pb-20 pt-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mx-auto max-w-7xl px-4 sm:px-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mb-5 mx-auto h-7 w-36 bg-black/10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCardSkeletonGrid, {
									count: 8,
									className: "grid grid-cols-2 gap-2.5 sm:gap-5 md:grid-cols-3 lg:grid-cols-4"
								})]
							})
						})]
					}),
					!isCatLoading && !isItemsLoading && !isCatErr && !isItemsErr && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sticky top-16 sm:top-[72px] z-40 bg-alabaster/80 backdrop-blur-xl border-b border-black/5 shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto max-w-7xl px-4 sm:px-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex overflow-x-auto hide-scrollbar py-3 gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/menu",
										search: {},
										className: `shrink-0 rounded-full px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-semibold transition-colors ${!activeCategoryId ? "bg-crimson text-white shadow-md" : "bg-white text-ink/70 hover:bg-cream hover:text-crimson"}`,
										children: "الكل"
									}), categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/menu",
										search: { category: cat.id },
										className: `shrink-0 rounded-full px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-semibold transition-colors ${activeCategoryId === cat.id ? "bg-crimson text-white shadow-md" : "bg-white text-ink/70 hover:bg-cream hover:text-crimson"}`,
										children: cat.name
									}, cat.id))]
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-alabaster flex-1 pb-20 pt-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mx-auto max-w-7xl px-4 sm:px-6",
								children: [categories.map((cat) => {
									if (activeCategoryId && activeCategoryId !== cat.id) return null;
									const catItems = filteredItems.filter((it) => it.category_id === cat.id);
									if (catItems.length === 0) return null;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
										id: `cat-${cat.slug}`,
										className: "mb-12 scroll-mt-32",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
											className: "mb-5 font-display text-xl sm:text-2xl font-bold text-ink flex items-center gap-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-gradient-to-l from-black/5 to-transparent" }),
												cat.name,
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-gradient-to-r from-black/5 to-transparent" })
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid grid-cols-2 gap-2.5 sm:gap-5 md:grid-cols-3 lg:grid-cols-4",
											children: catItems.map((item) => {
												const size = item.product_sizes?.[0];
												const { original, final, hasDiscount } = getProductDisplayPrice(item, size);
												const fav = isFavorite(item.id);
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
													className: "group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "pointer-events-none absolute inset-x-1.5 top-1.5 sm:inset-x-2 sm:top-2 z-10 flex items-start justify-between",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex gap-1 flex-wrap",
																children: [
																	hasDiscount && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																		className: "pointer-events-auto flex items-center gap-1 rounded-full bg-crimson/95 py-0.5 px-2 sm:py-1 sm:px-2.5 shadow-sm",
																		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-[9px] sm:text-[10px] font-semibold text-white",
																			children: item.discount_type === "percentage" ? `خصم ${item.discount_value}%` : `خصم ${item.discount_value} ج.م`
																		})
																	}),
																	item.tag && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "pointer-events-auto flex items-center gap-1 rounded-full bg-white/95 py-0.5 px-2 sm:py-1 sm:px-2.5 shadow-sm",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-amber-glow text-amber-glow" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-[9px] sm:text-[10px] font-semibold text-ink",
																			children: item.tag
																		})]
																	}),
																	item.spicy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																		className: "pointer-events-auto flex items-center gap-1 rounded-full bg-crimson/95 py-0.5 px-2 sm:py-1 sm:px-2.5 shadow-sm",
																		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-[9px] sm:text-[10px] font-semibold text-white",
																			children: "حار 🌶️"
																		})
																	})
																]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																"aria-label": "أضف للمفضلة",
																"aria-pressed": fav,
																onClick: () => toggle(item.id),
																className: "pointer-events-auto grid h-6 w-6 sm:h-7 sm:w-7 place-items-center rounded-full bg-white/95 text-ink/60 shadow-sm transition-colors hover:text-crimson",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `h-3 w-3 sm:h-4 sm:w-4 ${fav ? "fill-crimson text-crimson animate-heart-pop" : ""}` })
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
															to: "/product/$id",
															params: { id: item.id },
															className: "block aspect-square w-full shrink-0 overflow-hidden bg-cream",
															children: item.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																src: item.image_url,
																alt: item.name,
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
																	params: { id: item.id },
																	className: "hover:text-crimson transition-colors",
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
																		className: "font-display text-[12px] sm:text-base font-semibold text-ink mb-1 leading-snug",
																		children: item.name
																	})
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	className: "text-[11px] sm:text-xs text-ink/60 line-clamp-2 leading-relaxed",
																	children: item.description
																})]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "mt-3 sm:mt-4 flex items-center justify-between",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "text-right flex flex-col",
																	children: [hasDiscount && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																		className: "text-[10px] sm:text-[11px] text-ink/50 line-through leading-none mb-0.5",
																		children: [original, " ج.م"]
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "font-display font-bold text-crimson",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-base sm:text-xl",
																			children: final
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "mr-1 text-[10px] sm:text-xs font-semibold text-crimson/70",
																			children: "ج.م"
																		})]
																	})]
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																	type: "button",
																	"aria-label": "أضف للسلة",
																	onClick: () => handleAdd(item),
																	className: "flex items-center gap-1.5 rounded-full bg-crimson px-2 py-1 sm:px-4 sm:py-2 text-alabaster shadow-md transition-all hover:bg-crimson-deep hover:shadow-elevated active:scale-95",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "text-[10px] sm:text-xs font-semibold hidden sm:inline",
																		children: "أضف"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-3 w-3 sm:h-3.5 sm:w-3.5" })]
																})]
															})]
														})
													]
												}, item.id);
											})
										})]
									}, cat.id);
								}), filteredItems.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "py-16 text-center text-ink/60",
									children: "لا توجد أطباق مطابقة لبحثك."
								})]
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { MenuPage as component };
