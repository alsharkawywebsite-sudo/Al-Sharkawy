import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as Link, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as ChevronLeft, n as Utensils, t as X, u as Percent, v as House, y as Heart } from "../_libs/lucide-react.mjs";
import { t as Footer } from "./Footer-Bpr8tAUF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-menu-HDF0Ya9p.js
var import_jsx_runtime = require_jsx_runtime();
function SiteMenuPage() {
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-alabaster flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "fixed inset-x-0 top-0 z-50 backdrop-blur-xl bg-alabaster/90 border-b border-black/5 shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-display text-lg font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-crimson",
							children: "القائمة "
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-amber-glow",
							children: "الرئيسية"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => router.history.back(),
						className: "grid h-10 w-10 place-items-center rounded-lg bg-white text-ink/70 shadow-sm ring-1 ring-black/5 transition-all hover:text-crimson hover:shadow-md active:scale-95",
						"aria-label": "إغلاق",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 py-12 sm:py-24 pt-28 px-4 sm:px-6 max-w-3xl mx-auto w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:gap-6",
					children: [
						{
							name: "الرئيسية",
							to: "/",
							icon: House
						},
						{
							name: "قائمة الطعام",
							to: "/menu",
							icon: Utensils
						},
						{
							name: "العروض",
							to: "/offers",
							icon: Percent
						},
						{
							name: "المفضلة",
							to: "/favorites",
							icon: Heart
						}
					].map((link, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: link.to,
						className: "group flex items-center justify-between rounded-3xl bg-white p-5 sm:p-6 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-crimson/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 sm:gap-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-2xl bg-cream text-crimson transition-colors group-hover:bg-crimson group-hover:text-white",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(link.icon, { className: "h-6 w-6 sm:h-7 sm:w-7" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-lg sm:text-xl font-bold text-ink transition-colors group-hover:text-crimson",
								children: link.name
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5 text-ink/30 transition-transform group-hover:-translate-x-1 group-hover:text-crimson" })]
					}, idx))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { SiteMenuPage as component };
