import { createFileRoute, useRouter, Link } from "@tanstack/react-router";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Heart, ShoppingCart, ArrowRight, Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useOffer } from "@/hooks/useData";
import { useCart } from "@/store/cart";
import { useFavorites } from "@/store/favorites";

export const Route = createFileRoute("/offer/$id")({
  component: OfferDetailPage,
});

function OfferDetailPage() {
  const router = useRouter();
  const { id } = Route.useParams();
  const { data: offer, isLoading, isError, error } = useOffer(id);
  const { addItem } = useCart();
  const { isFavorite, toggle } = useFavorites();

  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const sizes = useMemo(
    () => (offer?.offer_sizes ?? []).filter((s) => s.is_active !== false),
    [offer],
  );
  const activeSize = useMemo(
    () => (selectedSizeId ? sizes.find((s) => s.id === selectedSizeId) : sizes[0]) ?? null,
    [selectedSizeId, sizes],
  );

  if (isLoading) {
    return (
      <main className="min-h-screen bg-alabaster flex flex-col">
        <Nav />
        <div className="flex-1 grid place-items-center py-32 text-ink/60">جاري التحميل...</div>
        <Footer />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-alabaster flex flex-col">
        <Nav />
        <div className="flex-1 grid place-items-center py-32 text-center px-4">
          <div>
            <h1 className="font-display text-2xl font-semibold text-ink mb-2">
              تعذّر تحميل العرض
            </h1>
            <p className="text-sm text-ink/60">
              {(error as Error)?.message ?? "حدث خطأ غير متوقع."}
            </p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!offer) {
    return (
      <main className="min-h-screen bg-alabaster flex flex-col">
        <Nav />
        <div className="flex-1 grid place-items-center py-32 text-center px-4">
          <div>
            <h1 className="font-display text-2xl font-semibold text-ink mb-2">
              العرض غير موجود
            </h1>
            <Link to="/offers" className="text-crimson text-sm hover:underline">
              العودة للعروض
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // السعر: لو فيه حجم مختار ياخد سعره، غير كده ياخد new_price
  const basePrice = Number(offer.new_price ?? offer.discount_value ?? 0);
  const unitPrice = activeSize ? Number(activeSize.price) : basePrice;
  const originalPrice = offer.old_price != null ? Number(offer.old_price) : null;
  const hasDiscount = originalPrice != null && originalPrice > unitPrice;
  const favorite = isFavorite(offer.id);

  const handleAdd = () => {
    // order_items.product_id must reference products — never use offer.id.
    // offer_sizes are not product_sizes; omit size FK to avoid 409 conflicts.
    const linkedProductId = offer.product_id ?? null;
    addItem({
      key: activeSize ? `offer:${offer.id}:${activeSize.id}` : `offer:${offer.id}`,
      productId: linkedProductId ?? `offer:${offer.id}`,
      sizeId: null,
      sizeName: activeSize?.name ?? null,
      title: offer.title,
      description: offer.description,
      imageUrl: offer.image_url,
      unitPrice,
      quantity,
    });
    toast.success("تمت الإضافة إلى السلة");
  };

  const discountBadge =
    offer.discount_value != null
      ? offer.discount_type === "percentage"
        ? `خصم ${offer.discount_value}%`
        : `خصم ${offer.discount_value} ج.م`
      : null;

  return (
    <main className="min-h-screen bg-alabaster flex flex-col">
      <Nav />

      <div className="flex-1 py-8 sm:py-16 pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <button
            onClick={() => router.history.back()}
            className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-crimson mb-6 sm:mb-8 transition-colors"
          >
            <ArrowRight className="h-4 w-4" />
            العودة
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-cream shadow-sm ring-1 ring-black/5">
              <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-start pointer-events-none">
                <div className="flex gap-2 flex-wrap">
                  {discountBadge && (
                    <div className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-crimson/95 py-1 px-3 shadow-md backdrop-blur-sm">
                      <span className="text-xs font-semibold text-white">{discountBadge}</span>
                    </div>
                  )}
                  {offer.savings && (
                    <div className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-amber-glow/95 py-1 px-3 shadow-md backdrop-blur-sm">
                      <span className="text-xs font-semibold text-white">{offer.savings}</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => toggle(offer.id)}
                  aria-label="أضف للمفضلة"
                  aria-pressed={favorite}
                  className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full bg-white/95 text-ink/60 shadow-md backdrop-blur-sm transition-colors hover:text-crimson"
                >
                  <Heart
                    className={`h-5 w-5 transition-colors ${favorite ? "fill-crimson text-crimson animate-heart-pop" : ""}`}
                  />
                </button>
              </div>

              {offer.image_url && (
                <img
                  src={offer.image_url}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="flex flex-col">
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink mb-3 leading-tight">
                {offer.title}
              </h1>

              {offer.expires_in && (
                <div className="text-sm font-medium text-amber-600 mb-4">
                  ⏳ {offer.expires_in}
                </div>
              )}

              <div className="flex flex-col mb-6">
                {hasDiscount && (
                  <span className="text-sm sm:text-base text-ink/50 line-through leading-none mb-1">
                    {originalPrice} ج.م
                  </span>
                )}
                <div className="text-2xl sm:text-3xl font-display font-bold text-crimson flex items-baseline gap-1.5">
                  {unitPrice}
                  <span className="text-sm sm:text-base font-semibold text-crimson/70">ج.م</span>
                </div>
              </div>

              {offer.description && (
                <p className="text-base sm:text-lg text-ink/70 leading-relaxed mb-8">
                  {offer.description}
                </p>
              )}

              {sizes.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-sm font-semibold text-ink mb-3">اختر الحجم:</h2>
                  <div className="grid grid-cols-3 gap-3">
                    {sizes.map((size) => (
                      <button
                        key={size.id}
                        onClick={() => setSelectedSizeId(size.id)}
                        className={`py-3 px-4 rounded-xl border text-sm sm:text-base font-medium transition-all duration-200 ${
                          activeSize?.id === size.id
                            ? "border-crimson bg-crimson/5 text-crimson shadow-sm"
                            : "border-black/10 bg-white text-ink/70 hover:border-black/20 hover:bg-black/[0.02]"
                        }`}
                      >
                        <div>{size.name}</div>
                        <div className="text-xs opacity-70 mt-0.5">{size.price} ج.م</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 mt-auto">
                <div className="flex items-center justify-between bg-white border border-black/10 rounded-full h-12 sm:h-14 w-32 px-1 shadow-sm">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="grid place-items-center w-10 h-10 rounded-full hover:bg-black/5 text-ink/70 transition-colors"
                    aria-label="إنقاص"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="font-semibold text-ink text-base">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="grid place-items-center w-10 h-10 rounded-full hover:bg-black/5 text-ink/70 transition-colors"
                    aria-label="زيادة"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 flex items-center justify-center gap-2 h-12 sm:h-14 rounded-full bg-crimson hover:bg-crimson-deep text-white font-semibold text-base sm:text-lg shadow-elevated transition-all active:scale-[0.98]"
                >
                  <ShoppingCart className="h-5 w-5" />
                  أضف إلى السلة
                  <span className="font-normal opacity-80 mr-1 hidden sm:inline">
                    ({unitPrice * quantity} ج.م)
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
