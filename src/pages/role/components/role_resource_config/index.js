import React, { Component } from 'react'
import Form from 'bee-form';
import {Row, Col, Loading, Icon, } from "tinper-bee";
import ListTable from "components/ListTable";
import * as commentAction from "utils/commentAction";
import {columns, searchCondition} from "./data/listTableData";
import { actions } from 'mirrorx';
import { Success, Warning, Error } from "utils";
import './index.less'

const FormItem = Form.FormItem;

class RoleResourceConfig extends Component {
    constructor(props){
        super(props)
        this.state = {
            roleResourceConfigLoading: true,    // 整体loading
            waitConfigListLoading: true,    // 待配置loading
            configuredListLoading: true,    // 已配置loading
            waitConfigPage: {}, // 待配置分页数据
            waitConfigPageCondition: {},  // 待配置分页数据查询条件
            configuredPage: {}, // 已配置分页数据
            configuredPageCondition: {},  // 已配置分页数据查询条件
            waitSelectData: {}, // 待配置选择项
            configuredSelectData: {}, // 已配置选择项
        }
    }

    componentDidMount = async () => {
        const {role} = this.props;
        // 查询待配置资源分页数据
        const waitConfigPageCondition = {
            pageNum: 1,
            pageSize: 10,
            roleId: role.id || 0,
            searchConfig: "wait",
        };
        this.queryPage(waitConfigPageCondition);
        // 查询已配置资源分页数据
        const configuredPageCondition = {
            pageNum: 1,
            pageSize: 10,
            roleId: role.id || 0,
            searchConfig: "configured",
        };
        this.queryPage(configuredPageCondition);
        this.setState({
            roleResourceConfigLoading: false,
        });
    }

    /**table选中数据：checkbox勾选调用*/
    tableWaitSelect = (data) => {
        this.setState({
            waitSelectData: data || [],
        })
    }

    /**table选中数据：checkbox勾选调用*/
    tableConfiguredSelect = (data) => {
        this.setState({
            configuredSelectData: data || [],
        })
    }

    searchWaitData=() => {
        this.searchData("wait");
    }

    searchConfiguredData=() => {
        this.searchData("configured");
    }

    /** 点击查询 */
    searchData = (searchConfig) => {
        const {role} = this.props;
        const {waitConfigPageCondition, configuredPageCondition} = this.state;
        this.props.form.validateFields(async (err, values) => {
            /** 设置查询条件 */
            let newValues = {};
            for(let key in values){
                let newKey = key.replace(searchConfig + "_", "");
                newValues[newKey] = values[key] || "";
            }
            let queryListParams = newValues;
            queryListParams.roleId = role.id || 0;
            queryListParams.searchConfig=searchConfig || "";
            switch(searchConfig) {
                case "wait": 
                    queryListParams.pageNum = 1;
                    queryListParams.pageSize = waitConfigPageCondition.pageSize || 10;
                    break;
                case "configured": 
                    queryListParams.pageNum = 1;
                    queryListParams.pageSize = configuredPageCondition.pageSize || 10;
                    break;
            }
            // 查询工单分页数据
            await this.queryPage(queryListParams);
        });
    }

    onWaitPageIndexSelect=(value) => {
        this.onPageIndexSelect("wait", value);
    }

    onConfiguredPageIndexSelect=(value) => {
        this.onPageIndexSelect("configured", value);
    }

    /** 点击页数 */
    onPageIndexSelect = (searchConfig, value) => {
        const {roleManagerPageCondition} = this.props;
        let params = roleManagerPageCondition;
        params.pageNum = value || 1;
        params.pageSize = roleManagerPageCondition.pageSize || 10;
        this.queryPage(params);
    }

    onWaitPageSizeSelect=(value) => {
        this.onPageSizeSelect("wait", value);
    }

    onConfiguredPageSizeSelect=(value) => {
        this.onPageSizeSelect("configured", value);
    }

