import React, { Component } from 'react';
import { Pagination } from "tinper-bee";
import BoxItem from 'components/BoxItem';
import './BoxList.less';

/**
 * {} 内带 * 为 必传项
 * @param {*String} BoxListType 列表类型 联系人: contacts  联系地址: contactAddress 通话明细：conversationDetail  头像列表: headerSmall(头像偏小)、headerLarge(头像偏大)
 * @param {*Array} dataList 列表数据
 * @param {*Function} onSelect 切换页的方法
 * @param {*Number} totalPages 总页数
 * @param {*Number} total 一共多少条
 * @param {*Function} onDataNumSelect 选择每页多少条的方法
 * 非必传项
 * @param {String} className 列表className
 * @param {Object} style 样式
 * @param {Number} pageSize 表格当前展示多少行数据，默认为10
 * @param {Number} pageIndex 默认激活页
 * @param {Boolear} maxButtons 显示最多页数按钮
 */

var locale={ 'items': '', 'show': '', 'page':'' }

export default class BoxList extends Component {
    constructor(props){
        super(props)
        this.state = {
            pageIndex: 1,
            pageSize: 5,
        }
    }
    componentDidMount = () => {
        if(this.props.pageSize){
            this.setState({pageSize: this.props.pageSize});
        }
    }
    onSelect = (pageIndex) => {
        this.setState({
            pageIndex: pageIndex,
        });
        this.props.onSelect&&this.props.onSelect(pageIndex);
    }
    onDataNumSelect = (index, value) => {
        this.setState({pageSize: value});
        this.props.onDataNumSelect && this.props.onDataNumSelect(value);
    }
    render() {
        const { BoxListType, className, style, dataList, totalPages, maxButtons, isBigBox,
            activePage, total, } = this.props;
        const {pageSize} = this.state;
        let paginationType = {};
        if(isBigBox){
            paginationType.first = isBigBox;
            paginationType.last = isBigBox;
        } else {
            paginationType.locale = locale;
        }
        return(
            dataList&&dataList.length ? <div className={'box-list'+(className?' '+className:'')} style={style||{}}>
                {
                    dataList.map((item,i) => (
                        <BoxItem BoxListType={BoxListType} key={i} {...item}/>
                    ))
                }
                {
                    total ? <div className={'pagination'+(isBigBox?'':' box-list-pagination')}>
                        <Pagination {...paginationType}
                            prev
                            next
                            boundaryLinks
                            maxButtons={maxButtons||1}
                            activePage={activePage||this.state.pageIndex}
                            onSelect={this.onSelect}
                            onDataNumSelect={this.onDataNumSelect}
                            showJump={true}
                            gap={true}
                            total={total}
                            items={totalPages}
                            dataNum={pageSize}
                        />
                    </div> : null
                }
            </div>:null
        )
    }
}