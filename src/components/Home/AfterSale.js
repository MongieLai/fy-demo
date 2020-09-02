import React from 'react';
import { Tabs, LinkButton, TabPanel, ComboBox } from 'rc-easyui';
import { TextBox } from 'rc-easyui';
import { ComboGrid, Pagination, DataGrid, Dialog, GridColumn, CheckBox } from 'rc-easyui';
import styled from 'styled-components'
import Ajax from '../../api/ajax'

// css in js
const ActionsBar = styled.div`
    display:flex;
    padding:4px 8px;
    align-items:center;
    >*:not(:last-child){
        margin-right:20px;
    }
`

const OrderWrapper = styled.div`
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

const addProjectFrom = {
    type: "",
    company: ''
}

const queryData = {
    companyName: ""
}

const initUserData = { value: '' }
class AfterSale extends React.Component {
    constructor() {
        super()
        this.state = {
            companys: [],
            afterSaleInfo: [],
            queryData: {},
            user: initUserData,
            addProjectFrom: {},
            allChecked: false,
            rowClicked: false, //复选框选中时锁住防止其他操作
            position: "top",
            positions: [
                { value: "top", text: "Top" },
                { value: "bottom", text: "Bottom" },
                { value: "left", text: "Left" },
                { value: "right", text: "Right" }
            ],
            value: null,
            total: 0,
            pageNumber: 1,
            pageSize: 10,
            layout1: [
                "list",
                "sep",
                "first",
                "prev",
                "links",
                "next",
                "last",
                "sep",
            ],
            addProjectFrom,
            queryData,
            user: {
                value: ''
            },
            addUserInputValue: ''
        }
    }

    componentDidMount() {
        Ajax('/getCompanys').then((companys) => {
            this.setState({ companys })
        })
        Ajax('/getAfterSaleInfo').then(({ afterSaleInfo, total }) => {
            this.setState({ afterSaleInfo, total })
        })
    }

    handlePageChange({ pageNumber, pageSize }) { //获取了当前页及页数，发请求获取分页数据
        Ajax('/getAfterSaleInfoChangePage', { pageNumber, pageSize }).then((response) => {
            this.setState({ afterSaleInfo: response })
        })
        //ajax行为，拿到response后this.set()对应数据
    }


    handleAllCheck(checked) {
        if (this.state.rowClicked) {
            return;
        }
        let data = this.state.afterSaleInfo.map(row => {
            return Object.assign({}, row, { selected: checked })
        });
        this.setState({
            allChecked: checked,
            afterSaleInfo: data
        })
    }
    handleRowCheck(row, checked) {
        let data = this.state.afterSaleInfo.slice();
        let index = this.state.afterSaleInfo.indexOf(row);
        data.splice(index, 1, Object.assign({}, row, { selected: checked }));
        let checkedRows = data.filter(row => row.selected);
        this.setState({
            allChecked: data.length === checkedRows.length, //检测选择数组长度是否等于数据长度
            rowClicked: true,
            afterSaleInfo: data
        }, () => {
            this.setState({ rowClicked: false })
        });
    }
    submitProject() {
        // if (!addProjectFrom.companyName || !addProjectFrom.type) {
        //     alert('表单内容不能为空')
        //     return
        // }
        // const submitData = {
        //     companyName: addProjectFrom.companyName,
        //     type: addProjectFrom.type
        // }
        // this.addProjectRef.close()
        // setAfterSaleInfo([...afterSaleInfo, { status: '待处理', type: submitData.type, companyName: submitData.companyName }])
        // setPagination({ ...pagination, total: afterSaleInfo.length })
        // setAddProjectFrom({ addProjectFroms })
    }

    querySubmit() {
        // let tempArr = []
        // let { companyName } = queryData
        // if (!companyName) {
        //     setAfterSaleInfo([...afterSaleInfo])
        // } else if (companyName) {
        //     afterSaleInfo.forEach((item) => {
        //         if (item.companyName === companyName) {
        //             tempArr.push(item)
        //         }
        //     })
        //     setAfterSaleInfo(tempArr)
        //     setPagination({ ...pagination, total: tempArr.length })
        // }
    }

    submitUser() {
        // if (this.user.value === '') {
        //     alert('客户字段不能为空')
        //     return
        // }
        // let key
        // companys.forEach((item) => {
        //     if (item.id === this.user.value) {
        //         key = item.value
        //     }
        // })
        // addUserRef.close()
        // this.s  etState({afterSaleInfo:[...afterSaleInfo, { status: '待处理', type: '软件项目', companyName: key }])
    }



    render() {
        return (
            <div style={{ height: "55%", width: "100%" }}>
                <Tabs tabPosition={this.state.position} style={{ height: "100%", }}>
                    {/* <TabPanel title="首页" closable>
                            </TabPanel> */}
                    <TabPanel title="售后服务申请单">
                        <OrderWrapper>
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
                                        data={this.state.companys}
                                        value={this.state.queryData.companyName}
                                        onChange={(value) => { this.setState({ queryData: { companyName: value } }) }}
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
                                    <LinkButton iconCls="icon-search" onClick={this.querySubmit} plain>查询</LinkButton>
                                    <LinkButton iconCls="icon-search" plain>评价查询</LinkButton>
                                    <LinkButton iconCls="icon-print" plain>打印</LinkButton>
                                    <LinkButton iconCls="icon-tip" plain>接单</LinkButton>
                                    <LinkButton iconCls="icon-man" plain>指派任务</LinkButton>
                                    <LinkButton iconCls="icon-ok" plain>完单</LinkButton>
                                    <LinkButton iconCls="icon-undo" plain>撤销</LinkButton>
                                    <LinkButton iconCls="icon-add" onClick={() => this.addProjectRef.open()} plain>添加项目</LinkButton>
                                    <LinkButton iconCls="icon-add" onClick={() => this.addUserRef.open()} plain>添加客户</LinkButton>
                                </div>

                            </ActionsBar>

                            {/* <DataGrid data={this.state.afterSaleInfo} style={{ height: `100%`, width: '100%' }} >
                                <GridColumn align="center" width={30} field='id'
                                    render={({ rowIndex }) => (
                                        (rowIndex + 1)
                                    )}></GridColumn>
                                <GridColumn width={50} align="center"
                                    render={({ row }) => (
                                        <CheckBox checked={row.selected} onChange={(checked) => this.handleRowCheck(row, checked)}></CheckBox>
                                    )}
                                    header={() => (
                                        this.state.afterSaleInfo.length === 0 ? "暂无" : <CheckBox checked={this.state.allChecked} onChange={() => { this.handleAllCheck() }}></CheckBox>
                                    )}
                                />
                                <GridColumn sortable field="status" title="状态"></GridColumn>
                                <GridColumn sortable field="type" title="报修类型"></GridColumn>
                                <GridColumn sortable field="companyName" title="公司名称"></GridColumn>
                            </DataGrid> */}
                            <DataGrid
                                data={this.state.afterSaleInfo}
                            >
                                <GridColumn align="center" width={30}
                                    render={({ row, rowIndex }) => (
                                        row.id + 1
                                    )}
                                >

                                </GridColumn>
                                <GridColumn width={50} align="center"
                                    render={({ row }) => (
                                        <CheckBox checked={row.selected} onChange={(checked) => this.handleRowCheck(row, checked)}></CheckBox>
                                    )}
                                    header={() => (
                                        this.state.afterSaleInfo.length === 0 ? "暂无" : <CheckBox checked={this.state.allChecked} onChange={(checked) => { this.handleAllCheck(checked) }}></CheckBox>
                                    )}
                                />
                                <GridColumn sortable width='300px' field="status" title="状态"></GridColumn>
                                <GridColumn sortable width='300px' field="type" title="报修类型"></GridColumn>
                                <GridColumn sortable width='300px' field="companyName" title="公司名称" ></GridColumn>
                                <GridColumn sortable width='300px' field="companyName" title="Amount" ></GridColumn>
                                <GridColumn sortable width='300px' field="companyName" title="Amount" ></GridColumn>
                                <GridColumn sortable width='300px' field="companyName" title="Amount" ></GridColumn>
                                <GridColumn sortable width='300px' field="companyName" title="Amount" ></GridColumn>
                                <GridColumn sortable width='300px' field="companyName" title="Amount" ></GridColumn>
                            </DataGrid>

                            <Pagination
                                pageList={[10]}
                                total={this.state.total}
                                pageNumber={this.state.pageNumber}
                                pageSize={this.state.pageSize}
                                layout={this.state.layout1}
                                onPageChange={event => this.handlePageChange(event)}
                            />
                        </OrderWrapper>
                    </TabPanel>
                </Tabs>

                {/* 添加相关弹窗组件 */}
                <Dialog
                    closed={true}
                    title="添加项目"
                    style={{ width: 400 }}
                    bodyCls="f-column"
                    modal
                    ref={ref => this.addProjectRef = ref}
                >
                    <AddProjectWrapper>
                        {/* <div>
                            <div>报修类型：</div>
                            <TextBox inputId="t1" onChange={(value) => { addProjectFrom.type = value }} value={addProjectFrom.type} placeholder="请输入报修类型" style={{ width: 200 }}></TextBox>
                        </div>
                        <div>
                            <div>客户：</div>
                            <ComboBox
                                style={{ width: 200 }}
                                inputId="c1"
                                data={this.state.companys}
                                value={addProjectFrom.companyName}
                                onChange={(value) => addProjectFrom.companyName = value}
                            />
                        </div> */}

                        {/* <div>
                            <LinkButton iconCls="icon-save" onClick={submitProject} plain>保存</LinkButton>
                            <LinkButton iconCls="icon-cancel" onClick={() => { addProjectRef.close() }} plain>关闭</LinkButton>
                        </div> */}
                    </AddProjectWrapper>

                </Dialog>
                <Dialog
                    closed={true}
                    title="添加客户"
                    style={{ width: 400 }}
                    bodyCls="f-column"
                    modal
                    ref={ref => this.addUserRef = ref}
                >
                    <AddProjectWrapper >
                        <div >
                            <div>客户：</div>
                            <ComboGrid

                                placeholder={'请选择客户名称'}
                                panelStyle={{ width: 400 }}
                                data={this.state.companys}
                                valueField="id"
                                value={this.state.user.value}
                                onChange={(value) => this.state.addUserInputValue = value}
                            >
                                <GridColumn field="value" title="公司名称"></GridColumn>
                            </ComboGrid>

                        </div>

                        <div>
                            <LinkButton iconCls="icon-save" plain>保存</LinkButton>
                            <LinkButton iconCls="icon-cancel" onClick={() => { this.addUserRef.close() }} plain>关闭</LinkButton>
                        </div>
                    </AddProjectWrapper>
                </Dialog>
            </div >
        )
    }



}

export default AfterSale;