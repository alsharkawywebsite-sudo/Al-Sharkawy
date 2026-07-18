import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-NLkIIbLX.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function calculateDiscountedPrice(price, discountType, discountValue) {
	if (!discountType || discountType === "none" || !discountValue) return price;
	if (discountType === "percentage") return Math.round(Math.max(0, price - price * discountValue / 100));
	if (discountType === "fixed") return Math.round(Math.max(0, price - discountValue));
	return Math.round(price);
}
function getProductDisplayPrice(product, size) {
	const original = size ? size.price : product.base_price ?? 0;
	const final = calculateDiscountedPrice(original, product.discount_type, product.discount_value);
	return {
		original,
		final,
		hasDiscount: original > final
	};
}
//#endregion
export { getProductDisplayPrice as n, cn as t };
