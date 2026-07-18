import { r as __toESM } from "../_runtime.mjs";
import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as api } from "./api-DKOcXFly.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { u as Save } from "../_libs/lucide-react.mjs";
import { c as useSiteSettings } from "./useData-DckFcT4d.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-CS7mls8P.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminSettings() {
	const { data: settings, isLoading, refetch } = useSiteSettings();
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)({
		delivery_message: "",
		delivery_fee_min: "",
		delivery_fee_max: ""
	});
	(0, import_react.useEffect)(() => {
		if (settings) setFormData({
			delivery_message: settings.delivery_message || "",
			delivery_fee_min: settings.delivery_fee_min || "",
			delivery_fee_max: settings.delivery_fee_max || ""
		});
	}, [settings]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSaving(true);
		try {
			await api.updateSiteSetting("delivery_message", formData.delivery_message);
			await api.updateSiteSetting("delivery_fee_min", formData.delivery_fee_min);
			await api.updateSiteSetting("delivery_fee_max", formData.delivery_fee_max);
			toast.success("تم حفظ الإعدادات بنجاح");
			await refetch();
		} catch (err) {
			toast.error(err.message || "حدث خطأ أثناء حفظ الإعدادات");
		} finally {
			setIsSaving(false);
		}
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-8 text-center text-ink/60",
		children: "جاري التحميل..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-white rounded-3xl shadow-sm ring-1 ring-black/5 overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-6 lg:p-8 border-b border-black/5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl lg:text-2xl font-bold text-ink",
				children: "إعدادات الموقع"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-ink/60 mt-1",
				children: "إدارة الإعدادات العامة والرسائل"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-6 lg:p-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "space-y-6 max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold text-ink",
							children: "رسالة التوصيل (لصفحة الدفع)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 3,
							value: formData.delivery_message,
							onChange: (e) => setFormData({
								...formData,
								delivery_message: e.target.value
							}),
							className: "w-full bg-cream rounded-xl py-3 px-4 text-ink border border-black/5 focus:outline-none focus:ring-2 focus:ring-crimson/20",
							placeholder: "مثال: رسوم التوصيل تُحدد بناءً على المسافة..."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-sm font-semibold text-ink",
								children: "الحد الأدنى لرسوم التوصيل (اختياري)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: "0",
								value: formData.delivery_fee_min,
								onChange: (e) => setFormData({
									...formData,
									delivery_fee_min: e.target.value
								}),
								className: "w-full bg-cream rounded-xl py-3 px-4 text-ink border border-black/5 focus:outline-none focus:ring-2 focus:ring-crimson/20",
								placeholder: "مثال: 15"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-sm font-semibold text-ink",
								children: "الحد الأقصى لرسوم التوصيل (اختياري)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: "0",
								value: formData.delivery_fee_max,
								onChange: (e) => setFormData({
									...formData,
									delivery_fee_max: e.target.value
								}),
								className: "w-full bg-cream rounded-xl py-3 px-4 text-ink border border-black/5 focus:outline-none focus:ring-2 focus:ring-crimson/20",
								placeholder: "مثال: 50"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pt-4 flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							disabled: isSaving,
							className: "flex items-center gap-2 px-6 py-3 bg-crimson hover:bg-crimson-deep text-white font-semibold rounded-xl transition-colors disabled:opacity-50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), isSaving ? "جاري الحفظ..." : "حفظ الإعدادات"]
						})
					})
				]
			})
		})]
	});
}
//#endregion
export { AdminSettings as component };
