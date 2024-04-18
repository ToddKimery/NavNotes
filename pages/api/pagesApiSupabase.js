// utils/supabase/server.ts
import { createClient } from '@supabase/supabase-js'

// import { createClient } from '@/utils/supabase/server'

export function createSupabase(req) {
  const cookie = req?.headers.cookie
  const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } =
    process.env
  const supabase = createClient(
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY,

    {
      headers: req
        ? {
            cookie: req.headers.cookie,
            referrer: 'http://localhost:3000/',
            userAgent:
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0',
            client: 'supabase-ssr/0.3.0',
          }
        : {},
    }
  )

  return supabase
}
