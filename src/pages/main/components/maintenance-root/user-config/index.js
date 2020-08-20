import React, { Component } from 'react'
import Form from 'bee-form';
import {Row, Col, Label, FormControl, Button, Loading, } from "tinper-bee";
import './index.less'
import { actions } from 'mirrorx';
import { Success, Warning, Error } from "utils";
import $ from 'jquery';

const FormItem = Form.FormItem;

class UserConfig extends Component {
    constructor(props){
        super(props)
        this.state = {
            configDisabled: false,
            configShowLoading: false,
        }
    }

    componentDidMount = async () => {}

    // 确认账户设置
    confirmUserConfig =() => {
        const {userInfo} = this.props;
        const self = this;
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                if(values.newPassword!==values.confirmPassword) {
                    Warning("新密码两次输入不一致，请检查");
                    return ;
                }
                if(values.password===values.newPassword) {
                    Warning("原密码与新密码相同，无需修改");
                    return ;
                }
                self.setState({
                    configDisabled: true, // 按钮禁用
                    configShowLoading: true,    // loading
                });
                // 用户ID
                values.userId = userInfo.user.id || 0;
                // 版本号
                values.version = userInfo.user.version || 0;
                // 更新用户密码
                const res = await actions.Maintenance.updateUserPassword(values);
                self.setState({
                    saveDisabled: false,
                    saveShowLoading: false,
                });
                if(res && res.success) {
                    Success("保存成功");
                    self.props.closeModal();
                }
            } else {
                Warning("页面填写数据错误，请检查");
            }
        });
    }

    render(){
        const {configDisabled, configShowLoading,} = this.state;
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <Row>
                <Loading
                    showBackDrop={true}
                    loadingType='line'
                    show={configShowLoading}
                />
                <Col md={10} lg={10} xs={10}>
                    <FormItem>
                        <Label>原密码<span className="not-empty-tag">*</span></Label>
                        <FormControl type = "password"
                            {
                            ...getFieldProps('password', {
                                initialValue: "",
                                normalize : function(v) {
                                    return v = $.trim(v);
                                },
                                rules: [{
                                    validator(rule, value, callback, source, options) {
                                        var errors = [];
                                        if(!value) {
                                            callback("不可为空");
                                        } else if(value.length<6) {
                                            callback("密码长度不可小于6位");
                                        } else if(value.length>32) {
                                            callback("密码长度不可大于32位");
                                        } else {
                                            callback(errors);
                                        }
                                    }
                                }] 
                            })
                            }
                        />
                        <span className='error'>
                            {getFieldError("password")}
                        </span>
                    </FormItem>
                </Col>
                <Col md={10} lg={10} xs={10}>
                    <FormItem>
                        <Label>新密码<span className="not-empty-tag">*</span></Label>
                        <FormControl type = "password"
                            {
                            ...getFieldProps('newPassword', {
                                initialValue: "",
                                normalize : function(v) {
                                    return v = $.trim(v);
                                },
                                rules: [{
                                    validator(rule, value, callback, source, options) {
                                        var errors = [];
                                        if(!value) {
                                            callback("不可为空");
                                        } else if(value.length<6) {
                                            callback("密码长度不可小于6位");
                                        } else if(value.length>32) {
                                            callback("密码长度不可大于32位");
                                        } else {
                                            callback(errors);
                                        }
                                    }
                                }] 
                            })
                            }
                        />
                        <span className='error'>
                            {getFieldError("newPassword")}
                        </span>
                    </FormItem>
                </Col>
                <Col md={10} lg={10} xs={10}>
                    <FormItem>
                        <Label>确认新密码<span className="not-empty-tag">*</span></Label>
                        <FormControl type = "password"
                            {
                            ...getFieldProps('confirmPassword', {
                                initialValue: "",
                                normalize : function(v) {
                                    return v = $.trim(v);
                                },
                                rules: [{
                                    validator(rule, value, callback, source, options) {
                                        var errors = [];
                                        if(!value) {
                                            callback("不可为空");
                                        } else if(value.length<6) {
                                            callback("密码长度不可小于6位");
                                        } else if(value.length>32) {
                                            callback("密码长度不可大于32位");
                                        } else {
                                            callback(errors);
                                        }
                                    }
                                }] 
                            })
                            }
                        />
                        <span className='error'>
                            {getFieldError("confirmPassword")}
                        </span>
                    </FormItem>
                </Col>
                <Col md={12} lg={12} xs={12}>
                    <Button size='sm' disabled={configDisabled} className='save-btn' onClick={this.confirmUserConfig.bind(this)}>确认</Button>
                    <Button size='sm' className='cancel-btn' onClick={this.props.closeModal.bind(this)}>取消</Button>
                </Col>
            </Row>
        )
    }
}

export default Form.createForm()(UserConfig)