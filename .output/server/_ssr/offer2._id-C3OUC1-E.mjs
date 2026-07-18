import { n as __toESM } from "../_runtime.mjs";
import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as ArrowRight, f as Minus, l as Plus, o as ShoppingCart, y as Heart } from "../_libs/lucide-react.mjs";
import { t as Footer } from "./Footer-Bpr8tAUF.mjs";
import { n as useCart, t as Nav } from "./Nav-CSTrzMem.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as ProductDetailSkeleton, u as useOffer } from "./ProductCardSkeleton-Dg0sV5vG.mjs";
import { t as useFavorites } from "./favorites-CfWs_bXY.mjs";
import { t as Route } from "./offer._id-toi0DbdB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/offer2._id-C3OUC1-E.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OfferDetailPage() {
	const router = useRouter();
	const { id } = Route.useParams();
	const { data: offer, isLoading, isError, error } = useOffer(id);
	const { addItem } = useCart();
	const { isFavorite, toggle } = useFavorites();
	const [selectedSizeId, setSelectedSizeId] = (0, import_react.useState)(null);
	const [quantity, setQuantity] = (0, import_react.useState)(1);
	const sizes = (0, import_react.useMemo)(() => (offer?.offer_sizes ?? []).filter((s) => s.is_active !== false), [offer]);
	const activeSize = (0, import_react.useMemo)(() => (selectedSizeId ? sizes.find((s) => s.id === selectedSizeId) : sizes[0]) ?? null, [selectedSizeId, sizes]);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-alabaster flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductDetailSkeleton, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
	if (isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-alabaster flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 grid place-items-center py-32 text-center px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold text-ink mb-2",
					children: "تعذّر تحميل العرض"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-ink/60",
					children: error?.message ?? "حدث خطأ غير متوقع."
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
	if (!offer) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-alabaster flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 grid place-items-center py-32 text-center px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold text-ink mb-2",
					children: "العرض غير موجود"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/offers",
					className: "text-crimson text-sm hover:underline",
					children: "العودة للعروض"
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
	const basePrice = Number(offer.new_price ?? offer.discount_value ?? 0);
	const unitPrice = activeSize ? Number(activeSize.price) : basePrice;
	const originalPrice = offer.old_price != null ? Number(offer.old_price) : null;
	const hasDiscount = originalPrice != null && originalPrice > unitPrice;
	const favorite = isFavorite(offer.id);
	const handleAdd = () => {
		const linkedProductId = offer.product_id ?? null;
		addItem({
			key: activeSize ? `offer:${offer.id}:${activeSize.id}` : `offer:${offer.id}`,
			productId: linkedProductId ?? `offer:${offer.id}`,
			sizeId: null,
			sizeName: activeSize?.name ?? null,
			title: offer.title,
			description: offer.description,
			imageUrl: offer.image_url,
			unitPrice,
			quantity
		});
		toast.success("تمت الإضافة إلى السلة");
	};
	const discountBadge = offer.discount_value != null ? offer.discount_type === "percentage" ? `خصم ${offer.discount_value}%` : `خصم ${offer.discount_value} ج.م` : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-alabaster flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 py-8 sm:py-16 pt-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => router.history.back(),
						className: "inline-flex items-center gap-2 text-sm text-ink/60 hover:text-crimson mb-6 sm:mb-8 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" }), "العودة"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-square w-full rounded-3xl overflow-hidden bg-cream shadow-sm ring-1 ring-black/5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute top-4 left-4 right-4 z-10 flex justify-between items-start pointer-events-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2 flex-wrap",
									children: [discountBadge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pointer-events-auto flex items-center gap-1.5 rounded-full bg-crimson/95 py-1 px-3 shadow-md backdrop-blur-sm",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold text-white",
											children: discountBadge
										})
									}), offer.savings && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pointer-events-auto flex items-center gap-1.5 rounded-full bg-amber-glow/95 py-1 px-3 shadow-md backdrop-blur-sm",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold text-white",
											children: offer.savings
										})
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => toggle(offer.id),
									"aria-label": "أضف للمفضلة",
									"aria-pressed": favorite,
									className: "pointer-events-auto grid h-10 w-10 place-items-center rounded-full bg-white/95 text-ink/60 shadow-md backdrop-blur-sm transition-colors hover:text-crimson",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `h-5 w-5 transition-colors ${favorite ? "fill-crimson text-crimson animate-heart-pop" : ""}` })
								})]
							}), offer.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: offer.image_url,
								alt: offer.title,
								className: "w-full h-full object-cover"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink mb-3 leading-tight",
									children: offer.title
								}),
								offer.expires_in && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm font-medium text-amber-600 mb-4",
									children: ["⏳ ", offer.expires_in]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col mb-6",
									children: [hasDiscount && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-sm sm:text-base text-ink/50 line-through leading-none mb-1",
										children: [originalPrice, " ج.م"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-2xl sm:text-3xl font-display font-bold text-crimson flex items-baseline gap-1.5",
										children: [unitPrice, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm sm:text-base font-semibold text-crimson/70",
											children: "ج.م"
										})]
									})]
								}),
								offer.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-base sm:text-lg text-ink/70 leading-relaxed mb-8",
									children: offer.description
								}),
								sizes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-8",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-sm font-semibold text-ink mb-3",
										children: "اختر الحجم:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-3 gap-3",
										children: sizes.map((size) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => setSelectedSizeId(size.id),
											className: `py-3 px-4 rounded-xl border text-sm sm:text-base font-medium transition-all duration-200 ${activeSize?.id === size.id ? "border-crimson bg-crimson/5 text-crimson shadow-sm" : "border-black/10 bg-white text-ink/70 hover:border-black/20 hover:bg-black/[0.02]"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: size.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-xs opacity-70 mt-0.5",
												children: [size.price, " ج.م"]
											})]
										}, size.id))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4 mt-auto",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between bg-white border border-black/10 rounded-full h-12 sm:h-14 w-32 px-1 shadow-sm",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setQuantity((q) => Math.max(1, q - 1)),
												className: "grid place-items-center w-10 h-10 rounded-full hover:bg-black/5 text-ink/70 transition-colors",
												"aria-label": "إنقاص",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-4 w-4" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-ink text-base",
												children: quantity
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setQuantity((q) => q + 1),
												className: "grid place-items-center w-10 h-10 rounded-full hover:bg-black/5 text-ink/70 transition-colors",
												"aria-label": "زيادة",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: handleAdd,
										className: "flex-1 flex items-center justify-center gap-2 h-12 sm:h-14 rounded-full bg-crimson hover:bg-crimson-deep text-white font-semibold text-base sm:text-lg shadow-elevated transition-all active:scale-[0.98]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-5 w-5" }),
											"أضف إلى السلة",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-normal opacity-80 mr-1 hidden sm:inline",
												children: [
													"(",
													unitPrice * quantity,
													" ج.م)"
												]
											})
										]
									})]
								})
							]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { OfferDetailPage as component };
