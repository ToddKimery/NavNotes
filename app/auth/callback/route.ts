import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Supabase SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url)
  console.log('New URL requested: ', requestUrl)
  const code = requestUrl.searchParams.get('code')
  const page = requestUrl.searchParams.get('redirect')
  const origin = requestUrl.origin

  if (code) {
    const supabase = createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Correctly use the variable 'page' for the redirection URL
  // Check if 'page' is not null or provide a default route
  const redirectUrl = page ? `${origin}/${page}` : `${origin}/defaultPage`;

  // URL to redirect to after the sign-up process completes
  return NextResponse.redirect(redirectUrl);
}

