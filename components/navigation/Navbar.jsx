// 'use client'
// import styled from 'styled-components'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import Header from '@/components/Header'
import { createClient } from '@/utils/supabase/server'
import {
  NavBarStyled,
  LogoStyled,
  LoginStyled,
} from '@/components/navigation/NavbarStyled'

export default async function Navbar() {
  'use server'
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  // console.log('user: ', user)

  const signOut = async () => {
    'use server'
    const supabase = createClient()
    const { data } = await supabase.auth.signOut()
    const user = data?.user
    return redirect('/login')
  }
  // console.log('data: ', user)
  // const user = data.session.user
  // console.log('data: ', data.session.user)
  return (
    <NavBarStyled>
      <LogoStyled> N </LogoStyled>
      <div>middle</div>
      <LoginStyled>
        {!user ? (
          <Link href={'/login'}>Login</Link>
        ) : (
          <form action={signOut}>
            <button>Logout</button>
          </form>
        )}
      </LoginStyled>
    </NavBarStyled>
  )
}
