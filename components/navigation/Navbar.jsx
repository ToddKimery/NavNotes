import Link from 'next/link'
import { redirect } from 'next/navigation'
import Header from '@/components/Header'
import { createClient } from '@/utils/supabase/server'
import {
  NavBarStyled,
  LogoStyled,
  LoginStyled,
} from '@/components/navigation/NavbarStyled'
import { signOut } from '@/utils/general'



export default async function Navbar() {
  'use server'
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  // console.log('user: ', user)


  return (
    <NavBarStyled>
      <LogoStyled> N </LogoStyled>
      <div>middle</div>
      <LoginStyled>
        {!user ? (
          <Link href={'/login'}>Login</Link>
        ) : (
          <form action={signOut}>
            <div>Logout</div>
          </form>
        )}
      </LoginStyled>
    </NavBarStyled>
  )
}
