import React from 'react'
import styled from 'styled-components'
import Sidebar from './Sidebar'
import AfterSale from './Home/AfterSale'
const MainWrapper = styled.div`
    border:1px solid red;
`
export default class Header extends React.Component {
    render() {
        return (
            <AfterSale />
        )
    }

}