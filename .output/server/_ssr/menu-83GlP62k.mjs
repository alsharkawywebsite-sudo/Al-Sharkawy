import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/menu-83GlP62k.js
var $$splitComponentImporter = () => import("./menu-CYPp4QzL.mjs");
var Route = createFileRoute("/menu")({
	validateSearch: (search) => {
		return { category: search.category };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
