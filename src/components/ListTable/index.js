import React, { Component } from 'react'
import { Table, Checkbox, Radio, Pagination, Loading } from "tinper-bee";
import multiSelect from "bee-table/build/lib/newMultiSelect";
import singleSelect from "bee-table/build/lib/singleSelect.js";
import SearchBar from "components/SearchBar";
import "./ListTable.less";

let MultiSelectTable  = multiSelect(Table, Checkbox);
//拼接成复杂功能的table组件不能在render中定义，需要像此例子声明在组件的外侧，不然操作state会导致功能出现异常
let SingleSelectTable = singleSelect(Table, Radio);

/**
 * {} 内带 * 为 必传项
 * 列表页组件 例：pages/work_order/components/work-order-list  index.js 和 data文件夹里的两个js文件
 * @param {*Array} columns 列表需要显示的数据字段 参考pages/work_order/components/work-order-list/data/listTableData.js
 * @param {*Array} listDatas 列表数据
 * @param {*Function} clearSelect 清空选中项的方法
 * @param {*Function} onSelect 切换页的方法
 * @param {*Number} totalPages 总页数
 * @param {*Number} total 一共多少条
 * @param {*Function} onDataNumSelect 选择每页多少条的方法
 * 
 * @param {String} title 列表页标题
 * @param {Object} form 搜索同步
 * @param {Function} handleSearch 查询按钮的方法，不传不显示
 * 非必传项 搜索栏
 * @param {Array} searchDatas 搜索栏 attr、components（搜索框）、key
 * @param {Number} openMoreBtn 普通搜索栏显示输入框个数，如果不传：为全部展示，且没有普通/高级切换按钮
 * 非必传项 按钮组
 * @param {Object} searchButtons 除查询、普通、高级按钮外的其他按钮，可直接传按钮， 如果用我封装的按钮： type  className  onClick  value 具体属性参考components/Button
                例：searchButtons: { left:[左侧按钮组集合],right:[右侧按钮组集合] }
 * 非必传项 表格
 * @param {Object} tableClassName 表格的className  
 * @param {Boolear} showLoading loading  
 * @param {Boolear} notCheckbox 是否有复选框
 * @param {Function} getSelectedDataFunc 选中列表行的方法
 * @param {Object} scroll 横向或纵向滚动条设置
 * @param {Function} tableTitle 表格标题的方法
 * @param {Function} footer 表格尾部的方法
 * @param {Object} multiSelects 看文档，除了checkbox就是不写
 * 非必传项 分页
 * @param {Number} pageSize 表格当前展示多少行数据，默认为10
 * @param {Number} pageIndex 默认激活页
 * @param {Boolear} maxButtons 显示最多页数按钮
 */

