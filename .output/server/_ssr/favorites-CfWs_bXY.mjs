import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/favorites-CfWs_bXY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var STORAGE_KEY = "el-sharkawy:favorites:v1";
var listeners = /* @__PURE__ */ new Set();
var cache = readFromStorage();
function readFromStorage() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed.map(String) : [];
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
var getSnapshot = () => cache;
var EMPTY_FAVORITES = [];
var getServerSnapshot = () => EMPTY_FAVORITES;
if (typeof window !== "undefined") window.addEventListener("storage", (event) => {
	if (event.key !== STORAGE_KEY) return;
	cache = readFromStorage();
	listeners.forEach((l) => l());
});
function useFavorites() {
	return {
		ids: (0, import_react.useSyncExternalStore)(subscribe, getSnapshot, getServerSnapshot),
		isFavorite: (0, import_react.useCallback)((id) => cache.includes(id), []),
		toggle: (0, import_react.useCallback)((id) => {
			const set = new Set(cache);
			if (set.has(id)) set.delete(id);
			else set.add(id);
			writeToStorage(Array.from(set));
		}, []),
		remove: (0, import_react.useCallback)((id) => {
			writeToStorage(cache.filter((x) => x !== id));
		}, [])
	};
}
//#endregion
export { useFavorites as t };
