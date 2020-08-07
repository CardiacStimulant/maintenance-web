import React from 'react'

import Form from 'bee-form';
import { Label, FormControl, Button, } from "tinper-bee";
import 'bee-datepicker/build/DatePicker.css';
import DatePicker from 'bee-datepicker';
import * as constant from 'components/constant';
import { Warning, Error, Success } from "utils";
import $ from 'jquery';

const FormItem = Form.FormItem;
const { RangePicker } = DatePicker;

/**
 * 资源列表字段
 */
export function columns(_this){
    return ([{
        title: "角色名称",
        dataIndex: "name",
        key: "name",
        textAlign: "center",
        width: 220,
        render(text, record, index) {
            let id = record.id || 0;
            let tabValue = "role-manager-detail-" + id;
            //添加下划线，超链接
            return (<a value={tabValue}
                id={id}
                className="column-underline list-open" 
                onClick={ _this.detailRole.bind(this, record, _this) }//绑定事件
                >
                {record.name}
            </a>)
        },
    }, {
        title: "角色编码",
        dataIndex: "code",
        key: "code",
        textAlign: "center",
        width: 200,
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
        title: "更新人",
        dataIndex: "lastModifyUser",
        key: "lastModifyUser",
        textAlign: "center",
        width: 150,
    }, {
        title: "更新时间",
        dataIndex: "lastModified",
        key: "lastModified",
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
                    <Button size='sm' onClick={() => { _this.editRole(record) }}>编辑</Button>
                    <Button size='sm' onClick={() => { _this.resourceConfig(record) }}>配置</Button>
                    <Button size='sm' onClick={() => { _this.deleteRole(record) }}>删除</Button>
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
            key:'name',
            components: <FormItem>
                            <Label>角色名称</Label>
                            <FormControl
                                {
                                ...getFieldProps('name', {
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
            key:'code',
            components: <FormItem>
                            <Label>角色编码</Label>
                            <FormControl
                                {
                                ...getFieldProps('code', {
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
        },]
    );
}