class ListTable extends Component {
    constructor(props){
        super(props)
        this.state = {
            pageIndex: 1,
            pageSize: '10',
            dataNumSelect: ['5','10','15','20']
        };
        this.selectedRowIndex= '';
        this.data = false;
        const { getInstanceListTable } = props;
        if(typeof getInstanceListTable === 'function'){
            getInstanceListTable(this);
        }
    }
    componentDidMount = () => {
        if(this.props.pageSize){
            this.setState({pageSize: this.props.pageSize});
        }
    }
    handleSearch = (err, values) => {
        this.resetAll();
        this.props.handleSearch && this.props.handleSearch(err, values);
    }
    onSelect = (pageIndex) => {
        this.resetAll(pageIndex);
        this.props.onSelect && this.props.onSelect(pageIndex);
    }
    onDataNumSelect = (index, value) => {
        this.resetAll();
        this.setState({pageSize: value});
        this.props.onDataNumSelect && this.props.onDataNumSelect(value);
    }
    resetAll = (index) => {
        this.setState({ pageIndex: index || 1 });
        this.selectedRowIndex = '';
        this.data = false;
    }
    /**
     *@param selectedList:当前选中的行数据
     *@param record 当前操作行数据
     *@param index 当前操作行索引
     *@param newData 进行多选操作之后的新数据 data
     */
    getRadioSelectedDataFunc = (selectedList,index) => {
        // 单选，存选中位置，0 - 9
        this.selectedRowIndex = index;
        this.props.getSelectedDataFunc && this.props.getSelectedDataFunc(selectedList?[selectedList]:[],index);
    };
    /**
     * 双击事件
     */
    onRadioRowDoubleClick = (record, index, event) => {
        if(this.props.onRowDoubleClick){
            this.selectedRowIndex = index;
            this.props.onRowDoubleClick(record, index, event);
        }
    }
    getCheckboxSelectedDataFunc = (selectedList,record,index,newData) => {
        // 注意：需要用回调中提供的参数 newData，去更新 state 或 store 中的 data 属性值，否则当表格重新render的时候，已选数据会被冲刷掉。
        // 多选，存全部数据，数组，被选中数据，多一个被标记的属性，显示被选中项
        this.data = newData;
        this.props.getSelectedDataFunc && this.props.getSelectedDataFunc(selectedList,record,index);
    };
    selectTable = () => {
        const {
            tableType, notCheckbox, columns, listDatas, multiSelects, tableClassName, emptyText,
            scroll, tableTitle, clearSelect, selectedRowData, onExpand, expandedRowRender,
            expandIconAsCell, collapsedIcon, expandedIcon, notBordered
        } = this.props;
        let checkboxType = notCheckbox?'Table':'Checkbox';
        let type = tableType || checkboxType;
        let tableProps = {
            columns,
            data: listDatas,
            bordered: !notBordered,
            className: tableClassName || '', 
            multiSelect: { type: multiSelects || "checkbox" },
            getSelectedDataFunc: this.getCheckboxSelectedDataFunc,
            onRowDoubleClick: this.onRadioRowDoubleClick,
            rowKey: (r, i) => (r.id || i),
            scroll: scroll||{},
        }
        if(tableTitle){
            tableProps.title = tableTitle;
        }
        if(expandedRowRender){
            tableProps = {
                ...tableProps, onExpand, expandedRowRender, expandIconAsCell, collapsedIcon, expandedIcon
            }
        }
        switch(type){
            case 'Table':
                return (<Table {...tableProps}/>);
            case 'Checkbox':
                clearSelect ? this.data = false : selectedRowData && (this.data = selectedRowData);
                tableProps.data = this.data || listDatas;
                return (<MultiSelectTable {...tableProps}/>);
            case 'Radio':
                clearSelect ? this.selectedRowIndex = '' : (selectedRowData || selectedRowData === 0) && (this.selectedRowIndex = selectedRowData);
                tableProps = {
                    ...tableProps,
                    selectedRowIndex: this.selectedRowIndex,
                    getSelectedDataFunc: this.getRadioSelectedDataFunc,
                    emptyText: () => emptyText||<span>暂无数据！</span>,
                    rowClassName: (record,index,indent)=>(
                        index === this.selectedRowIndex ? 'selected' : ''
                    ),
                }
                return (<SingleSelectTable {...tableProps}/>);
            default: return null;
        }
    }
    render(){
        const {
            searchDatas, searchButtons, openMoreBtn, activePage, isSamllBox, locale,
            totalPages, total, maxButtons, form, handleSearch, notShowJump, showLoading
        } = this.props;
        const { pageSize, dataNumSelect } = this.state;
        return (
            <div className="list-table-box">
                <Loading show={showLoading} loadingType="line" />
                {
                    (searchDatas||searchButtons)?<SearchBar
                        form={form}
                        search={this.handleSearch}
                        searchDatas={searchDatas||[]}
                        openMoreBtn={openMoreBtn}
                        searchButtons={searchButtons}
                        handleSearch={handleSearch}
                    />:null
                }
                <div className="table-list">
                    { this.selectTable() }
                    {
                        totalPages && total ? <div className='pagination'>
                            <Pagination
                                locale={locale||false}
                                first={isSamllBox?false:true}
                                last={isSamllBox?false:true}
                                prev
                                next
                                boundaryLinks
                                maxButtons={maxButtons||5}
                                activePage={activePage||this.state.pageIndex}
                                onSelect={this.onSelect}
                                onDataNumSelect={this.onDataNumSelect}
                                showJump={!notShowJump}
                                total={total}
                                items={totalPages}
                                dataNum={dataNumSelect.indexOf((pageSize || 10)+'')} // 下拉选择的设定值的index 既['5','10','15','20']的下角标0，1，2，3
                            />
                        </div> : null
                    }
                </div>
            </div>
        )
    }
}
export default ListTable