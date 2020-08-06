import React, { Component } from 'react'
import Form from 'bee-form';
import {Row, Col, Label, FormControl, Button, Loading, } from "tinper-bee";
import * as constant from 'components/constant';
import { actions } from 'mirrorx';
import { Success, Warning, Error } from "utils";
import $ from 'jquery';
import './index.less'

const FormItem = Form.FormItem;

class RoleManagerInformation extends Component {
    constructor(props){
        super(props)
        this.state = {
            saveDisabled: false,
            saveShowLoading: false,
        }
    }

    componentDidMount = async () => {}

    /** 保存角色管理 */
    saveRole = async () => {
        const {role} = this.props;
        const self = this;
        this.setState({
            saveDisabled: true,
            saveShowLoading: true,
        });
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let res;
                if(role && role.id) {
                    values.id = role.id;
                    values.version = role.version;
                    values.createTime = role.createTime;
                    values.createUser = role.createUser;
                    res = await actions.RoleManager.updateRole(values);
                } else {
                    res = await actions.RoleManager.addRole(values);
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
        const {role, operationType,} = this.props;
        const {saveDisabled, saveShowLoading,} = this.state;
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <Row className="role-manager-main form-item-layout">
                <Loading
                    showBackDrop={true}
                    loadingType='line'
                    show={saveShowLoading}
                />
                <Col md={6} lg={6} xs={6}>
                    <FormItem>
                        <Label>角色名称<span className="not-empty-tag">*</span></Label>
                        <FormControl disabled={operationType==constant.OPERATION_TYPE_DETAIL}
                            {
                            ...getFieldProps('name', {
                                initialValue: role.name || "",
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
                <Col md={6} lg={6} xs={6}>
                    <FormItem>
                        <Label>角色编码<span className="not-empty-tag">*</span></Label>
                        <FormControl disabled={operationType!=constant.OPERATION_TYPE_ADD}
                            {
                            ...getFieldProps('code', {
                                initialValue: role.code || "",
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
                            {getFieldError("code")}
                        </span>
                    </FormItem>
                </Col>
                <Col md={12} lg={12} xs={12}>
                    <FormItem>
                        <Label>描述</Label>
                        <FormControl componentClass="textarea" disabled={operationType==constant.OPERATION_TYPE_DETAIL}
                            {
                            ...getFieldProps('comments', {
                                initialValue: role.comments || "",
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
                                <FormControl disabled={true} value={role.createUser}/>
                            </FormItem>
                        </Col>
                        <Col md={6} lg={6} xs={6}>
                            <FormItem>
                                <Label>创建时间</Label>
                                <FormControl disabled={true} value={role.createTime}/>
                            </FormItem>
                        </Col>
                        <Col md={6} lg={6} xs={6}>
                            <FormItem>
                                <Label>修改人</Label>
                                <FormControl disabled={true} value={role.lastModifyUser}/>
                            </FormItem>
                        </Col>
                        <Col md={6} lg={6} xs={6}>
                            <FormItem>
                                <Label>修改时间</Label>
                                <FormControl disabled={true} value={role.lastModified}/>
                            </FormItem>
                        </Col>
                    </Col> : ""
                }
                <Col md={12} lg={12} xs={12}>
                    {
                        operationType==constant.OPERATION_TYPE_DETAIL? ""
                        : <Button size='sm' disabled={saveDisabled} className='save-btn' onClick={this.saveRole.bind(this)}>保存</Button>
                    }
                    <Button size='sm' className='cancel-btn' onClick={this.props.closeModal.bind(this)}>取消</Button>
                </Col>
            </Row>
        )
    }
}

export default Form.createForm()(RoleManagerInformation)