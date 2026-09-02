import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-auth-token",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders, status: 200 });
  }

  try {
    // Verify the caller is an authenticated admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized: Missing Authorization header" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);

    const jwtToken = authHeader.replace(/^Bearer\s+/i, "").trim();
    const { data: { user }, error: userError } = await adminClient.auth.getUser(jwtToken);
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized: Invalid or expired token" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    // Read target from body
    const { target, branchId, branchName } = await req.json();
    if (!target || !["owner", "branch"].includes(target)) {
      return new Response(JSON.stringify({ error: "target must be 'owner' or 'branch'" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
    if (target === "branch" && !branchId) {
      return new Response(JSON.stringify({ error: "branchId required for branch target" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Read settings via service role (bypasses RLS)
    const { data: rows, error: dbError } = await adminClient
      .from("telegram_settings")
      .select("key, value");

    if (dbError) throw new Error("DB error: " + dbError.message);

    const settings: Record<string, string> = {};
    for (const row of rows ?? []) {
      if (row.value !== null) settings[row.key] = row.value;
    }

    const botToken = settings["telegram_bot_token"] || Deno.env.get("TELEGRAM_BOT_TOKEN");
    if (!botToken) {
      return new Response(JSON.stringify({ error: "Bot Token غير محفوظ. أضفه في إعدادات Telegram أولًا." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    let chatId: string | undefined;
    let destinationLabel: string;

    if (target === "owner") {
      chatId = settings["telegram_owner_chat_id"];
      destinationLabel = "Owner";
    } else {
      chatId = settings[`telegram_branch_${branchId}_chat_id`];
      destinationLabel = branchName || branchId;
    }

    if (!chatId) {
      return new Response(
        JSON.stringify({ error: `Chat ID لـ ${destinationLabel} غير محفوظ. أضفه في الإعدادات أولًا.` }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const testHtml = [
      `🧪 <b>رسالة اختبار</b>`,
      `➖➖➖➖➖➖➖➖➖➖`,
      `✅ الإعداد يعمل بشكل صحيح`,
      `📍 <b>الوجهة:</b> ${destinationLabel}`,
      `⏰ ${new Date().toLocaleString("ar-EG", { timeZone: "Africa/Cairo" })}`,
    ].join("\n");

    const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: testHtml,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!tgRes.ok) {
      const body = await tgRes.text().catch(() => "");
      throw new Error(`Telegram API ${tgRes.status}: ${body.slice(0, 300)}`);
    }

    return new Response(JSON.stringify({ success: true, destination: destinationLabel }), {
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
