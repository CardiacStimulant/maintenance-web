import React, { Component } from 'react'
import Form from 'bee-form';
import {Row, Modal, Button} from "tinper-bee";
import ListTable from "components/ListTable";
import {columns, searchCondition} from "./data/listTableData";
import NumberManagerInformation from "../number-manager-infomation";
import * as constant from 'components/constant';
import { Success, Warning, Error } from "utils";
import { actions } from 'mirrorx';
import './index.less'

class TenantTelephoneNumberConfig extends Component {
    constructor(props){
        super(props)
        this.state = {
            tenantTelephoneNumberConfigLoading: true,   // 租户号码loading是否显示
            lineServerList: [], // 线路服务集合
            numberManager: {},  // 租户号码信息
            selectData: [], // 选中项
            deleteDisabled: false, // 删除按钮禁用
            modalTitle: "", // 弹窗标题
        }
    }

    async componentDidMount() {
        const {tenant} = this.props;
        // 查询线路信息
        const res = await actions.TenantManager.queryLineServer({});
        if(res && res.success) {
            this.setState({
                lineServerList: res.result.data || [],
            });
        }
        // 查询租户号码信息
        this.queryTelephoneNumberPage({
            tenantId: tenant.id || "",
            pageNum: 1,
            pageSize: 10,
        });
    }

    /** 点击查询 */
    searchData = () => {
        const {tenantTelephoneNumberConfigPageCondition} = this.props;
        this.props.form.validateFields(async (err, values) => {
            /** 设置查询条件 */
            let queryListParams = values;
            queryListParams.pageNum = 1;
            queryListParams.pageSize = tenantTelephoneNumberConfigPageCondition.pageSize || 10;
            // 查询工单分页数据
            await this.queryTelephoneNumberPage(queryListParams);
        });
    }

    /** 点击页数 */
    onPageIndexSelect = (value) => {
        const {tenantTelephoneNumberConfigPageCondition} = this.props;
        let params = tenantTelephoneNumberConfigPageCondition;
        params.pageNum = value || 1;
        params.pageSize = tenantTelephoneNumberConfigPageCondition.pageSize || 10;
        this.queryTelephoneNumberPage(params);
    }

    /** 选择每页条数 */
    onPageSizeSelect = (value) => {
        const {tenantTelephoneNumberConfigPageCondition} = this.props;
        let params = tenantTelephoneNumberConfigPageCondition;
        params.pageNum = 1;
        params.pageSize = value || 10;
        this.queryTelephoneNumberPage(params);
    }

    // 刷新列表页
    refreshList = () => {
        const {tenantTelephoneNumberConfigPageCondition} = this.props;
        let params = tenantTelephoneNumberConfigPageCondition;
        params.pageNum = 1;
        params.pageSize = tenantTelephoneNumberConfigPageCondition.pageSize || 10;
        this.queryTelephoneNumberPage(params);
    }

    /** 查询数据 */
    queryTelephoneNumberPage = async (params) => {
        this.setState({tenantTelephoneNumberConfigLoading: true,});
        await actions.TenantManager.queryTelephoneNumberPage(params);
        this.setState({tenantTelephoneNumberConfigLoading: false,});
    }

    /** 新增用户 */
    addNumber = () => {
        this.setState({
            showNumberManagerModal: true,
            operationType: constant.OPERATION_TYPE_ADD,
            numberManager: {},
            modalTitle: "新增号码信息",
        });
    }

    /** 编辑用户 */
    editNumber = (data) => {
        this.setState({
            showNumberManagerModal: true,
            operationType: constant.OPERATION_TYPE_EDIT,
            numberManager: data,
        });
    }

    /** 用户详情 */
    detailNumber = (data) => {
        this.setState({
            showNumberManagerModal: true,
            operationType: constant.OPERATION_TYPE_DETAIL,
            numberManager: data,
        });
    }

    /** 删除用户 */
    deleteNumber = (data) =>{
        this.setState({
            showDeleteConfirm: true,
            numberManager: data
        });
    }

    /** 关闭modal */
    closeModal = () => {
        this.setState({
            showNumberManagerModal: false,
            showDeleteConfirm: false,
            showBatchDeleteConfirm: false,
            numberManager: {},
            selectData: [],
        });
    }

