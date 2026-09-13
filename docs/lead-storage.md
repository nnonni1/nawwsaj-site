# Lead storage setup

The website stores leads and their business event atomically in Supabase Postgres.

1. Create or select a Supabase project.
2. Open **SQL Editor** and run `supabase/leads.sql` once.
3. Add these server-only environment variables locally and in Vercel: `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
4. Redeploy after adding the Vercel variables.

Never expose `SUPABASE_SERVICE_ROLE_KEY` through a `NEXT_PUBLIC_` variable. View leads in Supabase Table Editor under `public.leads`; events are in `public.business_events`.
