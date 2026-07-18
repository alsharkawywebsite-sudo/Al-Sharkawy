import { r as __toESM } from "../_runtime.mjs";
import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as Menu, s as ShoppingBag, x as Heart } from "../_libs/lucide-react.mjs";
import { n as logo_default } from "./Footer-Bpr8tAUF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Nav-CSTrzMem.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STORAGE_KEY = "el-sharkawy:cart:v1";
var listeners = /* @__PURE__ */ new Set();
var cache = readFromStorage();
function readFromStorage() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}
function writeToStorage(next) {
	cache = next;
	if (typeof window !== "undefined") try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
	} catch {}
	listeners.forEach((l) => l());
}
function subscribe(l) {
	listeners.add(l);
	return () => {
		listeners.delete(l);
	};
}
function getSnapshot() {
	return cache;
}
var EMPTY_CART = [];
function getServerSnapshot() {
	return EMPTY_CART;
}
if (typeof window !== "undefined") window.addEventListener("storage", (event) => {
	if (event.key !== STORAGE_KEY) return;
	cache = readFromStorage();
	listeners.forEach((l) => l());
});
function useCart() {
	const items = (0, import_react.useSyncExternalStore)(subscribe, getSnapshot, getServerSnapshot);
	const addItem = (0, import_react.useCallback)((line) => {
		const qty = Math.max(1, line.quantity ?? 1);
		const next = [...cache];
		const idx = next.findIndex((it) => it.key === line.key);
		if (idx >= 0) next[idx] = {
			...next[idx],
			quantity: next[idx].quantity + qty
		};
		else next.push({
			...line,
			quantity: qty
		});
		writeToStorage(next);
	}, []);
	const updateQuantity = (0, import_react.useCallback)((key, delta) => {
		writeToStorage(cache.map((it) => it.key === key ? {
			...it,
			quantity: Math.max(1, it.quantity + delta)
		} : it).filter((it) => it.quantity > 0));
	}, []);
	const removeItem = (0, import_react.useCallback)((key) => {
		writeToStorage(cache.filter((it) => it.key !== key));
	}, []);
	const clear = (0, import_react.useCallback)(() => writeToStorage([]), []);
	return {
		items,
		count: items.reduce((acc, it) => acc + it.quantity, 0),
		subtotal: items.reduce((acc, it) => acc + it.unitPrice * it.quantity, 0),
		addItem,
		updateQuantity,
		removeItem,
		clear
	};
}
function Nav({ isDarkHero = false }) {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const { count } = useCart();
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	const showLightNav = !isDarkHero || scrolled;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: `fixed inset-x-0 top-0 z-50 transition-all duration-500 ${showLightNav ? "backdrop-blur-xl bg-alabaster/90 border-b border-black/5 shadow-sm" : "backdrop-blur-md bg-charcoal/40"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 sm:py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "flex shrink-0 items-center gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white p-0.5 shadow-lg sm:h-11 sm:w-11",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: logo_default,
						alt: "شعار الشرقاوي",
						width: 44,
						height: 44,
						className: "h-full w-full rounded-lg object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right leading-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-display text-base font-bold sm:text-xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-crimson",
							children: "الشرق"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-amber-glow",
							children: "اوي"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `mt-1 font-latin text-[9px] uppercase tracking-[0.28em] transition-colors ${showLightNav ? "text-ink/50" : "text-alabaster/60"}`,
						children: "El-Sharkawy"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex shrink-0 items-center gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconLink, {
						label: "المفضلة",
						to: "/favorites",
						showLightNav,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconLink, {
						label: "طلباتي",
						to: "/cart",
						showLightNav,
						badge: count,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconLink, {
						label: "القائمة",
						to: "/site-menu",
						showLightNav,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
					})
				]
			})]
		})
	});
}
function IconLink({ children, label, to, showLightNav, badge }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		"aria-label": label,
		className: `relative grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-lg transition-colors active:scale-95 ${showLightNav ? "text-ink/70 hover:text-crimson" : "text-alabaster/85 hover:text-amber-glow"}`,
		children: [children, badge != null && badge > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-label": `${badge} في السلة`,
			className: "absolute -top-1 -left-1 min-w-[18px] h-[18px] px-1 rounded-full bg-crimson text-white text-[10px] font-bold grid place-items-center leading-none shadow",
			children: badge > 99 ? "99+" : badge
		})]
	});
}
//#endregion
export { useCart as n, Nav as t };
