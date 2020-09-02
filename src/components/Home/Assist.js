import React from 'react';
import { Tabs, LinkButton, TabPanel, ComboBox } from 'rc-easyui';
import { TextBox } from 'rc-easyui';
import { ComboGrid, Pagination, DataGrid, Dialog, GridColumn, CheckBox } from 'rc-easyui';
import styled from 'styled-components'
import Ajax from '../../api/ajax'
const AssistWrapper = styled.div`
    height: 45%;
    display:flex;
    flex-direction:column;
    >div:nth-child(2){
        flex-grow:1;
    }
`
export default class Assist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allChecked: false,
            rowClicked: false,
            data: this.getData(),
            layout1: [
                "list",
                "sep",
                "first",
                "prev",
                "links",
                "next",
                "last",
                "sep",
            ]
        }
    }
    getData() {
        return [
            { "code": "FI-SW-01", "name": "Koi", "unitcost": 10.00, "status": "P", "listprice": 36.50, "attr": "Large", "itemid": "EST-1" }
        ]
    }
    handleRowCheck(row, checked) {
        let data = this.state.data.slice();
        let index = this.state.data.indexOf(row);
        data.splice(index, 1, Object.assign({}, row, { selected: checked }));
        let checkedRows = data.filter(row => row.selected);
        this.setState({
            allChecked: data.length === checkedRows.length,
            rowClicked: true,
            data: data
        }, () => {
            this.setState({ rowClicked: false })
        });
    }
    handleAllCheck(checked) {
        if (this.state.rowClicked) {
            return;
        }
        let data = this.state.data.map(row => {
            return Object.assign({}, row, { selected: checked })
        });
        this.setState({
            allChecked: checked,
            data: data
        })
    }
    render() {
        return (
            <AssistWrapper>
                <div style={{padding:'4px 8px'}}>
                    <LinkButton iconCls="icon-search" plain>查询</LinkButton>
                </div>
                <DataGrid data={this.state.data}>
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
                </DataGrid>
                {/* <Pagination
                    pageList={[10]}
                    total={this.state.total}
                    pageNumber={this.state.pageNumber}
                    pageSize={this.state.pageSize}
                    layout={this.state.layout1}
                    onPageChange={event => this.handlePageChange(event)}
                /> */}
            </AssistWrapper>
        )
    }
}