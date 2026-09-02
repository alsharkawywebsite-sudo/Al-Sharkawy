import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

interface CustomerData {
  name: string;
  phone: string;
  address: string;
  notes?: string;
}

interface ItemData {
  productId?: string;
  sizeId?: string;
  quantity: number | string;
  title?: string;
  sizeName?: string;
  unitPrice?: number;
  product_size_id?: string | null;
  product_id?: string;
  offerId?: string;
  offer_id?: string;
  discount_applied?: number;
}

interface PayloadData {
  branchId?: string;
  branchName?: string;
  customer: CustomerData;
  items: ItemData[];
  // NOTE: deliveryFee removed from the form. Field kept optional here (and
  // in every usage below) so nothing breaks if it's ever sent again from
  // an old client build. See "DELIVERY FEE (DISABLED)" comments throughout
  // this file for how to fully re-enable it.
  deliveryFee?: number;
  orderId?: string;
  subtotal?: number;
  finalTotal?: number;
}

interface ProductData {
  id: string;
  name: string;
  base_price: number;
  is_active: boolean;
  discount_type?: string;
  discount_value?: number;
}

interface SizeData {
  id: string;
  product_id: string;
  name: string;
  price: number;
  is_active: boolean;
}

function asUuidOrNull(value: string | null | undefined): string | null {
  if (!value || typeof value !== "string") return null;
  const trimmed = value.trim();
  return UUID_RE.test(trimmed) ? trimmed : null;
}

