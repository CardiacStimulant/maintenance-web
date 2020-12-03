import React, { Component } from 'react'
import Form from 'bee-form';
import {Row, Modal, Button, } from "tinper-bee";
import ListTable from "components/ListTable";
import {columns, searchCondition} from "./data/listTableData";
import * as constant from 'components/constant';
import * as HttpStateCode from 'components/HttpStateCode';
import RoleManagerInformation from "../role-manager-information";
import RoleResourceConfig from "../role_resource_config";
import { Success, Warning, Error } from "utils";
import './index.less'
import { actions } from 'mirrorx';

class RoleManagerMain extends Component {
    constructor(props){
        super(props)
        this.state = {
            roleManagerLoading: true,   // 角色管理loading是否显示
            showRoleManagerModal: false,    // 是否显示角色管理modal
            showRoleResourceConfigModal: false, // 是否显示角色资源配置modal
            showDeleteConfirm: false,   // 是否显示删除提示
            showBatchDeleteConfirm: false,  // 是否显示批量删除提示
            operationType: constant.OPERATION_TYPE_ADD, // 操作类型
            role: {},    // 角色管理信息
            deleteDisabled: false,  // 删除按钮是否禁用
            selectData: [], // 选中的数据
        }
    }

    componentDidMount() {
        // 查询角色管理信息
        this.queryPage({
            pageNum: 1,
            pageSize: 10,
        });
    }

    /** 点击查询 */
    searchData = () => {
        const {roleManagerPageCondition} = this.props;
        this.props.form.validateFields(async (err, values) => {
            /** 设置查询条件 */
            let queryListParams = values;
            queryListParams.pageNum = 1;
            queryListParams.pageSize = roleManagerPageCondition.pageSize || 10;
            // 查询工单分页数据
            await this.queryPage(queryListParams);
        });
    }

    /** 点击页数 */
    onPageIndexSelect = (value) => {
        const {roleManagerPageCondition} = this.props;
        let params = roleManagerPageCondition;
        params.pageNum = value || 1;
        params.pageSize = roleManagerPageCondition.pageSize || 10;
        this.queryPage(params);
    }

    /** 选择每页条数 */
    onPageSizeSelect = (value) => {
        const {roleManagerPageCondition} = this.props;
        let params = roleManagerPageCondition;
        params.pageNum = 1;
        params.pageSize = value || 10;
        this.queryPage(params);
    }

    /** 刷新列表页 */
    refreshList = () => {
        const {roleManagerPageCondition} = this.props;
        let params = roleManagerPageCondition;
        params.pageNum = 1;
        params.pageSize = roleManagerPageCondition.pageSize || 10;
        this.queryPage(params);
    }

    /** 查询数据 */
    queryPage = async (params) => {
        this.setState({roleManagerLoading: true,});
        await actions.RoleManager.queryPage(params);
        this.setState({roleManagerLoading: false,});
    }

    /** 新增角色 */
    addRole = () => {
        this.setState({
            showRoleManagerModal: true,
            operationType: constant.OPERATION_TYPE_ADD,
            role: {},
        });
    }

    /** 编辑角色 */
    editRole = (data) => {
        this.setState({
            showRoleManagerModal: true,
            operationType: constant.OPERATION_TYPE_EDIT,
            role: data,
        });
    }

    /** 角色详情 */
    detailRole = (data) => {
        this.setState({
            showRoleManagerModal: true,
            operationType: constant.OPERATION_TYPE_DETAIL,
            role: data,
        });
    }

    /** 删除角色 */
    deleteRole = (data) =>{
        this.setState({
            showDeleteConfirm: true,
            role: data
        });
    }

    /** 角色配置资源权限 */
    resourceConfig = (data) => {
        this.setState({
            showRoleResourceConfigModal: true,
            role: data
        });
    }

    /** 关闭modal */
    closeModal = () => {
        this.setState({
            showRoleManagerModal: false,
            showDeleteConfirm: false,
            showBatchDeleteConfirm: false,
            showRoleResourceConfigModal: false,
            role: {},
            selectData: [],
        });
    }

