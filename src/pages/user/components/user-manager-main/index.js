import React, { Component } from 'react'
import Form from 'bee-form';
import {Row, } from "tinper-bee";
import ListTable from "components/ListTable";
import {columns, searchCondition} from "./data/listTableData";
import * as constant from 'components/constant';
import './index.less'

class UserManagerMain extends Component {
    constructor(props){
        super(props)
        this.state = {
            userManagerLoading: true,
        }
    }

    componentDidMount() {
        // 查询用户管理信息
        this.queryPage();
    }

    /** 点击查询 */
    searchData = () => {
        this.queryPage();
    }

    /** 点击页数 */
    onPageIndexSelect = (value) => {
        this.queryPage();
    }

    /** 选择每页条数 */
    onPageSizeSelect = (value) => {
        this.queryPage();
    }

    /** 查询数据 */
    queryPage = async (params) => {
        this.setState({userManagerLoading: true,});
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
                    listDatas={userManagerPageObject.content || []}
                    totalPages={userManagerPageObject.totalPages || 0}
                    total={userManagerPageObject.totalElements || 0}
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