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
	"/assets/Footer-DHY4SUTX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"479-Hy2XtCC9HuIoQmw0a0RC1W/EvIo\"",
		"mtime": "2026-07-18T04:22:57.039Z",
		"size": 1145,
		"path": "../public/assets/Footer-DHY4SUTX.js"
	},
	"/assets/ProductCardSkeleton-BGm5qEbB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e05-q/FmHMQcY2B3eH4k9mpfkN4Os+k\"",
		"mtime": "2026-07-18T04:22:57.040Z",
		"size": 3589,
		"path": "../public/assets/ProductCardSkeleton-BGm5qEbB.js"
	},
	"/assets/Nav-BJtYvXbF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fe4-HrBa2PkNj1greefcRVg2QcaH06A\"",
		"mtime": "2026-07-18T04:22:57.040Z",
		"size": 4068,
		"path": "../public/assets/Nav-BJtYvXbF.js"
	},
	"/assets/admin-DJEvMjpP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6eb-EmPjX6U/EnDPZAeV8C6ixccgMRQ\"",
		"mtime": "2026-07-18T04:22:57.040Z",
		"size": 1771,
		"path": "../public/assets/admin-DJEvMjpP.js"
	},
	"/assets/admin-MvCZ0z4m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12ac-3zC+rDCWQFBPewchZhH3DiTmkYI\"",
		"mtime": "2026-07-18T04:22:57.040Z",
		"size": 4780,
		"path": "../public/assets/admin-MvCZ0z4m.js"
	},
	"/assets/api-C0c9YUoG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1646-g8EnUpTjOx/R3OrE1cvZILKbRfc\"",
		"mtime": "2026-07-18T04:22:57.040Z",
		"size": 5702,
		"path": "../public/assets/api-C0c9YUoG.js"
	},
	"/assets/arrow-right-ezB9wVT8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-zcyCiE8Xyp5VO9cgex3NbFXvNGE\"",
		"mtime": "2026-07-18T04:22:57.040Z",
		"size": 165,
		"path": "../public/assets/arrow-right-ezB9wVT8.js"
	},
	"/assets/cart-Do2D8aRr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cdf-IOuQyZnDOR9BWIZqXHZk+I/7uX4\"",
		"mtime": "2026-07-18T04:22:57.040Z",
		"size": 7391,
		"path": "../public/assets/cart-Do2D8aRr.js"
	},
	"/assets/categories-BbWltIfE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca0-3NFEOVPSTEtkPghsavsnSGtzTuw\"",
		"mtime": "2026-07-18T04:22:57.041Z",
		"size": 3232,
		"path": "../public/assets/categories-BbWltIfE.js"
	},
	"/assets/categories-CeWjuNFM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14e3-0ldK3yxAq97Jb9wKBD9w6aqfwLk\"",
		"mtime": "2026-07-18T04:22:57.041Z",
		"size": 5347,
		"path": "../public/assets/categories-CeWjuNFM.js"
	},
	"/assets/checkout-CybN_y3n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ae5-1bwAsbIMZKQ4mttkgh/pCPS4Y7c\"",
		"mtime": "2026-07-18T04:22:57.041Z",
		"size": 15077,
		"path": "../public/assets/checkout-CybN_y3n.js"
	},
	"/assets/chevron-left-CKejkkkd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82-p9yPTm63Bj2BFxU8On4RuEURuyk\"",
		"mtime": "2026-07-18T04:22:57.041Z",
		"size": 130,
		"path": "../public/assets/chevron-left-CKejkkkd.js"
	},
	"/assets/createLucideIcon-IrB5uTdA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c7-aKEaaarqTpQIicvevx9u2WBpPmg\"",
		"mtime": "2026-07-18T04:22:57.041Z",
		"size": 1223,
		"path": "../public/assets/createLucideIcon-IrB5uTdA.js"
	},
	"/assets/favorites-D2blGgPs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1671-HsBWmH0+/5mKVM8IIW5hkc8pn+8\"",
		"mtime": "2026-07-18T04:22:57.041Z",
		"size": 5745,
		"path": "../public/assets/favorites-D2blGgPs.js"
	},
	"/assets/favorites-I6DXx-HG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"48e-5ZvdJUlQ5vkbvAJRvP7BDtiRQr8\"",
		"mtime": "2026-07-18T04:22:57.041Z",
		"size": 1166,
		"path": "../public/assets/favorites-I6DXx-HG.js"
	},
	"/assets/hero-grill-BIOIBlO6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"38-8EX9e9GyvIF1pboKOfr4C0H+59k\"",
		"mtime": "2026-07-18T04:22:57.041Z",
		"size": 56,
		"path": "../public/assets/hero-grill-BIOIBlO6.js"
	},
	"/assets/house-DM2OQHsk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"119-DRHq/Uz3lKqOoEmoBeK7ahB4ZEI\"",
		"mtime": "2026-07-18T04:22:57.041Z",
		"size": 281,
		"path": "../public/assets/house-DM2OQHsk.js"
	},
	"/assets/hero-grill-CmswXN6W.webp": {
		"type": "image/webp",
		"etag": "\"13eba-bxQDWY/0IdK0D4boAdnnEOo5X48\"",
		"mtime": "2026-07-18T04:22:57.045Z",
		"size": 81594,
		"path": "../public/assets/hero-grill-CmswXN6W.webp"
	},
	"/assets/jsx-runtime-DGeXAQPT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ab-mgnSm9dUpwL2+z7tKxJ2MsN0fOM\"",
		"mtime": "2026-07-18T04:22:57.041Z",
		"size": 939,
		"path": "../public/assets/jsx-runtime-DGeXAQPT.js"
	},
	"/assets/label-BWw7nCzB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100a-R9UyVcyz3sr5Msp1r/gPj4icqcg\"",
		"mtime": "2026-07-18T04:22:57.042Z",
		"size": 4106,
		"path": "../public/assets/label-BWw7nCzB.js"
	},
	"/assets/link-Dm35pfp0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5aff-tY8vNXng5q2i/8is0/4p+y3dLFY\"",
		"mtime": "2026-07-18T04:22:57.042Z",
		"size": 23295,
		"path": "../public/assets/link-Dm35pfp0.js"
	},
	"/assets/login-ByF_5EYt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ad5-cqa9PJCQiu1/3g/eFKMk8ik/+rc\"",
		"mtime": "2026-07-18T04:22:57.042Z",
		"size": 2773,
		"path": "../public/assets/login-ByF_5EYt.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"1eace-YlUbqR6XEs40PZ9TqnhgGDpjvc8\"",
		"mtime": "2026-07-18T04:22:58.236Z",
		"size": 125646,
		"path": "../public/favicon.ico"
	},
	"/assets/index-CYCZ_JS1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8725e-Rcpv2CzVJYg6jp8O0ztiIF2hkFE\"",
		"mtime": "2026-07-18T04:22:57.038Z",
		"size": 553566,
		"path": "../public/assets/index-CYCZ_JS1.js"
	},
	"/assets/logo-BPGRVsRH.webp": {
		"type": "image/webp",
		"etag": "\"179c-GMGme/xMysLa4CqDAaqrJa6wxb0\"",
		"mtime": "2026-07-18T04:22:57.045Z",
		"size": 6044,
		"path": "../public/assets/logo-BPGRVsRH.webp"
	},
	"/assets/menu-PlY1iEs1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bd-Kog8ZJTd9Ij3OATxGv/ief8w4a0\"",
		"mtime": "2026-07-18T04:22:57.042Z",
		"size": 189,
		"path": "../public/assets/menu-PlY1iEs1.js"
	},
	"/assets/menu-B8QrnylM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24e8-GdWDVKOj3BxUQWpkogYFl/42bz0\"",
		"mtime": "2026-07-18T04:22:57.042Z",
		"size": 9448,
		"path": "../public/assets/menu-B8QrnylM.js"
	},
	"/assets/minus-DFq6ZJ0b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"75-C0V91jzZRr//hdOaGdwGj5zZNB8\"",
		"mtime": "2026-07-18T04:22:57.042Z",
		"size": 117,
		"path": "../public/assets/minus-DFq6ZJ0b.js"
	},
	"/assets/offer._id-B8kVinnW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c12-QFYGpXTUr+aq4lF/jqF7A8DE2ec\"",
		"mtime": "2026-07-18T04:22:57.042Z",
		"size": 7186,
		"path": "../public/assets/offer._id-B8kVinnW.js"
	},
	"/assets/offers-CGnaAa9f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"323f-4+4ICj5cSHEdZebJHCP9iQ5ao88\"",
		"mtime": "2026-07-18T04:22:57.042Z",
		"size": 12863,
		"path": "../public/assets/offers-CGnaAa9f.js"
	},
	"/assets/offers-PdulNmeG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"283b-cLS6V8Ds9286h36UPdiIQ9rrq90\"",
		"mtime": "2026-07-18T04:22:57.042Z",
		"size": 10299,
		"path": "../public/assets/offers-PdulNmeG.js"
	},
	"/assets/orders-BIxgz0hb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"180-sfwwSYiwjVgaUvFTGoabk0Lz+uY\"",
		"mtime": "2026-07-18T04:22:57.043Z",
		"size": 384,
		"path": "../public/assets/orders-BIxgz0hb.js"
	},
	"/assets/plus-Doqa2OwT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-QsG2ZQtZQcafKtm9xl+Yhko+hoM\"",
		"mtime": "2026-07-18T04:22:57.043Z",
		"size": 153,
		"path": "../public/assets/plus-Doqa2OwT.js"
	},
	"/assets/product._id-apuNdb6O.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bfb-rXj6E19jHxJDc2rTuDiqnAIp+xA\"",
		"mtime": "2026-07-18T04:22:57.043Z",
		"size": 7163,
		"path": "../public/assets/product._id-apuNdb6O.js"
	},
	"/assets/products-CmJ1NP_2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ccd-wBha9Wwgh8xmRdzE3+aWuFDgtDs\"",
		"mtime": "2026-07-18T04:22:57.043Z",
		"size": 11469,
		"path": "../public/assets/products-CmJ1NP_2.js"
	},
	"/assets/react-dom-um4tKP-X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"df6-HxjhiprX1cs/oNwU51+g8fNO/dE\"",
		"mtime": "2026-07-18T04:22:57.043Z",
		"size": 3574,
		"path": "../public/assets/react-dom-um4tKP-X.js"
	},
	"/assets/react-vt4WmSOl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d67-BPOYGZcDqVQtRgdRj1RwUcWBJwU\"",
		"mtime": "2026-07-18T04:22:57.043Z",
		"size": 7527,
		"path": "../public/assets/react-vt4WmSOl.js"
	},
	"/assets/redirect-C-eRQtnH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22d-XWldT6wFIL00QHpfP609loBAcNQ\"",
		"mtime": "2026-07-18T04:22:57.043Z",
		"size": 557,
		"path": "../public/assets/redirect-C-eRQtnH.js"
	},
	"/assets/routes-CZabF5y1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28ed-xJPAneesNiDt5x/61RAOCP5Mtos\"",
		"mtime": "2026-07-18T04:22:57.043Z",
		"size": 10477,
		"path": "../public/assets/routes-CZabF5y1.js"
	},
	"/assets/search-CkOFVR7a.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-2VEIvEbE7kEYviEcL95BdaP59Sg\"",
		"mtime": "2026-07-18T04:22:57.043Z",
		"size": 174,
		"path": "../public/assets/search-CkOFVR7a.js"
	},
	"/assets/select-DfxSfHvd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"caaf-nhOBM4WmSCdxVGpPj+eCMzTahac\"",
		"mtime": "2026-07-18T04:22:57.043Z",
		"size": 51887,
		"path": "../public/assets/select-DfxSfHvd.js"
	},
	"/assets/settings-CCo64nTE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"179-0AW+cUa12iFtB+xp19IgLQrfCDU\"",
		"mtime": "2026-07-18T04:22:57.044Z",
		"size": 377,
		"path": "../public/assets/settings-CCo64nTE.js"
	},
	"/assets/site-menu-BRw0GlX8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"996-ZPtnmqwxuyJjoUf7LyDWw+j5Rnk\"",
		"mtime": "2026-07-18T04:22:57.044Z",
		"size": 2454,
		"path": "../public/assets/site-menu-BRw0GlX8.js"
	},
	"/assets/star-CdJnaaB0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d8-MBSoY5EHZwNoS2qN0++okv3tARg\"",
		"mtime": "2026-07-18T04:22:57.044Z",
		"size": 472,
		"path": "../public/assets/star-CdJnaaB0.js"
	},
	"/assets/styles-B0FPxnl0.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1a4b1-LLHvibs0SbX4WOxTzt1gM7fGbdI\"",
		"mtime": "2026-07-18T04:22:57.045Z",
		"size": 107697,
		"path": "../public/assets/styles-B0FPxnl0.css"
	},
	"/assets/table-DbyU_k4s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ab0f-2DxyYk09rBonImocbe49X8YGIWs\"",
		"mtime": "2026-07-18T04:22:57.044Z",
		"size": 43791,
		"path": "../public/assets/table-DbyU_k4s.js"
	},
	"/assets/tags-PzyCm8uR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a0-BYKnHm1SuqhKhtXlvZJZpPI0njE\"",
		"mtime": "2026-07-18T04:22:57.044Z",
		"size": 416,
		"path": "../public/assets/tags-PzyCm8uR.js"
	},
	"/assets/trash-2-DtFTmAiX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-r939pRDwFL5zQNIcyKUM7QL+Re8\"",
		"mtime": "2026-07-18T04:22:57.044Z",
		"size": 328,
		"path": "../public/assets/trash-2-DtFTmAiX.js"
	},
	"/assets/useMatch-DqJwvHLB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c3-H5KZyQ1bdop+A+ctBNn/ub85t84\"",
		"mtime": "2026-07-18T04:22:57.044Z",
		"size": 707,
		"path": "../public/assets/useMatch-DqJwvHLB.js"
	},
	"/assets/utensils-CzXsrobW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c2-+tdKR0/GjQkZ/mkL6+MA7DwiY6M\"",
		"mtime": "2026-07-18T04:22:57.044Z",
		"size": 450,
		"path": "../public/assets/utensils-CzXsrobW.js"
	},
	"/assets/utils-Bci9Q4ml.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6838-ad3rm/kGl73Wct1gGJuYG3iXq7c\"",
		"mtime": "2026-07-18T04:22:57.045Z",
		"size": 26680,
		"path": "../public/assets/utils-Bci9Q4ml.js"
	},
	"/assets/x-AkocBwfu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-es0Ffg/1UhMYnzJEg58bU7WCWvY\"",
		"mtime": "2026-07-18T04:22:57.045Z",
		"size": 154,
		"path": "../public/assets/x-AkocBwfu.js"
	},
	"/assets/useQuery-gXzlG83s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"226f-sri7g5r3Z0Hip+yhauQudQievq8\"",
		"mtime": "2026-07-18T04:22:57.044Z",
		"size": 8815,
		"path": "../public/assets/useQuery-gXzlG83s.js"
	},
	"/og-image.png": {
		"type": "image/png",
		"etag": "\"228bbf-GYg/Cc//4MPqAbfqreePBG3C8jw\"",
		"mtime": "2026-07-18T04:22:58.237Z",
		"size": 2263999,
		"path": "../public/og-image.png"
	},
	"/assets/useRouter-DjxpDcdu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b3-TwrINnCK9H+0fe92f4ssK2wqssc\"",
		"mtime": "2026-07-18T04:22:57.044Z",
		"size": 179,
		"path": "../public/assets/useRouter-DjxpDcdu.js"
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
