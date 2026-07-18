-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_sizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Categories
CREATE POLICY "Enable read access for all users" ON categories 
  FOR SELECT USING (true);
CREATE POLICY "Enable full access for authenticated users only" ON categories 
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Products
CREATE POLICY "Enable read access for all users" ON products 
  FOR SELECT USING (true);
CREATE POLICY "Enable full access for authenticated users only" ON products 
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Product Sizes
CREATE POLICY "Enable read access for all users" ON product_sizes 
  FOR SELECT USING (true);
CREATE POLICY "Enable full access for authenticated users only" ON product_sizes 
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Offers
CREATE POLICY "Enable read access for all users" ON offers 
  FOR SELECT USING (true);
CREATE POLICY "Enable full access for authenticated users only" ON offers 
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Orders
-- Client inserts via Edge Function (Service Role), so no public insert policy is needed.
-- Admin dashboard reads/manages them using authenticated session.
CREATE POLICY "Enable full access for authenticated users only" ON orders 
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Order Items
-- Inserted via Edge Function. Admin dashboard reads/manages them.
CREATE POLICY "Enable full access for authenticated users only" ON order_items 
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
