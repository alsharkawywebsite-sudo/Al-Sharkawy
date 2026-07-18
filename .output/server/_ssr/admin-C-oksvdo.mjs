import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as api } from "./api-BzRK7CvT.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { i as Tags, n as Utensils, u as Percent } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-C-oksvdo.js
var import_jsx_runtime = require_jsx_runtime();
function AdminDashboard() {
	const { data: categories = [] } = useQuery({
		queryKey: ["adminCategories"],
		queryFn: api.getCategories
	});
	const { data: products = [] } = useQuery({
		queryKey: ["adminProducts"],
		queryFn: api.getAdminProducts
	});
	const { data: offers = [] } = useQuery({
		queryKey: ["adminOffers"],
		queryFn: api.getAdminOffers
	});
	const stats = [
		{
			name: "إجمالي الفئات",
			value: categories.length,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tags, { className: "h-8 w-8 text-blue-500" }),
			path: "/admin/categories"
		},
		{
			name: "إجمالي المنتجات",
			value: products.length,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, { className: "h-8 w-8 text-green-500" }),
			path: "/admin/products"
		},
		{
			name: "إجمالي العروض",
			value: offers.length,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Percent, { className: "h-8 w-8 text-orange-500" }),
			path: "/admin/offers"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-6 min-h-[400px]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-white rounded-3xl p-4 lg:p-8 shadow-sm ring-1 ring-black/5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl lg:text-2xl font-semibold text-ink mb-6",
				children: "مرحباً بك في لوحة التحكم"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-3 gap-6",
				children: stats.map((stat, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: stat.path,
					className: "bg-gray-50/50 p-6 rounded-2xl shadow-sm ring-1 ring-black/5 flex items-center justify-between transition-all hover:shadow-md hover:bg-gray-50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-gray-500 mb-1",
						children: stat.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-3xl font-bold text-ink",
						children: stat.value
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-4 bg-white shadow-sm ring-1 ring-black/5 rounded-xl",
						children: stat.icon
					})]
				}, i))
			})]
		})
	});
}
//#endregion
export { AdminDashboard as component };
