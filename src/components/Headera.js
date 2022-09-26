import React from 'react'
import styled from 'styled-components'

function Headera() {
  return (
    <Nav>
        <Logo src="\images\logo.png"/>
    </Nav>
  )
}

export default Headera

const Nav = styled.nav`
    height: 60px;
    background:#083474;
    display: flex;
    align-items: center;
    padding: 0 36px;
    overflow-x: hidden;
`
const Logo = styled.img`
    width: 130px;
`

