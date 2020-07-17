import React, { Component } from 'react';
import { Dropdown, Menu, } from 'tinper-bee';
import Button from 'components/Button';
import ButtonRoleGroup from 'components/ButtonRoleGroup';
// 工具函数
import { success, Error } from 'utils';

const { Item } = Menu;

/**
 * 目前该导出只支持GET请求
 * 参数说明：
 * @param {*String} url 导出URL
 * @param {*Array} selectData 选中的数据
 * @param {*Array} list 当前页数据
 * @param {*Object} searchConditions 导出全部时需要拼接的查询条件，{key1:value1,.....,keyn:valuen}
 * @param {String} searchTypeKey 查询类型key，用来适配类似工单列表页请求时，需要拼接的特殊列表页类型，本质还是直接拼接到url上，与searchType配合使用
 * @param {String} searchType 查询类型value，用来适配类似工单列表页请求时，需要拼接的特殊列表页类型，本质还是直接拼接到url上，与searchTypeKey配合使用
 * @param {String} className
 * @param {Array} rolelist 角色集合，用来做权限控制
 * @param {String} role 按钮角色，用来做权限控制
 */
class AcExport extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            selIndex: "0",
        };

    }

    // 下拉选择函数
    onSelect = ({ key }) => {
        console.log("key",key);
        this.setState({
            selIndex : key
        })

        this.exportExcel(key);
    }

    //0 导出选中数据 1 导出当前页 2 导出全部数据
    exportExcel = (selIndex) => {
        let { url, selectData, list, searchConditions, searchTypeKey, searchType, } = this.props;
        if(!url){
            Error('导出数据为空');
            return;
        }
        if(searchTypeKey && searchType) {
            url += `&search_${searchTypeKey}=${searchType}`;
        }
        // 解析选中数据
        let ids = "";
        if(selIndex == '0') {
            if(this.isEmpty(selectData)) {
                return;
            }
            selectData.map((item) => {
                if(ids) {
                    ids += "," + item.id;
                } else {
                    ids = item.id;
                }
            });
            // 导出当前页
            url+='&search_ids='+ids;
        } else {
            if(this.isEmpty(list)) {
                return;
            }
            if ( selIndex == '1' ) {
                list.map((item) => {
                    if(ids) {
                        ids += "," + item.id;
                    } else {
                        ids = item.id;
                    }
                });
                url+='&search_ids='+ids;
            } else {
                for(let attr in searchConditions){
                    if(attr != searchTypeKey) {
                        url+='&search_'+attr+'='+searchConditions[attr];
                    }
                }
            }
        }
        // 创建下载链接
        window.location.href = url;
    }

    isEmpty = (data) => {
        if ( !data || (data && data.length === 0) ) {
            Error('导出数据为空');
            return true;
        }
        return false;
    }


    render() {
        let { className, rolelist, role } = this.props;
        return (
            <ButtonRoleGroup rolelist={rolelist}>
                <Dropdown role={role} trigger={['click']} animation="slide-up" overlay={
                    <Menu
                        selectedKeys = {[]}
                        onSelect={this.onSelect}>
                        <Item key="0">导出选中数据</Item>
                        <Item key="1">导出当前页</Item>
                        <Item key="2">导出全部数据</Item>
                    </Menu>
                }>
                    <Button type="confirm" className={className}>导出</Button>
                </Dropdown>
            </ButtonRoleGroup>
        );
    }
}

export default AcExport;