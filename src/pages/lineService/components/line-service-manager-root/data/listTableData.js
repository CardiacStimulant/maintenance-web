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
 * 线路服务器列表字段
 */
export function columns(_this){
    return ([{
        title: "地址",
        dataIndex: "ipAddress",
        key: "ipAddress",
        textAlign: "center",
        width: 130,
    }, {
        title: "名称",
        dataIndex: "serverName",
        key: "serverName",
        textAlign: "center",
        width: 160,
    }, {
        title: "端口",
        dataIndex: "port",
        key: "port",
        textAlign: "center",
        width: 130,
    }, {
        title: "操作",
        dataIndex: "operation",
        key: "operation",
        textAlign: "center",
        render(text, record, index) {
            return (
                <div className='operation-btn'>
                    <Button size='sm' onClick={() => { _this.editLineService(record) }}>编辑</Button>
                    <Button size='sm' onClick={() => { _this.deleteLineService(record) }}>删除</Button>
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
            key:'serverName',
            components: <FormItem>
                            <Label>名称</Label>
                            <FormControl
                                {
                                ...getFieldProps('serverName', {
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