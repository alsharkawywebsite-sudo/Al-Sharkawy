CREATE TABLE IF NOT EXISTS telegram_settings (
  key text PRIMARY KEY,
  value text,
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE telegram_settings ENABLE ROW LEVEL SECURITY;

-- No public read access (unlike site_settings).
-- Only authenticated admins can read or write.
CREATE POLICY "Admin only read" ON telegram_settings
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admin only write" ON telegram_settings
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
