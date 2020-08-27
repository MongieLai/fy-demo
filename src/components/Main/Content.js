import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { SideMenu, LinkButton } from 'rc-easyui'
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

const initialState = [
    {
        text: "菜单",
        state: "open",
        children: [
            {
                text: "微信用户信息"
            },
            {
                text: "售后服务申请单"
            },
            {
                text: "售后历史进度查询"
            },
            {
                text: "客户信息"
            },
            {
                text: "项目信息管理"
            },
            {
                text: "用户"
            },
            {
                text: "角色"
            },
            {
                text: "用户角色"
            }
        ]
    },
]

const sideChange = ({ text }) => {
    const routerMap = {
        "微信用户信息": () => {
            console.log('我被执行了')
        }
    }
    routerMap.hasOwnProperty(text) && routerMap[text]()
}

export default function Header(props) {
    const [state, setstate] = useState(initialState)
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