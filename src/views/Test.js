import React, { useState, useEffect, useReducer } from 'react'
import styled from 'styled-components'
import Ajax from '../api/ajax'

const Container = styled.div`

`
const init = {
    name: ''
}
function reducer(state, action) {

    console.log(action)
    switch (action.type) {
        case "gengxin":
            return { ...state, ...action.xx }
        case 'reset':
            return init
        default:
            throw new Error('????')
    }
}

export default function Test() {
    const [company, setCompany] = useState([])
    console.log(company)
    useEffect(() => {
        Ajax('/getCompany').then((response) => {
            setCompany(response)
        })
    }, [])

    const [data, dispatch] = useReducer(reducer, init)
    return (
        <Container>
            <button onClick={() => { dispatch({ type: 'reset' }) }}>????</button>
            <input value={data.name} onChange={(e) => { dispatch({ type: 'gengxin', xx: { name: e.target.value } }) }}></input>
        </Container>
    )
}