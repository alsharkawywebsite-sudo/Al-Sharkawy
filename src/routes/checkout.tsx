import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, CheckCircle2, ClipboardList, Loader2 } from "lucide-react";
import heroGrill from "@/assets/hero-grill.webp";
import { useCart } from "@/store/cart";
import { createOrder } from "@/services/api";
import { notifyNewOrder } from "@/lib/notify-order.functions";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

const arabicDigits = "٠١٢٣٤٥٦٧٨٩";
function toArabicDigits(n: number): string {
  return Math.round(n)
    .toString()
    .replace(/\d/g, (d) => arabicDigits[Number(d)]);
}

const DELIVERY_FEE = 35;

function CheckoutHero() {
  return (
    <section className="relative isolate overflow-hidden pt-24 pb-12 bg-charcoal">
      <div className="absolute inset-0 -z-10">
        <img src={heroGrill} alt="" className="h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-linear-to-t from-charcoal via-charcoal/80 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-white/10 backdrop-blur-md mb-6 ring-1 ring-white/20">
          <ClipboardList className="h-8 w-8 text-amber-glow" />
        </div>
        <h1 className="font-display text-3xl font-semibold text-alabaster sm:text-4xl drop-shadow-xl">
          إتمام <span className="text-amber-glow">الطلب</span>
        </h1>
      </div>
    </section>
  );
}

function OrderSuccess({ orderId }: { orderId: string }) {
  return (
    <section className="mx-auto max-w-lg px-4 py-20 sm:px-6 flex flex-col items-center text-center">
      <div className="h-24 w-24 rounded-full bg-emerald-50 grid place-items-center mb-6 ring-1 ring-emerald-100">
        <CheckCircle2 className="h-12 w-12 text-emerald-600" />
      </div>
      <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink mb-3">تم إرسال الطلب</h2>
      <p className="text-sm text-ink/60 max-w-sm mb-2">
        استلمنا طلبك بنجاح. هنتواصل معاك قريب لتأكيد التوصيل.
      </p>
      <p className="text-xs text-ink/40 mb-8 font-mono dir-ltr">#{orderId.slice(0, 8)}</p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 rounded-full bg-crimson px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-crimson-deep shadow-md hover:shadow-elevated active:scale-95"
        >
          الرجوع للمنيو
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-8 py-3 text-sm font-semibold text-ink transition-all hover:bg-cream active:scale-95"
        >
          الرئيسية
        </Link>
      </div>
    </section>
  );
}

