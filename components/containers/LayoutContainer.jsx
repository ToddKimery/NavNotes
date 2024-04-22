// 'use client'
// import { useEffect, useState } from 'react'
import Navbar from '@/components/navigation/Navbar'
import styled from 'styled-components'
import { supabase } from '@/utils/supabase/supabase'
import { LayoutStyled } from '@/components/containers/LayoutStyled'

export default async function LayoutContainer({ children }) {
  const { data, error: userError } = await supabase.auth.getUser()

  console.log('data: ', data)
  if (userError) {
    console.error('getUser error: ', userError || null)
  }
  console.log('data from LayoutContainer: ', data)
  return (
    <LayoutStyled>
      <Navbar data={data} />
      {children}
    </LayoutStyled>
  )
}
