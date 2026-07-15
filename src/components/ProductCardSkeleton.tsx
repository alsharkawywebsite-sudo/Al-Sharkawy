import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const bone = "bg-black/10";

/** Gray pulsing skeleton matching storefront product card dimensions. */
export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5",
        className,
      )}
      aria-hidden
    >
      <Skeleton className={cn("aspect-square w-full rounded-none", bone)} />
      <div className="flex flex-1 flex-col gap-2 p-2.5 sm:p-3">
        <Skeleton className={cn("h-4 w-3/4", bone)} />
        <Skeleton className={cn("h-3 w-full", bone)} />
        <Skeleton className={cn("h-3 w-2/3", bone)} />
        <div className="mt-3 flex items-center justify-between sm:mt-4">
          <Skeleton className={cn("h-6 w-16", bone)} />
          <Skeleton className={cn("h-8 w-8 rounded-full", bone)} />
        </div>
      </div>
    </article>
  );
}

export function ProductCardSkeletonGrid({
  count = 8,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("grid grid-cols-2 gap-2.5 sm:gap-5 md:grid-cols-4", className)}
      role="status"
      aria-label="جاري التحميل"
    >
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Category tile skeleton (square image + label band). */
export function CategoryCardSkeleton() {
  return (
    <div
      className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5"
      aria-hidden
    >
      <div className="aspect-square w-full bg-white p-1.5 sm:p-2.5">
        <Skeleton className={cn("h-full w-full rounded-2xl", bone)} />
      </div>
      <div className="flex items-center justify-center bg-cream px-2 py-2.5 sm:py-4">
        <Skeleton className={cn("h-3 w-16 sm:h-4 sm:w-20", bone)} />
      </div>
    </div>
  );
}

export function CategoryCardSkeletonGrid({
  count = 6,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("grid grid-cols-3 gap-2.5 sm:gap-4 md:grid-cols-6", className)}
      role="status"
      aria-label="جاري التحميل"
    >
      {Array.from({ length: count }, (_, i) => (
        <CategoryCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Product detail page skeleton (image + details). */
export function ProductDetailSkeleton() {
  return (
    <div
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-16 pt-24"
      role="status"
      aria-label="جاري التحميل"
    >
      <Skeleton className={cn("mb-8 h-10 w-24 rounded-full", bone)} />
      <div className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2 md:items-start lg:gap-16">
        <Skeleton className={cn("aspect-square w-full rounded-3xl", bone)} />
        <div className="flex flex-col gap-4">
          <Skeleton className={cn("h-8 w-3/4 sm:h-10", bone)} />
          <Skeleton className={cn("h-4 w-full", bone)} />
          <Skeleton className={cn("h-4 w-5/6", bone)} />
          <Skeleton className={cn("mt-2 h-8 w-28", bone)} />
          <div className="mt-4 flex gap-2">
            <Skeleton className={cn("h-10 w-20 rounded-full", bone)} />
            <Skeleton className={cn("h-10 w-20 rounded-full", bone)} />
          </div>
          <div className="mt-8 flex items-center gap-4">
            <Skeleton className={cn("h-12 w-32 rounded-full sm:h-14", bone)} />
            <Skeleton className={cn("h-12 flex-1 rounded-full sm:h-14", bone)} />
          </div>
        </div>
      </div>
    </div>
  );
}
