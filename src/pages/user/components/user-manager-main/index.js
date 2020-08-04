import React, { Component } from 'react'
import Form from 'bee-form';
import {Row, } from "tinper-bee";
import ListTable from "components/ListTable";
import {columns, searchCondition} from "./data/listTableData";
import * as constant from 'components/constant';
import './index.less'
import { actions } from 'mirrorx';

class UserManagerMain extends Component {
    constructor(props){
        super(props)
        this.state = {
            userManagerLoading: true,
        }
    }

    componentDidMount() {
        // 查询用户管理信息
        this.queryPage({
            pageNum: 1,
            pageSize: 10,
        });
    }

    /** 点击查询 */
    searchData = () => {
        const {userManagerPageCondition} = this.props;
        this.props.form.validateFields(async (err, values) => {
            /** 设置查询条件 */
            let queryListParams = values;
            queryListParams.pageNum = userManagerPageCondition.pageNum || 1;
            queryListParams.pageSize = userManagerPageCondition.pageSize || 10;
            // 查询工单分页数据
            await this.queryPage(queryListParams);
        });
    }

    /** 点击页数 */
    onPageIndexSelect = (value) => {
        const {userManagerPageCondition} = this.props;
        let params = userManagerPageCondition;
        params.pageNum = value || 1;
        params.pageSize = userManagerPageCondition.pageSize || 10;
        this.queryPage(params);
    }

    /** 选择每页条数 */
    onPageSizeSelect = (value) => {
        const {userManagerPageCondition} = this.props;
        let params = userManagerPageCondition;
        params.pageNum = 1;
        params.pageSize = value || 10;
        this.queryPage(params);
    }

    /** 查询数据 */
    queryPage = async (params) => {
        this.setState({userManagerLoading: true,});
        await actions.UserManager.queryPage(params);
        this.setState({userManagerLoading: false,});
    }

    /** 新增客户 */
    addUser = () => {

    }

    render(){
        const {userManagerPageObject} = this.props;
        const {userManagerLoading} = this.state;
        return (
            <Row className="user-manager-main">
                <ListTable 
                    form={this.props.form}
                    handleSearch={this.searchData.bind(this)}
                    columns={columns()}
                    listDatas={userManagerPageObject.list || []}
                    totalPages={userManagerPageObject.pages || 0}
                    total={userManagerPageObject.total || 0}
                    onSelect={this.onPageIndexSelect.bind(this)}
                    onDataNumSelect={this.onPageSizeSelect.bind(this)}
                    searchDatas={searchCondition(this.props.form)}
                    showLoading={userManagerLoading}
                    searchButtons={{
                        right: [],
                        left: [{
                            type:"confirm",
                            onClick: this.addUser.bind(this),
                            value:"新增"
                        }],
                    }}
                />
            </Row>
        )
    }
}

export default Form.createForm()(UserManagerMain)