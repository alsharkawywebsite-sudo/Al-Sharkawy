import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as ArrowRight, d as Plus, m as Minus, r as Trash2, s as ShoppingBag } from "../_libs/lucide-react.mjs";
import { c as useSiteSettings } from "./useData-DckFcT4d.mjs";
import { t as Footer } from "./Footer-Bpr8tAUF.mjs";
import { n as useCart, t as Nav } from "./Nav-CSTrzMem.mjs";
import { t as hero_grill_default } from "./hero-grill-II9PeXys.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-VQowR4rD.js
var import_jsx_runtime = require_jsx_runtime();
var arabicDigits = "٠١٢٣٤٥٦٧٨٩";
function toArabicDigits(n) {
	return Math.round(n).toString().replace(/\d/g, (d) => arabicDigits[Number(d)]);
}
function CartHero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative isolate overflow-hidden pt-24 pb-12 bg-charcoal",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-0 -z-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: hero_grill_default,
				alt: "",
				className: "h-full w-full object-cover opacity-20"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-t from-charcoal via-charcoal/80 to-transparent" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "inline-flex items-center justify-center h-16 w-16 rounded-full bg-white/10 backdrop-blur-md mb-6 ring-1 ring-white/20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-8 w-8 text-amber-glow" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "font-display text-3xl font-semibold text-alabaster sm:text-4xl drop-shadow-xl",
				children: ["سلة ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-amber-glow",
					children: "المشتريات"
				})]
			})]
		})]
	});
}
function CartContent() {
	const { items, subtotal, updateQuantity, removeItem } = useCart();
	const { data: settings } = useSiteSettings();
	const deliveryMessage = settings?.delivery_message;
	const deliveryFeeMin = settings?.delivery_fee_min;
	const deliveryFeeMax = settings?.delivery_fee_max;
	const showDeliveryRange = deliveryFeeMin && deliveryFeeMax;
	const total = subtotal;
	if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 flex flex-col items-center text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-32 w-32 rounded-full bg-cream grid place-items-center mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-12 w-12 text-ink/30" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl font-semibold text-ink mb-2",
				children: "سلتك فارغة تماماً!"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-ink/60 max-w-sm mb-8",
				children: "يبدو أنك لم تقم بإضافة أي أطباق شهية إلى سلتك بعد. تصفح المنيو لاكتشاف ما لدينا."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/menu",
				className: "inline-flex items-center gap-2 rounded-full bg-crimson px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-crimson-deep shadow-md hover:shadow-elevated active:scale-95",
				children: ["تصفح المنيو", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-7 flex flex-col gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-black/5 pb-4 mb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold text-ink",
						children: "مراجعة الطلبات"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm font-semibold text-ink/60",
						children: [toArabicDigits(items.length), " أطباق"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-4",
					children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "group flex flex-row gap-4 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5 transition-all hover:shadow-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-square w-24 shrink-0 overflow-hidden rounded-xl bg-cream",
							children: item.imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: item.imageUrl,
								alt: item.title,
								className: "h-full w-full object-cover"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 flex-col justify-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-start gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-display text-base font-semibold text-ink",
									children: [item.title, item.sizeName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mr-2 text-xs font-normal text-ink/50",
										children: [
											"(",
											item.sizeName,
											")"
										]
									})]
								}), item.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-ink/60 line-clamp-1 mt-1",
									children: item.description
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => removeItem(item.key),
									"aria-label": "حذف العنصر",
									className: "p-2 text-ink/40 transition-colors hover:text-crimson hover:bg-crimson/5 rounded-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-row items-center justify-between mt-auto pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right font-display font-semibold text-crimson",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-lg",
										children: toArabicDigits(item.unitPrice)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mr-1 text-[10px] font-semibold text-crimson/70",
										children: "ج.م"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 bg-alabaster rounded-full px-1 py-1 ring-1 ring-black/5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => updateQuantity(item.key, -1),
											disabled: item.quantity <= 1,
											"aria-label": "إنقاص",
											className: "grid h-7 w-7 place-items-center rounded-full bg-white text-ink shadow-sm transition-colors hover:bg-cream active:scale-95 disabled:opacity-50 disabled:active:scale-100",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3 w-3" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "min-w-[1.25rem] text-center text-sm font-semibold text-ink",
											children: toArabicDigits(item.quantity)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => updateQuantity(item.key, 1),
											"aria-label": "زيادة",
											className: "grid h-7 w-7 place-items-center rounded-full bg-white text-ink shadow-sm transition-colors hover:bg-cream active:scale-95",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" })
										})
									]
								})]
							})]
						})]
					}, item.key))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sticky top-24 rounded-3xl bg-white p-6 shadow-card ring-1 ring-black/5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold text-ink mb-6",
							children: "ملخص الطلب"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 text-sm font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center text-ink/80",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "المجموع الفرعي" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-display font-semibold text-ink",
									children: [
										toArabicDigits(subtotal),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-ink/70",
											children: "ج.م"
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-start text-ink/80 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "رسوم التوصيل" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-left max-w-[60%] text-xs text-ink/60 leading-relaxed",
									children: "تُحدد في خطوة الدفع حسب المسافة"
								})]
							})]
						}),
						deliveryMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 p-4 rounded-xl bg-amber-50 border border-amber-100 text-xs text-amber-900 leading-relaxed",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: deliveryMessage }), showDeliveryRange && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 font-medium",
								children: [
									"عادةً تكون رسوم التوصيل بين ",
									toArabicDigits(Number(deliveryFeeMin)),
									" و ",
									toArabicDigits(Number(deliveryFeeMax)),
									" جنيه."
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "my-6 border-black/5" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-end mb-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-base font-semibold text-ink",
								children: "الإجمالي"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right font-display font-semibold text-crimson",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-3xl",
									children: toArabicDigits(total)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mr-1 text-sm font-semibold text-crimson/70",
									children: "ج.م"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/checkout",
							className: "w-full rounded-full bg-crimson py-3.5 text-sm font-semibold text-white transition-all hover:bg-crimson-deep shadow-md hover:shadow-elevated active:scale-95 flex items-center justify-center gap-2",
							children: ["إتمام الطلب", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-center text-[11px] text-ink/50",
							children: "الأسعار شاملة ضريبة القيمة المضافة."
						})
					]
				})
			})]
		})
	});
}
function CartPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen flex flex-col bg-alabaster",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, { isDarkHero: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 flex flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartHero, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartContent, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { CartPage as component };
