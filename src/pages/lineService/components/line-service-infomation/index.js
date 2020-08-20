import React, { Component } from 'react'
import Form from 'bee-form';
import {Row, Col, Label, FormControl, Button, Loading, } from "tinper-bee";
import * as constant from 'components/constant';
import { actions } from 'mirrorx';
import { Success, Warning, Error } from "utils";
import $ from 'jquery';
import './index.less'

const FormItem = Form.FormItem;

class LinServiceInfomation extends Component {
    constructor(props){
        super(props)
        this.state = {
            saveDisabled: false,
            saveShowLoading: false,
        }
    }

    componentDidMount = async () => {}

    /** 保存线路服务 */
    saveLineService = async () => {
        const {lineService} = this.props;
        const self = this;
        this.setState({
            saveDisabled: true,
            saveShowLoading: true,
        });
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let res;
                if(lineService && lineService.serverId) {
                    values.serverId = lineService.serverId;
                    res = await actions.LineServiceManager.updateLineService(values);
                } else {
                    res = await actions.LineServiceManager.addLineService(values);
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
        const {lineService, operationType,} = this.props;
        const {saveDisabled, saveShowLoading,} = this.state;
        const { getFieldProps, getFieldError } = this.props.form;

        return (
            <Row className="line-service-main form-item-layout">
                <Loading
                    showBackDrop={true}
                    loadingType='line'
                    show={saveShowLoading}
                />
                <Col md={4} lg={4} xs={4}>
                    <FormItem>
                        <Label>地址<span className="not-empty-tag">*</span></Label>
                        <FormControl disabled={operationType!=constant.OPERATION_TYPE_ADD}
                            {
                            ...getFieldProps('ipAddress', {
                                initialValue: lineService.ipAddress || "",
                                normalize : function(v) {
                                    return v = $.trim(v);
                                },
                                rules: [{
                                    validator(rule, value, callback, source, options) {
                                        var errors = [];
                                        if(!value) {
                                            callback("不可为空");
                                        } else {
                                            callback(errors);
                                        }
                                    }
                                }] 
                            })
                            }
                        />
                        <span className='error'>
                            {getFieldError("ipAddress")}
                        </span>
                    </FormItem>
                </Col>
                <Col md={4} lg={4} xs={4}>
                    <FormItem>
                        <Label>端口<span className="not-empty-tag">*</span></Label>
                        <FormControl disabled={operationType!=constant.OPERATION_TYPE_ADD}
                            {
                            ...getFieldProps('port', {
                                initialValue: lineService.port || "",
                                normalize : function(v) {
                                    return v = $.trim(v);
                                },
                                rules: [{
                                    validator(rule, value, callback, source, options) {
                                        var errors = [];
                                        if(!value) {
                                            callback("不可为空");
                                        } else {
                                            callback(errors);
                                        }
                                    }
                                }] 
                            })
                            }
                        />
                        <span className='error'>
                            {getFieldError("port")}
                        </span>
                    </FormItem>
                </Col>
                <Col md={4} lg={4} xs={4}>
                    <FormItem>
                        <Label>名称</Label>
                        <FormControl disabled={operationType==constant.OPERATION_TYPE_DETAIL}
                            {
                            ...getFieldProps('serverName', {
                                initialValue: lineService.serverName || "",
                                normalize : function(v) {
                                    return v = $.trim(v);
                                },
                            })
                            }
                        />
                    </FormItem>
                </Col>
                <Col md={12} lg={12} xs={12}>
                    {
                        operationType==constant.OPERATION_TYPE_DETAIL? ""
                        : <Button size='sm' disabled={saveDisabled} className='save-btn' onClick={this.saveLineService.bind(this)}>保存</Button>
                    }
                    <Button size='sm' className='cancel-btn' onClick={this.props.closeModal.bind(this)}>取消</Button>
                </Col>
            </Row>
        )
    }
}

export default Form.createForm()(LinServiceInfomation)