    /** 选择每页条数 */
    onPageSizeSelect = (searchConfig, value) => {
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
        switch(params.searchConfig) {
            case "wait": 
                this.setState({waitConfigListLoading: true,});
                const waitConfigPageCondition = params;
                const waitConfigPage = await commentAction.resource_queryConfigPage(params, actions.RoleManager, "", `${GROBAL_HTTP_CTX}`);
                this.setState({waitSelectData: [], waitConfigListLoading: false, waitConfigPageCondition: waitConfigPageCondition, waitConfigPage: waitConfigPage.result,});
                break;
            case "configured": 
                this.setState({configuredListLoading: true,});
                const configuredPageCondition = params;
                const configuredPage = await commentAction.resource_queryConfigPage(params, actions.RoleManager, "", `${GROBAL_HTTP_CTX}`);
                await actions.RoleManager.queryPage(params);
                this.setState({configuredSelectData:[], configuredListLoading: false, configuredPageCondition: configuredPageCondition, configuredPage: configuredPage.result,});
                break;
        }
    }

    /** 添加全部资源 */
    addAll = async() => {
        const {role,} = this.props;
        this.setState({
            roleResourceConfigLoading: true,
        });
        // 角色添加全部未配置的资源
        const addAllResult = await actions.RoleManager.addAllRoleResource({
            roleId: role.id || 0,
        });
        if(addAllResult && addAllResult.success) {
            // 刷新待配置资源数据和已配置资源数据
            let {waitConfigPageCondition, configuredPageCondition} = this.state;
            waitConfigPageCondition.pageNum = 1;
            await this.queryPage(waitConfigPageCondition);
            configuredPageCondition.pageNum = 1;
            await this.queryPage(configuredPageCondition);
        } else {
            Error(addAllResult && addAllResult.message ? addAllResult.message : "配置资源失败");
        }
        this.setState({
            roleResourceConfigLoading: false,
        });
    }

    /** 移除全部资源 */
    removeAll = async() => {
        const {role,} = this.props;
        this.setState({
            roleResourceConfigLoading: true,
        });
        // 角色移除全部未配置的资源
        const removeAllResult = await actions.RoleManager.removeAllRoleResource({
            roleId: role.id || 0,
        });
        if(removeAllResult && removeAllResult.success) {
            // 刷新待配置资源数据和已配置资源数据
            let {waitConfigPageCondition, configuredPageCondition} = this.state;
            waitConfigPageCondition.pageNum = 1;
            await this.queryPage(waitConfigPageCondition);
            configuredPageCondition.pageNum = 1;
            await this.queryPage(configuredPageCondition);
        } else {
            Error(removeAllResult && removeAllResult.message ? removeAllResult.message : "移除资源失败");
        }
        this.setState({
            roleResourceConfigLoading: false,
        });
    }

    /** 添加资源 */
    addResource = async () => {
        this.setState({
            roleResourceConfigLoading: true,
        });
        const {waitSelectData} = this.state;
        const {role,} = this.props;
        if(waitSelectData && waitSelectData.length>0) {
            let addRoleResourceList = [];
            waitSelectData.map((item) =>{
                addRoleResourceList.push({
                    roleId: role.id || 0,
                    resourceId: item.id || 0,
                });
            });
            // 角色添加资源
            const addResult = await actions.RoleManager.addRoleResources(addRoleResourceList);
            if(addResult && addResult.success) {
                // 刷新待配置资源数据和已配置资源数据
                let {waitConfigPageCondition, configuredPageCondition} = this.state;
                waitConfigPageCondition.pageNum = 1;
                await this.queryPage(waitConfigPageCondition);
                configuredPageCondition.pageNum = 1;
                await this.queryPage(configuredPageCondition);
            } else {
                Error(addResult && addResult.message ? addResult.message : "添加资源失败");
            }
        } else {
            Warning("请先选择要添加的资源");
        }
        this.setState({
            roleResourceConfigLoading: false,
        });
    }

