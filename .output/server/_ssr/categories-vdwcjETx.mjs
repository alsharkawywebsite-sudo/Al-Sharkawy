import { n as __toESM } from "../_runtime.mjs";
import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Search } from "../_libs/lucide-react.mjs";
import { t as Footer } from "./Footer-Bpr8tAUF.mjs";
import { t as Nav } from "./Nav-CSTrzMem.mjs";
import { o as useCategories, t as CategoryCardSkeleton } from "./ProductCardSkeleton-Dg0sV5vG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categories-vdwcjETx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CategoriesPage() {
	const { data: categories, isLoading, isError } = useCategories();
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const filteredCategories = (0, import_react.useMemo)(() => {
		const list = categories ?? [];
		const q = searchQuery.trim().toLowerCase();
		if (!q) return list;
		return list.filter((c) => (c.name ?? "").toLowerCase().includes(q));
	}, [categories, searchQuery]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-alabaster flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 py-8 sm:py-16 pt-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center mb-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "font-display text-3xl font-bold text-ink sm:text-5xl md:text-6xl mb-4",
								children: ["كل ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-crimson",
									children: "الفئات"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-ink/70 max-w-2xl mx-auto text-sm sm:text-base",
								children: "تصفح جميع فئات الطعام لدينا واختر ما يناسب ذوقك"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "max-w-xl mx-auto mb-12",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "ابحث في الفئات...",
									value: searchQuery,
									onChange: (e) => setSearchQuery(e.target.value),
									"aria-label": "بحث في الفئات",
									className: "w-full bg-white rounded-2xl py-3.5 pr-12 pl-4 text-sm sm:text-base text-ink placeholder-ink/40 shadow-sm ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-crimson/20 transition-all duration-300",
									dir: "rtl"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ink/40 group-focus-within:text-crimson transition-colors" })]
							})
						}),
						isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8",
							role: "status",
							"aria-label": "جاري التحميل",
							children: Array.from({ length: 8 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryCardSkeleton, {}, i))
						}) : isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "py-16 text-center text-ink/60",
							children: "تعذّر تحميل الفئات."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8",
							children: filteredCategories.length > 0 ? filteredCategories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/menu",
								className: "group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-crimson/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "aspect-square w-full overflow-hidden p-2 sm:p-3 bg-white",
									children: c.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: c.image_url,
										alt: c.name,
										loading: "lazy",
										className: "h-full w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-110"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "px-3 pb-4 pt-1 sm:px-4 sm:pb-5 text-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-sm font-bold text-ink sm:text-lg transition-colors group-hover:text-crimson",
										children: c.name
									})
								})]
							}, c.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "col-span-full py-12 text-center text-ink/60",
								children: "لم يتم العثور على فئات مطابقة لبحثك."
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { CategoriesPage as component };
