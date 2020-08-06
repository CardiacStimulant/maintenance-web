import React, { Component } from 'react'
import Form from 'bee-form';
import {Row, Col, Label, FormControl, Button, Loading, Select, } from "tinper-bee";
import * as constant from 'components/constant';
import * as commentAction from "utils/commentAction";
import './index.less'
import { actions } from 'mirrorx';
import { Success, Warning, Error } from "utils";
import $ from 'jquery';

const FormItem = Form.FormItem;
const Option = Select.Option;

class UserManagerInformation extends Component {
    constructor(props){
        super(props)
        this.state = {
            roleAllList: [],
            saveDisabled: true,
            saveShowLoading: true,
        }
    }

    componentDidMount = async () => {
        // 查询角色信息
        const roleAllList = await commentAction.role_queryList({}, actions.UserManager, "", `${GROBAL_HTTP_CTX}`);
        this.setState({
            roleAllList: roleAllList ? roleAllList.result || [] : [],
            saveDisabled: false,
            saveShowLoading: false,
        });
    }

    /** 保存用户管理 */
    saveUserManager = async () => {
        const {userManager} = this.props;
        const self = this;
        this.setState({
            saveDisabled: true,
            saveShowLoading: true,
        });
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let newRoleList = [];
                values.roleList.map((role, index) => {
                    newRoleList.push({
                        id: role.split(",")[0],
                        name: role.split(",")[1],
                    });
                });
                values.roleList = newRoleList;
                let res;
                if(userManager && userManager.id) {
                    values.id = userManager.id;
                    values.version = userManager.version;
                    values.createTime = userManager.createTime;
                    values.createUser = userManager.createUser;
                    res = await actions.UserManager.updateUserManager(values);
                } else {
                    res = await actions.UserManager.addUserManager(values);
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
        const {userManager, operationType,} = this.props;
        const {saveDisabled, saveShowLoading, roleAllList,} = this.state;
        const { getFieldProps, getFieldError } = this.props.form;
        // 设置默认选中的角色信息
        let roleListInitialValue = [];
        if(userManager && userManager.roleList) {
            userManager.roleList.map((role) => {
                roleListInitialValue.push(role.id + "," + role.name);
            });
        }
        return (
            <Row className="user-manager-main form-item-layout">
                <Loading
                    showBackDrop={true}
                    loadingType='line'
                    show={saveShowLoading}
                />
                <Col md={4} lg={4} xs={4}>
                    <FormItem>
                        <Label>姓名<span className="not-empty-tag">*</span></Label>
                        <FormControl disabled={operationType==constant.OPERATION_TYPE_DETAIL}
                            {
                            ...getFieldProps('name', {
                                initialValue: userManager.name || "",
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
                        <Label>登录账号<span className="not-empty-tag">*</span></Label>
                        <FormControl disabled={operationType!=constant.OPERATION_TYPE_ADD}
                            {
                            ...getFieldProps('loginAccount', {
                                initialValue: userManager.loginAccount || "",
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
                            {getFieldError("loginAccount")}
                        </span>
                    </FormItem>
                </Col>
                <Col md={4} lg={4} xs={4}>
                    <FormItem>
                        <Label>工号</Label>
                        <FormControl disabled={operationType==constant.OPERATION_TYPE_DETAIL}
                            {
                            ...getFieldProps('jobNumber', {
                                initialValue: userManager.jobNumber || "",
                                normalize : function(v) {
                                    return v = $.trim(v);
                                },
                                rules: [{
                                    validator(rule, value, callback, source, options) {
                                        var errors = [];
                                        if (value && value.length>16) {
                                            callback("超过最大长度16");
                                        } else {
                                            callback(errors);
                                        }
                                    }
                                }] 
                            })
                            }
                        />
                        <span className='error'>
                            {getFieldError("jobNumber")}
                        </span>
                    </FormItem>
                </Col>
                <Col md={4} lg={4} xs={4}>
                    <FormItem>
                        <Label>手机号</Label>
                        <FormControl disabled={operationType==constant.OPERATION_TYPE_DETAIL}
                            {
                            ...getFieldProps('mobile', {
                                initialValue: userManager.mobile || "",
                                normalize : function(v) {
                                    return v = $.trim(v);
                                },
                                rules: [{
                                    validator(rule, value, callback, source, options) {
                                        var errors = [];
                                        if (value && value.length>16) {
                                            callback("超过最大长度16");
                                        } else if (value && !constant.CHECK_NUMBER2.test(value)) {
                                            callback("只能填写数字");
                                        } else {
                                            callback(errors);
                                        }
                                    }
                                }] 
                            })
                            }
                        />
                        <span className='error'>
                            {getFieldError("mobile")}
                        </span>
                    </FormItem>
                </Col>
                <Col md={4} lg={4} xs={4}>
                    <FormItem>
                        <Label>邮箱</Label>
                        <FormControl disabled={operationType==constant.OPERATION_TYPE_DETAIL}
                            {
                            ...getFieldProps('email', {
                                initialValue: userManager.email || "",
                                normalize : function(v) {
                                    return v = $.trim(v);
                                },
                                rules: [{
                                    validator(rule, value, callback, source, options) {
                                        var errors = [];
                                        if (value && value.length>64) {
                                            callback("超过最大长度64");
                                        } else if (value && !constant.CHECK_EMAIL.test(value)) {
                                            callback("邮箱格式错误");
                                        } else {
                                            callback(errors);
                                        }
                                    }
                                }] 
                            })
                            }
                        />
                        <span className='error'>
                            {getFieldError("email")}
                        </span>
                    </FormItem>
                </Col>
                <Col md={8} lg={8} xs={8}>
                    <FormItem>
                        <Label>角色</Label>
                        <Select disabled={operationType==constant.OPERATION_TYPE_DETAIL}
                            multiple
                            {...getFieldProps('roleList', {
                                initialValue: roleListInitialValue || [],
                            }) }
                        >
                            {
                                roleAllList && roleAllList.length > 0
                                    ? roleAllList.map((role, index) => {
                                        return <Option key={role.id} value={role.id + "," + role.name}>{role.name}</Option>
                                    })
                                    : []
                            }
                        </Select>
                    </FormItem>
                </Col>
                <Col md={12} lg={12} xs={12}>
                    <FormItem>
                        <Label>描述</Label>
                        <FormControl componentClass="textarea" disabled={operationType==constant.OPERATION_TYPE_DETAIL}
                            {
                            ...getFieldProps('comments', {
                                initialValue: userManager.comments || "",
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
                    <Row>
                        <Col md={6} lg={6} xs={6}>
                            <FormItem>
                                <Label>创建人</Label>
                                <FormControl disabled={true} value={userManager.createUser}/>
                            </FormItem>
                        </Col>
                        <Col md={6} lg={6} xs={6}>
                            <FormItem>
                                <Label>创建时间</Label>
                                <FormControl disabled={true} value={userManager.createTime}/>
                            </FormItem>
                        </Col>
                        <Col md={6} lg={6} xs={6}>
                            <FormItem>
                                <Label>修改人</Label>
                                <FormControl disabled={true} value={userManager.lastModifyUser}/>
                            </FormItem>
                        </Col>
                        <Col md={6} lg={6} xs={6}>
                            <FormItem>
                                <Label>修改时间</Label>
                                <FormControl disabled={true} value={userManager.lastModified}/>
                            </FormItem>
                        </Col>
                    </Row> : ""
                }
                <Col md={12} lg={12} xs={12}>
                    {
                        operationType==constant.OPERATION_TYPE_DETAIL? ""
                        : <Button size='sm' disabled={saveDisabled} className='save-btn' onClick={this.saveUserManager.bind(this)}>保存</Button>
                    }
                    <Button size='sm' className='cancel-btn' onClick={this.props.closeModal.bind(this)}>取消</Button>
                </Col>
            </Row>
        )
    }
}

export default Form.createForm()(UserManagerInformation)