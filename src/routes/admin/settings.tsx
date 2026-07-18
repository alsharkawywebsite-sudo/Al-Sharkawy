import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useSiteSettings } from "@/hooks/useData";
import { api } from "@/services/api";
import { toast } from "sonner";
import { Save } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  const { data: settings, isLoading, refetch } = useSiteSettings();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    delivery_message: "",
    delivery_fee_min: "",
    delivery_fee_max: "",
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        delivery_message: settings.delivery_message || "",
        delivery_fee_min: settings.delivery_fee_min || "",
        delivery_fee_max: settings.delivery_fee_max || "",
      });
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.updateSiteSetting("delivery_message", formData.delivery_message);
      await api.updateSiteSetting("delivery_fee_min", formData.delivery_fee_min);
      await api.updateSiteSetting("delivery_fee_max", formData.delivery_fee_max);
      toast.success("تم حفظ الإعدادات بنجاح");
      await refetch();
    } catch (err: any) {
      toast.error(err.message || "حدث خطأ أثناء حفظ الإعدادات");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-ink/60">جاري التحميل...</div>;
  }

  return (
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
  );
}
