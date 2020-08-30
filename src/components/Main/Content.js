import React from 'react'
import styled from 'styled-components'
import One from './One'
const SidebarWrapper = styled.div`
    height:100%;
    flex-grow:1;
    padding:5px;
    background-color:#eeeeee;
    .accordion{
        border-color: #d7d7d7;
    }
`

export default function Header(props) {
    return (
        <SidebarWrapper>
            <One></One>
        </SidebarWrapper >

    )
}