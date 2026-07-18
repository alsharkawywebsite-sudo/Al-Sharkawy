import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-Dova13aH.mjs";
import { i as stringType, n as numberType, r as objectType, t as arrayType } from "../_libs/zod.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/notify-order.functions-DVQKc7nq.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var orderNotifySchema = objectType({
	orderId: stringType().min(1),
	customer: objectType({
		name: stringType().min(1),
		phone: stringType().min(1),
		address: stringType().min(1),
		notes: stringType().optional()
	}),
	items: arrayType(objectType({
		title: stringType().min(1),
		sizeName: stringType().nullable().optional(),
		quantity: numberType().int().positive(),
		unitPrice: numberType().nonnegative()
	})),
	subtotal: numberType().nonnegative(),
	deliveryFee: numberType().nonnegative(),
	finalTotal: numberType().nonnegative()
});
function escapeHtml(value) {
	return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function formatMoney(n) {
	return `${Math.round(n)} ج.م`;
}
function formatOrderHtml(data) {
	const items = data.items.map((item) => {
		const size = item.sizeName ? ` (${escapeHtml(item.sizeName)})` : "";
		const lineTotal = formatMoney(item.unitPrice * item.quantity);
		return `• ${escapeHtml(item.title)}${size} × ${item.quantity} — <b>${lineTotal}</b>`;
	}).join("\n");
	const notes = data.customer.notes?.trim() ? `\n📝 <b>ملاحظات:</b> ${escapeHtml(data.customer.notes.trim())}` : "";
	return [
		`🆕 <b>طلب جديد</b>`,
		``,
		`🆔 <b>رقم الطلب:</b> <code>${escapeHtml(data.orderId.slice(0, 8))}</code>`,
		`👤 <b>الاسم:</b> ${escapeHtml(data.customer.name)}`,
		`📞 <b>الهاتف:</b> <code>${escapeHtml(data.customer.phone)}</code>`,
		`📍 <b>العنوان:</b> ${escapeHtml(data.customer.address)}`,
		``,
		`🍽 <b>الأصناف:</b>`,
		items || "—",
		``,
		`💰 <b>الفرعي:</b> ${formatMoney(data.subtotal)}`,
		`🛵 <b>التوصيل:</b> ${formatMoney(data.deliveryFee)}`,
		`✅ <b>الإجمالي:</b> ${formatMoney(data.finalTotal)}`,
		notes
	].join("\n");
}
async function sendTelegramMessage(html) {
	const token = processModule.env.TELEGRAM_BOT_TOKEN;
	const chatId = processModule.env.TELEGRAM_CHAT_ID;
	if (!token || !chatId) {
		console.warn("[telegram] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID — notification skipped.");
		return;
	}
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 8e3);
	try {
		const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			signal: controller.signal,
			body: JSON.stringify({
				chat_id: chatId,
				text: html,
				parse_mode: "HTML",
				disable_web_page_preview: true
			})
		});
		if (!response.ok) {
			const body = await response.text().catch(() => "");
			throw new Error(`Telegram API ${response.status}: ${body.slice(0, 200)}`);
		}
	} finally {
		clearTimeout(timeout);
	}
}
/**
* Server RPC: Telegram alert for a placed order.
* Never throws to the client — Telegram outages must not affect checkout UX.
*/
var notifyNewOrder_createServerFn_handler = createServerRpc({
	id: "e258447af0924417aae6eff07291bbffb07db30fbf9c840ffa4b2358c3492172",
	name: "notifyNewOrder",
	filename: "src/lib/notify-order.functions.ts"
}, (opts) => notifyNewOrder.__executeServer(opts));
var notifyNewOrder = createServerFn({ method: "POST" }).inputValidator(orderNotifySchema).handler(notifyNewOrder_createServerFn_handler, async ({ data }) => {
	try {
		await sendTelegramMessage(formatOrderHtml(data));
		return { ok: true };
	} catch (error) {
		console.error("[telegram] Failed to notify new order:", error);
		return { ok: false };
	}
});
//#endregion
export { notifyNewOrder_createServerFn_handler };
