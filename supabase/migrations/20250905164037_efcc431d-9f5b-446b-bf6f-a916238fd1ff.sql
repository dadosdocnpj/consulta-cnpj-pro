-- Fix security vulnerability: Ensure only filtered data is stored in public cache
-- 1. Create a trigger to automatically filter sensitive data when inserting into public cache
CREATE OR REPLACE FUNCTION public.auto_filter_public_cnpj_data()
RETURNS TRIGGER AS $$
BEGIN
  -- Apply the existing filter function to ensure only safe data is stored
  NEW.json_data = public.filter_sensitive_cnpj_data(NEW.json_data);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 2. Create trigger for INSERT operations
DROP TRIGGER IF EXISTS auto_filter_cnpj_public_insert ON public.cnpj_public_cache;
CREATE TRIGGER auto_filter_cnpj_public_insert
  BEFORE INSERT ON public.cnpj_public_cache
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_filter_public_cnpj_data();

-- 3. Create trigger for UPDATE operations
DROP TRIGGER IF EXISTS auto_filter_cnpj_public_update ON public.cnpj_public_cache;
CREATE TRIGGER auto_filter_cnpj_public_update
  BEFORE UPDATE ON public.cnpj_public_cache
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_filter_public_cnpj_data();

-- 4. Clean existing data to remove sensitive information
UPDATE public.cnpj_public_cache 
SET json_data = public.filter_sensitive_cnpj_data(json_data)
WHERE json_data IS NOT NULL;

-- 5. Add data classification comments for compliance
COMMENT ON TABLE public.cnpj_public_cache IS 'Public company data cache - contains only filtered, non-sensitive business information suitable for public access';
COMMENT ON COLUMN public.cnpj_public_cache.json_data IS 'Filtered company data - sensitive information like detailed addresses, phone numbers, and financial data removed for privacy protection';