import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Main from '../components/Main'

const Container = styled.div`

`

export default function Home() {
    return (
        <Container>
            <Header></Header>
            <Main></Main>
        </Container>
    )
}