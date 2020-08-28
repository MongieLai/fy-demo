import React, { useEffect, useState, useRef } from 'react';
import { Tabs, LinkButton, TabPanel, ComboBox } from 'rc-easyui';
import { TextBox } from 'rc-easyui';
import { ComboGrid, Panel, Pagination, Messager, DataGrid, Dialog, GridColumn, CheckBox } from 'rc-easyui';
import styled from 'styled-components'
import Ajax from '../../api/ajax'
const ActionsBar = styled.div`
    display:flex;
    padding:4px 8px;
    align-items:center;
    >*:not(:last-child){
        margin-right:20px;
    }
`

const Yyy = styled.div`
    height:100%;

    display:flex;
    flex-direction:column;
    >div:nth-child(2){
        flex-grow:1;
    }
    
`

const AddProjectWrapper = styled.div`
    >div{
        display:flex;
        justify-content:center;
        align-items:center;
        padding:5px;
        >div{
            text-align:right;
            min-width:90px;
        }
    }
`

const Xxx = styled.div`
 overflow-x:auto;
`

// const addItme = () => {
//     dlg.open()
// }

const eventStates = [
    { value: "所有", text: "所有" },
    { value: "已完成", text: "已完成" },
    { value: "已指派", text: "已指派" },
    { value: "已评价", text: "已评价" },
    { value: "处理中", text: "处理中" },
    { value: "待处理", text: "待处理" }
]

const addProjectFroms = {
    type: "",
    company: ''
}

const queryDatas = {
    companyName: ""
}

