-- 1. السماح بحفظ عناصر بدون product_id (للعروض المستقلة)
ALTER TABLE order_items ALTER COLUMN product_id DROP NOT NULL;

-- 2. إضافة عمود offer_id عشان نعرف الآيتم ده تبع انهي عرض
ALTER TABLE order_items ADD COLUMN offer_id UUID REFERENCES offers(id) ON DELETE SET NULL;

-- 3. قيد أمان: الآيتم لازم يكون مربوط يا إما بمنتج يا إما بعرض (عشان ميبقاش صف عايم)
ALTER TABLE order_items ADD CONSTRAINT order_items_product_or_offer_check 
  CHECK (product_id IS NOT NULL OR offer_id IS NOT NULL);
