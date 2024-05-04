import Navbar from '@/components/navigation/Navbar'
import { createClient } from '@/utils/supabase/server'
import { LayoutStyled } from '@/components/containers/LayoutStyled'
import { Suspense } from 'react'

export default async function LayoutContainer({ children }) {
  const supabase = createClient()
  const { data, error: userError } = await supabase.auth.getUser()

  if (userError) {
    console.error('getUser error in LayoutContainer: ', userError || null)
  }
  return (
    <LayoutStyled>
      <Suspense fallback={<div>Suspenseful</div>} >
      <Navbar data={data} />
      {children}
      </Suspense>
    </LayoutStyled>
  )
}
