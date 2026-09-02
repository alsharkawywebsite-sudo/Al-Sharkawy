import { createClient } from "@supabase/supabase-js";

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
const ALLOWED_MIME_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
]);

const ALLOWED_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".gif"];

function isAllowedFile(file: File): boolean {
  if (file.type && ALLOWED_MIME_TYPES.has(file.type.toLowerCase())) {
    return true;
  }
  const name = file.name.toLowerCase();
  return ALLOWED_EXTENSIONS.some((ext) => name.endsWith(ext));
}

function getEnvVar(key: string, env?: unknown): string | undefined {
  if (typeof process !== "undefined" && process.env && process.env[key]) {
    return process.env[key];
  }
  if (typeof env === "object" && env !== null && (env as Record<string, string>)[key]) {
    return (env as Record<string, string>)[key];
  }
  if (
    typeof import.meta !== "undefined" &&
    (import.meta as unknown as { env?: Record<string, string> }).env &&
    (import.meta as unknown as { env?: Record<string, string> }).env?.[key]
  ) {
    return (import.meta as unknown as { env?: Record<string, string> }).env?.[key];
  }
  return undefined;
}

/**
 * Upload an image to the external upload service with timeout and a single retry.
 */
async function uploadToExternalService(
  file: File,
  formDataOptions: { quality?: string; target_size?: string; max_width?: string },
  baseUrl: string,
  apiKey: string,
): Promise<{ success: true; url: string } | { success: false; status: number; error: string }> {
  const uploadEndpoint = `${baseUrl.replace(/\/+$/, "")}/upload`;

  // Function to execute one fetch attempt with timeout
  const executeAttempt = async () => {
    const controller = new AbortController();
    // 75 seconds timeout (to accommodate 10-60s cold start)
    const timeoutId = setTimeout(() => controller.abort(), 75_000);

    try {
      const form = new FormData();
      form.append("file", file);
      if (formDataOptions.quality) form.append("quality", formDataOptions.quality);
      if (formDataOptions.target_size) form.append("target_size", formDataOptions.target_size);
      if (formDataOptions.max_width) form.append("max_width", formDataOptions.max_width);

      const res = await fetch(uploadEndpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        body: form,
        signal: controller.signal,
      });

      return { ok: true as const, response: res };
    } catch (err: unknown) {
      return { ok: false as const, error: err };
    } finally {
      clearTimeout(timeoutId);
    }
  };

  // Attempt 1
  let attemptResult = await executeAttempt();

  // If failed with network/timeout error or 5xx server error, wait 2.5s and retry ONCE
  const shouldRetry =
    !attemptResult.ok || (attemptResult.ok && attemptResult.response.status >= 500);

  if (shouldRetry) {
    console.warn(
      "Image upload attempt 1 failed or timed out. Waiting 2.5s before retrying once...",
    );
    await new Promise((resolve) => setTimeout(resolve, 2500));
    attemptResult = await executeAttempt();
  }

  // If still failed with network/timeout after retry
  if (!attemptResult.ok) {
    const err = attemptResult.error;
    console.error("External image upload failed after retry:", err);
    return {
      success: false,
      status: 503,
      error: "الخدمة غير متاحة حاليًا، حاول مرة أخرى بعد قليل",
    };
  }

  const response = attemptResult.response;
  let json: { success?: boolean; url?: string; error?: string } | null = null;
  try {
    json = (await response.json()) as { success?: boolean; url?: string; error?: string };
  } catch (parseErr) {
    console.error("Failed to parse external upload response:", parseErr);
  }

  if (response.ok && json?.success && json?.url) {
    return {
      success: true,
      url: json.url,
    };
  }

  // Map external status codes to user-friendly messages without leaking service info
  const status = response.status;
  if (status === 403) {
    return {
      success: false,
      status: 403,
      error: "نفدت كوتا رفع الصور المتاحة، يرجى التواصل مع مسؤول النظام",
    };
  }
  if (status === 401) {
    return {
      success: false,
      status: 500,
      error: "خطأ في مصادقة خدمة رفع الصور، يرجى مراجعة إعدادات السيرفر",
    };
  }
  if (status === 413) {
    return {
      success: false,
      status: 413,
      error: "حجم الصورة يتجاوز الحد الأقصى المسموح به (25 ميجابايت)",
    };
  }
  if (status === 400) {
    return {
      success: false,
      status: 400,
      error: "الملف المحدد ليس صورة صالحة أو الصيغة غير مقبولة",
    };
  }
  if (status === 429) {
    return {
      success: false,
      status: 429,
      error: "تم إرسال طلبات كثيرة في وقت قصير، يرجى المحاولة بعد قليل",
    };
  }

  // Default error for 502 / 500 / other errors
  return {
    success: false,
    status: status >= 400 && status < 600 ? status : 502,
    error: json?.error || "فشل رفع الصورة من مزود الخدمة، يرجى المحاولة لاحقاً",
  };
}

