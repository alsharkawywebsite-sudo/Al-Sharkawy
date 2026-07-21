ALTER TABLE public.orders
ADD COLUMN branch_id uuid REFERENCES public.branches(id);
