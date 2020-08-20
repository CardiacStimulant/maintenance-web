import React, { Component } from 'react'
import Form from 'bee-form';
import {Row, Modal, Button, } from "tinper-bee";
import ListTable from "components/ListTable";
import {columns, searchCondition} from "./data/listTableData";
import * as constant from 'components/constant';
import UserManagerInformation from "../user-manager-information";
import { Success, Warning, Error } from "utils";
import './index.less'
import { actions } from 'mirrorx';

class UserManagerMain extends Component {
    constructor(props){
        super(props)
        this.state = {
            userManagerLoading: true,   // 用户管理loading是否显示
            showUserManagerModal: false,    // 是否显示用户管理modal
            showDeleteConfirm: false,   // 是否显示删除提示
            showBatchDeleteConfirm: false,  // 是否显示批量删除提示
            operationType: constant.OPERATION_TYPE_ADD, // 操作类型
            userManager: {},    // 用户管理信息
            deleteDisabled: false,  // 删除按钮是否禁用
            selectData: [], // 选中的数据
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
            queryListParams.pageNum = 1;
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

    /** 刷新列表页 */
    refreshList = () => {
        const {userManagerPageCondition} = this.props;
        let params = userManagerPageCondition;
        params.pageNum = 1;
        params.pageSize = userManagerPageCondition.pageSize || 10;
        this.queryPage(params);
    }

    /** 查询数据 */
    queryPage = async (params) => {
        this.setState({userManagerLoading: true,});
        await actions.UserManager.queryPage(params);
        this.setState({userManagerLoading: false,});
    }

    /** 新增用户 */
    addUser = () => {
        this.setState({
            showUserManagerModal: true,
            operationType: constant.OPERATION_TYPE_ADD,
            userManager: {},
        });
    }

    /** 编辑用户 */
    editUser = (data) => {
        this.setState({
            showUserManagerModal: true,
            operationType: constant.OPERATION_TYPE_EDIT,
            userManager: data,
        });
    }

    /** 用户详情 */
    detailUser = (data) => {
        this.setState({
            showUserManagerModal: true,
            operationType: constant.OPERATION_TYPE_DETAIL,
            userManager: data,
        });
    }

    /** 删除用户 */
    deleteUser = (data) =>{
        this.setState({
            showDeleteConfirm: true,
            userManager: data
        });
    }

    /** 关闭modal */
    closeModal = () => {
        this.setState({
            showUserManagerModal: false,
            showDeleteConfirm: false,
            showBatchDeleteConfirm: false,
            userManager: {},
            selectData: [],
        });
    }

    /** 确认删除 */
    confirmDelete = async () => {
        const {userManager} = this.state;
        this.setState({
            deleteDisabled: true,
        });
        let res = await actions.UserManager.deleteUserManager(userManager);
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
    batchDeleteUser = async () => {
        const {selectData} = this.state;
        if(selectData && selectData.length>0) {
            this.setState({showBatchDeleteConfirm: true,});
        } else {
            Warning("请先选择数据");
        }
    }

    /** 批量删除 */
    confirmBatchDeleteUser = async () => {
        const {selectData} = this.state;
        this.setState({
            deleteDisabled: true,
        });
        let res = await actions.UserManager.batchDeleteUserManager(selectData);
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

    render(){
        const {userManagerPageObject} = this.props;
        const {userManagerLoading, showUserManagerModal, showDeleteConfirm, showBatchDeleteConfirm, userManager, operationType, deleteDisabled, selectData,} = this.state;
        let modalTitle = "";
        if(operationType === constant.OPERATION_TYPE_ADD) {
            modalTitle = "新增用户";
        } else if(operationType === constant.OPERATION_TYPE_DETAIL) {
            modalTitle = "用户详情";
        } else if(operationType === constant.OPERATION_TYPE_EDIT) {
            modalTitle = "编辑用户";
        }
        return (
            <Row className="user-manager-main">
                <ListTable 
                    form={this.props.form}
                    clearSelect = {!selectData.length}
                    handleSearch={this.searchData.bind(this)}
                    columns={columns(this)}
                    listDatas={userManagerPageObject.list || []}
                    totalPages={userManagerPageObject.pages || 0}
                    total={userManagerPageObject.total || 0}
                    onSelect={this.onPageIndexSelect.bind(this)}
                    onDataNumSelect={this.onPageSizeSelect.bind(this)}
                    searchDatas={searchCondition(this.props.form)}
                    getSelectedDataFunc={this.tableSelect.bind(this)}
                    showLoading={userManagerLoading}
                    searchButtons={{
                        right: [],
                        left: [{
                            type:"confirm",
                            onClick: this.addUser.bind(this),
                            value:"新增"
                        }, {
                            type:"confirm",
                            onClick: this.batchDeleteUser.bind(this),
                            value:"删除"
                        }],
                    }}
                />

                <Modal
                    className="user-manager-modal"
                    backdrop = "static"
                    onHide = { this.closeModal.bind(this) }
                    size={"xlg"}
                    show={showUserManagerModal}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <UserManagerInformation userManager={userManager} operationType={operationType} closeModal={this.closeModal.bind(this)} refreshList={this.refreshList.bind(this)} />
                    </Modal.Body>
                </Modal>

                {/* 删除 */}
                <Modal
                    show={showDeleteConfirm}
                    backdrop = "static"
                    onHide={this.closeModal.bind(this)} >
                    <Modal.Header closeButton>
                        <Modal.Title>{"确定删除用户：" + userManager.name + "(" + userManager.loginAccount + ")？"}</Modal.Title>
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
                        <Modal.Title>{"确定删除用户？"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button onClick={this.closeModal.bind(this)} shape="border">取消</Button>
                        <Button disabled={deleteDisabled} onClick={this.confirmBatchDeleteUser.bind(this)} colors="primary">确认</Button>
                    </Modal.Footer>
                </Modal>
            </Row>
        )
    }
}

export default Form.createForm()(UserManagerMain)