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
 * 用户列表字段
 */
export function columns(_this){
    return ([{
        title: "登录账号",
        dataIndex: "loginAccount",
        key: "loginAccount",
        textAlign: "center",
        width: 150,
        render(text, record, index) {
            let id = record.id || 0;
            let tabValue = "user-manager-detail-" + id;
            //添加下划线，超链接
            return (<a value={tabValue}
                id={id}
                className="column-underline list-open" 
                onClick={ _this.detailUser.bind(this, record, _this) }//绑定事件
                >
                {record.loginAccount}
            </a>)
        },
    }, {
        title: "工号",
        dataIndex: "jobNumber",
        key: "jobNumber",
        textAlign: "center",
        width: 150,
    }, {
        title: "姓名",
        dataIndex: "name",
        key: "name",
        textAlign: "center",
        width: 120,
    }, {
        title: "手机号",
        dataIndex: "mobile",
        key: "mobile",
        textAlign: "center",
        width: 130,
    }, {
        title: "邮箱",
        dataIndex: "email",
        key: "email",
        textAlign: "center",
        width: 180,
    }, {
        title: "角色",
        dataIndex: "roleNames",
        key: "roleNames",
        textAlign: "center",
        width: 200,
        render(text, record, index) {
            if(record.roleList && record.roleList.length>0) {
                let roleNames = "";
                record.roleList.map((role) => {
                    roleNames ? roleNames+=("，" + role.name) : roleNames = role.name
                });
                return roleNames;
            } else {
                return "";
            }
        }
    }, {
        title: "创建人",
        dataIndex: "createUser",
        key: "createUser",
        textAlign: "center",
        width: 100,
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
        width: 100,
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
                    <Button size='sm' onClick={() => { _this.editUser(record) }}>编辑</Button>
                    <Button size='sm' onClick={() => { _this.deleteUser(record) }}>删除</Button>
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
            key:'jobNumber',
            components: <FormItem>
                            <Label>工号</Label>
                            <FormControl
                                {
                                ...getFieldProps('jobNumber', {
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
            key:'loginAccount',
            components: <FormItem>
                            <Label>登录账号</Label>
                            <FormControl
                                {
                                ...getFieldProps('loginAccount', {
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
            key:'name',
            components: <FormItem>
                            <Label>姓名</Label>
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
            key:'mobile',
            components: <FormItem>
                            <Label>手机号</Label>
                            <FormControl
                                {
                                ...getFieldProps('mobile', {
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
            key:'email',
            components: <FormItem>
                            <Label>邮箱</Label>
                            <FormControl
                                {
                                ...getFieldProps('email', {
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
            key:'roleIds',
            components: <FormItem>
                            <Label>角色</Label>
                            <FormControl
                                {
                                ...getFieldProps('roleName', {
                                    initialValue: '',
                                    normalize : function(v) {
                                        return v = $.trim(v); 
                                    }
                                })
                                }
                            />
                            {/* <Select
                                showSearch
                                {...getFieldProps('roleIds', {
                                    initialValue: ""
                                }) }
                            >
                                <Option key="" value="">未选择</Option>
                                {
                                    staffGroupList.map((staffGroup, index) => {
                                        if(staffGroup.id) {
                                            return <Option key={staffGroup.id + ""} value={staffGroup.id + ""}>{staffGroup.groupName}</Option>
                                        }
                                    })
                                }
                            </Select> */}
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