    /** 确认删除 */
    confirmDelete = async () => {
        const {numberManager} = this.state;
        this.setState({
            deleteDisabled: true,
        });
        let res = await actions.TenantManager.deleteNumberManager(numberManager);
        if(res && res.success) {
            Success("删除成功");
            this.closeModal();
            this.refreshList();
        }
        this.setState({
            deleteDisabled: false,
        });
    }

    /** 批量删除 */
    batchDeleteNumber = async () => {
        const {selectData} = this.state;
        if(selectData && selectData.length>0) {
            this.setState({showBatchDeleteConfirm: true,});
        } else {
            Warning("请先选择数据");
        }
    }

    /** 批量删除 */
    confirmBatchDeleteNumber = async () => {
        const {selectData} = this.state;
        this.setState({
            deleteDisabled: true,
        });
        let res = await actions.TenantManager.batchDeleteNumberManager(selectData);
        if(res && res.success) {
            Success("删除成功");
            this.closeModal();
            this.refreshList();
        }
        this.setState({
            deleteDisabled: false,
        });
    }

    /**table选中数据：checkbox勾选调用*/
    tableSelect = (data) => {
        this.setState({
            selectData: data || [],
        })
    }

    /** 租户号码详情 */
    detailTelephoneNumber = (data) => {
        this.setState({
            showNumberManagerModal: true,
            operationType: constant.OPERATION_TYPE_DETAIL,
            numberManager: data,
        });
    }

    render(){
        const {tenantTelephoneNumberConfigPageObject, tenant,} = this.props;
        const {selectData, numberManager, tenantTelephoneNumberConfigLoading, showNumberManagerModal, 
                modalTitle, showDeleteConfirm, showBatchDeleteConfirm, operationType, lineServerList, 
                deleteDisabled, } = this.state;
        return (
            <Row className="tenant-telephone-number-config">
                <ListTable 
                    form={this.props.form}
                    clearSelect = {!selectData.length}
                    handleSearch={this.searchData.bind(this)}
                    columns={columns(this)}
                    listDatas={tenantTelephoneNumberConfigPageObject.list || []}
                    totalPages={tenantTelephoneNumberConfigPageObject.pages || 0}
                    total={tenantTelephoneNumberConfigPageObject.total || 0}
                    onSelect={this.onPageIndexSelect.bind(this)}
                    onDataNumSelect={this.onPageSizeSelect.bind(this)}
                    searchDatas={searchCondition(this.props.form, this)}
                    getSelectedDataFunc={this.tableSelect.bind(this)}
                    showLoading={tenantTelephoneNumberConfigLoading}
                    searchButtons={{
                        right: [],
                        left: [{
                            type:"confirm",
                            onClick: this.addNumber.bind(this),
                            value:"新增"
                        }, {
                            type:"confirm",
                            onClick: this.batchDeleteNumber.bind(this),
                            value:"删除"
                        }],
                    }}
                />

                <Modal
                    className="number-manager-modal"
                    backdrop = "static"
                    onHide = { this.closeModal.bind(this) }
                    size={"xlg"}
                    show={showNumberManagerModal}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <NumberManagerInformation numberManager={numberManager} lineServerList={lineServerList} operationType={operationType} tenantId={tenant.id}
                        closeModal={this.closeModal.bind(this)} refreshList={this.refreshList.bind(this)} />
                    </Modal.Body>
                </Modal>

                {/* 删除 */}
                <Modal
                    show={showDeleteConfirm}
                    backdrop = "static"
                    onHide={this.closeModal.bind(this)} >
                    <Modal.Header closeButton>
                        <Modal.Title>{"确定删除租户号码：" + numberManager.telephoneNum + "？"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button onClick={this.closeModal.bind(this)} shape="border">取消</Button>
                        <Button disabled={deleteDisabled} onClick={this.confirmDelete.bind(this)} colors="primary">确认</Button>
                    </Modal.Footer>
                </Modal>

                {/* 批量删除 */}
                <Modal
                    show={showBatchDeleteConfirm}
                    backdrop = "static"
                    onHide={this.closeModal.bind(this)} >
                    <Modal.Header closeButton>
                        <Modal.Title>{"确定删除租户号码？"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button onClick={this.closeModal.bind(this)} shape="border">取消</Button>
                        <Button disabled={deleteDisabled} onClick={this.confirmBatchDeleteNumber.bind(this)} colors="primary">确认</Button>
                    </Modal.Footer>
                </Modal>
            </Row>
        )
    }
}

export default Form.createForm()(TenantTelephoneNumberConfig)