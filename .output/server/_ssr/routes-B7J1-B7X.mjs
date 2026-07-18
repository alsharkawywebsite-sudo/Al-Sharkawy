import { r as __toESM } from "../_runtime.mjs";
import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as ChevronLeft, a as Star, l as Search, o as ShoppingCart, x as Heart } from "../_libs/lucide-react.mjs";
import { n as useFeaturedProducts, t as useCategories } from "./useData-DckFcT4d.mjs";
import { t as Footer } from "./Footer-Bpr8tAUF.mjs";
import { n as useCart, t as Nav } from "./Nav-CSTrzMem.mjs";
import { t as hero_grill_default } from "./hero-grill-II9PeXys.mjs";
import { n as getProductDisplayPrice } from "./utils-NLkIIbLX.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as CategoryCardSkeletonGrid, r as ProductCardSkeletonGrid } from "./ProductCardSkeleton-Bqt_gi3A.mjs";
import { t as useFavorites } from "./favorites-CfWs_bXY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B7J1-B7X.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Hero() {
	const [query, setQuery] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative isolate overflow-hidden ember-gradient pt-20 pb-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-0 -z-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: hero_grill_default,
					alt: "",
					width: 1200,
					height: 960,
					className: "h-full w-full object-cover object-center opacity-60"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-l from-charcoal/95 via-charcoal/70 to-charcoal/30" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-b from-charcoal/60 via-transparent to-charcoal" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto flex min-h-[50svh] max-w-7xl flex-col items-center justify-center px-5 pt-20 pb-10 sm:px-8 text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl flex flex-col items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "font-display text-3xl font-bold leading-[1.3] sm:text-5xl md:text-6xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-crimson drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]",
							children: "طعم مش هتقدر"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-2 block text-alabaster",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-amber-glow drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]",
								children: "تقاومة!"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-lg text-xs leading-relaxed text-alabaster/90 sm:text-sm",
						children: "كبدة بالردة، مخ بانيه، جمبري، وسمك فيليه بتتبيلة الشرقاوي الأصيلة — طعم مش هتقدر تقاومه!"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => e.preventDefault(),
						className: "glass-panel mt-10 flex w-full max-w-md items-center gap-2 rounded-full p-1.5 shadow-elevated bg-white/5 border border-white/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: query,
								onChange: (e) => setQuery(e.target.value),
								placeholder: "ابحث عن طبقك المفضل...",
								"aria-label": "بحث",
								className: "w-full bg-transparent py-2 pl-3 pr-10 text-sm text-alabaster placeholder:text-alabaster/70 focus:outline-none"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-alabaster/50" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/menu",
							className: "shrink-0 rounded-full bg-crimson px-6 py-2 text-xs sm:px-8 sm:py-2.5 sm:text-sm font-semibold text-alabaster transition-all hover:bg-crimson-deep active:scale-95",
							children: "بحث"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/menu",
							className: "group inline-flex items-center gap-1 border-b border-alabaster/30 pb-1 text-sm font-medium text-alabaster/80 transition-colors hover:border-amber-glow hover:text-amber-glow",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4 transition-transform group-hover:-translate-x-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تصفح كل الأطباق" })]
						})
					})
				]
			})
		})]
	});
}
function CategoriesSection() {
	const { data: categories, isLoading, isError } = useCategories();
	if (isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "py-20 text-center text-ink/60",
		children: "تعذّر تحميل الفئات."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "menu",
		className: "relative z-20 bg-white pt-10 pb-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs sm:text-sm font-semibold text-crimson mb-1",
						children: "الفئات"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-bold text-ink sm:text-3xl",
						children: "تسوق حسب الفئة"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/categories",
					className: "shrink-0 text-xs sm:text-sm font-semibold text-crimson transition-opacity hover:opacity-70",
					children: "عرض الكل"
				})]
			}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryCardSkeletonGrid, { count: 6 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 gap-2.5 sm:gap-4 md:grid-cols-6",
				children: (categories ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/menu",
					search: { category: c.id },
					className: "group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-square w-full overflow-hidden p-1.5 sm:p-2.5 bg-white",
						children: c.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: c.image_url,
							alt: c.name,
							loading: "lazy",
							className: "h-full w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 bg-cream px-2 py-2.5 sm:py-4 flex items-center justify-center text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-[11px] sm:text-sm font-semibold leading-tight text-ink",
							children: c.name
						})
					})]
				}, c.id))
			})]
		})
	});
}
function FeaturedSection() {
	const { data: featured, isLoading, isError } = useFeaturedProducts();
	const { addItem } = useCart();
	const { isFavorite, toggle } = useFavorites();
	if (isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "py-20 text-center text-ink/60",
		children: "تعذّر تحميل الأطباق."
	});
	const safeFeatured = featured ?? [];
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-alabaster py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-amber-deep",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-amber-glow text-amber-glow" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "الأكثر طلباً" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-xl font-bold text-ink sm:text-3xl",
						children: "أطباق مميزة"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/menu",
					className: "shrink-0 text-xs sm:text-sm font-semibold text-crimson transition-opacity hover:opacity-70",
					children: "عرض الكل"
				})]
			}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCardSkeletonGrid, { count: 4 })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-2 gap-2.5 sm:gap-5 md:grid-cols-4",
				children: safeFeatured.map((p) => {
					const size = p.product_sizes?.[0];
					const { original, final, hasDiscount } = getProductDisplayPrice(p, size);
					const fav = isFavorite(p.id);
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
												children: p.discount_type === "percentage" ? `خصم ${p.discount_value}%` : `خصم ${p.discount_value} ج.م`
											})
										}),
										p.tag && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "pointer-events-auto flex items-center gap-1 rounded-full bg-white/95 py-0.5 px-2 sm:py-1 sm:px-2.5 shadow-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-amber-glow text-amber-glow" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[9px] sm:text-[10px] font-semibold text-ink",
												children: p.tag
											})]
										}),
										p.spicy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
									onClick: () => toggle(p.id),
									className: "pointer-events-auto grid h-6 w-6 sm:h-7 sm:w-7 place-items-center rounded-full bg-white/95 text-ink/60 shadow-sm transition-colors hover:text-crimson",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `h-3 w-3 sm:h-4 sm:w-4 transition-colors ${fav ? "fill-crimson text-crimson animate-heart-pop" : ""}` })
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
			})]
		})
	});
}
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen flex flex-col bg-alabaster",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, { isDarkHero: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 flex flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoriesSection, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedSection, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { Index as component };
