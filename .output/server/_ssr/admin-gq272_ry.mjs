import { n as __toESM } from "../_runtime.mjs";
import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as supabase } from "./supabase-Ulv0o2vY.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as Outlet, g as Link, l as useLocation, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as LayoutDashboard, i as Tags, m as LogOut, n as Utensils, p as Menu, t as X, u as Percent, v as House } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-gq272_ry.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminSidebar({ onClose }) {
	const location = useLocation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "w-64 bg-charcoal text-alabaster min-h-screen flex flex-col shadow-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "absolute top-4 left-4 lg:hidden text-alabaster/70 hover:text-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-6 w-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-display font-bold text-amber-glow tracking-wide text-center mt-2 lg:mt-0",
						children: "الشرقاوي"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center text-xs mt-1 text-alabaster/60",
						children: "لوحة التحكم"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex-1 mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2 px-4",
					children: [
						{
							name: "لوحة القيادة",
							path: "/admin",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "h-5 w-5" })
						},
						{
							name: "الفئات",
							path: "/admin/categories",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tags, { className: "h-5 w-5" })
						},
						{
							name: "المنتجات",
							path: "/admin/products",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, { className: "h-5 w-5" })
						},
						{
							name: "العروض",
							path: "/admin/offers",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Percent, { className: "h-5 w-5" })
						}
					].map((item) => {
						const isActive = location.pathname === item.path;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.path,
							onClick: onClose,
							className: `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? "bg-crimson text-white shadow-elevated" : "text-alabaster/70 hover:bg-white/10 hover:text-white"}`,
							children: [item.icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: item.name
							})]
						}) }, item.path);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-4 mt-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-alabaster/70 hover:bg-white/10 hover:text-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: "الرجوع للموقع"
					})]
				})
			})
		]
	});
}
function AdminHeader({ title, onMenuClick }) {
	const router = useRouter();
	const handleLogout = async () => {
		await supabase.auth.signOut();
		router.navigate({ to: "/admin/login" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "h-16 lg:h-20 bg-white border-b border-black/5 flex items-center justify-between px-4 lg:px-8 shadow-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onMenuClick,
				className: "lg:hidden p-2 -mr-2 text-charcoal hover:bg-black/5 rounded-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-6 w-6" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl lg:text-2xl font-display font-bold text-ink",
				children: title
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: handleLogout,
			className: "flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 text-sm font-medium text-crimson hover:bg-crimson/5 rounded-full transition-colors",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4 lg:h-5 lg:w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hidden sm:inline",
				children: "تسجيل الخروج"
			})]
		})]
	});
}
function AdminLayout() {
	const location = useLocation();
	const [sidebarOpen, setSidebarOpen] = (0, import_react.useState)(false);
	if (location.pathname === "/admin/login") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	let title = "لوحة القيادة";
	if (location.pathname.includes("/categories")) title = "الفئات";
	else if (location.pathname.includes("/products")) title = "المنتجات";
	else if (location.pathname.includes("/offers")) title = "العروض";
	else if (location.pathname.includes("/orders")) title = "الطلبات";
	else if (location.pathname.includes("/settings")) title = "الإعدادات";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-alabaster dir-rtl",
		children: [
			sidebarOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 bg-black/50 z-40 lg:hidden",
				onClick: () => setSidebarOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `fixed inset-y-0 right-0 z-50 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSidebar, { onClose: () => setSidebarOpen(false) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 flex flex-col min-w-0 w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminHeader, {
					title,
					onMenuClick: () => setSidebarOpen(true)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1 p-4 lg:p-8 overflow-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				})]
			})
		]
	});
}
//#endregion
export { AdminLayout as component };
