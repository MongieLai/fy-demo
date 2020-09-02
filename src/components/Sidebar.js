import React from 'react'
import styled from 'styled-components'
import { SideMenu, LinkButton, Tree } from 'rc-easyui'
import { NavLink, HashRouter as Router, withRouter } from 'react-router-dom'
const SidebarWrapper = styled.div`
    height:100%;
    ul{
        li{
            padding:8px 16px;
            cursor:pointer;
            &:hover{
                background:#eaf2ff;
            }
        }
        a{
            color:#333;
            &.active{
                background:red;
                li{
                    background:#ffeebc;
                }
            }
        }
    }
`

const NavWrapper = styled.div`
    height:100%;
`

const routeMap = [
    { path: '/home', text: '售后服务申请单' },
    { path: '/xxx', text: '微信用户信息' },
    { path: '/aaa', text: '售后历史进度查询' },
    { path: '/sss', text: '客户信息' },
    { path: '/ddd', text: '项目信息管理' },
    { path: '/fff', text: '用户' },
    { path: '/ggg', text: '角色' },
    { path: '/hhh', text: '用户角色' },
]

export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selection: null,
            menus:
                [
                    {
                        text: "Item1",
                        iconCls: "icon-sum",
                        state: "open",
                        children: [
                            {
                                text: "Option1"
                            },
                            {
                                text: "Option2"
                            },
                            {
                                text: "Option3",
                            }
                        ]
                    }
                ],
            collapsed: false,
        }
    }
    render() {
        return (
            <SidebarWrapper>
                {/* <Tree data={initialState}></Tree> */}
                <NavWrapper>
                    <Router>
                        {/* <SideMenu
                            handleItemClick={(selection) => console.log(selection)}
                            componentDidMount={(e) => { console.log(e) }}
                            data={this.state.menus}
                            collapsed={this.state.collapsed}
                        /> */}
                        <ul>
                            {routeMap.map((route, index) => {
                                return (
                                    <NavLink key={index} to={route.path} activeClassName='active'>
                                        <li >
                                            {route.text}
                                        </li>
                                    </NavLink>
                                )
                            })}
                        </ul>
                    </Router>
                </NavWrapper>
            </SidebarWrapper >
        )
    }
}