function CheckoutForm() {
  const navigate = useNavigate();
  const { items, subtotal, clear } = useCart();
  const total = subtotal + (items.length > 0 ? DELIVERY_FEE : 0);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedOrderId, setSubmittedOrderId] = useState<string | null>(null);

  if (submittedOrderId) {
    return <OrderSuccess orderId={submittedOrderId} />;
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 flex flex-col items-center text-center">
        <h2 className="font-display text-2xl font-semibold text-ink mb-2">سلتك فارغة</h2>
        <p className="text-sm text-ink/60 max-w-sm mb-8">أضف أطباق من المنيو قبل إتمام الطلب.</p>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 rounded-full bg-crimson px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-crimson-deep shadow-md hover:shadow-elevated active:scale-95"
        >
          تصفح المنيو
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedAddress = address.trim();

    if (!trimmedName || !trimmedPhone || !trimmedAddress) {
      toast.error("يرجى إدخال الاسم والهاتف والعنوان");
      return;
    }
    if (trimmedPhone.replace(/\D/g, "").length < 10) {
      toast.error("رقم الهاتف غير صحيح");
      return;
    }

    setSubmitting(true);
    try {
      const customer = {
        name: trimmedName,
        phone: trimmedPhone,
        address: trimmedAddress,
        notes: notes.trim() || undefined,
      };
      const orderItems = items.map((item) => ({
        productId: item.productId,
        sizeId: item.sizeId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        title: item.title,
        sizeName: item.sizeName,
      }));
      const order = await createOrder({
        customer,
        items: orderItems,
        subtotal,
        deliveryFee: DELIVERY_FEE,
      });

      // Fire-and-forget: must not delay or break checkout UX.
      void notifyNewOrder({
        data: {
          orderId: order.id,
          customer,
          items: items.map((item) => ({
            title: item.title,
            sizeName: item.sizeName,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
          subtotal,
          deliveryFee: DELIVERY_FEE,
          finalTotal: subtotal + DELIVERY_FEE,
        },
      }).catch((err) => {
        console.error("[telegram] notify call failed:", err);
      });

      clear();
      setSubmittedOrderId(order.id);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : err && typeof err === "object" && "message" in err && typeof (err as any).message === "string"
            ? (err as { message: string }).message
            : "تعذر إرسال الطلب";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="mb-6">
        <button
          type="button"
          onClick={() => navigate({ to: "/cart" })}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink/60 hover:text-crimson transition-colors"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          الرجوع للسلة
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink mb-1">بيانات التوصيل</h2>
            <p className="text-sm text-ink/50">أدخل بياناتك عشان نقدر نوصللك الطلب.</p>
          </div>

          <div className="rounded-3xl bg-white p-5 sm:p-6 shadow-card ring-1 ring-black/5 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="checkout-name">الاسم بالكامل</Label>
              <Input
                id="checkout-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثال: أحمد محمد"
                required
                autoComplete="name"
                className="h-11 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkout-phone">رقم الهاتف</Label>
              <Input
                id="checkout-phone"
                type="tel"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01xxxxxxxxx"
                required
                autoComplete="tel"
                className="h-11 rounded-xl dir-ltr text-right"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkout-address">عنوان التوصيل</Label>
              <Textarea
                id="checkout-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="المنطقة، الشارع، رقم العمارة، الدور..."
                required
                rows={3}
                className="rounded-xl min-h-[88px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkout-notes">ملاحظات (اختياري)</Label>
              <Textarea
                id="checkout-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="مثال: بدون بصل، كلم قبل الوصول..."
                rows={2}
                className="rounded-xl"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="sticky top-24 rounded-3xl bg-white p-6 shadow-card ring-1 ring-black/5">
            <h2 className="font-display text-lg font-semibold text-ink mb-4">ملخص الطلب</h2>

            <ul className="space-y-3 mb-5 max-h-48 overflow-y-auto">
              {items.map((item) => (
                <li key={item.key} className="flex justify-between gap-3 text-sm">
                  <span className="text-ink/80">
                    {item.title}
                    {item.sizeName ? ` (${item.sizeName})` : ""} × {toArabicDigits(item.quantity)}
                  </span>
                  <span className="font-display font-semibold text-ink shrink-0">
                    {toArabicDigits(item.unitPrice * item.quantity)} ج.م
                  </span>
                </li>
              ))}
            </ul>

            <div className="space-y-3 text-sm font-medium border-t border-black/5 pt-4">
              <div className="flex justify-between items-center text-ink/80">
                <span>المجموع الفرعي</span>
                <div className="font-display font-semibold text-ink">
                  {toArabicDigits(subtotal)} <span className="text-[10px] text-ink/70">ج.م</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-ink/80">
                <span>رسوم التوصيل</span>
                <div className="font-display font-semibold text-ink">
                  {toArabicDigits(DELIVERY_FEE)} <span className="text-[10px] text-ink/70">ج.م</span>
                </div>
              </div>
            </div>

            <hr className="my-5 border-black/5" />

            <div className="flex justify-between items-end mb-6">
              <span className="text-base font-semibold text-ink">الإجمالي</span>
              <div className="text-right font-display font-semibold text-crimson">
                <span className="text-3xl">{toArabicDigits(total)}</span>
                <span className="mr-1 text-sm font-semibold text-crimson/70">ج.م</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-crimson py-3.5 text-sm font-semibold text-white transition-all hover:bg-crimson-deep shadow-md hover:shadow-elevated active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:active:scale-100"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  جاري الإرسال...
                </>
              ) : (
                <>
                  تأكيد وإرسال الطلب
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

function CheckoutPage() {
  return (
    <main className="min-h-screen bg-alabaster flex flex-col">
      <Nav isDarkHero />
      <CheckoutHero />
      <div className="flex-1">
        <CheckoutForm />
      </div>
      <Footer />
    </main>
  );
}
