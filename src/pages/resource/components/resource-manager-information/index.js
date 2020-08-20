import React, { Component } from 'react'
import Form from 'bee-form';
import {Row, Col, Label, FormControl, Button, Loading, Select, } from "tinper-bee";
import * as constant from 'components/constant';
import { actions } from 'mirrorx';
import { Success, Warning, Error } from "utils";
import $ from 'jquery';
import './index.less'

const FormItem = Form.FormItem;
const Option = Select.Option;

class ResourceManagerInformation extends Component {
    constructor(props){
        super(props)
        this.state = {
            saveDisabled: false,
            saveShowLoading: false,
            displayUrl: true,   // 是否显示资源路径字段
            disabledOwner: false,   // 资源归属是否禁用
        }
    }

    componentDidMount = async () => {
        const {resource} = this.props;
        if(resource && resource.type) {
            switch(resource.type) {
                case constant.RESOURCE_TYPE_MENU : 
                    this.setState({displayUrl: true,}); 
                    break;
                default: 
                    this.setState({displayUrl: false, disabledOwner: true,}); 
                    break;
                
            }
        } else {
            this.setState({displayUrl: true,}); 
        }
    }

    /** 资源类型切换 */
    resourceTypeChange = (value) => {
        switch(value) {
            case constant.RESOURCE_TYPE_MENU: 
                this.setState({displayUrl: true,}); 
                break;
            default: 
                this.setState({displayUrl: false, disabledOwner: true,}); 
                break;
        }
    }

