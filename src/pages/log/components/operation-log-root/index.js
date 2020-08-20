import React, { Component } from 'react'
import Form from 'bee-form';
import {Row,} from "tinper-bee";
import ListTable from "components/ListTable";
import {columns, searchCondition} from "./data/listTableData";
import './index.less'
import { actions } from 'mirrorx';

class OperationLogRoot extends Component {
    constructor(props){
        super(props)
        this.state = {
            operationLogLoading: true,   // 资源loading是否显示
        }
    }

    componentDidMount() {
        // 查询资源信息
        this.queryPage({
            pageNum: 1,
            pageSize: 10,
        });
    }

    /** 点击查询 */
    searchData = () => {
        const {operationLogPageCondition} = this.props;
        this.props.form.validateFields(async (err, values) => {
            /** 设置查询条件 */
            let queryListParams = values;
            queryListParams.pageNum = 1;
            queryListParams.pageSize = operationLogPageCondition.pageSize || 10;
            // 查询工单分页数据
            await this.queryPage(queryListParams);
        });
    }

    /** 点击页数 */
    onPageIndexSelect = (value) => {
        const {operationLogPageCondition} = this.props;
        let params = operationLogPageCondition;
        params.pageNum = value || 1;
        params.pageSize = operationLogPageCondition.pageSize || 10;
        this.queryPage(params);
    }

    /** 选择每页条数 */
    onPageSizeSelect = (value) => {
        const {operationLogPageCondition} = this.props;
        let params = operationLogPageCondition;
        params.pageNum = 1;
        params.pageSize = value || 10;
        this.queryPage(params);
    }

    /** 查询数据 */
    queryPage = async (params) => {
        this.setState({operationLogLoading: true,});
        await actions.OperationLog.queryPage(params);
        this.setState({operationLogLoading: false,});
    }

    render(){
        const {operationLogPageObject} = this.props;
        const {operationLogLoading,} = this.state;
        return (
            <Row className="operation-log-root">
                <ListTable 
                    form={this.props.form}
                    handleSearch={this.searchData.bind(this)}
                    columns={columns(this)}
                    listDatas={operationLogPageObject.list || []}
                    totalPages={operationLogPageObject.pages || 0}
                    total={operationLogPageObject.total || 0}
                    onSelect={this.onPageIndexSelect.bind(this)}
                    onDataNumSelect={this.onPageSizeSelect.bind(this)}
                    searchDatas={searchCondition(this.props.form)}
                    showLoading={operationLogLoading}
                />
            </Row>
        )
    }
}

export default Form.createForm()(OperationLogRoot)