import React, { Component } from 'react';
import './BoxItem.less';

/**
 * {} 内带 * 为 必传项
 * @param {*String} BoxListType 列表类型
 * 非必传项
 * @param {String} className 列表className
 * @param {Object} style 样式
 * 联系人 字段
 * @param {String} contactName 名字
 * @param {String} contactMobile 电话
 * @param {String} contactEmail 电子邮件
 * 联系人样式
 * @param {String} nameClassName 名字className
 * @param {String} phoneClassName 电话className
 * @param {String} emailClassName 电子邮件className
 * 联系地址 字段
 * @param {Object} areaPath 省市县
 * @param {String} address 详细地址
 * 联系地址 字段
 * @param {Object} areaPath 省市县
 * @param {String} address 详细地址
 * 通话记录明细
 * @param {Object} serviceRecordCallDetail 通话记录明细
 * 带头像列表 字段
 * 第一种：头像偏小
 * @param {Object} createUser 姓名
 * @param {String} createGroupName 技能组
 * @param {Object} createTime 时间
 * @param {String} comments 描述
 * 第二种：头像偏大
 * @param {Object} createUser 姓名
 * @param {String} createGroupName 技能组
 * @param {Object} createTime 时间
 * @param {String} comments 描述
 * @param {String} type 呼叫类型
 */

const DEFAULT_HEAD = require("../../static/images/default.png");  //默认头像

export default class BoxItem extends Component {
    CreateBoxItem = () => {
        let { BoxListType, className, style, nameClassName, phoneClassName, emailClassName,
            fullName, mobile, email, mergerName, name,group,time,represent,type, } = this.props;
        let dom = null;
        switch(BoxListType){
            case 'contacts':
                dom = (<div className={'box-item box-item-contacts'+(className?' '+className:'')} style={style||{}}>
                    <span className="box-item-left">
                        <span className={'box-item-name'+(nameClassName?' '+nameClassName:'')}>{fullName}</span>
                        <span className={'box-item-phone'+(phoneClassName?' '+phoneClassName:'')}>{mobile}</span>
                    </span>
                    <span className={'box-item-email'+(emailClassName?' '+emailClassName:'')}>{email}</span>
                </div>);
                break;
            case 'contactAddress':
                dom = (<div className={'box-item box-item-contact-address'+(className?' '+className:'')} style={style||{}}>
                    {mergerName || ""}
                </div>);
                break;
            case 'conversationDetail':  // 通话明细
                dom = ( <div className={'box-item box-item-conversation-detail'+(className?' '+className:'')} style={style||{}} >
                            <div className="header-small-info">
                                <div className="header-small-info-top">
                                    <span>{this.props.createTime}</span>
                                    <span style={{ float: "right" }}>{this.props.callSceneName}</span>
                                </div>
                                <div className="box-item-header-middle">
                                    <span>{this.props.callerName + '-->' + this.props.calledName}</span>
                                    <span style={{ float: "right" }}>{this.props.talkDurationStr}</span>
                                </div>
                                <div className="box-item-header-down">
                                    <span>{this.props.hangupReasonName}</span>
                                    <span style={{ float: "right" }}>{this.props.hangupTargetName}</span>
                                </div>
                            </div>
                        </div> );
                break;
            case 'headerSmall':
                dom = ( <div className="box-item header-small clear">
                    <img className="header-small-img" src={DEFAULT_HEAD}></img>
                    <div className="box-item-header-info header-small-info">
                        <div className="header-small-info-top">
                            <span>{name}</span>
                            <span>{group}</span>
                            <span>{time}</span>
                        </div>
                        <div className="box-item-header-down">{represent}</div>
                    </div>
                </div> );
                break;
            case 'headerLarge':
                dom = ( <div className="box-item header-large">
                    <div className="header-large-top clear">
                        <img className="header-large-img" src={DEFAULT_HEAD}></img>
                        <div className="box-item-header-info header-large-info">
                            <div className="header-large-info-row">
                                <span>{name}</span>
                                <span>{type}</span>
                            </div>
                            <div className="header-large-info-row">
                                <span>{group}</span>
                                <span>{time}</span>
                            </div>
                        </div>
                    </div>
                    <div className="box-item-header-down header-large-down">{represent}</div>
                </div> );
                break;
            default: break
        }
        return dom;
    }
    render() {
        return(
            this.CreateBoxItem()
        )
    }
}