    /** 保存资源 */
    saveResource = async () => {
        const {resource} = this.props;
        const self = this;
        this.setState({
            saveDisabled: true,
            saveShowLoading: true,
        });
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let res;
                if(resource && resource.id) {
                    values.id = resource.id;
                    values.version = resource.version;
                    values.createTime = resource.createTime;
                    values.createUser = resource.createUser;
                    res = await actions.ResourceManager.updateResource(values);
                } else {
                    res = await actions.ResourceManager.addResource(values);
                }
                if(res && res.success) {
                    Success("保存成功");
                    this.props.refreshList();
                    this.props.closeModal();
                }
            } else {
                Warning("页面填写数据错误，请检查");
            }
            self.setState({
                saveDisabled: false,
                saveShowLoading: false,
            });
        });
    }

    render(){
        const {resource, operationType,} = this.props;
        const {saveDisabled, saveShowLoading, displayUrl, disabledOwner,} = this.state;
        const { getFieldProps, getFieldError } = this.props.form;
        const _this = this;
        return (
            <Row className="resource-manager-main form-item-layout">
                <Loading
                    showBackDrop={true}
                    loadingType='line'
                    show={saveShowLoading}
                />
                <Col md={4} lg={4} xs={4}>
                    <FormItem>
                        <Label>资源名称<span className="not-empty-tag">*</span></Label>
                        <FormControl disabled={operationType==constant.OPERATION_TYPE_DETAIL}
                            {
                            ...getFieldProps('name', {
                                initialValue: resource.name || "",
                                normalize : function(v) {
                                    return v = $.trim(v);
                                },
                                rules: [{
                                    validator(rule, value, callback, source, options) {
                                        var errors = [];
                                        if(!value) {
                                            callback("不可为空");
                                        } else if (value.length>32) {
                                            callback("超过最大长度32");
                                        } else {
                                            callback(errors);
                                        }
                                    }
                                }] 
                            })
                            }
                        />
                        <span className='error'>
                            {getFieldError("name")}
                        </span>
                    </FormItem>
                </Col>
                <Col md={4} lg={4} xs={4}>
                    <FormItem>
                        <Label>资源类型<span className="not-empty-tag">*</span></Label>
                        <Select disabled={operationType==constant.OPERATION_TYPE_DETAIL}
                            {...getFieldProps('type', {
                                initialValue: resource.type || constant.RESOURCE_TYPE_MENU,
                                normalize: function (value, prevalue) {
                                    if(value!=prevalue) {
                                        _this.resourceTypeChange(value);
                                    }
                                    return value;
                                },
                            }) }
                        >
                            <Option value={constant.RESOURCE_TYPE_MENU}>菜单</Option>
                            <Option value={constant.RESOURCE_TYPE_BUTTON}>按钮</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col md={4} lg={4} xs={4}>
                    <FormItem>
                        <Label>资源归属<span className="not-empty-tag">*</span></Label>
                        <Select disabled={disabledOwner || operationType==constant.OPERATION_TYPE_DETAIL}
                            {...getFieldProps('owner', {
                                initialValue: disabledOwner ? constant.RESOURCE_OWNER_SYSTEM : resource.owner || constant.RESOURCE_OWNER_MAINTENANCE,
                            }) }
                        >
                            <Option value={constant.RESOURCE_OWNER_SYSTEM}>系统管理</Option>
                            <Option value={constant.RESOURCE_OWNER_MAINTENANCE}>运维管理</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col md={4} lg={4} xs={4}>
                    <FormItem>
                        <Label>资源编码<span className="not-empty-tag">*</span></Label>
                        <FormControl disabled={operationType!=constant.OPERATION_TYPE_ADD}
                            {
                            ...getFieldProps('key', {
                                initialValue: resource.key || "",
                                normalize : function(v) {
                                    return v = $.trim(v);
                                },
                                rules: [{
                                    validator(rule, value, callback, source, options) {
                                        var errors = [];
                                        if(!value) {
                                            callback("不可为空");
                                        } else if (value.length>32) {
                                            callback("超过最大长度32");
                                        } else if (!constant.CHECK_NUMBER_LETTER.test(value)) {
                                            callback("只能填写数字和字母组合");
                                        } else {
                                            callback(errors);
                                        }
                                    }
                                }] 
                            })
                            }
                        />
                        <span className='error'>
                            {getFieldError("key")}
                        </span>
                    </FormItem>
                </Col>
                {
                    displayUrl ?
                        <Col md={8} lg={8} xs={8}>
                            <FormItem>
                                <Label>资源路径<span className="not-empty-tag">*</span></Label>
                                <FormControl disabled={operationType==constant.OPERATION_TYPE_DETAIL}
                                    {
                                    ...getFieldProps('url', {
                                        initialValue: resource.url || "",
                                        normalize : function(v) {
                                            return v = $.trim(v);
                                        },
                                        rules: [{
                                            validator(rule, value, callback, source, options) {
                                                var errors = [];
                                                if(!value) {
                                                    callback("不可为空");
                                                } else if (value.length>128) {
                                                    callback("超过最大长度128");
                                                } else {
                                                    callback(errors);
                                                }
                                            }
                                        }] 
                                    })
                                    }
                                />
                                <span className='error'>
                                    {getFieldError("url")}
                                </span>
                            </FormItem>
                        </Col>
                    : ""
                }
                <Col md={12} lg={12} xs={12}>
                    <FormItem>
                        <Label>描述</Label>
                        <FormControl componentClass="textarea" disabled={operationType==constant.OPERATION_TYPE_DETAIL}
                            {
                            ...getFieldProps('comments', {
                                initialValue: resource.comments || "",
                                normalize : function(v) {
                                    return v = $.trim(v);
                                },
                                rules: [{
                                    validator(rule, value, callback, source, options) {
                                        var errors = [];
                                        if (value && value.length>128) {
                                            callback("超过最大长度128");
                                        } else {
                                            callback(errors);
                                        }
                                    }
                                }] 
                            })
                            }
                        />
                        <span className='error'>
                            {getFieldError("comments")}
                        </span>
                    </FormItem>
                </Col>
                {
                    operationType===constant.OPERATION_TYPE_DETAIL || operationType===constant.OPERATION_TYPE_EDIT ?
                    <Col md={12} lg={12} xs={12}>
                        <Col md={6} lg={6} xs={6}>
                            <FormItem>
                                <Label>创建人</Label>
                                <FormControl disabled={true} value={resource.createUser}/>
                            </FormItem>
                        </Col>
                        <Col md={6} lg={6} xs={6}>
                            <FormItem>
                                <Label>创建时间</Label>
                                <FormControl disabled={true} value={resource.createTime}/>
                            </FormItem>
                        </Col>
                        <Col md={6} lg={6} xs={6}>
                            <FormItem>
                                <Label>修改人</Label>
                                <FormControl disabled={true} value={resource.lastModifyUser}/>
                            </FormItem>
                        </Col>
                        <Col md={6} lg={6} xs={6}>
                            <FormItem>
                                <Label>修改时间</Label>
                                <FormControl disabled={true} value={resource.lastModified}/>
                            </FormItem>
                        </Col>
                    </Col> : ""
                }
                <Col md={12} lg={12} xs={12}>
                    {
                        operationType==constant.OPERATION_TYPE_DETAIL? ""
                        : <Button size='sm' disabled={saveDisabled} className='save-btn' onClick={this.saveResource.bind(this)}>保存</Button>
                    }
                    <Button size='sm' className='cancel-btn' onClick={this.props.closeModal.bind(this)}>取消</Button>
                </Col>
            </Row>
        )
    }
}

export default Form.createForm()(ResourceManagerInformation)