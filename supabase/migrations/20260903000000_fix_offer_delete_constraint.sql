-- Fix: change offer_id FK from ON DELETE SET NULL → ON DELETE RESTRICT
-- -----------------------------------------------------------------------
-- Problem: when an offer without a linked product_id is deleted, the FK
--   sets offer_id to NULL, but product_id is also NULL → violates
--   the order_items_product_or_offer_check constraint.
-- Solution: prevent deleting an offer that still has associated order_items.
--   The admin UI will show a friendly Arabic error in this case.

ALTER TABLE order_items DROP CONSTRAINT IF EXISTS order_items_offer_id_fkey;

ALTER TABLE order_items
  ADD CONSTRAINT order_items_offer_id_fkey
  FOREIGN KEY (offer_id)
  REFERENCES offers(id)
  ON DELETE RESTRICT;
