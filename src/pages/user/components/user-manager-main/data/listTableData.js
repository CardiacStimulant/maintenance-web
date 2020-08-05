import React from 'react'

import Form from 'bee-form';
import { Label, FormControl, Select, Button, } from "tinper-bee";
import 'bee-datepicker/build/DatePicker.css';
import DatePicker from 'bee-datepicker';
import * as constant from 'components/constant';
import { Warning, Error, Success } from "utils";
import $ from 'jquery';

const FormItem = Form.FormItem;
const Option = Select.Option;
const { RangePicker } = DatePicker;

let tempSearchType = "";

const openmenuClick = (id, _parent, _this) => {
    let serviceCode = "";
    switch(tempSearchType) {
        case constant.WORK_ORDER_LIST_TYPE_GROUP_ALL : serviceCode=constant.YYCTIC006009; break; //组织的全部工单
        case constant.WORK_ORDER_LIST_TYPE_GROUP_HIGHER : serviceCode=constant.YYCTIC006011; break; //组织的跨组织上游工单
        case constant.WORK_ORDER_LIST_TYPE_GROUP_LOWER : serviceCode=constant.YYCTIC006010; break; //组织的跨组织下游工单
        case constant.WORK_ORDER_LIST_TYPE_MY_GROUP_LOWER : serviceCode=constant.YYCTIC006008; break; //我的跨组织下游工单
        case constant.WORK_ORDER_LIST_TYPE_STAFF_GROUP : serviceCode=constant.YYCTIC006007; break; //我的技能组未接单的工单
        case constant.WORK_ORDER_LIST_TYPE_MY_STAFF_GROUP : serviceCode=constant.YYCTIC006012; break; //我所在技能组的工单
        case constant.WORK_ORDER_LIST_TYPE_MY : serviceCode=constant.YYCTIC006006; break; //我的工单
        case constant.WORK_ORDER_LIST_TYPE_FOLLOW : serviceCode=constant.YYCTIC006005; break; //我关注的工单
        case constant.WORK_ORDER_LIST_TYPE_CLOSE : serviceCode=constant.YYCTIC006004; break; //我关闭的工单
        case constant.WORK_ORDER_LIST_TYPE_INVOLVE : serviceCode=constant.YYCTIC006003; break; //我参与的工单
        case constant.WORK_ORDER_LIST_TYPE_CREATE : serviceCode=constant.YYCTIC006002; break; //我创建的工单
        case constant.WORK_ORDER_LIST_TYPE_PENDING : serviceCode=constant.YYCTIC006001; break; //待我处理的工单
        default: Error("列表页类别异常，请联系管理员"); return;
    }
    let tabValue = "WorkOrder-detail-" + id;
    let url =`${PROJECT_DOMAIN_NAME}/fe/work_order#/WorkOrder-detail?search_id=${id}&search_list_type=${tempSearchType}&serviceCode=${tabValue+"_diwork_"+serviceCode}&sourceServiceCode=${serviceCode}`;
    jDiwork.openService(constant.YYCTIC006009,{},{
        title: "工单详情",
        code: tabValue,
        url: url
    });
}

/**
 * 用户列表字段
 */
export function columns(_this){
    return ([{
        title: "工号",
        dataIndex: "jobNumber",
        key: "jobNumber",
        textAlign: "center",
        width: 150,
        render(text, record, index) {
            let id = record.id || 0;
            let tabValue = "user-manager-detail-" + id;
            //添加下划线，超链接
            return (<a value={tabValue}
                id={id}
                className="column-underline list-open" 
                name="用户详情" 
                onClick={ openmenuClick.bind(this, record.id, _this) }//绑定事件
                >
                {record.jobNumber}
            </a>)
        },
    }, {
        title: "登录账号",
        dataIndex: "loginAccount",
        key: "loginAccount",
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