function App2(props) {
    console.log('1')
    const [companys, setCompanys] = useState([])
    const [afterSaleInfo, setAfterSaleInfo] = useState([])
    const [checkBoxState, setCheckBoxState] = useState({
        allChecked: false,
        rowClicked: false
    })

    const [queryData, setQueryData] = useState(queryDatas)
    const [test2, setTest2] = useState({ value: '' })

    const [test, setTest] = useState({
        value: ["EST-10", "EST-12"],
        data: [
            { "code": "FI-SW-01", "name": "Koi", "unitcost": 10.00, "status": "P", "listprice": 36.50, "attr": "Large", "itemid": "EST-1" },
            { "code": "K9-DL-01", "name": "Dalmation", "unitcost": 12.00, "status": "P", "listprice": 18.50, "attr": "Spotted Adult Female", "itemid": "EST-10" },
            { "code": "RP-SN-01", "name": "Rattlesnake", "unitcost": 12.00, "status": "P", "listprice": 38.50, "attr": "Venomless", "itemid": "EST-11" },
            { "code": "RP-SN-01", "name": "Rattlesnake", "unitcost": 12.00, "status": "P", "listprice": 26.50, "attr": "Rattleless", "itemid": "EST-12" },
            { "code": "RP-LI-02", "name": "Iguana", "unitcost": 12.00, "status": "P", "listprice": 35.50, "attr": "Green Adult", "itemid": "EST-13" },
            { "code": "FL-DSH-01", "name": "Manx", "unitcost": 12.00, "status": "P", "listprice": 158.50, "attr": "Tailless", "itemid": "EST-14" },
            { "code": "FL-DSH-01", "name": "Manx", "unitcost": 12.00, "status": "P", "listprice": 83.50, "attr": "With tail", "itemid": "EST-15" },
            { "code": "FL-DLH-02", "name": "Persian", "unitcost": 12.00, "status": "P", "listprice": 23.50, "attr": "Adult Female", "itemid": "EST-16" },
            { "code": "FL-DLH-02", "name": "Persian", "unitcost": 12.00, "status": "P", "listprice": 89.50, "attr": "Adult Male", "itemid": "EST-17" },
            { "code": "AV-CB-01", "name": "Amazon Parrot", "unitcost": 92.00, "status": "P", "listprice": 63.50, "attr": "Adult Male", "itemid": "EST-18" }
        ]
    })
    const [addProjectFrom, setAddProjectFrom] = useState(addProjectFroms)

    let addProjectRef = useRef(null)
    let addProjectRef2 = useRef(null)
    let message = useRef(null)
    const [state] = useState({
        allChecked: false,
        rowClicked: false,
        position: "top",
        positions: [
            { value: "top", text: "Top" },
            { value: "bottom", text: "Bottom" },
            { value: "left", text: "Left" },
            { value: "right", text: "Right" }
        ],
        value: null,
    })
    const [q, setQ] = useState({
        total: companys.length,
        pageNumber: 1,
        pageSize: 10,
        layout1: [
            "list",
            "sep",
            "first",
            "prev",
            "next",
            "last",
            "sep",
            "refresh",
            "info"
        ],
        layout2: ["first", "prev", "next", "last", "info"],
        layout3: ["links", "info"]
    })
    const { total, pageNumber, pageSize } = q;
    console.log(`total`)
    console.log(total)

    const pager = (layout) => (
        <Pagination
            pageList={[10]}
            total={total}
            pageNumber={pageNumber}
            pageSize={pageSize}
            layout={layout}
            displayMsg={`共${total}条数据`}
            onPageChange={event => console.log(event)}
        />
    );
    useEffect(() => {
        Ajax('/getCompanys').then((response) => {
            setCompanys(response)
            console.log(response)
        })
        Ajax('/getAfterSaleInfo').then((response) => {
            setAfterSaleInfo(response)
            setQ({ ...q, total: response.length })
            console.log(response)
        })
    }, [])

    const handleRowCheck = (row, checked) => {

    }


    const handleAllCheck = (checked) => {

    }

    const submitProject = () => {
        const submitData = {
            companyName: addProjectFrom.companyName,
            type: addProjectFrom.type
        }
        addProjectRef.close()
        setAfterSaleInfo([...afterSaleInfo, { status: '待处理', type: submitData.type, companyName: submitData.companyName }])
        console.log(`afterSaleInfo.length`)
        console.log(afterSaleInfo.length)
        setQ({ ...q, total: afterSaleInfo.length })
    }

    const querySubmit = () => {
        let tempArr = []
        let { companyName } = queryData
        if (!companyName) {
            setAfterSaleInfo([...afterSaleInfo])
        } else if (companyName) {
            afterSaleInfo.map((item) => {
                if (item.companyName === companyName) {
                    tempArr.push(item)
                }
            })
            setAfterSaleInfo(tempArr)
            setQ({ ...q, total: tempArr.length })
        }
    }

    const querySubmit2 = () => {
        if (test2.value === '') {
            // message.alert({
            //     titile: '错误操作',
            //     msg: '不能为空'
            // })
            alert('客户字段不能为空')
            return
        }
        let key
        companys.map((item, index) => {
            if (item.id === test2.value) {
                key = item.value
            }
        })
        addProjectRef2.close()
        setAfterSaleInfo([...afterSaleInfo, { status: '待处理', type: '软件项目', companyName: key }])
    }



    return (
        <div style={{ height: "50%", width: "100%" }}>
            <Tabs tabPosition={state.position} style={{ height: "100%", }}>
                {/* <TabPanel title="首页" closable>
                    </TabPanel> */}
                <TabPanel title="售后服务申请单">
                    <Yyy>
                        <ActionsBar>
                            <div>
                                <span>状态：</span>
                                <ComboBox
                                    style={{ width: 100 }}
                                    inputId="cc1"
                                    // multiple
                                    data={eventStates}
                                />
                            </div>
                            <div>
                                <span>客户：</span>
                                <ComboBox
                                    style={{ width: 160 }}
                                    inputId="c1"
                                    data={companys}
                                    value={queryData.companyName}
                                    onChange={(value) => { setQueryData({ companyName: value }) }}
                                />
                            </div>
                            <div className="input-wrapper">
                                <span>订单号：</span>
                                <TextBox inputId="tt1" placeholder="请输入查询条件" style={{ width: 160 }}></TextBox>
                            </div>
                            <div className='input-wrapper'>
                                <span>电话：</span>
                                <TextBox inputId="t2" placeholder="请输入查询条件" style={{ width: 160 }}></TextBox>
                            </div>
                            <div>
                                <LinkButton iconCls="icon-search" onClick={querySubmit} plain>查询</LinkButton>
                                <LinkButton iconCls="icon-search" plain>评价查询</LinkButton>
                                <LinkButton iconCls="icon-print" plain>打印</LinkButton>
                                <LinkButton iconCls="icon-tip" plain>接单</LinkButton>
                                <LinkButton iconCls="icon-man" plain>指派任务</LinkButton>
                                <LinkButton iconCls="icon-ok" plain>完单</LinkButton>
                                <LinkButton iconCls="icon-undo" plain>撤销</LinkButton>
                                <LinkButton iconCls="icon-add" onClick={() => addProjectRef.open()} plain>添加项目</LinkButton>
                                <LinkButton iconCls="icon-add" onClick={() => addProjectRef2.open()} plain>添加客户</LinkButton>
                            </div>

                        </ActionsBar>

                        <Xxx>
                            <DataGrid data={afterSaleInfo} style={{ height: `100%`, width: '100%' }} >
                                <GridColumn align="center" width={30} field='id'
                                    render={({ rowIndex }) => (
                                        (rowIndex + 1)
                                    )}></GridColumn>
                                <GridColumn width={50} align="center"
                                    field="ck"
                                    render={({ row }) => (
                                        <CheckBox checked={row.selected} onChange={(checked) => handleRowCheck(row, checked)}></CheckBox>
                                    )}
                                    header={() => (
                                        afterSaleInfo.length === 0 ? "暂无" : <CheckBox checked={state.allChecked} onChange={(checked) => handleAllCheck(checked)}></CheckBox>
                                    )}
                                />
                                <GridColumn sortable field="status" title="状态"></GridColumn>
                                <GridColumn sortable field="type" title="报修类型"></GridColumn>
                                <GridColumn sortable field="companyName" title="公司名称"></GridColumn>
                            </DataGrid>
                        </Xxx>

                        <Dialog
                            closed={true}
                            title="添加项目"
                            style={{ width: 400 }}
                            bodyCls="f-column"
                            modal
                            ref={ref => addProjectRef = ref} //添加弹窗引用
                        >
                            <AddProjectWrapper>
                                <div>
                                    <div>报修类型：</div>
                                    <TextBox inputId="t1" onChange={(value) => { addProjectFrom.type = value }} value={addProjectFrom.type} placeholder="请输入报修类型" style={{ width: 200 }}></TextBox>
                                </div>
                                {/* <div>
                                    <div>项目合同号：</div>
                                    <TextBox inputId="t2" placeholder="请输入项目合同号" style={{ width: 200 }}></TextBox>
                                </div> */}
                                <div>
                                    <div>客户：</div>
                                    <ComboBox
                                        style={{ width: 200 }}
                                        inputId="c1"
                                        data={companys}
                                        value={addProjectFrom.companyName}
                                        onChange={(value) => addProjectFrom.companyName = value}
                                    />
                                </div>

                                <div>
                                    <LinkButton iconCls="icon-save" onClick={submitProject} plain>保存</LinkButton>
                                    <LinkButton iconCls="icon-cancel" onClick={() => { addProjectRef.close() }} plain>关闭</LinkButton>
                                </div>
                            </AddProjectWrapper>

                        </Dialog>
                        <Dialog
                            closed={true}
                            title="添加客户"
                            style={{ width: 400 }}
                            bodyCls="f-column"
                            modal
                            ref={ref => addProjectRef2 = ref}
                        >
                            <AddProjectWrapper>
                                <div>
                                    <div>客户：</div>
                                    <ComboGrid
                                        placeholder={'请选择客户名称'}
                                        panelStyle={{ width: 400 }}
                                        data={companys}
                                        valueField="id"
                                        value={test2.value}
                                        onChange={(value) => setTest2({ value })}
                                    >
                                        <GridColumn field="value" title="公司名称"></GridColumn>
                                        {pager(q.layout1)}

                                    </ComboGrid>

                                </div>

                                <div>
                                    <LinkButton iconCls="icon-save" onClick={querySubmit2} plain>保存</LinkButton>
                                    <LinkButton iconCls="icon-cancel" onClick={() => { addProjectRef2.close() }} plain>关闭</LinkButton>
                                </div>
                            </AddProjectWrapper>
                        </Dialog>
                        {pager(q.layout1)}
                    </Yyy>
                </TabPanel>
            </Tabs>
        </div >
    )
}

export default App2;