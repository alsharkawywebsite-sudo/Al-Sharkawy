-- Fix: allow deleting a product that has associated order_items
-- ---------------------------------------------------------------
-- Problem:
--   When a product is deleted, PostgreSQL tries to set product_id = NULL
--   in any order_items rows that reference it (via ON DELETE SET NULL).
--   But if that order_item has no offer_id either, it violates the check
--   constraint: order_items_product_or_offer_check
--   (which requires product_id IS NOT NULL OR offer_id IS NOT NULL).
--
-- Solution (mirrors the same pattern used for offers in migration _000001):
--   Add a BEFORE DELETE trigger on `products` that:
--     1. order_items that have BOTH product_id AND offer_id
--        → just NULL out product_id (row survives, still linked to offer)
--     2. order_items that have ONLY product_id (offer_id IS NULL)
--        → delete the row entirely (no orphan / no constraint violation)
--
-- This trigger runs before the FK cascade, so no constraint is ever violated.
-- Zero existing data is modified outside of what the delete itself would cause.

CREATE OR REPLACE FUNCTION fn_before_delete_product()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  -- 1. Items linked to BOTH a product and an offer → keep them, just clear product_id
  UPDATE order_items
    SET product_id = NULL
  WHERE product_id = OLD.id
    AND offer_id IS NOT NULL;

  -- 2. Items linked to this product ONLY → remove them entirely
  DELETE FROM order_items
  WHERE product_id = OLD.id
    AND offer_id IS NULL;

  RETURN OLD;
END;
$$;

DROP TRIGGER IF EXISTS trg_before_delete_product ON products;

CREATE TRIGGER trg_before_delete_product
  BEFORE DELETE ON products
  FOR EACH ROW
  EXECUTE FUNCTION fn_before_delete_product();
