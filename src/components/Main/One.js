import React from 'react';
import { Tabs, LinkButton, TabPanel, ComboBox } from 'rc-easyui';
import { TextBox } from 'rc-easyui';
import { DataGrid, Dialog, ComboGrid, GridColumn, CheckBox } from 'rc-easyui';
import $ from 'jquery'
import styled from 'styled-components'
const ActionsBar = styled.div`
    display:flex;
    padding:4px 8px;
    align-items:center;
    >*:not(:last-child){
        margin-right:20px;
    }
    /* background:#f5f5f5; */
    /* .input-wrapper{
        display:inline-flex;
        align-items:center;
        
            p{display: inline;}
        
    } */
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


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allChecked: false,
            rowClicked: false,
            position: "top",
            positions: [
                { value: "top", text: "Top" },
                { value: "bottom", text: "Bottom" },
                { value: "left", text: "Left" },
                { value: "right", text: "Right" }
            ],
            data: [
                { value: 0, text: "所有" },
                { value: 1, text: "已完成" },
                { value: 2, text: "已指派" },
                { value: 3, text: "已评价" },
                { value: 4, text: "处理中" },
                { value: 5, text: "待处理" }
            ],
            userData: [
                { value: 0, text: "珠海XX科技有限公司" },
                { value: 1, text: "珠海XX科技有限公司" },
                { value: 2, text: "珠海XX科技有限公司" },
                { value: 3, text: "珠海XX科技有限公司" },
                { value: 4, text: "珠海XX科技有限公司" },
                { value: 5, text: "珠海XX科技有限公司" }
            ],
            listData: [
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
            ],
            value: null,
        }
    }

    renderDetail({ row }) {
        return (
            <div className="item f-row">
                <div><img className="item-img" src={'https://www.jeasyui.com/tutorial/datagrid/images/' + row.itemid + '.png'} /></div>
                <div className="f-column">
                    <div className="item-desp f-full">Attribute: {row.attr}</div>
                    <div className="item-desp f-full">Status: {row.status}</div>
                </div>
            </div>
        )
    }
    handleRowCheck(row, checked) {
        let data = this.state.listData.slice();
        let index = this.state.listData.indexOf(row);
        data.splice(index, 1, Object.assign({}, row, { selected: checked }));
        let checkedRows = data.filter(row => row.selected);
        this.setState({
            ...this.state,
            allChecked: data.length === checkedRows.length,
            rowClicked: true,
            listData: data
        }, () => {
            this.setState({ rowClicked: false })
        });
    }
    handleAllCheck(checked) {
        console.log(checked)
        if (this.state.rowClicked) {
            console.log('我执行了')
            return;
        }
        let data = this.state.listData.map(row => {
            return Object.assign({}, row, { selected: checked })
        });
        this.setState({
            ...this.state,
            allChecked: checked,
            listData: data
        })
    }
    addItme() {
        this.dlg.open()
    }

    render() {
        const checkedItems = this.state.data.filter(row => row.selected).map(row => row.itemid);
        const formatDollar = ({ value }) => {
            return value ? '$' + value : ''
        }
        return (
            <div style={{ height: "50%", width: "100%" }}>
                <Tabs tabPosition={this.state.position} style={{ height: "100%", }}>
                    {/* <TabPanel title="首页" closable>
                    </TabPanel> */}
                    <TabPanel title="售后服务申请单">
                        <div>
                            <ActionsBar>
                                <div>
                                    <span>状态：</span>
                                    <ComboBox
                                        style={{ width: 100 }}
                                        inputId="c1"
                                        // multiple
                                        data={this.state.data}
                                        value={this.state.value}
                                    />
                                </div>
                                <div>
                                    <span>客户：</span>
                                    <ComboBox
                                        style={{ width: 160 }}
                                        inputId="c1"
                                        data={this.state.userData}
                                        value={this.state.value}
                                    />
                                </div>
                                <div className="input-wrapper">
                                    <span>订单号：</span>
                                    <TextBox inputId="t2" placeholder="请输入查询条件" style={{ width: 160 }}></TextBox>
                                </div>
                                <div className='input-wrapper'>
                                    <span>电话：</span>
                                    <TextBox inputId="t2" placeholder="请输入查询条件" style={{ width: 160 }}></TextBox>
                                </div>
                                <div>
                                    <LinkButton iconCls="icon-search" plain>查询</LinkButton>
                                    <LinkButton iconCls="icon-search" plain>评价查询</LinkButton>
                                    <LinkButton iconCls="icon-print" plain>打印</LinkButton>
                                    <LinkButton iconCls="icon-tip" plain>接单</LinkButton>
                                    <LinkButton iconCls="icon-man" plain>指派任务</LinkButton>
                                    <LinkButton iconCls="icon-ok" plain>完单</LinkButton>
                                    <LinkButton iconCls="icon-undo" plain>撤销</LinkButton>
                                    <LinkButton iconCls="icon-add" onClick={() => this.dlg.open()} plain>添加公司</LinkButton>
                                    <LinkButton iconCls="icon-add" onClick={() => this.dlg2.open()} plain>添加客户</LinkButton>
                                </div>

                            </ActionsBar>
                            <Xxx>
                                <DataGrid data={this.state.listData} renderDetail={this.renderDetail} style={{ width: '1000px' }} >
                                    <GridColumn align="center" width={30} field='id'></GridColumn>
                                    <GridColumn width={50} align="center"
                                        field="ck"
                                        render={({ row }) => (
                                            <CheckBox checked={row.selected} onChange={(checked) => this.handleRowCheck(row, checked)}></CheckBox>
                                        )}
                                        header={() => (
                                            <CheckBox checked={this.state.allChecked} onChange={(checked) => this.handleAllCheck(checked)}></CheckBox>
                                        )}
                                    />
                                    <GridColumn field="itemid" title="Item ID"></GridColumn>
                                    <GridColumn field="name" title="Name"></GridColumn>
                                    <GridColumn field="listprice" title="List Price" align="right"></GridColumn>
                                    <GridColumn field="unitcost" title="Unit Cost" align="right"></GridColumn>
                                    <GridColumn field="attr" title="Attribute" width="30%"></GridColumn>
                                    <GridColumn field="status" title="Status" align="center"></GridColumn>
                                    {/* <GridColumn sortable field="itemid" title="状态"></GridColumn>
                                    <GridColumn sortable field="name" title="单号"></GridColumn>
                                    <GridColumn sortable field="listprice" title="保修类型"></GridColumn>
                                    <GridColumn sortable field="unitcost" title="项目名称"></GridColumn>
                                    <GridColumn sortable field="attr" title="客户名称"></GridColumn>
                                    <GridColumn field="status" title="微信用户标识" align="center"></GridColumn>
                                    <GridColumn sortable field="status" title="联系人" align="center"></GridColumn>
                                    <GridColumn sortable field="status" title="电话号码" align="center"></GridColumn>
                                    <GridColumn sortable field="status" title="更新时间" align="center"></GridColumn>
                                    <GridColumn sortable field="status" title="预计完成时间" align="center"></GridColumn>
                                    <GridColumn sortable field="status" title="接单人" align="center"></GridColumn>
                                    <GridColumn sortable field="status" title="责任人" align="center"></GridColumn>
                                    <GridColumn sortable field="status" title="描述" align="center"></GridColumn>
                                    <GridColumn sortable field="status" title="责任人描述" align="center"></GridColumn> */}
                                </DataGrid>
                            </Xxx>

                        </div>
                    </TabPanel>
                </Tabs>


                <Dialog
                    closed={true}
                    title="添加项目"
                    style={{ width: 400 }}
                    bodyCls="f-column"
                    modal
                    ref={ref => this.dlg = ref}
                >
                    <AddProjectWrapper>
                        <div>
                            <div>项目名称：</div>
                            <TextBox inputId="t2" placeholder="请输入项目名称" style={{ width: 200 }}></TextBox>
                        </div>
                        <div>
                            <div>项目合同号：</div>
                            <TextBox inputId="t2" placeholder="请输入项目合同号" style={{ width: 200 }}></TextBox>
                        </div>
                        <div>
                            <div>客户：</div>
                            <ComboBox
                                style={{ width: 200 }}
                                inputId="c1"
                                data={this.state.userData}
                                value={this.state.value}
                            />
                        </div>
                        <div>
                            <LinkButton iconCls="icon-save" plain>保存</LinkButton>
                            <LinkButton iconCls="icon-cancel" plain>关闭</LinkButton>
                        </div>
                    </AddProjectWrapper>

                </Dialog>

                <Dialog
                    closed={true}
                    title="添加客户"
                    style={{ width: 400 }}
                    bodyCls="f-column"
                    modal
                    ref={ref => this.dlg2 = ref}
                >
                    <AddProjectWrapper>
                        <div>
                            <div>客户：</div>
                            <ComboGrid
                                panelStyle={{ width: 500 }}
                                valueField="itemid"
                                textField="name"
                                data={this.state.data}
                                value={this.state.value}
                                onChange={(value) => this.setState({ value: value })}
                            >
                                <GridColumn field="itemid" title="Item ID"></GridColumn>
                                <GridColumn field="name" title="用户名"></GridColumn>
                                <GridColumn field="listprice" title="显示名"></GridColumn>
                                <GridColumn field="unitcost" title="手机号码"></GridColumn>
                            </ComboGrid>
                        </div>
                        <div>
                            <LinkButton iconCls="icon-save" plain>保存</LinkButton>
                            <LinkButton iconCls="icon-cancel" plain>关闭</LinkButton>
                        </div>
                    </AddProjectWrapper>

                </Dialog>
            </div>
        );
    }
}

export default App;