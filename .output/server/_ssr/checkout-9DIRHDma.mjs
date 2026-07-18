import { n as __toESM } from "../_runtime.mjs";
import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as createOrder } from "./api-BzRK7CvT.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as ArrowRight, b as ClipboardList, g as LoaderCircle, x as CircleCheck } from "../_libs/lucide-react.mjs";
import { t as Footer } from "./Footer-Bpr8tAUF.mjs";
import { n as useCart, t as Nav } from "./Nav-CSTrzMem.mjs";
import { t as hero_grill_default } from "./hero-grill-II9PeXys.mjs";
import { t as cn } from "./utils-NLkIIbLX.mjs";
import { n as Label, t as Input } from "./label-Dj5RX0vT.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-CGkpZU1p.mjs";
import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-Dova13aH.mjs";
import { i as stringType, n as numberType, r as objectType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-9DIRHDma.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var orderNotifySchema = objectType({
	orderId: stringType().min(1),
	customer: objectType({
		name: stringType().min(1),
		phone: stringType().min(1),
		address: stringType().min(1),
		notes: stringType().optional()
	}),
	items: arrayType(objectType({
		title: stringType().min(1),
		sizeName: stringType().nullable().optional(),
		quantity: numberType().int().positive(),
		unitPrice: numberType().nonnegative()
	})),
	subtotal: numberType().nonnegative(),
	deliveryFee: numberType().nonnegative(),
	finalTotal: numberType().nonnegative()
});
/**
* Server RPC: Telegram alert for a placed order.
* Never throws to the client — Telegram outages must not affect checkout UX.
*/
var notifyNewOrder = createServerFn({ method: "POST" }).inputValidator(orderNotifySchema).handler(createSsrRpc("e258447af0924417aae6eff07291bbffb07db30fbf9c840ffa4b2358c3492172"));
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var arabicDigits = "٠١٢٣٤٥٦٧٨٩";
function toArabicDigits(n) {
	return Math.round(n).toString().replace(/\d/g, (d) => arabicDigits[Number(d)]);
}
var DELIVERY_FEE = 35;
function CheckoutHero() {
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
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "h-8 w-8 text-amber-glow" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "font-display text-3xl font-semibold text-alabaster sm:text-4xl drop-shadow-xl",
				children: ["إتمام ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-amber-glow",
					children: "الطلب"
				})]
			})]
		})]
	});
}
function OrderSuccess({ orderId }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-lg px-4 py-20 sm:px-6 flex flex-col items-center text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-24 w-24 rounded-full bg-emerald-50 grid place-items-center mb-6 ring-1 ring-emerald-100",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-12 w-12 text-emerald-600" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl sm:text-3xl font-semibold text-ink mb-3",
				children: "تم إرسال الطلب"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-ink/60 max-w-sm mb-2",
				children: "استلمنا طلبك بنجاح. هنتواصل معاك قريب لتأكيد التوصيل."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-ink/40 mb-8 font-mono dir-ltr",
				children: ["#", orderId.slice(0, 8)]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/menu",
					className: "inline-flex items-center gap-2 rounded-full bg-crimson px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-crimson-deep shadow-md hover:shadow-elevated active:scale-95",
					children: ["الرجوع للمنيو", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-8 py-3 text-sm font-semibold text-ink transition-all hover:bg-cream active:scale-95",
					children: "الرئيسية"
				})]
			})
		]
	});
}
function CheckoutForm() {
	const navigate = useNavigate();
	const { items, subtotal, clear } = useCart();
	const total = subtotal + (items.length > 0 ? DELIVERY_FEE : 0);
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [address, setAddress] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [submittedOrderId, setSubmittedOrderId] = (0, import_react.useState)(null);
	if (submittedOrderId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderSuccess, { orderId: submittedOrderId });
	if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 flex flex-col items-center text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl font-semibold text-ink mb-2",
				children: "سلتك فارغة"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-ink/60 max-w-sm mb-8",
				children: "أضف أطباق من المنيو قبل إتمام الطلب."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/menu",
				className: "inline-flex items-center gap-2 rounded-full bg-crimson px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-crimson-deep shadow-md hover:shadow-elevated active:scale-95",
				children: ["تصفح المنيو", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
			})
		]
	});
	async function handleSubmit(e) {
		e.preventDefault();
		const trimmedName = name.trim();
		const trimmedPhone = phone.trim();
		const trimmedAddress = address.trim();
		if (!trimmedName || !trimmedPhone || !trimmedAddress) {
			toast.error("يرجى إدخال الاسم والهاتف والعنوان");
			return;
		}
		if (trimmedPhone.replace(/\D/g, "").length < 10) {
			toast.error("رقم الهاتف غير صحيح");
			return;
		}
		setSubmitting(true);
		try {
			const customer = {
				name: trimmedName,
				phone: trimmedPhone,
				address: trimmedAddress,
				notes: notes.trim() || void 0
			};
			const order = await createOrder({
				customer,
				items: items.map((item) => ({
					productId: item.productId,
					sizeId: item.sizeId,
					quantity: item.quantity,
					unitPrice: item.unitPrice,
					title: item.title,
					sizeName: item.sizeName
				})),
				subtotal,
				deliveryFee: DELIVERY_FEE
			});
			notifyNewOrder({ data: {
				orderId: order.id,
				customer,
				items: items.map((item) => ({
					title: item.title,
					sizeName: item.sizeName,
					quantity: item.quantity,
					unitPrice: item.unitPrice
				})),
				subtotal,
				deliveryFee: DELIVERY_FEE,
				finalTotal: subtotal + DELIVERY_FEE
			} }).catch((err) => {
				console.error("[telegram] notify call failed:", err);
			});
			clear();
			setSubmittedOrderId(order.id);
		} catch (err) {
			const message = err instanceof Error ? err.message : err && typeof err === "object" && "message" in err && typeof err.message === "string" ? err.message : "تعذر إرسال الطلب";
			toast.error(message);
		} finally {
			setSubmitting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => navigate({ to: "/cart" }),
				className: "inline-flex items-center gap-2 text-sm font-medium text-ink/60 hover:text-crimson transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 rotate-180" }), "الرجوع للسلة"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			className: "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-7 space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold text-ink mb-1",
					children: "بيانات التوصيل"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-ink/50",
					children: "أدخل بياناتك عشان نقدر نوصللك الطلب."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-white p-5 sm:p-6 shadow-card ring-1 ring-black/5 space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "checkout-name",
								children: "الاسم بالكامل"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "checkout-name",
								value: name,
								onChange: (e) => setName(e.target.value),
								placeholder: "مثال: أحمد محمد",
								required: true,
								autoComplete: "name",
								className: "h-11 rounded-xl"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "checkout-phone",
								children: "رقم الهاتف"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "checkout-phone",
								type: "tel",
								inputMode: "tel",
								value: phone,
								onChange: (e) => setPhone(e.target.value),
								placeholder: "01xxxxxxxxx",
								required: true,
								autoComplete: "tel",
								className: "h-11 rounded-xl dir-ltr text-right"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "checkout-address",
								children: "عنوان التوصيل"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "checkout-address",
								value: address,
								onChange: (e) => setAddress(e.target.value),
								placeholder: "المنطقة، الشارع، رقم العمارة، الدور...",
								required: true,
								rows: 3,
								className: "rounded-xl min-h-[88px]"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "checkout-notes",
								children: "ملاحظات (اختياري)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "checkout-notes",
								value: notes,
								onChange: (e) => setNotes(e.target.value),
								placeholder: "مثال: بدون بصل، كلم قبل الوصول...",
								rows: 2,
								className: "rounded-xl"
							})]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sticky top-24 rounded-3xl bg-white p-6 shadow-card ring-1 ring-black/5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold text-ink mb-4",
							children: "ملخص الطلب"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-3 mb-5 max-h-48 overflow-y-auto",
							children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex justify-between gap-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-ink/80",
									children: [
										item.title,
										item.sizeName ? ` (${item.sizeName})` : "",
										" × ",
										toArabicDigits(item.quantity)
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display font-semibold text-ink shrink-0",
									children: [toArabicDigits(item.unitPrice * item.quantity), " ج.م"]
								})]
							}, item.key))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 text-sm font-medium border-t border-black/5 pt-4",
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
								className: "flex justify-between items-center text-ink/80",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "رسوم التوصيل" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-display font-semibold text-ink",
									children: [
										toArabicDigits(DELIVERY_FEE),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-ink/70",
											children: "ج.م"
										})
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "my-5 border-black/5" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-end mb-6",
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: submitting,
							className: "w-full rounded-full bg-crimson py-3.5 text-sm font-semibold text-white transition-all hover:bg-crimson-deep shadow-md hover:shadow-elevated active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:active:scale-100",
							children: submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "جاري الإرسال..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["تأكيد وإرسال الطلب", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })] })
						})
					]
				})
			})]
		})]
	});
}
function CheckoutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-alabaster flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, { isDarkHero: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckoutHero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckoutForm, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { CheckoutPage as component };
