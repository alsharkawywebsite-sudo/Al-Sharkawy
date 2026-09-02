import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useSiteSettings, useTelegramSettings } from "@/hooks/useData";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { toast } from "sonner";
import { Save, Send, Eye, EyeOff, ChevronDown, ChevronUp, Bot, HelpCircle } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  const { data: settings, isLoading, refetch } = useSiteSettings();
  const { data: telegramSettings, isLoading: telegramLoading, refetch: refetchTelegram } = useTelegramSettings();
  const { data: branches = [] } = useQuery({
    queryKey: ["adminBranches"],
    queryFn: api.getBranches,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    delivery_message: "",
    delivery_fee_min: "",
    delivery_fee_max: "",
  });

  // Telegram state
  const [tokenInput, setTokenInput] = useState("");
  const [tokenEditing, setTokenEditing] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [ownerChatId, setOwnerChatId] = useState("");
  const [branchChatIds, setBranchChatIds] = useState<Record<string, string>>({});
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [testingKey, setTestingKey] = useState<string | null>(null);
  const [guideOpen, setGuideOpen] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({
        delivery_message: settings.delivery_message || "",
        delivery_fee_min: settings.delivery_fee_min || "",
        delivery_fee_max: settings.delivery_fee_max || "",
      });
    }
  }, [settings]);

  useEffect(() => {
    if (telegramSettings) {
      setOwnerChatId(telegramSettings["telegram_owner_chat_id"] || "");
      const ids: Record<string, string> = {};
      for (const branch of branches) {
        ids[branch.id] = telegramSettings[`telegram_branch_${branch.id}_chat_id`] || "";
      }
      setBranchChatIds(ids);
    }
  }, [telegramSettings, branches]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.updateSiteSetting("delivery_message", formData.delivery_message);
      await api.updateSiteSetting("delivery_fee_min", formData.delivery_fee_min);
      await api.updateSiteSetting("delivery_fee_max", formData.delivery_fee_max);
      toast.success("تم حفظ الإعدادات بنجاح");
      await refetch();
    } catch (err: unknown) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "حدث خطأ أثناء حفظ الإعدادات");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveTelegramKey = async (key: string, value: string, label: string) => {
    if (!value.trim()) {
      toast.error("القيمة لا يمكن أن تكون فارغة");
      return;
    }
    setSavingKey(key);
    try {
      await api.updateTelegramSetting(key, value.trim());
      toast.success(`تم حفظ ${label} بنجاح`);
      await refetchTelegram();
      if (key === "telegram_bot_token") {
        setTokenEditing(false);
        setTokenInput("");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "حدث خطأ أثناء الحفظ");
    } finally {
      setSavingKey(null);
    }
  };

  const handleTest = async (target: "owner" | "branch", branchId?: string, branchName?: string) => {
    const testKey = target === "owner" ? "owner" : branchId!;
    setTestingKey(testKey);
    try {
      await api.sendTelegramTest(target, branchId, branchName);
      toast.success(`✅ تم إرسال رسالة الاختبار بنجاح${branchName ? ` لـ ${branchName}` : " للـ Owner"}`);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "فشل إرسال رسالة الاختبار");
    } finally {
      setTestingKey(null);
    }
  };

  const tokenSaved = !!(telegramSettings && telegramSettings["telegram_bot_token"]);

  if (isLoading || telegramLoading) {
    return <div className="p-8 text-center text-ink/60">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-8">
      {/* ── Delivery Settings (unchanged) ── */}
      <div className="bg-white rounded-3xl shadow-sm ring-1 ring-black/5 overflow-hidden">
        <div className="p-6 lg:p-8 border-b border-black/5">
          <h2 className="text-xl lg:text-2xl font-bold text-ink">إعدادات الموقع</h2>
          <p className="text-sm text-ink/60 mt-1">إدارة الإعدادات العامة والرسائل</p>
        </div>

        <div className="p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-ink">رسالة التوصيل (لصفحة الدفع)</label>
              <textarea
                rows={3}
                value={formData.delivery_message}
                onChange={(e) => setFormData({ ...formData, delivery_message: e.target.value })}
                className="w-full bg-cream rounded-xl py-3 px-4 text-ink border border-black/5 focus:outline-none focus:ring-2 focus:ring-crimson/20"
                placeholder="مثال: رسوم التوصيل تُحدد بناءً على المسافة..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-ink">الحد الأدنى لرسوم التوصيل (اختياري)</label>
                <input
                  type="number"
                  min="0"
                  value={formData.delivery_fee_min}
                  onChange={(e) => setFormData({ ...formData, delivery_fee_min: e.target.value })}
                  className="w-full bg-cream rounded-xl py-3 px-4 text-ink border border-black/5 focus:outline-none focus:ring-2 focus:ring-crimson/20"
                  placeholder="مثال: 15"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-ink">الحد الأقصى لرسوم التوصيل (اختياري)</label>
                <input
                  type="number"
                  min="0"
                  value={formData.delivery_fee_max}
                  onChange={(e) => setFormData({ ...formData, delivery_fee_max: e.target.value })}
                  className="w-full bg-cream rounded-xl py-3 px-4 text-ink border border-black/5 focus:outline-none focus:ring-2 focus:ring-crimson/20"
                  placeholder="مثال: 50"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-3 bg-crimson hover:bg-crimson-deep text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {isSaving ? "جاري الحفظ..." : "حفظ الإعدادات"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ── Telegram Settings ── */}
      <div className="bg-white rounded-3xl shadow-sm ring-1 ring-black/5 overflow-hidden">
        <div className="p-6 lg:p-8 border-b border-black/5 flex items-center gap-3">
          <Bot className="h-6 w-6 text-blue-500 shrink-0" />
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-ink">إعدادات Telegram</h2>
            <p className="text-sm text-ink/60 mt-1">إعداد البوت وتحديد وجهات إرسال الأوردرات</p>
          </div>
        </div>

        <div className="p-6 lg:p-8 space-y-8 max-w-2xl">

          {/* Bot Token */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-ink">Bot Token</label>
            {tokenSaved && !tokenEditing ? (
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-green-50 border border-green-200 rounded-xl py-3 px-4 text-green-700 text-sm font-mono">
                  ••••••••••••••••••••••••••••••••••••••••
                </div>
                <span className="text-xs text-green-600 font-medium whitespace-nowrap">✅ محفوظ</span>
                <button
                  onClick={() => setTokenEditing(true)}
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-ink text-sm font-medium rounded-xl transition-colors whitespace-nowrap"
                >
                  تغيير
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type={showToken ? "text" : "password"}
                      value={tokenInput}
                      onChange={(e) => setTokenInput(e.target.value)}
                      placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
                      className="w-full bg-cream rounded-xl py-3 px-4 pr-12 text-ink border border-black/5 focus:outline-none focus:ring-2 focus:ring-blue-300 font-mono text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowToken(!showToken)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink/70"
                    >
                      {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <button
                    onClick={() => handleSaveTelegramKey("telegram_bot_token", tokenInput, "Bot Token")}
                    disabled={savingKey === "telegram_bot_token" || !tokenInput.trim()}
                    className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50 whitespace-nowrap flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    {savingKey === "telegram_bot_token" ? "جاري الحفظ..." : "حفظ"}
                  </button>
                  {tokenEditing && (
                    <button
                      onClick={() => { setTokenEditing(false); setTokenInput(""); }}
                      className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-ink text-sm font-medium rounded-xl transition-colors"
                    >
                      إلغاء
                    </button>
                  )}
                </div>
                <p className="text-xs text-ink/50">لا يُعرض Token بعد الحفظ لأسباب أمنية</p>
              </div>
            )}
          </div>

          <hr className="border-black/5" />

          {/* Owner Chat ID */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-ink">Owner Chat ID</label>
            <p className="text-xs text-ink/50">يستقبل الـ Owner كل الأوردرات بغض النظر عن الفرع</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={ownerChatId}
                onChange={(e) => setOwnerChatId(e.target.value)}
                placeholder="مثال: -100123456789"
                className="flex-1 bg-cream rounded-xl py-3 px-4 text-ink border border-black/5 focus:outline-none focus:ring-2 focus:ring-blue-300 font-mono text-sm"
              />
              <button
                onClick={() => handleSaveTelegramKey("telegram_owner_chat_id", ownerChatId, "Owner Chat ID")}
                disabled={savingKey === "telegram_owner_chat_id"}
                className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50 whitespace-nowrap flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {savingKey === "telegram_owner_chat_id" ? "..." : "حفظ"}
              </button>
              <button
                onClick={() => handleTest("owner")}
                disabled={testingKey === "owner" || !ownerChatId.trim()}
                title="إرسال رسالة اختبار للـ Owner"
                className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50 whitespace-nowrap flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                {testingKey === "owner" ? "..." : "اختبار"}
              </button>
            </div>
          </div>

          <hr className="border-black/5" />

          {/* Branch Chat IDs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-ink">Chat ID للفروع</label>
              <p className="text-xs text-ink/50 mt-1">كل فرع يستقبل أوردراته فقط</p>
            </div>

            {branches.length === 0 ? (
              <p className="text-sm text-ink/40 italic">لا توجد فروع. أضف فروعًا من صفحة الفروع أولًا.</p>
            ) : (
              <div className="space-y-4">
                {branches.map((branch) => {
                  const branchKey = `telegram_branch_${branch.id}_chat_id`;
                  const chatId = branchChatIds[branch.id] ?? "";
                  return (
                    <div key={branch.id} className="space-y-2">
                      <label className="block text-sm font-medium text-ink">
                        {branch.name}
                        {!branch.is_active && (
                          <span className="mr-2 text-xs text-gray-400">(غير نشط)</span>
                        )}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={chatId}
                          onChange={(e) =>
                            setBranchChatIds((prev) => ({ ...prev, [branch.id]: e.target.value }))
                          }
                          placeholder="مثال: -100987654321"
                          className="flex-1 bg-cream rounded-xl py-3 px-4 text-ink border border-black/5 focus:outline-none focus:ring-2 focus:ring-blue-300 font-mono text-sm"
                        />
                        <button
                          onClick={() => handleSaveTelegramKey(branchKey, chatId, branch.name)}
                          disabled={savingKey === branchKey}
                          className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50 whitespace-nowrap flex items-center gap-2"
                        >
                          <Save className="h-4 w-4" />
                          {savingKey === branchKey ? "..." : "حفظ"}
                        </button>
                        <button
                          onClick={() => handleTest("branch", branch.id, branch.name)}
                          disabled={testingKey === branch.id || !chatId.trim()}
                          title={`إرسال رسالة اختبار لجروب ${branch.name}`}
                          className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50 whitespace-nowrap flex items-center gap-2"
                        >
                          <Send className="h-4 w-4" />
                          {testingKey === branch.id ? "..." : "اختبار"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <hr className="border-black/5" />

          {/* Help Guide — collapsible */}
          <div className="rounded-2xl border border-blue-100 bg-blue-50 overflow-hidden">
            <button
              onClick={() => setGuideOpen(!guideOpen)}
              className="w-full flex items-center justify-between gap-3 p-4 text-right hover:bg-blue-100 transition-colors"
            >
              <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm">
                <HelpCircle className="h-5 w-5 shrink-0" />
                دليل الإعداد خطوة بخطوة
              </div>
              {guideOpen ? (
                <ChevronUp className="h-5 w-5 text-blue-400 shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 text-blue-400 shrink-0" />
              )}
            </button>

            {guideOpen && (
              <div className="p-5 space-y-6 text-sm text-ink border-t border-blue-100 leading-relaxed">

                <section className="space-y-2">
                  <h3 className="font-bold text-blue-800">الخطوة 1 — إنشاء Bot عبر @BotFather</h3>
                  <ol className="list-decimal list-inside space-y-1 text-ink/80">
                    <li>افتح Telegram وابحث عن <span className="font-mono bg-white px-1 rounded">@BotFather</span></li>
                    <li>أرسل له: <span className="font-mono bg-white px-1 rounded">/newbot</span></li>
                    <li>اختر اسمًا للبوت — مثال: <span className="italic">مطعم الشرقاوي</span></li>
                    <li>اختر username ينتهي بـ "bot" — مثال: <span className="font-mono bg-white px-1 rounded">sharkawy_orders_bot</span></li>
                    <li>ستحصل على <strong>Bot Token</strong> — انسخه والصقه في خانة "Bot Token" أعلاه</li>
                  </ol>
                  <p className="text-red-600 font-medium text-xs">⚠️ لا تشارك هذا الـ Token مع أحد — من يملكه يتحكم بالبوت بالكامل</p>
                </section>

                <section className="space-y-2">
                  <h3 className="font-bold text-blue-800">الخطوة 2 — إنشاء جروبات الموظفين</h3>
                  <ol className="list-decimal list-inside space-y-1 text-ink/80">
                    <li>أنشئ جروب جديد في Telegram باسم مثل: <span className="italic">طلبات فرع 1</span></li>
                    <li>أضف موظفي الفرع الأول للجروب</li>
                    <li>كرر نفس الخطوات لـ <span className="italic">طلبات فرع 2</span></li>
                  </ol>
                </section>

                <section className="space-y-2">
                  <h3 className="font-bold text-blue-800">الخطوة 3 — إضافة البوت للجروبات</h3>
                  <ol className="list-decimal list-inside space-y-1 text-ink/80">
                    <li>افتح جروب الفرع</li>
                    <li>اضغط على اسم الجروب ← أعضاء ← إضافة عضو</li>
                    <li>ابحث عن username البوت وأضفه</li>
                    <li>كرر لكل جروب</li>
                  </ol>
                  <p className="text-amber-700 font-medium text-xs">⚠️ البوت يحتاج فقط صلاحية "إرسال رسائل" — لا يحتاج Admin</p>
                  <p className="text-amber-700 text-xs">إذا لم تصل الرسائل، تحقق أن الجروب لا يمنع رسائل البوتات (إعدادات الجروب ← Permissions ← Messages)</p>
                </section>

                <section className="space-y-2">
                  <h3 className="font-bold text-blue-800">الخطوة 4 — الحصول على Chat ID للجروبات</h3>
                  <p className="text-ink/80">الطريقة الأسهل:</p>
                  <ol className="list-decimal list-inside space-y-1 text-ink/80">
                    <li>أضف <span className="font-mono bg-white px-1 rounded">@RawDataBot</span> للجروب مؤقتًا</li>
                    <li>أرسل أي رسالة في الجروب</li>
                    <li>سيرد بمعلومات تتضمن <strong>Chat ID</strong> — يبدأ بعلامة ناقص مثل: <span className="font-mono bg-white px-1 rounded">-1001234567890</span></li>
                    <li>احذف <span className="font-mono bg-white px-1 rounded">@RawDataBot</span> من الجروب بعدها</li>
                  </ol>
                </section>

                <section className="space-y-2">
                  <h3 className="font-bold text-blue-800">الخطوة 5 — الحصول على Owner Chat ID</h3>
                  <ol className="list-decimal list-inside space-y-1 text-ink/80">
                    <li>افتح محادثة خاصة مع البوت الذي أنشأته وأرسل له أي رسالة</li>
                    <li>افتح هذا الرابط في المتصفح مع استبدال <span className="font-mono bg-white px-1 rounded">TOKEN</span> بـ Bot Token:
                      <br /><span className="font-mono bg-white px-1 rounded text-xs break-all">https://api.telegram.org/botTOKEN/getUpdates</span>
                    </li>
                    <li>ابحث عن <span className="font-mono bg-white px-1 rounded">"from"</span> ← <span className="font-mono bg-white px-1 rounded">"id"</span> — هذا هو Chat ID الخاص بك</li>
                  </ol>
                </section>

                <section className="space-y-2">
                  <h3 className="font-bold text-blue-800">الخطوة 6 — إدخال القيم واختبارها</h3>
                  <ol className="list-decimal list-inside space-y-1 text-ink/80">
                    <li>احفظ Bot Token في الخانة المخصصة أعلاه</li>
                    <li>ادخل Owner Chat ID واضغط حفظ، ثم اضغط <strong>اختبار</strong> — تحقق أن الرسالة وصلت</li>
                    <li>ادخل Chat ID لكل فرع واضغط <strong>اختبار</strong> للتحقق</li>
                    <li>اطلب أوردر تجريبي من الموقع:
                      <ul className="list-disc list-inside mr-4 mt-1 space-y-1">
                        <li>فرع 1: يصل للجروب الخاص به + Owner ✅</li>
                        <li>فرع 2: يصل للجروبه الخاص به + Owner ✅</li>
                        <li>لا يصل أوردر فرع 1 لجروب فرع 2 ✅</li>
                      </ul>
                    </li>
                  </ol>
                </section>

                <section className="space-y-2 bg-red-50 rounded-xl p-4 border border-red-100">
                  <h3 className="font-bold text-red-700">أخطاء شائعة</h3>
                  <ul className="space-y-2 text-ink/80">
                    <li>
                      <span className="font-mono bg-white px-1 rounded text-xs">Forbidden: bot is not a member of the group</span>
                      <br /><span className="text-xs">← البوت لم يُضاف للجروب بعد</span>
                    </li>
                    <li>
                      <span className="font-mono bg-white px-1 rounded text-xs">Bad Request: chat not found</span>
                      <br /><span className="text-xs">← Chat ID خاطئ — تأكد من وجود علامة الناقص في البداية (-100...)</span>
                    </li>
                    <li>
                      <span className="text-xs">الرسائل لا تصل رغم إضافة البوت</span>
                      <br /><span className="text-xs">← تحقق من إعدادات الجروب: Permissions ← Messages ← يجب أن تكون مفعّلة</span>
                    </li>
                  </ul>
                </section>

              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