export async function handleProductImageUpload(
  request: Request,
  productId: string,
  env?: unknown,
): Promise<Response> {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ success: false, error: "الطريقة غير مدعومة" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    // 1. Verify Authorization (Admin session)
    const authHeader = request.headers.get("Authorization") || request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ success: false, error: "غير مصرح لك: يرجى تسجيل الدخول أولاً" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    const supabaseUrl = getEnvVar("VITE_SUPABASE_URL", env) || getEnvVar("SUPABASE_URL", env);
    const supabaseAnonKey =
      getEnvVar("VITE_SUPABASE_ANON_KEY", env) || getEnvVar("SUPABASE_ANON_KEY", env);

    if (!supabaseUrl || !supabaseAnonKey) {
      return new Response(JSON.stringify({ success: false, error: "قاعدة البيانات غير مهيأة" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);
    if (userError || !user) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "جلسة الدخول غير صالحة أو منتهية، يرجى تسجيل الدخول مجدداً",
        }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // 2. Parse Multipart form data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file || !(file instanceof Blob) || file.size === 0) {
      return new Response(JSON.stringify({ success: false, error: "يرجى تحديد ملف صورة للرفع" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check size limit (25MB)
    if (file.size > MAX_FILE_SIZE) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "حجم الصورة يتجاوز الحد الأقصى المسموح به (25 ميجابايت)",
        }),
        {
          status: 413,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Check file format
    if (!isAllowedFile(file)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "صيغة الملف غير مدعومة. الصيغ المقبولة: PNG, JPEG, WEBP, GIF",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // 3. Get Base URL and API Key
    const baseUrl = getEnvVar("IMAGE_UPLOAD_BASE_URL", env) || "https://omar280sa-we.hf.space";
    const apiKey = getEnvVar("IMAGE_UPLOAD_API_KEY", env);

    if (!apiKey) {
      console.error("IMAGE_UPLOAD_API_KEY is not configured in server environment.");
      return new Response(
        JSON.stringify({
          success: false,
          error: "خدمة رفع الصور غير مهيأة في الخادم (مفتاح API غير متوفر)",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const quality = formData.get("quality")?.toString();
    const target_size = formData.get("target_size")?.toString();
    const max_width = formData.get("max_width")?.toString();

    // 4. Upload to external service
    const uploadResult = await uploadToExternalService(
      file,
      { quality, target_size, max_width },
      baseUrl,
      apiKey,
    );

    if (!uploadResult.success) {
      return new Response(JSON.stringify({ success: false, error: uploadResult.error }), {
        status: uploadResult.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const imageUrl = uploadResult.url;

    // 5. If productId is an existing product (not "new"), update DB
    if (productId && productId !== "new" && productId !== "temp") {
      const { error: dbError } = await supabase
        .from("products")
        .update({ image_url: imageUrl })
        .eq("id", productId);

      if (dbError) {
        console.error("Failed to update product image_url in database:", dbError);
      }
    }

    // 6. Return success with image_url only
    return new Response(JSON.stringify({ success: true, image_url: imageUrl }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    console.error("Error in handleProductImageUpload:", err);
    return new Response(
      JSON.stringify({
        success: false,
        error: "حدث خطأ غير متوقع أثناء معالجة رفع الصورة",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
}
