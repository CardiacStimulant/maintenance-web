import React, { Component } from 'react'
import Form from 'bee-form';
import {Row, Modal,} from "tinper-bee";
import ListTable from "components/ListTable";
import {columns, searchCondition} from "./data/listTableData";
import TenantTelephoneNumberConfig from "../tenant-telephone-number-config";
import { actions } from 'mirrorx';
import './index.less'

class TenantManagerRoot extends Component {
    constructor(props){
        super(props)
        this.state = {
            tenantManagerLoading: true,   // 租户loading是否显示
            tenantTelephoneNumberConfigModalShow: false, // 租户号码配置modal是否显示
            tenant: {}, // 待配置号码的租户信息
        }
    }

    componentDidMount() {
        // 查询租户信息
        this.queryPage({
            pageNum: 1,
            pageSize: 10,
        });
    }

    /** 点击查询 */
    searchData = () => {
        const {tenantManagerPageCondition} = this.props;
        this.props.form.validateFields(async (err, values) => {
            /** 设置查询条件 */
            let queryListParams = values;
            queryListParams.pageNum = 1;
            queryListParams.pageSize = tenantManagerPageCondition.pageSize || 10;
            // 查询工单分页数据
            await this.queryPage(queryListParams);
        });
    }

    /** 点击页数 */
    onPageIndexSelect = (value) => {
        const {tenantManagerPageCondition} = this.props;
        let params = tenantManagerPageCondition;
        params.pageNum = value || 1;
        params.pageSize = tenantManagerPageCondition.pageSize || 10;
        this.queryPage(params);
    }

    /** 选择每页条数 */
    onPageSizeSelect = (value) => {
        const {tenantManagerPageCondition} = this.props;
        let params = tenantManagerPageCondition;
        params.pageNum = 1;
        params.pageSize = value || 10;
        this.queryPage(params);
    }

    /** 查询数据 */
    queryPage = async (params) => {
        this.setState({tenantManagerLoading: true,});
        await actions.TenantManager.queryPage(params);
        this.setState({tenantManagerLoading: false,});
    }

    // 租户号码管理
    telephoneNumberManager = (data) => {
        this.setState({
            tenantTelephoneNumberConfigModalShow: true,
            tenant: data,
        });
    }

    // 关闭modal
    closeModal =() => {
        this.setState({
            tenantTelephoneNumberConfigModalShow: false,
        });
    }

    render(){
        const {tenantManagerPageObject, tenantTelephoneNumberConfigPageCondition, tenantTelephoneNumberConfigPageObject,} = this.props;
        const {tenantManagerLoading, tenantTelephoneNumberConfigModalShow, tenant,} = this.state;
        return (
            <Row className="tenant-manager-root">
                <ListTable 
                    form={this.props.form}
                    handleSearch={this.searchData.bind(this)}
                    columns={columns(this)}
                    listDatas={tenantManagerPageObject.list || []}
                    totalPages={tenantManagerPageObject.pages || 0}
                    total={tenantManagerPageObject.total || 0}
                    onSelect={this.onPageIndexSelect.bind(this)}
                    onDataNumSelect={this.onPageSizeSelect.bind(this)}
                    searchDatas={searchCondition(this.props.form)}
                    showLoading={tenantManagerLoading}
                />

                <Modal
                    className="tenant-telephone-number-conofig-modal"
                    backdrop = "static"
                    onHide = { this.closeModal.bind(this) }
                    size={"xlg"}
                    show={tenantTelephoneNumberConfigModalShow}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>租户号码管理</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <TenantTelephoneNumberConfig 
                        tenant={tenant} 
                        tenantTelephoneNumberConfigPageObject={tenantTelephoneNumberConfigPageObject} 
                        tenantTelephoneNumberConfigPageCondition={tenantTelephoneNumberConfigPageCondition} 
                        closeModal={this.closeModal.bind(this)} />
                    </Modal.Body>
                </Modal>
            </Row>
        )
    }
}

export default Form.createForm()(TenantManagerRoot)