'use client'
import Navbar from '@/components/navigation/Navbar'
import styles from 'styled-components'

const LayoutStyled = styles.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default function LayoutContainer({ children }) {
  return (
    <LayoutStyled>
      <Navbar />
      {children}
    </LayoutStyled>
  )
}
