import { useQuery } from "@tanstack/react-query";
import {
  getCategories,
  getFeaturedProducts,
  getMenuCategories,
  getMenuItems,
  getOffers,
  getOfferById,
  getProductById,
  getBranches,
  getActiveBranches,
  getTelegramSettings,
} from "@/services/api";

const FIVE_MINUTES = 5 * 60 * 1000;

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: FIVE_MINUTES,
  });
}

export function useMenuCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (data) =>
      data.map((c) => ({
        id: c.id,
        slug: c.slug,
        name: c.name,
      })),
    staleTime: FIVE_MINUTES,
  });
}

export function useMenuItems() {
  return useQuery({
    queryKey: ["menuItems"],
    queryFn: getMenuItems,
    staleTime: FIVE_MINUTES,
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ["featuredProducts"],
    queryFn: getFeaturedProducts,
    staleTime: FIVE_MINUTES,
  });
}

export function useOffers() {
  return useQuery({
    queryKey: ["offers"],
    queryFn: getOffers,
    staleTime: FIVE_MINUTES,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    staleTime: FIVE_MINUTES,
    enabled: Boolean(id),
  });
}

export function useOffer(id: string) {
  return useQuery({
    queryKey: ["offer", id],
    queryFn: () => getOfferById(id),
    staleTime: FIVE_MINUTES,
    enabled: Boolean(id),
  });
}

export function useSiteSettings() {
  return useQuery({
    queryKey: ["siteSettings"],
    queryFn: () => import("@/services/api").then((m) => m.getSiteSettings()),
    staleTime: FIVE_MINUTES,
  });
}

export function useBranches() {
  return useQuery({
    queryKey: ["branches"],
    queryFn: getBranches,
    staleTime: FIVE_MINUTES,
  });
}

export function useActiveBranches() {
  return useQuery({
    queryKey: ["activeBranches"],
    queryFn: getActiveBranches,
    staleTime: FIVE_MINUTES,
  });
}

export function useTelegramSettings() {
  return useQuery({
    queryKey: ["telegramSettings"],
    queryFn: getTelegramSettings,
    // Short stale time — admin settings should stay current.
    staleTime: 30 * 1000,
  });
}