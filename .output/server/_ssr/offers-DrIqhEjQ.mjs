import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as ShoppingCart, y as Heart } from "../_libs/lucide-react.mjs";
import { t as Footer } from "./Footer-Bpr8tAUF.mjs";
import { n as useCart, t as Nav } from "./Nav-CSTrzMem.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Skeleton, d as useOffers, r as ProductCardSkeletonGrid } from "./ProductCardSkeleton-Dg0sV5vG.mjs";
import { t as useFavorites } from "./favorites-CfWs_bXY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/offers-DrIqhEjQ.js
var import_jsx_runtime = require_jsx_runtime();
function offerPrice(offer) {
	return Number(offer.new_price ?? offer.discount_value ?? 0);
}
function OffersPage() {
	const { data: offers, isLoading, isError } = useOffers();
	const { addItem } = useCart();
	const { isFavorite, toggle } = useFavorites();
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-alabaster flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 bg-alabaster pb-20 pt-28",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mb-5 mx-auto h-7 w-40 bg-black/10" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-12 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col md:flex-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "aspect-[4/3] w-full rounded-none bg-black/10 md:aspect-square md:w-1/2 lg:aspect-[4/3] lg:w-[40%]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-1 flex-col gap-3 p-4 sm:p-6 md:p-8",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-7 w-3/4 bg-black/10" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-full bg-black/10" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-5/6 bg-black/10" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-auto flex items-end justify-between border-t border-black/5 pt-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-28 bg-black/10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-11 w-32 rounded-full bg-black/10" })]
										})
									]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCardSkeletonGrid, {
							count: 4,
							className: "grid grid-cols-2 gap-2.5 sm:gap-5 md:grid-cols-3 lg:grid-cols-4"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
	if (isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-alabaster flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 grid place-items-center py-20 text-ink/60",
				children: "تعذّر تحميل العروض."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
	const safeOffers = offers ?? [];
	if (safeOffers.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-alabaster flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 grid place-items-center py-20 text-ink/60",
				children: "لا توجد عروض متاحة حالياً."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
	const featuredOffer = safeOffers[0];
	const regularOffers = safeOffers.slice(1);
	const addOfferToCart = (offer) => {
		const linkedProductId = offer.product_id ?? null;
		addItem({
			key: `offer:${offer.id}`,
			productId: linkedProductId ?? `offer:${offer.id}`,
			sizeId: null,
			sizeName: null,
			title: offer.title,
			description: offer.description,
			imageUrl: offer.image_url,
			unitPrice: offerPrice(offer),
			quantity: 1
		});
		toast.success("تمت الإضافة إلى السلة");
	};
	const discountLabel = (offer) => {
		if (offer.discount_value == null) return "";
		return offer.discount_type === "percentage" ? `${offer.discount_value}%` : `${offer.discount_value} ج.م`;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-alabaster flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 bg-alabaster pb-20 pt-28",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mb-12 scroll-mt-32",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mb-5 font-display text-xl sm:text-2xl font-bold text-ink flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-gradient-to-l from-black/5 to-transparent" }),
								"العرض المميز",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-gradient-to-r from-black/5 to-transparent" })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "group relative flex flex-col md:flex-row overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pointer-events-none absolute inset-x-2 top-2 sm:inset-x-3 sm:top-3 md:inset-x-auto md:right-0 md:left-auto md:w-1/2 lg:w-[40%] md:px-3 z-10 flex items-start justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex gap-1 flex-wrap",
										children: featuredOffer.discount_value != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "pointer-events-auto flex items-center gap-1 rounded-full bg-crimson/95 py-1 px-3 shadow-sm",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[10px] sm:text-xs font-semibold text-white",
												children: ["خصم ", discountLabel(featuredOffer)]
											})
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => toggle(featuredOffer.id),
										"aria-label": "أضف للمفضلة",
										"aria-pressed": isFavorite(featuredOffer.id),
										className: "pointer-events-auto grid h-8 w-8 place-items-center rounded-full bg-white/95 text-ink/60 shadow-sm transition-colors hover:text-crimson",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `h-4 w-4 ${isFavorite(featuredOffer.id) ? "fill-crimson text-crimson" : ""}` })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/offer/$id",
									params: { id: featuredOffer.id },
									className: "block relative w-full md:w-1/2 lg:w-[40%] aspect-[4/3] md:aspect-square lg:aspect-[4/3] overflow-hidden bg-cream shrink-0",
									children: featuredOffer.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: featuredOffer.image_url,
										alt: featuredOffer.title,
										loading: "lazy",
										className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-1 flex-col p-4 sm:p-6 md:p-8 justify-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/offer/$id",
												params: { id: featuredOffer.id },
												className: "hover:text-crimson transition-colors",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "font-display text-lg sm:text-2xl font-semibold text-ink mb-2 leading-snug",
													children: featuredOffer.title
												})
											}),
											featuredOffer.expires_in && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-[11px] sm:text-sm font-medium text-amber-600 mb-3",
												children: ["⏳ ", featuredOffer.expires_in]
											}),
											featuredOffer.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[13px] sm:text-base text-ink/60 leading-relaxed mb-4",
												children: featuredOffer.description
											}),
											featuredOffer.savings && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "inline-block rounded-md bg-amber-glow/10 px-2.5 py-1 text-[11px] sm:text-sm font-medium text-amber-700",
												children: featuredOffer.savings
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-6 flex items-end justify-between border-t border-black/5 pt-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col text-right",
											children: [featuredOffer.old_price != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[11px] sm:text-sm text-ink/50 line-through mb-1",
												children: [featuredOffer.old_price, " ج.م"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "font-display font-bold text-crimson leading-none",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-2xl sm:text-4xl",
													children: offerPrice(featuredOffer)
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "mr-1 text-xs sm:text-sm font-semibold text-crimson/70",
													children: "ج.م"
												})]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => addOfferToCart(featuredOffer),
											"aria-label": "أضف للسلة",
											className: "flex items-center gap-1.5 rounded-full bg-crimson px-4 py-2 sm:px-6 sm:py-3 text-alabaster shadow-md transition-all hover:bg-crimson-deep hover:shadow-elevated active:scale-95",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs sm:text-sm font-semibold",
												children: "أضف للسلة"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-4 w-4 sm:h-5 sm:w-5" })]
										})]
									})]
								})
							]
						})]
					}), regularOffers.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "scroll-mt-32",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mb-5 font-display text-xl sm:text-2xl font-bold text-ink flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-gradient-to-l from-black/5 to-transparent" }),
								"المزيد من العروض",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-gradient-to-r from-black/5 to-transparent" })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-2.5 sm:gap-5 md:grid-cols-3 lg:grid-cols-4",
							children: regularOffers.map((offer) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pointer-events-none absolute inset-x-1.5 top-1.5 sm:inset-x-2 sm:top-2 z-10 flex items-start justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex gap-1 flex-wrap",
											children: offer.discount_value != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "pointer-events-auto flex items-center gap-1 rounded-full bg-white/95 py-0.5 px-2 sm:py-1 sm:px-2.5 shadow-sm",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[9px] sm:text-[10px] font-semibold text-ink",
													children: ["خصم ", discountLabel(offer)]
												})
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => toggle(offer.id),
											"aria-label": "أضف للمفضلة",
											"aria-pressed": isFavorite(offer.id),
											className: "pointer-events-auto grid h-6 w-6 sm:h-7 sm:w-7 place-items-center rounded-full bg-white/95 text-ink/60 shadow-sm transition-colors hover:text-crimson",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `h-3 w-3 sm:h-4 sm:w-4 ${isFavorite(offer.id) ? "fill-crimson text-crimson" : ""}` })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/offer/$id",
										params: { id: offer.id },
										className: "block aspect-square w-full shrink-0 overflow-hidden bg-cream",
										children: offer.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: offer.image_url,
											alt: offer.title,
											loading: "lazy",
											className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-1 flex-col p-2.5 sm:p-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
														to: "/offer/$id",
														params: { id: offer.id },
														className: "hover:text-crimson transition-colors",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
															className: "font-display text-[12px] sm:text-base font-semibold text-ink mb-1 leading-snug",
															children: offer.title
														})
													}),
													offer.expires_in && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-[9px] sm:text-[10px] font-medium text-amber-600 mb-1.5",
														children: ["⏳ ", offer.expires_in]
													}),
													offer.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[11px] sm:text-xs text-ink/60 line-clamp-1 leading-relaxed",
														children: offer.description
													})
												]
											}),
											offer.savings && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-2 inline-block rounded-md bg-amber-glow/10 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-medium text-amber-700 self-start",
												children: offer.savings
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-3 flex items-end justify-between border-t border-black/5 pt-2 sm:pt-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-col text-right",
													children: [offer.old_price != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-[10px] sm:text-[11px] text-ink/50 line-through leading-none mb-1",
														children: [offer.old_price, " ج.م"]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "font-display font-bold text-crimson leading-none",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-base sm:text-xl",
															children: offerPrice(offer)
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "mr-1 text-[10px] sm:text-xs font-semibold text-crimson/70",
															children: "ج.م"
														})]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onClick: () => addOfferToCart(offer),
													"aria-label": "أضف للسلة",
													className: "flex items-center gap-1.5 rounded-full bg-crimson px-2 py-1.5 sm:px-4 sm:py-2 text-alabaster shadow-md transition-all hover:bg-crimson-deep hover:shadow-elevated active:scale-95",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] sm:text-xs font-semibold hidden sm:inline",
														children: "أضف"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-3 w-3 sm:h-3.5 sm:w-3.5" })]
												})]
											})
										]
									})
								]
							}, offer.id))
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { OffersPage as component };
