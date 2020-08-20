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
 * 租户列表字段
 */
export function columns(_this){
    return ([{
        title: "租户名称",
        dataIndex: "iuapTenantName",
        key: "iuapTenantName",
        textAlign: "center",
        width: 160,
    }, {
        title: "租户ID",
        dataIndex: "id",
        key: "id",
        textAlign: "center",
        width: 130,
    }, {
        title: "创建人",
        dataIndex: "createUser",
        key: "createUser",
        textAlign: "center",
        width: 150,
    }, {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
        textAlign: "center",
        width: 180,
    }, {
        title: "操作",
        dataIndex: "operation",
        key: "operation",
        textAlign: "center",
        render(text, record, index) {
            return (
                <div className='operation-btn'>
                    <Button size='sm' onClick={() => { _this.telephoneNumberManager(record) }}>号码管理</Button>
                </div>
            )
        }
    }])
}

// 查询条件
export function searchCondition(form,) {
    const {getFieldProps} = form;
    return (
        [{
            attr:constant.attrs,
            key:'iuapTenantName',
            components: <FormItem>
                            <Label>租户名称</Label>
                            <FormControl
                                {
                                ...getFieldProps('iuapTenantName', {
                                    initialValue: '',
                                    normalize : function(v) {
                                        return v = $.trim(v);
                                    }
                                })
                                }
                            />
                        </FormItem>,
        }, {
            attr:constant.attrs,
            key:'id',
            components: <FormItem>
                            <Label>租户ID</Label>
                            <FormControl
                                {
                                ...getFieldProps('id', {
                                    initialValue: '',
                                    normalize : function(v) {
                                        return v = $.trim(v); 
                                    }
                                })
                                }
                            />
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
        }, {
            attr:constant.attrs,
            key:'lastModifiedGroup',
            components: <FormItem>
                            <Label className='time'>更新时间</Label>
                            <RangePicker
                                showClear={true}
                                dateInputPlaceholder={['开始', '结束']}
                                placeholder=" "
                                {
                                ...getFieldProps('lastModifiedGroup', {
                                    initialValue: [],
                                })
                                }
                            />
                        </FormItem>,
        }, {
            attr:constant.attrs,
            key:'lastModifyUser',
            components: <FormItem>
                            <Label>更新人</Label>
                            <FormControl
                                {
                                ...getFieldProps('lastModifyUser', {
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