// 'use client'
// import { useEffect, useState } from 'react'
import Navbar from '@/components/navigation/Navbar'
import { createClient } from '@/utils/supabase/server'
import { LayoutStyled } from '@/components/containers/LayoutStyled'

export default async function LayoutContainer({ children }) {
  const supabase = createClient()
  const { data, error: userError } = await supabase.auth.getUser()

  if (userError) {
    console.error('getUser error in LayoutContainer: ', userError || null)
  }
  return (
    <LayoutStyled>
      <Navbar data={data} />
      {children}
    </LayoutStyled>
  )
}
