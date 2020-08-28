import React from 'react'
import styled from 'styled-components'
import { Layout, LayoutPanel, Tree } from 'rc-easyui'
const SidebarWrapper = styled.div`
    height:100%;
    width:200px;
    .accordion{
        border-color: #d7d7d7;
    }
`

const initialState = [

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

// const sideChange = ({ text }) => {
//     const routerMap = {
//         "微信用户信息": () => {
//             console.log('我被执行了')
//         }
//     }
//     routerMap.hasOwnProperty(text) && routerMap[text]()
// }

export default function Header(props) {
    // const [state, setstate] = useState(initialState)
    // useEffect(() => {
    //     setTimeout(() => {
    //         const menuNode = document.querySelectorAll('.tree-node')[0]
    //         menuNode.classList.add('tree-node-selected')
    //     }, 0)
    // }, [])
    return (
        <SidebarWrapper>
            <Layout style={{ width: '100%', height: '100%' }}>
                <LayoutPanel region="west" title="菜单" split={true} style={{ minWidth: "100%", maxWidth: "100%" }}>
                    <Tree data={initialState}></Tree>
                </LayoutPanel>
            </Layout>
            {/* <SideMenu style={{ width: `100%`, height: "100%" }}
                data={state}
                onSelectionChange={(selection) => sideChange(selection)}
            /> */}
        </SidebarWrapper >
    )
}