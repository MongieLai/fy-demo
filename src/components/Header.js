import React from 'react'
import styled from 'styled-components'

const HeaderWrapper = styled.div`
    height:100%;
    background:#e0ecff;
    img{
        margin-left:50px;
        padding:5px;
    }
`
export default class Header extends React.Component {
    render() {
        return (
            <HeaderWrapper>
                <img src='/images/egolure-logo.png' alt='logo'></img>
            </HeaderWrapper >
        )
    }
}