import { r as __toESM } from "../_runtime.mjs";
import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as supabase } from "./supabase-Ulv0o2vY.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Lock } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BalRB9xa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminLogin() {
	const router = useRouter();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (error) {
			setError(error.message);
			setLoading(false);
		} else router.navigate({ to: "/admin" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-alabaster flex flex-col justify-center py-12 sm:px-6 lg:px-8 dir-rtl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sm:mx-auto sm:w-full sm:max-w-md text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto h-16 w-16 bg-white rounded-full shadow-sm flex items-center justify-center text-crimson mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-8 w-8" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-3xl font-display font-bold text-ink",
				children: "تسجيل الدخول للإدارة"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 sm:mx-auto sm:w-full sm:max-w-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white py-8 px-4 shadow-sm sm:rounded-3xl sm:px-10 ring-1 ring-black/5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-6",
					onSubmit: handleLogin,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-medium text-ink mb-2",
							children: "البريد الإلكتروني"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							required: true,
							value: email,
							onChange: (e) => setEmail(e.target.value),
							className: "w-full bg-cream rounded-xl py-3 px-4 text-ink placeholder-ink/40 border border-black/5 focus:outline-none focus:ring-2 focus:ring-crimson/20 focus:bg-white transition-all",
							dir: "ltr"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-medium text-ink mb-2",
							children: "كلمة المرور"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							required: true,
							value: password,
							onChange: (e) => setPassword(e.target.value),
							className: "w-full bg-cream rounded-xl py-3 px-4 text-ink placeholder-ink/40 border border-black/5 focus:outline-none focus:ring-2 focus:ring-crimson/20 focus:bg-white transition-all",
							dir: "ltr"
						})] }),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-red-500 text-sm font-medium text-center bg-red-50 py-2 rounded-lg",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: loading,
							className: "w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-elevated text-sm font-semibold text-white bg-crimson hover:bg-crimson-deep focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed",
							children: loading ? "جاري التحميل..." : "دخول"
						})
					]
				})
			})
		})]
	});
}
//#endregion
export { AdminLogin as component };
