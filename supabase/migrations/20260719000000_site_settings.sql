CREATE TABLE IF NOT EXISTS site_settings (
  key text PRIMARY KEY,
  value text,
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON site_settings 
  FOR SELECT USING (true);

CREATE POLICY "Enable full access for authenticated users only" ON site_settings 
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Insert initial settings
INSERT INTO site_settings (key, value) VALUES
  ('delivery_message', 'نرجو الانتباه إلى أن رسوم التوصيل تُحدد بناءً على مسافة التوصيل وسيتم تأكيدها عند التواصل معكم لتأكيد الطلب.'),
  ('delivery_fee_min', '15'),
  ('delivery_fee_max', '50')
ON CONFLICT (key) DO NOTHING;