    /** 确认删除 */
    confirmDelete = async () => {
        const {role} = this.state;
        this.setState({
            deleteDisabled: true,
        });
        let res = await actions.RoleManager.deleteRole(role);
        if(res && res.code===HttpStateCode.OK) {
            Success("删除成功");
            this.refreshList();
            this.closeModal();
        }
        this.setState({
            deleteDisabled: false,
        });
    }

    /** 批量删除 */
    batchDeleteRole = async () => {
        const {selectData} = this.state;
        if(selectData && selectData.length>0) {
            this.setState({showBatchDeleteConfirm: true,});
        } else {
            Warning("请先选择数据");
        }
    }

    /** 批量删除 */
    confirmBatchDeleteRole = async () => {
        const {selectData} = this.state;
        this.setState({
            deleteDisabled: true,
        });
        let res = await actions.RoleManager.batchDeleteRole(selectData);
        if(res && res.code===HttpStateCode.OK) {
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

    render(){
        const {roleManagerPageObject} = this.props;
        const {roleManagerLoading, showRoleManagerModal, showDeleteConfirm, showBatchDeleteConfirm, role, operationType, deleteDisabled, selectData, showRoleResourceConfigModal,} = this.state;
        let modalTitle = "";
        if(operationType === constant.OPERATION_TYPE_ADD) {
            modalTitle = "新增角色";
        } else if(operationType === constant.OPERATION_TYPE_DETAIL) {
            modalTitle = "角色详情";
        } else if(operationType === constant.OPERATION_TYPE_EDIT) {
            modalTitle = "编辑角色";
        }
        return (
            <Row className="role-manager-main">
                <ListTable 
                    form={this.props.form}
                    clearSelect = {!selectData.length}
                    handleSearch={this.searchData.bind(this)}
                    columns={columns(this)}
                    listDatas={roleManagerPageObject.list || []}
                    totalPages={roleManagerPageObject.pages || 0}
                    total={roleManagerPageObject.total || 0}
                    onSelect={this.onPageIndexSelect.bind(this)}
                    onDataNumSelect={this.onPageSizeSelect.bind(this)}
                    searchDatas={searchCondition(this.props.form)}
                    getSelectedDataFunc={this.tableSelect.bind(this)}
                    showLoading={roleManagerLoading}
                    searchButtons={{
                        right: [],
                        left: [{
                            type:"confirm",
                            onClick: this.addRole.bind(this),
                            value:"新增"
                        }, {
                            type:"confirm",
                            onClick: this.batchDeleteRole.bind(this),
                            value:"删除"
                        }],
                    }}
                />

                <Modal
                    className="role-manager-modal"
                    backdrop = "static"
                    onHide = { this.closeModal.bind(this) }
                    size={"xlg"}
                    show={showRoleManagerModal}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <RoleManagerInformation role={role} operationType={operationType} closeModal={this.closeModal.bind(this)} refreshList={this.refreshList.bind(this)} />
                    </Modal.Body>
                </Modal>

                {/* 删除 */}
                <Modal
                    show={showDeleteConfirm}
                    backdrop = "static"
                    onHide={this.closeModal.bind(this)} >
                    <Modal.Header closeButton>
                        <Modal.Title>{"确定删除角色：" + role.name + "（" + role.code + "）？"}</Modal.Title>
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
                        <Modal.Title>{"确定删除角色？"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button onClick={this.closeModal.bind(this)} shape="border">取消</Button>
                        <Button disabled={deleteDisabled} onClick={this.confirmBatchDeleteRole.bind(this)} colors="primary">确认</Button>
                    </Modal.Footer>
                </Modal>

                {/* 角色资源配置 */}
                <Modal
                    className="role-resource-config-modal"
                    backdrop = "static"
                    onHide = { this.closeModal.bind(this) }
                    size={"xlg"}
                    show={showRoleResourceConfigModal}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{role.name + "（" + role.code + "）" + "资源配置"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <RoleResourceConfig role={role} closeModal={this.closeModal.bind(this)} />
                    </Modal.Body>
                </Modal>
            </Row>
        )
    }
}

export default Form.createForm()(RoleManagerMain)