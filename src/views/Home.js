import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Main from '../components/Main'
import Assist from '../components/Home/Assist'

const HomeWrapper = styled.div`
    height:100%;
`

export default class Home extends React.Component {

    render() {
        return (
            <HomeWrapper>
                <Main></Main>
                <Assist />
            </HomeWrapper>
        )
    }
}