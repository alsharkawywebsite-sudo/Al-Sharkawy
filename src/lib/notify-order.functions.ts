import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const orderNotifySchema = z.object({
  orderId: z.string().min(1),
  customer: z.object({
    name: z.string().min(1),
    phone: z.string().min(1),
    address: z.string().min(1),
    notes: z.string().optional(),
  }),
  items: z.array(
    z.object({
      title: z.string().min(1),
      sizeName: z.string().nullable().optional(),
      quantity: z.number().int().positive(),
      unitPrice: z.number().nonnegative(),
    }),
  ),
  subtotal: z.number().nonnegative(),
  deliveryFee: z.number().nonnegative(),
  finalTotal: z.number().nonnegative(),
});

export type OrderNotifyPayload = z.infer<typeof orderNotifySchema>;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatMoney(n: number): string {
  return `${Math.round(n)} ج.م`;
}

function formatOrderHtml(data: OrderNotifyPayload): string {
  const items = data.items
    .map((item) => {
      const size = item.sizeName ? ` (${escapeHtml(item.sizeName)})` : "";
      const lineTotal = formatMoney(item.unitPrice * item.quantity);
      return `• ${escapeHtml(item.title)}${size} × ${item.quantity} — <b>${lineTotal}</b>`;
    })
    .join("\n");

  const notes = data.customer.notes?.trim()
    ? `\n📝 <b>ملاحظات:</b> ${escapeHtml(data.customer.notes.trim())}`
    : "";

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
    notes,
  ].join("\n");
}

async function sendTelegramMessage(html: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn(
      "[telegram] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID — notification skipped.",
    );
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        chat_id: chatId,
        text: html,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
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
export const notifyNewOrder = createServerFn({ method: "POST" })
  .inputValidator(orderNotifySchema)
  .handler(async ({ data }) => {
    try {
      await sendTelegramMessage(formatOrderHtml(data));
      return { ok: true as const };
    } catch (error) {
      console.error("[telegram] Failed to notify new order:", error);
      return { ok: false as const };
    }
  });
