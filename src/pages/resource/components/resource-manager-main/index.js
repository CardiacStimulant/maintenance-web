import React, { Component } from 'react'
import Form from 'bee-form';
import {Row, Modal, Button, } from "tinper-bee";
import ListTable from "components/ListTable";
import {columns, searchCondition} from "./data/listTableData";
import * as constant from 'components/constant';
import * as HttpStateCode from 'components/HttpStateCode';
import ResourceManagerInformation from "../resource-manager-information";
import { Success, Warning, Error } from "utils";
import './index.less'
import { actions } from 'mirrorx';

class ResourceManagerMain extends Component {
    constructor(props){
        super(props)
        this.state = {
            resourceManagerLoading: true,   // 资源loading是否显示
            showResourceManagerModal: false,    // 是否显示资源modal
            showDeleteConfirm: false,   // 是否显示删除提示
            showBatchDeleteConfirm: false,  // 是否显示批量删除提示
            operationType: constant.OPERATION_TYPE_ADD, // 操作类型
            resource: {},    // 资源信息
            deleteDisabled: false,  // 删除按钮是否禁用
            selectData: [], // 选中的数据
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
        const {resourceManagerPageCondition} = this.props;
        this.props.form.validateFields(async (err, values) => {
            /** 设置查询条件 */
            let queryListParams = values;
            queryListParams.pageNum = 1;
            queryListParams.pageSize = resourceManagerPageCondition.pageSize || 10;
            // 查询工单分页数据
            await this.queryPage(queryListParams);
        });
    }

    /** 点击页数 */
    onPageIndexSelect = (value) => {
        const {resourceManagerPageCondition} = this.props;
        let params = resourceManagerPageCondition;
        params.pageNum = value || 1;
        params.pageSize = resourceManagerPageCondition.pageSize || 10;
        this.queryPage(params);
    }

    /** 选择每页条数 */
    onPageSizeSelect = (value) => {
        const {resourceManagerPageCondition} = this.props;
        let params = resourceManagerPageCondition;
        params.pageNum = 1;
        params.pageSize = value || 10;
        this.queryPage(params);
    }

    /** 刷新列表页 */
    refreshList = () => {
        const {resourceManagerPageCondition} = this.props;
        let params = resourceManagerPageCondition;
        params.pageNum = 1;
        params.pageSize = resourceManagerPageCondition.pageSize || 10;
        this.queryPage(params);
    }

    /** 查询数据 */
    queryPage = async (params) => {
        this.setState({resourceManagerLoading: true,});
        await actions.ResourceManager.queryPage(params);
        this.setState({resourceManagerLoading: false,});
    }

    /** 新增资源 */
    addResource = () => {
        this.setState({
            showResourceManagerModal: true,
            operationType: constant.OPERATION_TYPE_ADD,
            resource: {},
        });
    }

    /** 编辑资源 */
    editResource = (data) => {
        this.setState({
            showResourceManagerModal: true,
            operationType: constant.OPERATION_TYPE_EDIT,
            resource: data,
        });
    }

    /** 资源详情 */
    detailResource = (data) => {
        this.setState({
            showResourceManagerModal: true,
            operationType: constant.OPERATION_TYPE_DETAIL,
            resource: data,
        });
    }

    /** 删除资源 */
    deleteResource = (data) =>{
        this.setState({
            showDeleteConfirm: true,
            resource: data
        });
    }

    /** 关闭modal */
    closeModal = () => {
        this.setState({
            showResourceManagerModal: false,
            showDeleteConfirm: false,
            showBatchDeleteConfirm: false,
            resource: {},
            selectData: [],
        });
    }

    /** 确认删除 */
    confirmDelete = async () => {
        const {resource} = this.state;
        this.setState({
            deleteDisabled: true,
        });
        let res = await actions.ResourceManager.deleteResource(resource);
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
    batchDeleteResource = async () => {
        const {selectData} = this.state;
        if(selectData && selectData.length>0) {
            this.setState({showBatchDeleteConfirm: true,});
        } else {
            Warning("请先选择数据");
        }
    }

    /** 批量删除 */
    confirmBatchDeleteResource = async () => {
        const {selectData} = this.state;
        this.setState({
            deleteDisabled: true,
        });
        let res = await actions.ResourceManager.batchDeleteResource(selectData);
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
        const {resourceManagerPageObject} = this.props;
        const {resourceManagerLoading, showResourceManagerModal, showDeleteConfirm, showBatchDeleteConfirm, resource, operationType, deleteDisabled, selectData,} = this.state;
        let modalTitle = "";
        if(operationType === constant.OPERATION_TYPE_ADD) {
            modalTitle = "新增资源";
        } else if(operationType === constant.OPERATION_TYPE_DETAIL) {
            modalTitle = "资源详情";
        } else if(operationType === constant.OPERATION_TYPE_EDIT) {
            modalTitle = "编辑资源";
        }
        return (
            <Row className="resource-manager-main">
                <ListTable 
                    form={this.props.form}
                    clearSelect = {!selectData.length}
                    handleSearch={this.searchData.bind(this)}
                    columns={columns(this)}
                    listDatas={resourceManagerPageObject.list || []}
                    totalPages={resourceManagerPageObject.pages || 0}
                    total={resourceManagerPageObject.total || 0}
                    onSelect={this.onPageIndexSelect.bind(this)}
                    onDataNumSelect={this.onPageSizeSelect.bind(this)}
                    searchDatas={searchCondition(this.props.form)}
                    getSelectedDataFunc={this.tableSelect.bind(this)}
                    showLoading={resourceManagerLoading}
                    searchButtons={{
                        right: [],
                        left: [{
                            type:"confirm",
                            onClick: this.addResource.bind(this),
                            value:"新增"
                        }, {
                            type:"confirm",
                            onClick: this.batchDeleteResource.bind(this),
                            value:"删除"
                        }],
                    }}
                />

                <Modal
                    className="resource-manager-modal"
                    backdrop = "static"
                    onHide = { this.closeModal.bind(this) }
                    size={"xlg"}
                    show={showResourceManagerModal}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ResourceManagerInformation resource={resource} operationType={operationType} closeModal={this.closeModal.bind(this)} refreshList={this.refreshList.bind(this)} />
                    </Modal.Body>
                </Modal>

                {/* 删除 */}
                <Modal
                    show={showDeleteConfirm}
                    backdrop = "static"
                    onHide={this.closeModal.bind(this)} >
                    <Modal.Header closeButton>
                        <Modal.Title>{"确定删除资源：" + resource.name + "(" + resource.code + ")？"}</Modal.Title>
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
                        <Modal.Title>{"确定删除资源？"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button onClick={this.closeModal.bind(this)} shape="border">取消</Button>
                        <Button disabled={deleteDisabled} onClick={this.confirmBatchDeleteResource.bind(this)} colors="primary">确认</Button>
                    </Modal.Footer>
                </Modal>
            </Row>
        )
    }
}

export default Form.createForm()(ResourceManagerMain)