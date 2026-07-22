import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ShoppingCart, Heart } from "lucide-react";
import { toast } from "sonner";
import { useOffers } from "@/hooks/useData";
import { useCart } from "@/store/cart";
import { useFavorites } from "@/store/favorites";
import type { Offer } from "@/types";
import { ProductCardSkeletonGrid } from "@/components/ProductCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/offers")({
  component: OffersPage,
});

function offerPrice(offer: Offer): number {
  return Number(offer.new_price ?? offer.discount_value ?? 0);
}

function OffersPage() {
  const { data: offers, isLoading, isError } = useOffers();
  const { addItem } = useCart();
  const { isFavorite, toggle } = useFavorites();

  if (isLoading) {
    return (
      <main className="min-h-screen bg-alabaster flex flex-col">
        <Nav />
        <div className="flex-1 bg-alabaster pb-20 pt-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Skeleton className="mb-5 mx-auto h-7 w-40 bg-black/10" />
            <div className="mb-12 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
              <div className="flex flex-col md:flex-row">
                <Skeleton className="aspect-[4/3] w-full rounded-none bg-black/10 md:aspect-square md:w-1/2 lg:aspect-[4/3] lg:w-[40%]" />
                <div className="flex flex-1 flex-col gap-3 p-4 sm:p-6 md:p-8">
                  <Skeleton className="h-7 w-3/4 bg-black/10" />
                  <Skeleton className="h-4 w-full bg-black/10" />
                  <Skeleton className="h-4 w-5/6 bg-black/10" />
                  <div className="mt-auto flex items-end justify-between border-t border-black/5 pt-4">
                    <Skeleton className="h-10 w-28 bg-black/10" />
                    <Skeleton className="h-11 w-32 rounded-full bg-black/10" />
                  </div>
                </div>
              </div>
            </div>
            <ProductCardSkeletonGrid
              count={4}
              className="grid grid-cols-2 gap-2.5 sm:gap-5 md:grid-cols-3 lg:grid-cols-4"
            />
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-alabaster flex flex-col">
        <Nav />
        <div className="flex-1 grid place-items-center py-20 text-ink/60">تعذّر تحميل العروض.</div>
        <Footer />
      </main>
    );
  }

  const safeOffers = offers ?? [];

  if (safeOffers.length === 0) {
    return (
      <main className="min-h-screen bg-alabaster flex flex-col">
        <Nav />
        <div className="flex-1 grid place-items-center py-20 text-ink/60">
          لا توجد عروض متاحة حالياً.
        </div>
        <Footer />
      </main>
    );
  }

  const featuredOffer = safeOffers.find((offer) => offer.is_featured) ?? safeOffers[0];
  const regularOffers = safeOffers.filter((offer) => offer.id !== featuredOffer.id);

  const addOfferToCart = (offer: Offer) => {
    // Never fall back to offer.id — order_items.product_id FK targets products only.
    const linkedProductId = offer.product_id ?? null;
    addItem({
      key: `offer:${offer.id}`,
      productId: linkedProductId ?? `offer:${offer.id}`,
      offerId: offer.id,
      sizeId: null,
      sizeName: null,
      title: offer.title,
      description: offer.description,
      imageUrl: offer.image_url,
      unitPrice: offerPrice(offer),
      quantity: 1,
    });
    toast.success("تمت الإضافة إلى السلة");
  };

  const discountLabel = (offer: Offer) => {
    if (offer.discount_value == null) return "";
    return offer.discount_type === "percentage"
      ? `${offer.discount_value}%`
      : `${offer.discount_value} ج.م`;
  };

  return (
    <main className="min-h-screen bg-alabaster flex flex-col">
      <Nav />

      <div className="flex-1 bg-alabaster pb-20 pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Featured Offer */}
          <section className="mb-12 scroll-mt-32">
            <h2 className="mb-5 font-display text-xl sm:text-2xl font-bold text-ink flex items-center gap-3">
              <span className="h-px flex-1 bg-gradient-to-l from-black/5 to-transparent" />
              العرض المميز
              <span className="h-px flex-1 bg-gradient-to-r from-black/5 to-transparent" />
            </h2>

            <article className="group relative flex flex-col md:flex-row overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated">
              <div className="pointer-events-none absolute inset-x-2 top-2 sm:inset-x-3 sm:top-3 md:inset-x-auto md:right-0 md:left-auto md:w-1/2 lg:w-[40%] md:px-3 z-10 flex items-start justify-between">
                <div className="flex gap-1 flex-wrap">
                  {featuredOffer.discount_value != null && (
                    <div className="pointer-events-auto flex items-center gap-1 rounded-full bg-crimson/95 py-1 px-3 shadow-sm">
                      <span className="text-[10px] sm:text-xs font-semibold text-white">
                        خصم {discountLabel(featuredOffer)}
                      </span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => toggle(featuredOffer.id)}
                  aria-label="أضف للمفضلة"
                  aria-pressed={isFavorite(featuredOffer.id)}
                  className="pointer-events-auto grid h-8 w-8 place-items-center rounded-full bg-white/95 text-ink/60 shadow-sm transition-colors hover:text-crimson"
                >
                  <Heart
                    className={`h-4 w-4 ${isFavorite(featuredOffer.id) ? "fill-crimson text-crimson" : ""}`}
                  />
                </button>
              </div>

              <Link
                to="/offer/$id"
                params={{ id: featuredOffer.id }}
                className="block relative w-full md:w-1/2 lg:w-[40%] aspect-[4/3] md:aspect-square lg:aspect-[4/3] overflow-hidden bg-cream shrink-0 group-hover/article:opacity-95"
              >
                {featuredOffer.image_url && (
                  <img
                    src={featuredOffer.image_url}
                    alt={featuredOffer.title}
                    loading="lazy"
                    className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${!featuredOffer.is_active ? "grayscale" : ""}`}
                  />
                )}
                {!featuredOffer.is_active && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                    <div className="rounded-full bg-white/95 px-4 py-2 text-xs sm:text-sm font-bold text-ink shadow-lg text-center mx-4">
                      العرض ده خلص.. استناه لما يرجع! ⏳
                    </div>
                  </div>
                )}
              </Link>

              <div className="flex flex-1 flex-col p-4 sm:p-6 md:p-8 justify-center">
                <div className="flex-1">
                  <Link
                    to="/offer/$id"
                    params={{ id: featuredOffer.id }}
                    className="hover:text-crimson transition-colors"
                  >
                    <h3 className="font-display text-lg sm:text-2xl font-semibold text-ink mb-2 leading-snug">
                      {featuredOffer.title}
                    </h3>
                  </Link>

                  {featuredOffer.expires_in && (
                    <div className="text-[11px] sm:text-sm font-medium text-amber-600 mb-3">
                      ⏳ {featuredOffer.expires_in}
                    </div>
                  )}

                  {featuredOffer.description && (
                    <p className="text-[13px] sm:text-base text-ink/60 leading-relaxed mb-4">
                      {featuredOffer.description}
                    </p>
                  )}

                  {featuredOffer.savings && (
                    <div className="inline-block rounded-md bg-amber-glow/10 px-2.5 py-1 text-[11px] sm:text-sm font-medium text-amber-700">
                      {featuredOffer.savings}
                    </div>
                  )}
                </div>

                <div className="mt-6 flex items-end justify-between border-t border-black/5 pt-4">
                  <div className="flex flex-col text-right">
                    {featuredOffer.old_price != null && (
                      <span className="text-[11px] sm:text-sm text-ink/50 line-through mb-1">
                        {featuredOffer.old_price} ج.م
                      </span>
                    )}
                    <div className="font-display font-bold text-crimson leading-none">
                      <span className="text-2xl sm:text-4xl">{offerPrice(featuredOffer)}</span>
                      <span className="mr-1 text-xs sm:text-sm font-semibold text-crimson/70">
                        ج.م
                      </span>
                    </div>
                  </div>

                  {featuredOffer.is_active ? (
                    <button
                      onClick={() => addOfferToCart(featuredOffer)}
                      aria-label="أضف للسلة"
                      className="flex items-center gap-1.5 rounded-full px-4 py-2 sm:px-6 sm:py-3 shadow-md transition-all bg-crimson text-alabaster hover:bg-crimson-deep hover:shadow-elevated active:scale-95"
                    >
                      <span className="text-xs sm:text-sm font-semibold">أضف للسلة</span>
                      <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  ) : (
                    <div className="flex items-center justify-center rounded-full px-4 py-2 sm:px-6 sm:py-3 border border-dashed border-gray-300 text-gray-500 bg-gray-50/50">
                      <span className="text-xs sm:text-sm font-medium">موقوف مؤقتاً</span>
                    </div>
                  )}
                </div>
              </div>
            </article>
          </section>

          {regularOffers.length > 0 && (
            <section className="scroll-mt-32">
              <h2 className="mb-5 font-display text-xl sm:text-2xl font-bold text-ink flex items-center gap-3">
                <span className="h-px flex-1 bg-gradient-to-l from-black/5 to-transparent" />
                المزيد من العروض
                <span className="h-px flex-1 bg-gradient-to-r from-black/5 to-transparent" />
              </h2>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
                {regularOffers.map((offer) => (
                  <article
                    key={offer.id}
                    className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
                  >
                    <div className="pointer-events-none absolute inset-x-1.5 top-1.5 sm:inset-x-2 sm:top-2 z-10 flex items-start justify-between">
                      <div className="flex gap-1 flex-wrap">
                        {offer.discount_value != null && (
                          <div className="pointer-events-auto flex items-center gap-1 rounded-full bg-white/95 py-0.5 px-2 sm:py-1 sm:px-2.5 shadow-sm">
                            <span className="text-[9px] sm:text-[10px] font-semibold text-ink">
                              خصم {discountLabel(offer)}
                            </span>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => toggle(offer.id)}
                        aria-label="أضف للمفضلة"
                        aria-pressed={isFavorite(offer.id)}
                        className="pointer-events-auto grid h-6 w-6 sm:h-7 sm:w-7 place-items-center rounded-full bg-white/95 text-ink/60 shadow-sm transition-colors hover:text-crimson"
                      >
                        <Heart
                          className={`h-3 w-3 sm:h-4 sm:w-4 ${isFavorite(offer.id) ? "fill-crimson text-crimson" : ""}`}
                        />
                      </button>
                    </div>

                    <Link
                      to="/offer/$id"
                      params={{ id: offer.id }}
                      className="block relative aspect-square w-full shrink-0 overflow-hidden bg-cream group-hover/item:opacity-95"
                    >
                      {offer.image_url && (
                        <img
                          src={offer.image_url}
                          alt={offer.title}
                          loading="lazy"
                          className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${!offer.is_active ? "grayscale" : ""}`}
                        />
                      )}
                      {!offer.is_active && (
                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                          <div className="rounded-xl bg-white/95 px-2 py-1.5 text-[10px] sm:text-[11px] font-bold text-ink shadow-lg text-center leading-tight mx-2">
                            العرض ده خلص..<br />استناه لما يرجع! ⏳
                          </div>
                        </div>
                      )}
                    </Link>

                    <div className="flex flex-1 flex-col p-2.5 sm:p-3">
                      <div className="flex-1">
                        <Link
                          to="/offer/$id"
                          params={{ id: offer.id }}
                          className="hover:text-crimson transition-colors"
                        >
                          <h3 className="font-display text-[12px] sm:text-base font-semibold text-ink mb-1 leading-snug">
                            {offer.title}
                          </h3>
                        </Link>

                        {offer.expires_in && (
                          <div className="text-[9px] sm:text-[10px] font-medium text-amber-600 mb-1.5">
                            ⏳ {offer.expires_in}
                          </div>
                        )}

                        {offer.description && (
                          <p className="text-[11px] sm:text-xs text-ink/60 line-clamp-1 leading-relaxed">
                            {offer.description}
                          </p>
                        )}
                      </div>

                      {offer.savings && (
                        <div className="mt-2 inline-block rounded-md bg-amber-glow/10 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-medium text-amber-700 self-start">
                          {offer.savings}
                        </div>
                      )}

                      <div className="mt-3 flex items-end justify-between border-t border-black/5 pt-2 sm:pt-3">
                        <div className="flex flex-col text-right">
                          {offer.old_price != null && (
                            <span className="text-[10px] sm:text-[11px] text-ink/50 line-through leading-none mb-1">
                              {offer.old_price} ج.م
                            </span>
                          )}
                          <div className="font-display font-bold text-crimson leading-none">
                            <span className="text-base sm:text-xl">{offerPrice(offer)}</span>
                            <span className="mr-1 text-[10px] sm:text-xs font-semibold text-crimson/70">
                              ج.م
                            </span>
                          </div>
                        </div>

                        {offer.is_active ? (
                          <button
                            onClick={() => addOfferToCart(offer)}
                            aria-label="أضف للسلة"
                            className="flex items-center gap-1.5 rounded-full px-2 py-1.5 sm:px-4 sm:py-2 shadow-md transition-all bg-crimson text-alabaster hover:bg-crimson-deep hover:shadow-elevated active:scale-95"
                          >
                            <span className="text-[10px] sm:text-xs font-semibold hidden sm:inline">أضف</span>
                            <ShoppingCart className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          </button>
                        ) : (
                          <div className="flex items-center justify-center rounded-full px-2 py-1.5 sm:px-4 sm:py-2 border border-dashed border-gray-300 text-gray-500 bg-gray-50/50">
                            <span className="text-[10px] sm:text-[11px] font-medium">موقوف</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}