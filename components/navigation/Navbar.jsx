// 'use client'
import styled from 'styled-components'
import Link from 'next/link'

const NavbarStyled = styled.div`
  width: 100vw;
  height: 50px;
  background-color: #8758ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin: 3rem auto; */
  padding: 1rem;
`
const LogoStyled = styled.div`
  display: flex;
  background: #4328b9;
  width: 45px;
  height: 45px;
  margin-left: 10px;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  border-radius: 3px;
`

const LoginStyled = styled.button`
  width: 70px;
  height: 30px;
  background: #4328b9;
  margin-right: 2rem;
  border-radius: 3px;
`

const Navbar = () => {
  return (
    <NavbarStyled>
      <LogoStyled> N </LogoStyled>
      <div>middle</div>
      <LoginStyled>
        <Link href={'/login'}>Login</Link>
      </LoginStyled>
    </NavbarStyled>
  )
}

export default Navbar
