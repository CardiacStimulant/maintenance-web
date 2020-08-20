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

class NumberManagerInformation extends Component {
    constructor(props){
        super(props)
        this.state = {
            saveDisabled: false,
            saveShowLoading: false,
        }
    }

    componentDidMount = async () => {}

    /** 保存号码管理 */
    saveNumberManager = async () => {
        const {numberManager, tenantId} = this.props;
        const self = this;
        this.setState({
            saveDisabled: true,
            saveShowLoading: true,
        });
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let res;
                values.tenantId=tenantId || "";
                values.concurrencyNumber = values.concurrencyNumber || null;
                if(numberManager && numberManager.id) {
                    values.id = numberManager.id;
                    values.version = numberManager.version;
                    res = await actions.TenantManager.updateNumberManager(values);
                } else {
                    res = await actions.TenantManager.addNumberManager(values);
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
        const {numberManager, lineServerList, operationType,} = this.props;
        const {saveDisabled, saveShowLoading, roleAllList,} = this.state;
        const { getFieldProps, getFieldError } = this.props.form;

        return (
            <Row className="user-manager-main form-item-layout">
                <Loading
                    showBackDrop={true}
                    loadingType='line'
                    show={saveShowLoading}
                />
                <Col md={4} lg={4} xs={4}>
                    <FormItem>
                        <Label>号码<span className="not-empty-tag">*</span></Label>
                        <FormControl disabled={operationType!=constant.OPERATION_TYPE_ADD}
                            {
                            ...getFieldProps('telephoneNum', {
                                initialValue: numberManager.telephoneNum || "",
                                normalize : function(v) {
                                    return v = $.trim(v);
                                },
                                rules: [{
                                    validator(rule, value, callback, source, options) {
                                        var errors = [];
                                        if(!value) {
                                            callback("不可为空");
                                        } else if (value.length>16) {
                                            callback("超过最大长度16");
                                        } else if (!constant.CHECK_NUMBER2.test(value)) {
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
                            {getFieldError("telephoneNum")}
                        </span>
                    </FormItem>
                </Col>
                <Col md={4} lg={4} xs={4}>
                    <FormItem>
                        <Label>名称</Label>
                        <FormControl disabled={operationType==constant.OPERATION_TYPE_DETAIL}
                            {
                            ...getFieldProps('name', {
                                initialValue: numberManager.name || "",
                                normalize : function(v) {
                                    return v = $.trim(v);
                                },
                                rules: [{
                                    validator(rule, value, callback, source, options) {
                                        var errors = [];
                                        if (!value && value.length>64) {
                                            callback("超过最大长度64");
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
                        <Label>类型<span className="not-empty-tag">*</span></Label>
                        <Select disabled={operationType==constant.OPERATION_TYPE_DETAIL}
                            {...getFieldProps('type', {
                                initialValue: numberManager.type || "1",
                            }) }
                        >
                            <Option key={"1"} value={"1"}>ip对接</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col md={4} lg={4} xs={4}>
                    <FormItem>
                        <Label>前缀</Label>
                        <FormControl disabled={operationType==constant.OPERATION_TYPE_DETAIL}
                            {
                            ...getFieldProps('prefix', {
                                initialValue: numberManager.prefix || "",
                                normalize : function(v) {
                                    return v = $.trim(v);
                                },
                                rules: [{
                                    validator(rule, value, callback, source, options) {
                                        var errors = [];
                                        if (value && value.length>64) {
                                            callback("超过最大长度64");
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
                            {getFieldError("prefix")}
                        </span>
                    </FormItem>
                </Col>
                <Col md={4} lg={4} xs={4}>
                    <FormItem>
                        <Label>中缀</Label>
                        <FormControl disabled={operationType==constant.OPERATION_TYPE_DETAIL}
                            {
                            ...getFieldProps('infix', {
                                initialValue: numberManager.infix || "",
                                normalize : function(v) {
                                    return v = $.trim(v);
                                },
                                rules: [{
                                    validator(rule, value, callback, source, options) {
                                        var errors = [];
                                        if (value && value.length>64) {
                                            callback("超过最大长度64");
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
                            {getFieldError("infix")}
                        </span>
                    </FormItem>
                </Col>
                <Col md={4} lg={4} xs={4}>
                    <FormItem>
                        <Label>区号</Label>
                        <FormControl disabled={operationType==constant.OPERATION_TYPE_DETAIL}
                            {
                            ...getFieldProps('areaCode', {
                                initialValue: numberManager.areaCode || "",
                                normalize : function(v) {
                                    return v = $.trim(v);
                                },
                                rules: [{
                                    validator(rule, value, callback, source, options) {
                                        var errors = [];
                                        if (value && value.length>64) {
                                            callback("超过最大长度64");
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
                            {getFieldError("areaCode")}
                        </span>
                    </FormItem>
                </Col>
                <Col md={4} lg={4} xs={4}>
                    <FormItem>
                        <Label>注册号</Label>
                        <FormControl disabled={operationType==constant.OPERATION_TYPE_DETAIL}
                            {
                            ...getFieldProps('registrationNumber', {
                                initialValue: numberManager.registrationNumber || "",
                                normalize : function(v) {
                                    return v = $.trim(v);
                                },
                                rules: [{
                                    validator(rule, value, callback, source, options) {
                                        var errors = [];
                                        if (value && value.length>64) {
                                            callback("超过最大长度64");
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
                            {getFieldError("registrationNumber")}
                        </span>
                    </FormItem>
                </Col>
                <Col md={4} lg={4} xs={4}>
                    <FormItem>
                        <Label>呼叫并发数</Label>
                        <FormControl disabled={operationType==constant.OPERATION_TYPE_DETAIL}
                            {
                            ...getFieldProps('concurrencyNumber', {
                                initialValue: numberManager.concurrencyNumber || "",
                                normalize : function(v) {
                                    return v = $.trim(v);
                                },
                                rules: [{
                                    validator(rule, value, callback, source, options) {
                                        var errors = [];
                                        if (value && value.length>8) {
                                            callback("超过最大长度8");
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
                            {getFieldError("concurrencyNumber")}
                        </span>
                    </FormItem>
                </Col>
                <Col md={4} lg={4} xs={4}>
                    <FormItem>
                        <Label>所属线路<span className="not-empty-tag">*</span></Label>
                        <Select disabled={operationType==constant.OPERATION_TYPE_DETAIL}
                            {...getFieldProps('line', {
                                initialValue: numberManager.line || "",
                                rules: [{
                                    validator(rule, value, callback, source, options) {
                                        var errors = [];
                                        if (!value) {
                                            callback("不可为空");
                                        } else {
                                            callback(errors);
                                        }
                                    }
                                }]
                            }) }
                        >
                            {
                                lineServerList.map((lineServer) =>{
                                    return <Option key={lineServer.serverId} value={lineServer.serverId}>{lineServer.serverName}</Option>
                                })
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
                                initialValue: numberManager.comments || "",
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
                                <FormControl disabled={true} value={numberManager.createUser}/>
                            </FormItem>
                        </Col>
                        <Col md={6} lg={6} xs={6}>
                            <FormItem>
                                <Label>创建时间</Label>
                                <FormControl disabled={true} value={numberManager.createTime}/>
                            </FormItem>
                        </Col>
                        <Col md={6} lg={6} xs={6}>
                            <FormItem>
                                <Label>修改人</Label>
                                <FormControl disabled={true} value={numberManager.lastModifyUser}/>
                            </FormItem>
                        </Col>
                        <Col md={6} lg={6} xs={6}>
                            <FormItem>
                                <Label>修改时间</Label>
                                <FormControl disabled={true} value={numberManager.lastModified}/>
                            </FormItem>
                        </Col>
                    </Row> : ""
                }
                <Col md={12} lg={12} xs={12}>
                    {
                        operationType==constant.OPERATION_TYPE_DETAIL? ""
                        : <Button size='sm' disabled={saveDisabled} className='save-btn' onClick={this.saveNumberManager.bind(this)}>保存</Button>
                    }
                    <Button size='sm' className='cancel-btn' onClick={this.props.closeModal.bind(this)}>取消</Button>
                </Col>
            </Row>
        )
    }
}

export default Form.createForm()(NumberManagerInformation)