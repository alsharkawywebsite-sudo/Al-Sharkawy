import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Footer-Bpr8tAUF.js
var import_jsx_runtime = require_jsx_runtime();
var logo_default = "/assets/logo-BPGRVsRH.webp";
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-black/5 bg-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-8 text-center sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: logo_default,
					alt: "شعار الشرقاوي",
					className: "h-9 w-9 rounded-full ring-2 ring-crimson/30"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "font-display text-base font-black",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-crimson",
						children: "الشرق"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-amber-deep",
						children: "اوي"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" الشرقاوي · بيت المشويات المصرية الأصيلة"
				]
			})]
		})
	});
}
//#endregion
export { logo_default as n, Footer as t };
