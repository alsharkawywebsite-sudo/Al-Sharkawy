globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/Footer-DHuFbEA2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"479-nq9m1QJCCNhgkqJCd2yXNhB1i8Y\"",
		"mtime": "2026-07-18T22:25:11.788Z",
		"size": 1145,
		"path": "../public/assets/Footer-DHuFbEA2.js"
	},
	"/assets/Nav-BfCC3Ft8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fe4-DotLpyHfDZdAz72XcTu6mu0zYoc\"",
		"mtime": "2026-07-18T22:25:11.789Z",
		"size": 4068,
		"path": "../public/assets/Nav-BfCC3Ft8.js"
	},
	"/assets/ProductCardSkeleton-I5dEwBIU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b3b-eY139+stDSgUKo/HhkNhsY2K/Yg\"",
		"mtime": "2026-07-18T22:25:11.789Z",
		"size": 2875,
		"path": "../public/assets/ProductCardSkeleton-I5dEwBIU.js"
	},
	"/assets/admin-CQpX-5wN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6c7-DWKOQy1aASlQTd+NFfZLrV49BqE\"",
		"mtime": "2026-07-18T22:25:11.789Z",
		"size": 1735,
		"path": "../public/assets/admin-CQpX-5wN.js"
	},
	"/assets/admin-CePXnHct.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1685-kNKWvDT1stP5ir0JgtbvNJtlzVY\"",
		"mtime": "2026-07-18T22:25:11.789Z",
		"size": 5765,
		"path": "../public/assets/admin-CePXnHct.js"
	},
	"/assets/api-D8rIMqlZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3486-77vfPfpNO01110iMttnBkzFzMWU\"",
		"mtime": "2026-07-18T22:25:11.790Z",
		"size": 13446,
		"path": "../public/assets/api-D8rIMqlZ.js"
	},
	"/assets/arrow-right-BYJBTyyP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-9aZlbX0UWyQ2Dkc+RUtvG0PeKAc\"",
		"mtime": "2026-07-18T22:25:11.790Z",
		"size": 165,
		"path": "../public/assets/arrow-right-BYJBTyyP.js"
	},
	"/assets/cart-ibJy52xs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee2-Q5cTlKmD1k0xEv12nUAkp3IBGKM\"",
		"mtime": "2026-07-18T22:25:11.790Z",
		"size": 7906,
		"path": "../public/assets/cart-ibJy52xs.js"
	},
	"/assets/categories-2nBD_Hrk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14b5-qrEKQygVMH5GEmVZDeCPsMQ00uI\"",
		"mtime": "2026-07-18T22:25:11.790Z",
		"size": 5301,
		"path": "../public/assets/categories-2nBD_Hrk.js"
	},
	"/assets/categories-Dqtpzyct.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cc3-E6QpncxbXOxXWqXqMnTMgIU9mw8\"",
		"mtime": "2026-07-18T22:25:11.790Z",
		"size": 3267,
		"path": "../public/assets/categories-Dqtpzyct.js"
	},
	"/assets/checkout-B-D-ucXx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2923-tNapBnQMtSlh/DCLO6VVCh1Mxsg\"",
		"mtime": "2026-07-18T22:25:11.790Z",
		"size": 10531,
		"path": "../public/assets/checkout-B-D-ucXx.js"
	},
	"/assets/chevron-left-Y-cDMoGL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82-X3AdZAGTVtghSBVTDnFXJXcXoh8\"",
		"mtime": "2026-07-18T22:25:11.790Z",
		"size": 130,
		"path": "../public/assets/chevron-left-Y-cDMoGL.js"
	},
	"/assets/createLucideIcon-CLQ5Hlf7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c7-7ajY/X5MyZRh1XklcnDPeum5DN8\"",
		"mtime": "2026-07-18T22:25:11.790Z",
		"size": 1223,
		"path": "../public/assets/createLucideIcon-CLQ5Hlf7.js"
	},
	"/assets/favorites-C_BKFID0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"48e-K64hlFwx/Hwvim370ti7P0MwQyg\"",
		"mtime": "2026-07-18T22:25:11.790Z",
		"size": 1166,
		"path": "../public/assets/favorites-C_BKFID0.js"
	},
	"/assets/hero-grill-BIOIBlO6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"38-8EX9e9GyvIF1pboKOfr4C0H+59k\"",
		"mtime": "2026-07-18T22:25:11.790Z",
		"size": 56,
		"path": "../public/assets/hero-grill-BIOIBlO6.js"
	},
	"/assets/favorites-DmIcrRpV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1694-mFHMRsTTlVk3ZJd+PINg4AsqS+0\"",
		"mtime": "2026-07-18T22:25:11.790Z",
		"size": 5780,
		"path": "../public/assets/favorites-DmIcrRpV.js"
	},
	"/assets/house-C1S32NKb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"119-voV0jk4Q7bcQKfOYig4yR0kQzP4\"",
		"mtime": "2026-07-18T22:25:11.790Z",
		"size": 281,
		"path": "../public/assets/house-C1S32NKb.js"
	},
	"/assets/hero-grill-CmswXN6W.webp": {
		"type": "image/webp",
		"etag": "\"13eba-bxQDWY/0IdK0D4boAdnnEOo5X48\"",
		"mtime": "2026-07-18T22:25:11.793Z",
		"size": 81594,
		"path": "../public/assets/hero-grill-CmswXN6W.webp"
	},
	"/assets/jsx-runtime-DUAcabCT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"42a-6CWT3JsIzkgrrMo5qQ6L1UWEbvM\"",
		"mtime": "2026-07-18T22:25:11.790Z",
		"size": 1066,
		"path": "../public/assets/jsx-runtime-DUAcabCT.js"
	},
	"/assets/label-RfF-47H6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100a-NfF9oL2gCcMtP/X6jtV73xgj+9M\"",
		"mtime": "2026-07-18T22:25:11.791Z",
		"size": 4106,
		"path": "../public/assets/label-RfF-47H6.js"
	},
	"/assets/link-Chech-jk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5aff-K17x3+hWeEyh36Wn2THvL+YLC6o\"",
		"mtime": "2026-07-18T22:25:11.791Z",
		"size": 23295,
		"path": "../public/assets/link-Chech-jk.js"
	},
	"/assets/login-CEJMPCsz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ad8-QOyblVY83qTEqs2bB3KHmv/+lyE\"",
		"mtime": "2026-07-18T22:25:11.791Z",
		"size": 2776,
		"path": "../public/assets/login-CEJMPCsz.js"
	},
	"/assets/index-BCI7DZkB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"553aa-pHtSoYEjZZIhI648vLY6VXxI1fw\"",
		"mtime": "2026-07-18T22:25:11.787Z",
		"size": 349098,
		"path": "../public/assets/index-BCI7DZkB.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"1eace-YlUbqR6XEs40PZ9TqnhgGDpjvc8\"",
		"mtime": "2026-07-18T22:25:12.922Z",
		"size": 125646,
		"path": "../public/favicon.ico"
	},
	"/assets/logo-BPGRVsRH.webp": {
		"type": "image/webp",
		"etag": "\"179c-GMGme/xMysLa4CqDAaqrJa6wxb0\"",
		"mtime": "2026-07-18T22:25:11.794Z",
		"size": 6044,
		"path": "../public/assets/logo-BPGRVsRH.webp"
	},
	"/assets/menu-B5VcQKmC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"250b-d4ru3bjV2O8foFKwOEwlPEVZVFE\"",
		"mtime": "2026-07-18T22:25:11.791Z",
		"size": 9483,
		"path": "../public/assets/menu-B5VcQKmC.js"
	},
	"/assets/menu-qdMJRAqW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bd-cMjt6pwT4nfV5hpRmJFYYt+hO68\"",
		"mtime": "2026-07-18T22:25:11.791Z",
		"size": 189,
		"path": "../public/assets/menu-qdMJRAqW.js"
	},
	"/assets/minus-Bs8HAfvJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"75-L55+lTqofNFEIzO5s1mbZWRr4S4\"",
		"mtime": "2026-07-18T22:25:11.791Z",
		"size": 117,
		"path": "../public/assets/minus-Bs8HAfvJ.js"
	},
	"/assets/offer._id-8VpKR_kw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18bc-/DIQOc0haYe+5WoMXupWtQn0QA4\"",
		"mtime": "2026-07-18T22:25:11.791Z",
		"size": 6332,
		"path": "../public/assets/offer._id-8VpKR_kw.js"
	},
	"/assets/offers-6nBxn0OU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"285e-ePtMxxsGusavQj0HA8h+5016rRE\"",
		"mtime": "2026-07-18T22:25:11.791Z",
		"size": 10334,
		"path": "../public/assets/offers-6nBxn0OU.js"
	},
	"/assets/offers-CLVi2-Yp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3216-wMqGomos7JB0etjdc/3AP3qiBoI\"",
		"mtime": "2026-07-18T22:25:11.791Z",
		"size": 12822,
		"path": "../public/assets/offers-CLVi2-Yp.js"
	},
	"/assets/orders-2NWyX7Qp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"180-iME6NyuxmPYK+yBc2g998Go/N6M\"",
		"mtime": "2026-07-18T22:25:11.791Z",
		"size": 384,
		"path": "../public/assets/orders-2NWyX7Qp.js"
	},
	"/assets/plus-AFfXUG-X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-KwsIaCDUiGN0aLfyTgD2yPdvVLk\"",
		"mtime": "2026-07-18T22:25:11.791Z",
		"size": 153,
		"path": "../public/assets/plus-AFfXUG-X.js"
	},
	"/assets/product._id-B1qeeWCn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c19-lrHyvGGjqZq39c0twd660uCyxbE\"",
		"mtime": "2026-07-18T22:25:11.791Z",
		"size": 7193,
		"path": "../public/assets/product._id-B1qeeWCn.js"
	},
	"/assets/products-Dc_Z2cSJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2cb3-8xxp6TeKnnp+ynPEtbNq4cnyR+4\"",
		"mtime": "2026-07-18T22:25:11.792Z",
		"size": 11443,
		"path": "../public/assets/products-Dc_Z2cSJ.js"
	},
	"/assets/react-6OGjdfot.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d67-dQdztEpwn9FaIw/nWmdy1DE0/Io\"",
		"mtime": "2026-07-18T22:25:11.792Z",
		"size": 7527,
		"path": "../public/assets/react-6OGjdfot.js"
	},
	"/assets/react-dom-BsPuZ7Mo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"df6-uM3HaMpfOrlxSlfUVhy3FzCvoEg\"",
		"mtime": "2026-07-18T22:25:11.792Z",
		"size": 3574,
		"path": "../public/assets/react-dom-BsPuZ7Mo.js"
	},
	"/assets/routes-C8VGnrCF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"295e-sY8VgnfXhXqtSs73g5jY6F7w3l4\"",
		"mtime": "2026-07-18T22:25:11.792Z",
		"size": 10590,
		"path": "../public/assets/routes-C8VGnrCF.js"
	},
	"/assets/settings-iAddY_1S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f11-UwrcGMmy6/5XrKt8LfE3YF/+/wk\"",
		"mtime": "2026-07-18T22:25:11.792Z",
		"size": 3857,
		"path": "../public/assets/settings-iAddY_1S.js"
	},
	"/assets/search-BXY5cBIP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-iBqEmgKEeZwcmDzXpWCBu4Tt+NA\"",
		"mtime": "2026-07-18T22:25:11.792Z",
		"size": 174,
		"path": "../public/assets/search-BXY5cBIP.js"
	},
	"/assets/select-tjaOsil3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"caaf-ml+W9VFYOXrS3i2z0TdruPHcPbI\"",
		"mtime": "2026-07-18T22:25:11.792Z",
		"size": 51887,
		"path": "../public/assets/select-tjaOsil3.js"
	},
	"/assets/star-CJG5wAAy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d8-1IvHotP/kUXE0XHQY/1ZcfMUNFM\"",
		"mtime": "2026-07-18T22:25:11.792Z",
		"size": 472,
		"path": "../public/assets/star-CJG5wAAy.js"
	},
	"/assets/site-menu-DNuuDLrN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"996-X8LrdkpWeBa8gSEhJo8mqRGRX04\"",
		"mtime": "2026-07-18T22:25:11.792Z",
		"size": 2454,
		"path": "../public/assets/site-menu-DNuuDLrN.js"
	},
	"/assets/styles-D8_9UpAF.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1a512-HdeMQAmaNsMtp4YtoZiGlyHOKWs\"",
		"mtime": "2026-07-18T22:25:11.794Z",
		"size": 107794,
		"path": "../public/assets/styles-D8_9UpAF.css"
	},
	"/assets/table-Mg_VAtWC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ab33-kOeclFPQsXx1RvUi7Z1sObPi2vc\"",
		"mtime": "2026-07-18T22:25:11.793Z",
		"size": 43827,
		"path": "../public/assets/table-Mg_VAtWC.js"
	},
	"/assets/tags-CYiO7Opg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a0-K9imIBJYr/C4NS9P8Dyvc/axohY\"",
		"mtime": "2026-07-18T22:25:11.793Z",
		"size": 416,
		"path": "../public/assets/tags-CYiO7Opg.js"
	},
	"/assets/supabase-B940qf-u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"31c36-nrC4XUVPwFTky/2nnsULbFV0WQc\"",
		"mtime": "2026-07-18T22:25:11.792Z",
		"size": 203830,
		"path": "../public/assets/supabase-B940qf-u.js"
	},
	"/assets/trash-2-BSJfMgI6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-VgaF5/H5uqZuJe+PSVQ8TPH+xbg\"",
		"mtime": "2026-07-18T22:25:11.793Z",
		"size": 328,
		"path": "../public/assets/trash-2-BSJfMgI6.js"
	},
	"/assets/useMatch-B_IwaUwo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4e7-HRmsydHJ670212RWIoKEHB0OY5k\"",
		"mtime": "2026-07-18T22:25:11.793Z",
		"size": 1255,
		"path": "../public/assets/useMatch-B_IwaUwo.js"
	},
	"/assets/useRouter-BgNLAmZd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b3-NZgYyw7OzsFPDLsBJtImxuq4Zv8\"",
		"mtime": "2026-07-18T22:25:11.793Z",
		"size": 179,
		"path": "../public/assets/useRouter-BgNLAmZd.js"
	},
	"/assets/useData-CfMpbeMb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f6-uMO+meAIQ3xvMpjHCSSlBGP0KFE\"",
		"mtime": "2026-07-18T22:25:11.793Z",
		"size": 1270,
		"path": "../public/assets/useData-CfMpbeMb.js"
	},
	"/assets/utensils-C6f1dP0k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c2-ZLav2gYuCHQ7nFIPhZfmEOdBTJQ\"",
		"mtime": "2026-07-18T22:25:11.793Z",
		"size": 450,
		"path": "../public/assets/utensils-C6f1dP0k.js"
	},
	"/assets/utils-Bci9Q4ml.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6838-ad3rm/kGl73Wct1gGJuYG3iXq7c\"",
		"mtime": "2026-07-18T22:25:11.793Z",
		"size": 26680,
		"path": "../public/assets/utils-Bci9Q4ml.js"
	},
	"/assets/x-DUE8bqMX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-EItW8Q4XotaTuy0nRbfj3HIvcuo\"",
		"mtime": "2026-07-18T22:25:11.793Z",
		"size": 154,
		"path": "../public/assets/x-DUE8bqMX.js"
	},
	"/og-image.png": {
		"type": "image/png",
		"etag": "\"228bbf-GYg/Cc//4MPqAbfqreePBG3C8jw\"",
		"mtime": "2026-07-18T22:25:12.922Z",
		"size": 2263999,
		"path": "../public/og-image.png"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_wn4MIF = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_wn4MIF
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
