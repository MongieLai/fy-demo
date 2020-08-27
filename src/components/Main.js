import React from 'react'
import styled from 'styled-components'
import Sidebar from './Main/Sidebar'
import Content from './Main/Content'
const MainWrapper = styled.div`
    height:92vh;
    border-top:1px solid #d7d7d7;
    display:flex;

`
export default function Header(props) {
    return (
        <MainWrapper>
            <Sidebar />
            <Content />
        </MainWrapper>
    )
}