function formatOrderNotes(payload: PayloadData): string {
  const { customer, branchName } = payload;
  const lines = [
    ...(branchName ? [`الفرع: ${branchName}`] : []),
    `الاسم: ${customer.name.trim()}`,
    `الهاتف: ${customer.phone.trim()}`,
    `العنوان: ${customer.address.trim()}`,
  ];

  // ---- DELIVERY FEE (DISABLED) ----------------------------------------
  // The delivery fee field was removed from the customer-facing form.
  // Left here commented out (not deleted) in case delivery gets
  // reintroduced later. To re-enable: uncomment this block and the
  // matching blocks below marked "DELIVERY FEE (DISABLED)".
  //
  // if (payload.deliveryFee > 0) {
  //   lines.push(`رسوم التوصيل: ${payload.deliveryFee}`);
  // }
  // ----------------------------------------------------------------------

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

function formatOrderHtml(data: PayloadData): string {
  const items = data.items
    .map((item: ItemData) => {
      const size = item.sizeName ? ` (${escapeHtml(item.sizeName)})` : "";
      const lineTotal = formatMoney((item.unitPrice || 0) * (Number(item.quantity) || 1));
      return `• ${escapeHtml(item.title)}${size} × ${item.quantity} — <b>${lineTotal}</b>`;
    })
    .join("\n");

  const notes = data.customer.notes?.trim()
    ? `\n📝 <b>ملاحظات:</b> ${escapeHtml(data.customer.notes.trim())}`
    : "";

  const lines = [
    `🆕 <b>طلب جديد</b>${data.branchName ? ` — ${escapeHtml(data.branchName)}` : ""}`,
    `➖➖➖➖➖➖➖➖➖➖`,
    `🆔 <b>رقم الطلب:</b> <code>${escapeHtml(data.orderId.slice(0, 8))}</code>`,
    `👤 <b>الاسم:</b> ${escapeHtml(data.customer.name)}`,
    `📞 <b>الهاتف:</b> <code>${escapeHtml(data.customer.phone)}</code>`,
    `📍 <b>العنوان:</b> ${escapeHtml(data.customer.address)}`,
    `➖➖➖➖➖➖➖➖➖➖`,
    `🍽 <b>الأصناف:</b>`,
    items || "—",
    `➖➖➖➖➖➖➖➖➖➖`,
    // ---- DELIVERY FEE (DISABLED) --------------------------------------
    // Previously the subtotal / delivery / final total were shown as three
    // separate lines. Since there's no delivery fee anymore, the subtotal
    // line is redundant with the final total (they're equal), so we just
    // show one "الإجمالي" line below. To re-enable delivery, restore:
    //
    // `💰 <b>الفرعي:</b> ${formatMoney(data.subtotal)}`,
    // `🛵 <b>التوصيل:</b> ${formatMoney(data.deliveryFee)}`,
    // and change the total line back to reference data.finalTotal
    // (already does — no change needed there).
    // --------------------------------------------------------------------
    `✅ <b>الإجمالي:</b> ${formatMoney(data.finalTotal)}`,
    notes,
  ];

  return lines.filter((l) => l !== null && l !== "").join("\n");
}

async function sendTelegramMessage(html: string, chatId: string): Promise<void> {
  // Token: prefer DB setting (telegram_bot_token), fall back to env var.
  const token = Deno.env.get("TELEGRAM_BOT_TOKEN");

  if (!token) {
    console.warn("[telegram] Missing TELEGRAM_BOT_TOKEN");
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

/**
 * Resolves the list of Telegram chat IDs that should receive an order
 * notification, based on the order's branchId.
 *
 * Logic:
 *   1. Always include the Owner chat ID.
 *   2. Include the branch-specific chat ID if configured.
 *
 * Settings are read from the `telegram_settings` table (service role).
 * The key for a branch chat ID follows the pattern:
 *   telegram_branch_<branchId>_chat_id
 */
async function resolveTargetChatIds(
  branchId: string | null | undefined,
  supabase: ReturnType<typeof import("https://esm.sh/@supabase/supabase-js@2.39.0").createClient>
): Promise<string[]> {
  const { data: rows, error } = await supabase
    .from("telegram_settings")
    .select("key, value");

  if (error) {
    console.warn("[telegram] Could not read telegram_settings:", error.message);
    // Fall back to legacy env var so existing setup keeps working.
    const legacyChat = Deno.env.get("TELEGRAM_CHAT_ID");
    return legacyChat ? [legacyChat] : [];
  }

  const settings: Record<string, string> = {};
  for (const row of rows ?? []) {
    if (row.value !== null && row.value !== "") settings[row.key] = row.value;
  }

  const ids: string[] = [];

  // 1. Owner always receives every order.
  const ownerChatId = settings["telegram_owner_chat_id"];
  if (ownerChatId) {
    ids.push(ownerChatId);
  } else {
    // Legacy fallback: TELEGRAM_CHAT_ID env var treated as owner.
    const legacyChat = Deno.env.get("TELEGRAM_CHAT_ID");
    if (legacyChat) ids.push(legacyChat);
  }

  // 2. Branch-specific group.
  if (branchId) {
    const branchChatId = settings[`telegram_branch_${branchId}_chat_id`];
    if (branchChatId) {
      // Avoid duplicates in case owner and branch share the same chat.
      if (!ids.includes(branchChatId)) {
        ids.push(branchChatId);
      }
    } else {
      console.warn(`[telegram] No chat ID configured for branch ${branchId}`);
    }
  }

  return ids;
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
    const candidateSizeIds = [...new Set(payload.items.map((i: ItemData) => asUuidOrNull(i.sizeId)).filter(Boolean))];
    const candidateOfferIds = [...new Set(payload.items.map((i: ItemData) => asUuidOrNull(i.offerId)).filter(Boolean))];

    let offersData: any[] = [];
    if (candidateOfferIds.length > 0) {
      const res = await supabase.from("offers").select("id, title, is_active, product_id, new_price, old_price, discount_type, discount_value").in("id", candidateOfferIds);
      offersData = res.data || [];
    }
    const offerMap = new Map(offersData.map((o: any) => [o.id, o]));

    const candidateProductIds = [...new Set([
      ...payload.items.map((i: ItemData) => asUuidOrNull(i.productId)),
      ...offersData.map((o: any) => asUuidOrNull(o.product_id))
    ].filter(Boolean))];

    if (candidateProductIds.length === 0 && candidateOfferIds.length === 0) throw new Error("السلة فارغة أو الأصناف غير صالحة");

    const { data: productsData } = await supabase
      .from("products")
      .select("id, name, base_price, is_active, discount_type, discount_value")
      .in("id", candidateProductIds);
    const productMap = new Map(productsData?.map((p: ProductData) => [p.id, p]) || []);

    let sizesData: SizeData[] = [];
    if (candidateSizeIds.length > 0) {
      const res = await supabase
        .from("product_sizes")
        .select("id, product_id, name, price, is_active")
        .in("id", candidateSizeIds);
      sizesData = res.data || [];
    }
    const sizeMap = new Map(sizesData.map((s: SizeData) => [s.id, s]));

    let serverSubtotal = 0;
    const validItems: ItemData[] = [];

    for (const item of payload.items) {
      const offerId = asUuidOrNull(item.offerId);
      const quantity = Math.max(1, parseInt(String(item.quantity)) || 1);

      if (offerId) {
        const offer = offerMap.get(offerId);
        if (!offer) throw new Error("العرض غير موجود");
        if (offer.is_active === false) {
          throw new Error(`العرض غير متاح: ${offer.title}`);
        }

        if (offer.product_id) {
          const product = productMap.get(offer.product_id);
          if (!product) throw new Error("المنتج المرتبط بالعرض غير موجود");
          if (product.is_active === false) throw new Error(`المنتج المرتبط بالعرض غير متاح: ${product.name}`);
        }

        const unitPrice = offer.new_price || 0;
        const originalPrice = offer.old_price || unitPrice;
        
        serverSubtotal += unitPrice * quantity;
        
        validItems.push({
          product_id: offer.product_id || undefined,
          product_size_id: undefined,
          offer_id: offerId,
          quantity: quantity,
          unitPrice: unitPrice,
          discount_applied: Math.max(0, (originalPrice - unitPrice) * quantity),
          title: offer.title,
          sizeName: undefined
        });
        
        continue;
      }

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

    // ---- DELIVERY FEE (DISABLED) -------------------------------------------
    // The delivery fee input was removed from the customer-facing form, so
    // there is no longer a trustworthy `payload.deliveryFee` to validate or
    // charge. Everything below is commented out rather than deleted so the
    // feature can be restored quickly if delivery comes back.
    //
    // To re-enable: uncomment the two lines below, and add `+ deliveryFee`
    // back into `serverFinalTotal` further down, and restore the
    // corresponding lines in formatOrderNotes / formatOrderHtml / the
    // telegramPayload object (see matching comments in those spots).
    //
    // const deliveryFee = Number(payload.deliveryFee) || 0;
    // if (!Number.isFinite(deliveryFee) || deliveryFee < 0) {
    //   throw new Error("رسوم التوصيل غير صالحة");
    // }
    // -------------------------------------------------------------------------
    const serverFinalTotal = serverSubtotal; // was: serverSubtotal + deliveryFee

    // 2) Insert order
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        branch_id: asUuidOrNull(payload.branchId),
        status: "pending",
        subtotal: serverSubtotal,
        discount_total: 0,
        final_total: serverFinalTotal,
        notes: formatOrderNotes({
          customer: payload.customer,
          branchName: payload.branchName,
          // deliveryFee, // DELIVERY FEE (DISABLED) — see formatOrderNotes
          items: validItems
        }),
      })
      .select()
      .single();

    if (error) throw new Error("تعذر إنشاء الطلب: " + error.message);
    if (!order?.id) throw new Error("تعذر إنشاء الطلب: لم يُرجع رقم الطلب");

    const orderId = order.id;

    // 3) Insert order_items
    const rows = validItems.map((item: ItemData) => ({
      order_id: orderId,
      product_id: item.product_id,
      product_size_id: item.product_size_id,
      offer_id: item.offer_id,
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
    // NOTE: Telegram errors are intentionally non-fatal. The order has already
    // been persisted in DB at this point; failing to send a notification must
    // not make the customer think their order was rejected.
    try {
      const telegramPayload = {
        orderId,
        customer: payload.customer,
        branchName: payload.branchName,
        items: validItems,
        subtotal: serverSubtotal,
        // deliveryFee, // DELIVERY FEE (DISABLED) — see formatOrderHtml
        finalTotal: serverFinalTotal,
      };
      const html = formatOrderHtml(telegramPayload);
      const chatIds = await resolveTargetChatIds(asUuidOrNull(payload.branchId), supabase);
      for (const chatId of chatIds) {
        await sendTelegramMessage(html, chatId);
      }
    } catch (telegramErr) {
      // Log and continue — do NOT re-throw. The order is already saved in DB.
      console.error("[telegram] notification failed (order still saved):", telegramErr);
    }

    return new Response(JSON.stringify(order), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});