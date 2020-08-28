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
    // useEffect(() => {
    //     setTimeout(() => {
    //         const menuNode = document.querySelectorAll('.tree-node')[0]
    //         menuNode.classList.add('tree-node-selected')
    //     }, 0)
    // })
    return (
        <SidebarWrapper>
            {/* <div id="cc" claaName="easyui-layout" style={{ width: "600px", height: "400px" }}>
                <div data-options="region:'north',title:'North Title',split:true" style={{ height: "100px" }}></div>
                <div data-options="region:'south',title:'South Title',split:true" style={{ height: "100px" }}></div>
                <div data-options="region:'east',title:'East',split:true" style={{ width: "100px" }}></div>
                <div data-options="region:'west',title:'West',split:true" style={{ width: "100px" }}></div>
                <div data-options="region:'center',title:'center title'" style={{ padding: "5px", background: "#eee" }}></div>
            </div> */}
            <One></One>
        </SidebarWrapper >

    )
}