import React, { Component } from 'react'
import { FormControl } from "tinper-bee";
import "./index.less";
const SEARCH = require("static/images/transfer/search.png");  //查询
/**
 * {} 内带 * 为 必传项
 * @param {String} value 搜索栏内容
 * @param {Function} onClick 点击放大镜搜索方法
 * 非必传项
 * @param {*String} className 搜索栏外盒子className
 * @param {*Object} style 搜索栏外盒子style样式
 * @param {*String} fClassName 输入框className
 * @param {*Object} fStyle 输入框style样式
 * @param {*String} iClassName 放大镜图片className
 * @param {*Object} iStyle 放大镜图片style样式
 * @param {*} imgUrl 放大镜图片URL
 */

export default class SearchInput extends Component {
    render(){
        const {
            className, style, fClassName, fStyle, value,
            componentClass, showClose, prefix, suffix,
            onClick, iClassName, iStyle, imgUrl
        } = this.props;
        return (
            <span
                className={'search-input-box'+(className?' '+className:'')}
                style={style||{}}
            >
                <FormControl
                    disabled
                    componentClass={componentClass||'input'}
                    className={fClassName||''}
                    style={fStyle||{}}
                    value={value}
                    showClose={showClose}
                    prefix={prefix||''}
                    suffix={suffix||''}
                />
                <img
                    onClick={onClick||(()=>{})}
                    className={iClassName||''}
                    style={iStyle||{}}
                    src={imgUrl||SEARCH}
                />
            </span>
        )
    }
}