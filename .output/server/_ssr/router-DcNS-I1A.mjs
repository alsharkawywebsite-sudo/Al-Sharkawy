import { r as __toESM } from "../_runtime.mjs";
import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$16 } from "./menu-83GlP62k.mjs";
import { t as Route$17 } from "./offer._id-BWUmwPt3.mjs";
import { t as Route$18 } from "./product._id-DlEBp5HS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DcNS-I1A.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-D8_9UpAF.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
/** Google Fonts stylesheet — `display=swap` avoids invisible text (FOIT) while fonts load. */
var GOOGLE_FONTS_HREF = "https://fonts.googleapis.com/css2?family=Alexandria:wght@400;500;600;700;800&family=Cairo:wght@400;500;600;700;800&display=swap";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "الصفحة غير موجودة"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "الصفحة اللي بتدور عليها مش موجودة أو تم نقلها."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90",
						children: "الرجوع للرئيسية"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "حدث خطأ أثناء التحميل"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "حاول تحديث الصفحة أو الرجوع للرئيسية."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90",
						children: "حاول مرة أخرى"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-full border border-input bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
						children: "الرئيسية"
					})]
				})
			]
		})
	});
}
var Route$15 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "الشرقاوي | كبدة ومخ ومأكولات بحرية" },
			{
				name: "description",
				content: "مطعم الشرقاوي - أشهى أطباق الكبدة بالردة، المخ بانيه، والمأكولات البحرية بالتتبيلة الأصيلة."
			},
			{
				name: "author",
				content: "El-Sharkawy"
			},
			{
				property: "og:title",
				content: "الشرقاوي | كبدة ومخ ومأكولات بحرية"
			},
			{
				property: "og:description",
				content: "مطعم الشرقاوي - أشهى أطباق الكبدة بالردة، المخ بانيه، والمأكولات البحرية بالتتبيلة الأصيلة."
			},
			{
				property: "og:image",
				content: "/og-image.png"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "الشرقاوي | كبدة ومخ ومأكولات بحرية"
			},
			{
				name: "twitter:description",
				content: "مطعم الشرقاوي - أشهى أطباق الكبدة بالردة، المخ بانيه، والمأكولات البحرية بالتتبيلة الأصيلة."
			},
			{
				name: "twitter:image",
				content: "/og-image.png"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "preload",
				as: "style",
				href: GOOGLE_FONTS_HREF
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "ar",
		dir: "rtl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("link", {
				rel: "stylesheet",
				href: GOOGLE_FONTS_HREF,
				media: "print"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: `(function(){var h=${JSON.stringify(GOOGLE_FONTS_HREF)};document.querySelectorAll('link[rel="stylesheet"][href="'+h+'"]').forEach(function(l){function a(){l.media="all"}l.addEventListener("load",a);if(l.sheet)a()});})();` } }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("noscript", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("link", {
				rel: "stylesheet",
				href: GOOGLE_FONTS_HREF
			}) })
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$15.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			position: "top-center",
			richColors: true,
			closeButton: true
		})]
	});
}
var $$splitComponentImporter$14 = () => import("./site-menu-HDF0Ya9p.mjs");
var Route$14 = createFileRoute("/site-menu")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./offers-B7QLYQv9.mjs");
var Route$13 = createFileRoute("/offers")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./favorites-DbeM5x6G.mjs");
var Route$12 = createFileRoute("/favorites")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./checkout-Bxu-W7UN.mjs");
var Route$11 = createFileRoute("/checkout")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./categories-DlXu2E-1.mjs");
var Route$10 = createFileRoute("/categories")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./cart-VQowR4rD.mjs");
var Route$9 = createFileRoute("/cart")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./admin-D9HoJFNR.mjs");
var Route$8 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./routes-B7J1-B7X.mjs");
var Route$7 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./admin-CHkgHErx.mjs");
var Route$6 = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./settings-CS7mls8P.mjs");
var Route$5 = createFileRoute("/admin/settings")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./products-BKk4z-XV.mjs");
var Route$4 = createFileRoute("/admin/products")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./orders-0EPYVUVe.mjs");
var Route$3 = createFileRoute("/admin/orders")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./offers-BOZHKomm.mjs");
var Route$2 = createFileRoute("/admin/offers")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./login-BalRB9xa.mjs");
var Route$1 = createFileRoute("/admin/login")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./categories-Bjl6zGUm.mjs");
var Route = createFileRoute("/admin/categories")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var SiteMenuRoute = Route$14.update({
	id: "/site-menu",
	path: "/site-menu",
	getParentRoute: () => Route$15
});
var OffersRoute = Route$13.update({
	id: "/offers",
	path: "/offers",
	getParentRoute: () => Route$15
});
var MenuRoute = Route$16.update({
	id: "/menu",
	path: "/menu",
	getParentRoute: () => Route$15
});
var FavoritesRoute = Route$12.update({
	id: "/favorites",
	path: "/favorites",
	getParentRoute: () => Route$15
});
var CheckoutRoute = Route$11.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$15
});
var CategoriesRoute = Route$10.update({
	id: "/categories",
	path: "/categories",
	getParentRoute: () => Route$15
});
var CartRoute = Route$9.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => Route$15
});
var AdminRoute = Route$8.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$15
});
var IndexRoute = Route$7.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$15
});
var AdminIndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var ProductIdRoute = Route$18.update({
	id: "/product/$id",
	path: "/product/$id",
	getParentRoute: () => Route$15
});
var OfferIdRoute = Route$17.update({
	id: "/offer/$id",
	path: "/offer/$id",
	getParentRoute: () => Route$15
});
var AdminSettingsRoute = Route$5.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AdminRoute
});
var AdminProductsRoute = Route$4.update({
	id: "/products",
	path: "/products",
	getParentRoute: () => AdminRoute
});
var AdminOrdersRoute = Route$3.update({
	id: "/orders",
	path: "/orders",
	getParentRoute: () => AdminRoute
});
var AdminOffersRoute = Route$2.update({
	id: "/offers",
	path: "/offers",
	getParentRoute: () => AdminRoute
});
var AdminLoginRoute = Route$1.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => AdminRoute
});
var AdminRouteChildren = {
	AdminCategoriesRoute: Route.update({
		id: "/categories",
		path: "/categories",
		getParentRoute: () => AdminRoute
	}),
	AdminLoginRoute,
	AdminOffersRoute,
	AdminOrdersRoute,
	AdminProductsRoute,
	AdminSettingsRoute,
	AdminIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AdminRoute: AdminRoute._addFileChildren(AdminRouteChildren),
	CartRoute,
	CategoriesRoute,
	CheckoutRoute,
	FavoritesRoute,
	MenuRoute,
	OffersRoute,
	SiteMenuRoute,
	OfferIdRoute,
	ProductIdRoute
};
var routeTree = Route$15._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient({ defaultOptions: {
			queries: {
				staleTime: 6e4,
				gcTime: 5 * 6e4,
				refetchOnWindowFocus: false,
				retry: 1
			},
			mutations: { retry: 0 }
		} }) },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0,
		defaultPreload: "intent"
	});
};
//#endregion
export { getRouter };