    /** 移除资源 */
    removeResource = async () => {
        this.setState({
            roleResourceConfigLoading: true,
        });
        const {configuredSelectData} = this.state;
        const {role,} = this.props;
        if(configuredSelectData && configuredSelectData.length>0) {
            let removeRoleResourceList = [];
            configuredSelectData.map((item) =>{
                removeRoleResourceList.push({
                    roleId: role.id || 0,
                    resourceId: item.id || 0,
                });
            });
            // 角色移除资源
            const removeResult = await actions.RoleManager.removeRoleResources(removeRoleResourceList);
            if(removeResult && removeResult.success) {
                // 刷新待配置资源数据和已配置资源数据
                let {waitConfigPageCondition, configuredPageCondition} = this.state;
                waitConfigPageCondition.pageNum = 1;
                await this.queryPage(waitConfigPageCondition);
                configuredPageCondition.pageNum = 1;
                await this.queryPage(configuredPageCondition);
            } else {
                Error(removeResult && removeResult.message ? removeResult.message : "移除资源失败");
            }
        } else {
            Warning("请先选择要移除的资源");
        }
        this.setState({
            roleResourceConfigLoading: false,
        });
    }

    render(){
        const {roleResourceConfigLoading, waitConfigListLoading, configuredListLoading, waitConfigPage, configuredPage, waitSelectData, configuredSelectData,} = this.state;
        return (
            <Row className="role-resource-config-main">
                <Loading
                    showBackDrop={true}
                    loadingType='line'
                    show={roleResourceConfigLoading}
                />
                <Col md={5} lg={5} xs={5}>
                    <ListTable 
                        form={this.props.form}
                        clearSelect = {!waitSelectData.length}
                        searchDatas={searchCondition(this.props.form, "wait")}
                        columns={columns(this)}
                        listDatas={waitConfigPage.list || []}
                        totalPages={waitConfigPage.pages || 0}
                        total={waitConfigPage.total || 0}
                        handleSearch={this.searchWaitData.bind(this)}
                        onSelect={this.onWaitPageIndexSelect.bind(this)}
                        onDataNumSelect={this.onWaitPageSizeSelect.bind(this)}
                        getSelectedDataFunc={this.tableWaitSelect.bind(this)}
                        showLoading={waitConfigListLoading}
                        searchButtons={{
                            right: [],
                            left: [{
                                type:"confirm",
                                onClick: this.addAll.bind(this),
                                value:"添加全部"
                            }],
                        }}
                    />
                </Col>
                <Col md={1} xs={1} sm={1}>
                    <div className="arrow">
                        <p><Icon type="uf-2arrow-right" className="arrow-icon" onClick={this.addResource.bind(this)} ></Icon></p>
                        <p><Icon type="uf-2arrow-left" className="arrow-icon" onClick={this.removeResource.bind(this)} ></Icon></p>
                    </div>
                </Col>
                <Col md={5} lg={5} xs={5}>
                    <ListTable 
                        form={this.props.form}
                        clearSelect = {!configuredSelectData.length}
                        searchDatas={searchCondition(this.props.form, "configured")}
                        columns={columns(this)}
                        listDatas={configuredPage.list || []}
                        totalPages={configuredPage.pages || 0}
                        total={configuredPage.total || 0}
                        handleSearch={this.searchConfiguredData.bind(this)}
                        onSelect={this.onConfiguredPageIndexSelect.bind(this)}
                        onDataNumSelect={this.onConfiguredPageSizeSelect.bind(this)}
                        getSelectedDataFunc={this.tableConfiguredSelect.bind(this)}
                        showLoading={configuredListLoading}
                        searchButtons={{
                            right: [],
                            left: [{
                                type:"confirm",
                                onClick: this.removeAll.bind(this),
                                value:"移除全部"
                            }],
                        }}
                    />
                </Col>
            </Row>
        )
    }
}

export default Form.createForm()(RoleResourceConfig)