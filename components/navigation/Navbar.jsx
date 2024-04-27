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
import { clearNotesFromIDB } from '@/utils/idb'



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
  await supabase.auth.signOut()

  // Clear the IndexedDB NotesDB
 try {
  'use client'
    await clearNotesFromIDB()
  } catch (error) { console.error('Error clearing IDB: ', error) }

  return redirect('/')
  }

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
