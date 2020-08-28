import React from 'react'
import styled from 'styled-components'

const HeaderWrapper = styled.div`
    height:8vh;
    background:#e0ecff;
    img{
        margin-left:50px;
        padding:5px;
    }
`
export default function Header(props) {
    return (
        <HeaderWrapper>
            <img src='/images/egolure-logo.png' alt='logo'></img>
        </HeaderWrapper>
    )
}