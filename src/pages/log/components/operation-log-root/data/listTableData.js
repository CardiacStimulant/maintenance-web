import React from 'react'

import Form from 'bee-form';
import { Label, FormControl, Button, Select, } from "tinper-bee";
import 'bee-datepicker/build/DatePicker.css';
import DatePicker from 'bee-datepicker';
import * as constant from 'components/constant';
import { Warning, Error, Success } from "utils";
import $ from 'jquery';

const FormItem = Form.FormItem;
const { RangePicker } = DatePicker;
const Option = Select.Option;

/**
 * 资源列表字段
 */
export function columns(_this){
    return ([{
        title: "业务类型",
        dataIndex: "businessType",
        key: "businessType",
        textAlign: "center",
        width: 160,
        render(text, record, index) {
            switch(record.businessType) {
                case constant.LOG_BUSINESS_TYPE_USER: return "用户";
                case constant.LOG_BUSINESS_TYPE_ROLE: return "角色";
                case constant.LOG_BUSINESS_TYPE_RESOURCE: return "资源";
                case constant.LOG_BUSINESS_TYPE_TENANT_TELEPHONE_NUMBER: return "租户号码";
                default: return record.businessType;
            }
        },
    }, {
        title: "操作类型",
        dataIndex: "operationType",
        key: "operationType",
        textAlign: "center",
        width: 100,
        render(text, record, index) {
            switch(record.operationType) {
                case constant.LOG_OPERATION_TYPE_ADD: return "新增";
                case constant.LOG_OPERATION_TYPE_UPDATE: return "修改";
                case constant.LOG_OPERATION_TYPE_DELETE: return "删除";
                default: return record.operationType;
            }
        },
    }, {
        title: "备注",
        dataIndex: "comments",
        key: "comments",
        textAlign: "center",
        width: 1100,
    }, {
        title: "创建人",
        dataIndex: "createUser",
        key: "createUser",
        textAlign: "center",
        width: 120,
    }, {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
        textAlign: "center",
        width: 180,
    }])
}

// 查询条件
export function searchCondition(form,) {
    const {getFieldProps} = form;
    return (
        [{
            attr:constant.attrs,
            key:'businessType',
            components: <FormItem>
                            <Label>业务类型</Label>
                            <Select
                                {...getFieldProps('businessType', {
                                    initialValue: "",
                                }) }
                            >
                                <Option value={""}>未选择</Option>
                                <Option value={constant.LOG_BUSINESS_TYPE_USER}>用户</Option>
                                <Option value={constant.LOG_BUSINESS_TYPE_ROLE}>角色</Option>
                                <Option value={constant.LOG_BUSINESS_TYPE_RESOURCE}>资源</Option>
                                <Option value={constant.LOG_BUSINESS_TYPE_TENANT_TELEPHONE_NUMBER}>租户号码</Option>
                            </Select>
                        </FormItem>,
        }, {
            attr:constant.attrs,
            key:'operationType',
            components: <FormItem>
                            <Label>资源类型</Label>
                            <Select
                                {...getFieldProps('operationType', {
                                    initialValue: "",
                                }) }
                            >
                                <Option value={""}>未选择</Option>
                                <Option value={constant.LOG_OPERATION_TYPE_ADD}>新增</Option>
                                <Option value={constant.LOG_OPERATION_TYPE_UPDATE}>修改</Option>
                                <Option value={constant.LOG_OPERATION_TYPE_DELETE}>删除</Option>
                            </Select>
                        </FormItem>,
        }, {
            attr:constant.attrs,
            key:'createTimeGroup',
            components: <FormItem>
                            <Label className='time'>创建时间</Label>
                            <RangePicker
                                showClear={true}
                                dateInputPlaceholder={['开始', '结束']}
                                placeholder=" "
                                {
                                ...getFieldProps('createTimeGroup', {
                                    initialValue: [],
                                })
                                }
                            />
                        </FormItem>,
        }, {
            attr:constant.attrs,
            key:'createUser',
            components: <FormItem>
                            <Label>创建人</Label>
                            <FormControl
                                {
                                ...getFieldProps('createUser', {
                                    initialValue: '',
                                    normalize : function(v) {
                                        return v = $.trim(v); 
                                    }
                                })
                                }
                            />
                        </FormItem>,
        }]
    );
}