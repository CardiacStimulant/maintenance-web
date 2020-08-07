import React from 'react'

import Form from 'bee-form';
import { Label, FormControl, Select, } from "tinper-bee";
import * as constant from 'components/constant';
import { Warning, Error, Success } from "utils";
import $ from 'jquery';

const FormItem = Form.FormItem;
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
    }])
}

// 查询条件
export function searchCondition(form, searchConfig) {
    const {getFieldProps} = form;
    const attrs = {lg:6,md:6,sm:6,xs:6}
    return (
        [{
            attr: attrs,
            key: searchConfig + '_name',
            components: <FormItem>
                            <Label>资源名称</Label>
                            <FormControl
                                {
                                ...getFieldProps(searchConfig + '_name', {
                                    initialValue: '',
                                    normalize : function(v) {
                                        return v = $.trim(v);
                                    }
                                })
                                }
                            />
                        </FormItem>,
        }, {
            attr:attrs,
            key: searchConfig + '_type',
            components: <FormItem>
                            <Label>资源类型</Label>
                            <Select
                                {...getFieldProps(searchConfig + '_type', {
                                    initialValue: "",
                                }) }
                            >
                                <Option value={""}>未选择</Option>
                                <Option value={constant.RESOURCE_TYPE_MENU}>菜单</Option>
                                <Option value={constant.RESOURCE_TYPE_BUTTON}>按钮</Option>
                            </Select>
                        </FormItem>,
        }, {
            attr:attrs,
            key: searchConfig + '_owner',
            components: <FormItem>
                            <Label>资源归属</Label>
                            <Select
                                {...getFieldProps(searchConfig + '_owner', {
                                    initialValue: "",
                                }) }
                            >
                                <Option value={""}>未选择</Option>
                                <Option value={constant.RESOURCE_OWNER_SYSTEM}>系统管理</Option>
                                <Option value={constant.RESOURCE_OWNER_MAINTENANCE}>运维管理</Option>
                            </Select>
                        </FormItem>,
        }, {
            attr:attrs,
            key: searchConfig + '_key',
            components: <FormItem>
                            <Label>资源编码</Label>
                            <FormControl
                                {
                                ...getFieldProps(searchConfig + '_key', {
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