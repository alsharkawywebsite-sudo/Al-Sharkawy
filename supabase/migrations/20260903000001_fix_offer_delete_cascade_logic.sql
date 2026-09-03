-- Fix: allow force-deleting offers by first nullifying offer_id in order_items
-- where the order_item also has a product_id (safe — item stays linked to product).
-- For items with ONLY offer_id (no product_id), delete the item row entirely
-- since it would violate the check constraint if offer_id became NULL.
--
-- We implement this as a BEFORE DELETE trigger on offers so the app-level
-- deleteOffer() call works without any extra steps.

CREATE OR REPLACE FUNCTION fn_before_delete_offer()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  -- 1. Items that have a product_id → just clear offer_id (item survives via product)
  UPDATE order_items
    SET offer_id = NULL
  WHERE offer_id = OLD.id
    AND product_id IS NOT NULL;

  -- 2. Items with ONLY offer_id → remove them entirely (no orphan rows)
  DELETE FROM order_items
  WHERE offer_id = OLD.id
    AND product_id IS NULL;

  RETURN OLD;
END;
$$;

DROP TRIGGER IF EXISTS trg_before_delete_offer ON offers;

CREATE TRIGGER trg_before_delete_offer
  BEFORE DELETE ON offers
  FOR EACH ROW
  EXECUTE FUNCTION fn_before_delete_offer();
