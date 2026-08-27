-- Performance indexes for the public storefront queries.
--
-- 1) Public menu / featured products run:
--      SELECT ... FROM products WHERE is_active = true ORDER BY created_at DESC
--    A composite index on (is_active, created_at DESC) lets Postgres serve
--    both the filter and the sort directly from the index.
CREATE INDEX IF NOT EXISTS idx_products_is_active_created_at
  ON public.products (is_active, created_at DESC);

-- 2) Embedded product_sizes(*) joins resolve via product_id.
--    Postgres does NOT auto-index foreign keys, so add it explicitly.
CREATE INDEX IF NOT EXISTS idx_product_sizes_product_id
  ON public.product_sizes (product_id);
