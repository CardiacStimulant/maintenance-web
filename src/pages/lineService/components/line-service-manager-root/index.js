import React, { Component } from 'react'
import Form from 'bee-form';
import {Row, Modal, Button, } from "tinper-bee";
import ListTable from "components/ListTable";
import {columns, searchCondition} from "./data/listTableData";
import LinServiceInfomation from "../line-service-infomation";
import * as constant from 'components/constant';
import { Success, Warning, Error } from "utils";
import { actions } from 'mirrorx';
import './index.less'

class LineServiceManagerRoot extends Component {
    constructor(props){
        super(props)
        this.state = {
            lineServiceLoading: true,   // 线路服务loading是否显示
            lineServiceModal: false, // 线路服务配置modal是否显示
            showDeleteConfirm: false,  // 删除提示
            showBatchDeleteConfirm: false, // 批量删除提示
            deleteDisabled: false,  // 删除按钮禁用
            lineService: {}, // 待配置的线路服务信息
            modalTitle: "", // 标题
            operationType: "",  // 操作类型
            selectData: [], //列表页选中项
        }
    }

    componentDidMount() {
        // 查询线路服务信息
        this.queryPage({
            pageNum: 1,
            pageSize: 10,
        });
    }

    /** 点击查询 */
    searchData = () => {
        const {lineServicePageCondition} = this.props;
        this.props.form.validateFields(async (err, values) => {
            /** 设置查询条件 */
            let queryListParams = values;
            queryListParams.pageNum = 1;
            queryListParams.pageSize = lineServicePageCondition.pageSize || 10;
            // 查询工单分页数据
            await this.queryPage(queryListParams);
        });
    }

    /** 点击页数 */
    onPageIndexSelect = (value) => {
        const {lineServicePageCondition} = this.props;
        let params = lineServicePageCondition;
        params.pageNum = value || 1;
        params.pageSize = lineServicePageCondition.pageSize || 10;
        this.queryPage(params);
    }

    /** 选择每页条数 */
    onPageSizeSelect = (value) => {
        const {lineServicePageCondition} = this.props;
        let params = lineServicePageCondition;
        params.pageNum = 1;
        params.pageSize = value || 10;
        this.queryPage(params);
    }

    /** 刷新列表页 */
    refreshList = () => {
        const {lineServicePageCondition} = this.props;
        let params = lineServicePageCondition;
        params.pageNum = 1;
        params.pageSize = lineServicePageCondition.pageSize || 10;
        this.queryPage(params);
    }

    /** 查询数据 */
    queryPage = async (params) => {
        this.setState({lineServiceLoading: true,});
        await actions.LineServiceManager.queryPage(params);
        this.setState({lineServiceLoading: false,});
    }

    /**table选中数据：checkbox勾选调用*/
    tableSelect = (data) => {
        this.setState({
            selectData: data || [],
        })
    }

    // 新增线路服务
    addLineService = () => {
        this.setState({
            lineServiceModal: true,
            lineService: {},
            modalTitle: "新增线路服务",
            operationType: constant.OPERATION_TYPE_ADD,
        });
    }

    // 编辑线路服务
    editLineService = (data) => {
        this.setState({
            lineServiceModal: true,
            lineService: data,
            modalTitle: "编辑线路服务",
            operationType: constant.OPERATION_TYPE_EDIT,
        });
    }

    // 删除线路服务
    deleteLineService = (data) => {
        this.setState({
            showDeleteConfirm: true,
            lineService: data,
        });
    }

    /** 确认删除 */
    confirmDelete = async () => {
        const {lineService} = this.state;
        this.setState({
            deleteDisabled: true,
        });
        let res = await actions.LineServiceManager.deleteLineService({serverId: lineService.serverId});
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
    batchDeleteLineService = async () => {
        const {selectData} = this.state;
        if(selectData && selectData.length>0) {
            this.setState({showBatchDeleteConfirm: true,});
        } else {
            Warning("请先选择数据");
        }
    }

    /** 批量删除 */
    confirmBatchDeleteLineService = async () => {
        const {selectData} = this.state;
        this.setState({
            deleteDisabled: true,
        });
        let ids = [];
        if(selectData && selectData.length>0) {
            selectData.map((item) => {
                ids.push(item.serverId);
            });
        }
        let res = await actions.LineServiceManager.batchDeleteLineService(ids);
        if(res && res.success) {
            Success("删除成功");
            this.closeModal();
            this.refreshList();
        }
        this.setState({
            deleteDisabled: false,
        });
    }

    // 关闭modal
    closeModal =() => {
        this.setState({
            lineServiceModal: false,
            showBatchDeleteConfirm: false,
            showDeleteConfirm: false,
            selectData: [],
            lineService: {},
        });
    }

    render(){
        const {lineServicePageObject, } = this.props;
        const {lineServiceLoading, lineServiceModal, lineService, modalTitle, operationType, showDeleteConfirm, showBatchDeleteConfirm, deleteDisabled, selectData,} = this.state;
        return (
            <Row className="line-service-manager-root">
                <ListTable 
                    form={this.props.form}
                    clearSelect = {!selectData.length}
                    handleSearch={this.searchData.bind(this)}
                    columns={columns(this)}
                    listDatas={lineServicePageObject.list || []}
                    totalPages={lineServicePageObject.pages || 0}
                    total={lineServicePageObject.total || 0}
                    onSelect={this.onPageIndexSelect.bind(this)}
                    onDataNumSelect={this.onPageSizeSelect.bind(this)}
                    searchDatas={searchCondition(this.props.form)}
                    getSelectedDataFunc={this.tableSelect.bind(this)}
                    showLoading={lineServiceLoading}
                    searchButtons={{
                        right: [],
                        left: [{
                            type:"confirm",
                            onClick: this.addLineService.bind(this),
                            value:"新增"
                        }, {
                            type:"confirm",
                            onClick: this.batchDeleteLineService.bind(this),
                            value:"删除"
                        }],
                    }}
                />

                <Modal
                    className="line-service-modal"
                    backdrop = "static"
                    onHide = { this.closeModal.bind(this) }
                    size={"xlg"}
                    show={lineServiceModal}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <LinServiceInfomation lineService={lineService} operationType={operationType} closeModal={this.closeModal.bind(this)} refreshList={this.refreshList.bind(this)} />
                    </Modal.Body>
                </Modal>

                {/* 删除 */}
                <Modal
                    show={showDeleteConfirm}
                    backdrop = "static"
                    onHide={this.closeModal.bind(this)} >
                    <Modal.Header closeButton>
                        <Modal.Title>{"确定删除线路服务：" + lineService.serverName + "？"}</Modal.Title>
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
                        <Modal.Title>{"确定删除线路服务？"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button onClick={this.closeModal.bind(this)} shape="border">取消</Button>
                        <Button disabled={deleteDisabled} onClick={this.confirmBatchDeleteLineService.bind(this)} colors="primary">确认</Button>
                    </Modal.Footer>
                </Modal>
            </Row>
        )
    }
}

export default Form.createForm()(LineServiceManagerRoot)