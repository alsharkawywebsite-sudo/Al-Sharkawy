import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function asUuidOrNull(value: string | null | undefined): string | null {
  if (!value || typeof value !== "string") return null;
  const trimmed = value.trim();
  return UUID_RE.test(trimmed) ? trimmed : null;
}

function formatOrderNotes(payload: any): string {
  const { customer } = payload;
  const lines = [
    `الاسم: ${customer.name.trim()}`,
    `الهاتف: ${customer.phone.trim()}`,
    `العنوان: ${customer.address.trim()}`,
  ];
  if (payload.deliveryFee > 0) {
    lines.push(`رسوم التوصيل: ${payload.deliveryFee}`);
  }
  if (customer.notes?.trim()) {
    lines.push(`ملاحظات: ${customer.notes.trim()}`);
  }

  lines.push("", "الأصناف:");
  for (const item of payload.items) {
    const label = item.title?.trim() || item.productId;
    const size = item.sizeName ? ` (${item.sizeName})` : "";
    lines.push(`- ${label}${size} × ${item.quantity} @ ${item.unitPrice} ج.م`);
  }

  return lines.join("\n");
}

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

function formatOrderHtml(data: any): string {
  const items = data.items
    .map((item: any) => {
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
  const token = Deno.env.get("TELEGRAM_BOT_TOKEN");
  const chatId = Deno.env.get("TELEGRAM_CHAT_ID");

  if (!token || !chatId) {
    console.warn("[telegram] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
    return;
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const payload = await req.json();

    if (!payload.items || !payload.items.length) {
      throw new Error("السلة فارغة");
    }

    // 1) Validate items & Calculate totals
    const candidateProductIds = [...new Set(payload.items.map((i: any) => asUuidOrNull(i.productId)).filter(Boolean))];
    const candidateSizeIds = [...new Set(payload.items.map((i: any) => asUuidOrNull(i.sizeId)).filter(Boolean))];

    if (candidateProductIds.length === 0) throw new Error("السلة فارغة أو الأصناف غير صالحة");

    const { data: productsData } = await supabase
      .from("products")
      .select("id, name, base_price, is_active, discount_type, discount_value")
      .in("id", candidateProductIds);
    const productMap = new Map(productsData?.map((p: any) => [p.id, p]) || []);

    let sizesData: any[] = [];
    if (candidateSizeIds.length > 0) {
      const res = await supabase
        .from("product_sizes")
        .select("id, product_id, name, price, is_active")
        .in("id", candidateSizeIds);
      sizesData = res.data || [];
    }
    const sizeMap = new Map(sizesData.map((s: any) => [s.id, s]));

    let serverSubtotal = 0;
    const validItems: any[] = [];

    for (const item of payload.items) {
      const productId = asUuidOrNull(item.productId);
      if (!productId) throw new Error("معرف المنتج غير صالح");
      
      const product = productMap.get(productId);
      if (!product) throw new Error("المنتج غير موجود");
      if (product.is_active === false) throw new Error(`المنتج غير متاح: ${product.name}`);

      let originalPrice = product.base_price || 0;
      let sizeName = null;
      let sizeId = asUuidOrNull(item.sizeId);

      if (sizeId) {
        const size = sizeMap.get(sizeId);
        if (!size) throw new Error("الحجم غير موجود");
        if (size.product_id !== productId) throw new Error("الحجم لا يتبع لهذا المنتج");
        if (size.is_active === false) throw new Error(`الحجم غير متاح: ${size.name}`);
        originalPrice = size.price;
        sizeName = size.name;
      }

      let unitPrice = originalPrice;
      if (product.discount_type && product.discount_type !== "none" && product.discount_value) {
        if (product.discount_type === "percentage") {
          unitPrice = Math.round(Math.max(0, originalPrice - (originalPrice * product.discount_value) / 100));
        } else if (product.discount_type === "fixed") {
          unitPrice = Math.round(Math.max(0, originalPrice - product.discount_value));
        }
      }
      
      const quantity = Math.max(1, parseInt(item.quantity) || 1);
      
      serverSubtotal += unitPrice * quantity;
      
      validItems.push({
        product_id: productId,
        product_size_id: sizeId,
        quantity: quantity,
        unitPrice: unitPrice, 
        discount_applied: (originalPrice - unitPrice) * quantity,
        title: product.name,
        sizeName: sizeName
      });
    }

    const deliveryFee = Number(payload.deliveryFee) || 0;
    const serverFinalTotal = serverSubtotal + deliveryFee;

    // 2) Insert order
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        status: "pending",
        subtotal: serverSubtotal,
        discount_total: 0,
        final_total: serverFinalTotal,
        notes: formatOrderNotes({
          customer: payload.customer,
          deliveryFee: deliveryFee,
          items: validItems
        }),
      })
      .select()
      .single();

    if (error) throw new Error("تعذر إنشاء الطلب: " + error.message);
    if (!order?.id) throw new Error("تعذر إنشاء الطلب: لم يُرجع رقم الطلب");

    const orderId = order.id;

    // 3) Insert order_items
    const rows = validItems.map((item: any) => ({
      order_id: orderId,
      product_id: item.product_id,
      product_size_id: item.product_size_id,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      discount_applied: item.discount_applied,
    }));

    if (rows.length > 0) {
      const { error: itemsError } = await supabase.from("order_items").insert(rows);
      if (itemsError) {
        await supabase.from("orders").delete().eq("id", orderId);
        throw new Error("تعذر حفظ أصناف الطلب: " + itemsError.message);
      }
    }

    // 4) Send Telegram
    try {
      const telegramPayload = {
        orderId,
        customer: payload.customer,
        items: validItems,
        subtotal: serverSubtotal,
        deliveryFee: deliveryFee,
        finalTotal: serverFinalTotal,
      };
      await sendTelegramMessage(formatOrderHtml(telegramPayload));
    } catch (telegramErr) {
      console.error("[telegram] internal error:", telegramErr);
      throw new Error("تعذر تأكيد الطلب في الوقت الحالي. يُرجى المحاولة مرة أخرى بعد قليل، أو التواصل مع المطعم مباشرة إذا كان الطلب عاجلًا.");
    }

    return new Response(JSON.stringify(order), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
