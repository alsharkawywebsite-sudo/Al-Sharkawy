import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useSiteSettings, useTelegramSettings } from "@/hooks/useData";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { toast } from "sonner";
import { Save, Send, Eye, EyeOff, Bot } from "lucide-react";

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
    <div className="space-y-6 sm:space-y-8">
      {/* ── Delivery Settings ── */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm ring-1 ring-black/5 overflow-hidden">
        <div className="p-4 sm:p-6 lg:p-8 border-b border-black/5">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-ink">إعدادات الموقع</h2>
          <p className="text-xs sm:text-sm text-ink/60 mt-1">إدارة الإعدادات العامة والرسائل</p>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-ink">رسالة التوصيل (لصفحة الدفع)</label>
              <textarea
                rows={3}
                value={formData.delivery_message}
                onChange={(e) => setFormData({ ...formData, delivery_message: e.target.value })}
                className="w-full bg-cream rounded-xl py-3 px-4 text-ink border border-black/5 focus:outline-none focus:ring-2 focus:ring-crimson/20 text-sm"
                placeholder="مثال: رسوم التوصيل تُحدد بناءً على المسافة..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-ink">الحد الأدنى لرسوم التوصيل (اختياري)</label>
                <input
                  type="number"
                  min="0"
                  value={formData.delivery_fee_min}
                  onChange={(e) => setFormData({ ...formData, delivery_fee_min: e.target.value })}
                  className="w-full bg-cream rounded-xl py-3 px-4 text-ink border border-black/5 focus:outline-none focus:ring-2 focus:ring-crimson/20 text-sm"
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
                  className="w-full bg-cream rounded-xl py-3 px-4 text-ink border border-black/5 focus:outline-none focus:ring-2 focus:ring-crimson/20 text-sm"
                  placeholder="مثال: 50"
                />
              </div>
            </div>

            <div className="pt-2 sm:pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-crimson hover:bg-crimson-deep text-white font-semibold rounded-xl transition-colors disabled:opacity-50 text-sm"
              >
                <Save className="h-4 w-4" />
                {isSaving ? "جاري الحفظ..." : "حفظ الإعدادات"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ── Telegram Settings ── */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm ring-1 ring-black/5 overflow-hidden">
        <div className="p-4 sm:p-6 lg:p-8 border-b border-black/5 flex items-center gap-3">
          <Bot className="h-5 sm:h-6 w-5 sm:w-6 text-blue-500 shrink-0" />
          <div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-ink">إعدادات Telegram</h2>
            <p className="text-xs sm:text-sm text-ink/60 mt-1">إعداد البوت وتحديد وجهات إرسال الأوردرات</p>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-2xl">

          {/* Bot Token */}
          <div className="space-y-2 sm:space-y-3">
            <label className="block text-sm font-semibold text-ink">Bot Token</label>
            {tokenSaved && !tokenEditing ? (
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
                <div className="flex-1 bg-green-50 border border-green-200 rounded-xl py-3 px-4 text-green-700 text-sm font-mono truncate">
                  ••••••••••••••••••••••••••••••••••••••••
                </div>
                <div className="flex items-center justify-between sm:justify-start gap-3 shrink-0">
                  <span className="text-xs text-green-600 font-medium">✅ محفوظ</span>
                  <button
                    onClick={() => setTokenEditing(true)}
                    className="px-4 py-2 sm:py-3 bg-gray-100 hover:bg-gray-200 text-ink text-sm font-medium rounded-xl transition-colors"
                  >
                    تغيير
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1 min-w-0">
                    <input
                      type={showToken ? "text" : "password"}
                      value={tokenInput}
                      onChange={(e) => setTokenInput(e.target.value)}
                      placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
                      className="w-full bg-cream rounded-xl py-3 px-4 pr-11 text-ink border border-black/5 focus:outline-none focus:ring-2 focus:ring-blue-300 font-mono text-xs sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowToken(!showToken)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink/70 p-1"
                    >
                      {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => handleSaveTelegramKey("telegram_bot_token", tokenInput, "Bot Token")}
                      disabled={savingKey === "telegram_bot_token" || !tokenInput.trim()}
                      className="flex-1 sm:flex-initial px-4 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      {savingKey === "telegram_bot_token" ? "..." : "حفظ"}
                    </button>
                    {tokenEditing && (
                      <button
                        onClick={() => { setTokenEditing(false); setTokenInput(""); }}
                        className="px-4 py-2.5 sm:py-3 bg-gray-100 hover:bg-gray-200 text-ink text-sm font-medium rounded-xl transition-colors"
                      >
                        إلغاء
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-xs text-ink/50">لا يُعرض Token بعد الحفظ لأسباب أمنية</p>
              </div>
            )}
          </div>

          <hr className="border-black/5" />

          {/* Owner Chat ID */}
          <div className="space-y-2 sm:space-y-3">
            <label className="block text-sm font-semibold text-ink">Owner Chat ID</label>
            <p className="text-xs text-ink/50">يستقبل الـ Owner كل الأوردرات بغض النظر عن الفرع</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={ownerChatId}
                onChange={(e) => setOwnerChatId(e.target.value)}
                placeholder="مثال: 8615813305"
                className="w-full sm:flex-1 bg-cream rounded-xl py-3 px-4 text-ink border border-black/5 focus:outline-none focus:ring-2 focus:ring-blue-300 font-mono text-sm min-w-0"
              />
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleSaveTelegramKey("telegram_owner_chat_id", ownerChatId, "Owner Chat ID")}
                  disabled={savingKey === "telegram_owner_chat_id"}
                  className="flex-1 sm:flex-initial px-4 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {savingKey === "telegram_owner_chat_id" ? "..." : "حفظ"}
                </button>
                <button
                  onClick={() => handleTest("owner")}
                  disabled={testingKey === "owner" || !ownerChatId.trim()}
                  title="إرسال رسالة اختبار للـ Owner"
                  className="flex-1 sm:flex-initial px-4 py-2.5 sm:py-3 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  {testingKey === "owner" ? "..." : "اختبار"}
                </button>
              </div>
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
                    <div key={branch.id} className="space-y-1.5">
                      <label className="block text-sm font-medium text-ink">
                        {branch.name}
                        {!branch.is_active && (
                          <span className="mr-2 text-xs text-gray-400">(غير نشط)</span>
                        )}
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={chatId}
                          onChange={(e) =>
                            setBranchChatIds((prev) => ({ ...prev, [branch.id]: e.target.value }))
                          }
                          placeholder="مثال: -1001234567890"
                          className="w-full sm:flex-1 bg-cream rounded-xl py-3 px-4 text-ink border border-black/5 focus:outline-none focus:ring-2 focus:ring-blue-300 font-mono text-sm min-w-0"
                        />
                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => handleSaveTelegramKey(branchKey, chatId, branch.name)}
                            disabled={savingKey === branchKey}
                            className="flex-1 sm:flex-initial px-4 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                          >
                            <Save className="h-4 w-4" />
                            {savingKey === branchKey ? "..." : "حفظ"}
                          </button>
                          <button
                            onClick={() => handleTest("branch", branch.id, branch.name)}
                            disabled={testingKey === branch.id || !chatId.trim()}
                            title={`إرسال رسالة اختبار لجروب ${branch.name}`}
                            className="flex-1 sm:flex-initial px-4 py-2.5 sm:py-3 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                          >
                            <Send className="h-4 w-4" />
                            {testingKey === branch.id ? "..." : "اختبار"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
