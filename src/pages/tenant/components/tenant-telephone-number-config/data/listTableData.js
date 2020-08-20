import React from 'react'

import Form from 'bee-form';
import { Label, FormControl, Button, Select, } from "tinper-bee";
import * as constant from 'components/constant';
import { Warning, Error, Success } from "utils";
import $ from 'jquery';

const FormItem = Form.FormItem;
const Option = Select.Option;

/**
 * 租户列表字段
 */
export function columns(_this){
    return ([{
        title: "号码",
        dataIndex: "telephoneNum",
        key: "telephoneNum",
        textAlign: "center",
        width: 150,
        render(text, record, index) {
            let id = record.id || 0;
            let tabValue = "tenant-telephone-detail-" + id;
            //添加下划线，超链接
            return (<a value={tabValue}
                id={id}
                className="column-underline list-open" 
                onClick={ _this.detailTelephoneNumber.bind(this, record, _this) }//绑定事件
                >
                {record.telephoneNum}
            </a>)
        },
    }, {
        title: "名称",
        dataIndex: "name",
        key: "name",
        textAlign: "center",
        width: 150,
    }, {
        title: "类型",
        dataIndex: "type",
        key: "type",
        textAlign: "center",
        width: 150,
        render(text, record, index) {
            switch (record.type) {
                case "1": return "ip对接";
                default: return record.type;
            }
        }
    }, {
        title: "前缀",
        dataIndex: "prefix",
        key: "prefix",
        textAlign: "center",
        width: 100,
    }, {
        title: "中缀",
        dataIndex: "infix",
        key: "infix",
        textAlign: "center",
        width: 100,
    }, {
        title: "区号",
        dataIndex: "areaCode",
        key: "areaCode",
        textAlign: "center",
        width: 100,
    }, {
        title: "注册号",
        dataIndex: "registrationNumber",
        key: "registrationNumber",
        textAlign: "center",
        width: 150,
    }, {
        title: "呼叫并发数",
        dataIndex: "concurrencyNumber",
        key: "concurrencyNumber",
        textAlign: "center",
        width: 100,
    }, {
        title: "所属线路",
        dataIndex: "line",
        key: "line",
        textAlign: "center",
        width: 120,
        render(text, record, index) {
            if(_this.state.lineServerList && _this.state.lineServerList.length>0) {
                let serverName = "";
                _this.state.lineServerList.map((lineServer) =>{
                    if(lineServer.serverId===record.line) {
                        serverName = lineServer.serverName;
                    }
                });
                return serverName;
            } else {
                return "";
            }
        }
    }, {
        title: "操作",
        dataIndex: "operation",
        key: "operation",
        textAlign: "center",
        render(text, record, index) {
            return (
                <div className='operation-btn'>
                    <Button size='sm' onClick={() => { _this.editNumber(record) }}>编辑</Button>
                    <Button size='sm' onClick={() => { _this.deleteNumber(record) }}>删除</Button>
                </div>
            )
        }
    }])
}

// 查询条件
export function searchCondition(form, _this) {
    const {getFieldProps} = form;
    return (
        [{
            attr:constant.attrs,
            key:'telephoneNum',
            components: <FormItem>
                            <Label>号码</Label>
                            <FormControl
                                {
                                ...getFieldProps('telephoneNum', {
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
                            <Label>名称</Label>
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
                            <Label>类型</Label>
                            <Select
                                {...getFieldProps('type', {
                                    initialValue: ""
                                }) }
                            >
                                <Option key="" value="">未选择</Option>
                                <Option key={"ipDock"} value={"ipDock"}>ip对接</Option>
                            </Select>
                        </FormItem>,
        }, {
            attr:constant.attrs,
            key:'prefix',
            components: <FormItem>
                            <Label>前缀</Label>
                            <FormControl
                                {
                                ...getFieldProps('prefix', {
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
            key:'Infix',
            components: <FormItem>
                            <Label>中缀</Label>
                            <FormControl
                                {
                                ...getFieldProps('Infix', {
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
            key:'areaCode',
            components: <FormItem>
                            <Label>区号</Label>
                            <FormControl
                                {
                                ...getFieldProps('areaCode', {
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
            key:'registrationNumber',
            components: <FormItem>
                            <Label>注册号</Label>
                            <FormControl
                                {
                                ...getFieldProps('registrationNumber', {
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
            key:'concurrencyNumber',
            components: <FormItem>
                            <Label>呼叫并发数</Label>
                            <FormControl
                                {
                                ...getFieldProps('concurrencyNumber', {
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
            key:'line',
            components: <FormItem>
                            <Label>所属线路</Label>
                            <Select
                                {...getFieldProps('line', {
                                    initialValue: ""
                                }) }
                            >
                                <Option key="" value="">未选择</Option>
                                {
                                    _this.state.lineServerList.map((lineServer, index) => {
                                        return <Option key={lineServer.serverId} value={lineServer.serverId}>{lineServer.serverName}</Option>
                                    })
                                }
                            </Select>
                        </FormItem>,
        }]
    );
}