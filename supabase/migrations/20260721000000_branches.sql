CREATE TABLE IF NOT EXISTS public.branches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  phone text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to branches"
  ON public.branches FOR SELECT
  USING (true);

CREATE POLICY "Allow admin to manage branches"
  ON public.branches FOR ALL
  USING (auth.role() = 'authenticated');
