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
        title: "资源名称",
        dataIndex: "name",
        key: "name",
        textAlign: "center",
        width: 160,
        render(text, record, index) {
            let id = record.id || 0;
            let tabValue = "resource-manager-detail-" + id;
            //添加下划线，超链接
            return (<a value={tabValue}
                id={id}
                className="column-underline list-open" 
                onClick={ _this.detailResource.bind(this, record, _this) }//绑定事件
                >
                {record.name}
            </a>)
        },
    }, {
        title: "资源类型",
        dataIndex: "type",
        key: "type",
        textAlign: "center",
        width: 100,
        render(text, record, index) {
            switch(record.type) {
                case constant.RESOURCE_TYPE_MENU: return "菜单";
                case constant.RESOURCE_TYPE_BUTTON: return "按钮";
                default: return record.type;
            }
        },
    }, {
        title: "资源归属",
        dataIndex: "owner",
        key: "owner",
        textAlign: "center",
        width: 100,
        render(text, record, index) {
            switch(record.owner) {
                case constant.RESOURCE_OWNER_SYSTEM: return "系统管理";
                case constant.RESOURCE_OWNER_MAINTENANCE: return "运维管理";
                default: return record.owner;
            }
        },
    }, {
        title: "资源编码",
        dataIndex: "key",
        key: "key",
        textAlign: "center",
        width: 150,
        render(text, record, index) {
            switch(record.key) {
                case constant.RESOURCE_OWNER_SYSTEM: return "系统管理";
                case constant.RESOURCE_OWNER_MAINTENANCE: return "运维管理";
                default: return record.key;
            }
        },
    }, {
        title: "访问路径",
        dataIndex: "url",
        key: "url",
        textAlign: "center",
        width: 300,
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
    }, {
        title: "更新人",
        dataIndex: "lastModifyUser",
        key: "lastModifyUser",
        textAlign: "center",
        width: 120,
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
                    <Button size='sm' onClick={() => { _this.editResource(record) }}>编辑</Button>
                    <Button size='sm' onClick={() => { _this.deleteResource(record) }}>删除</Button>
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
                            <Label>资源名称</Label>
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
            key:'type',
            components: <FormItem>
                            <Label>资源类型</Label>
                            <Select
                                {...getFieldProps('type', {
                                    initialValue: "",
                                }) }
                            >
                                <Option value={""}>未选择</Option>
                                <Option value={constant.RESOURCE_TYPE_MENU}>菜单</Option>
                                <Option value={constant.RESOURCE_TYPE_BUTTON}>按钮</Option>
                            </Select>
                        </FormItem>,
        }, {
            attr:constant.attrs,
            key:'owner',
            components: <FormItem>
                            <Label>资源归属</Label>
                            <Select
                                {...getFieldProps('owner', {
                                    initialValue: "",
                                }) }
                            >
                                <Option value={""}>未选择</Option>
                                <Option value={constant.RESOURCE_OWNER_SYSTEM}>系统管理</Option>
                                <Option value={constant.RESOURCE_OWNER_MAINTENANCE}>运维管理</Option>
                            </Select>
                        </FormItem>,
        }, {
            attr:constant.attrs,
            key:'key',
            components: <FormItem>
                            <Label>资源编码</Label>
                            <FormControl
                                {
                                ...getFieldProps('key', {
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