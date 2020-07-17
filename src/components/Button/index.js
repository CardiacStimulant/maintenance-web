import React, { Component } from 'react'
import { Icon, Button } from 'tinper-bee';
import ButtonRoleGroup from 'components/ButtonRoleGroup';
import './Button.less';

/**
 * 按钮组件
 * @param {*String/Document} type 按钮类型
    红色  默认背景色，可带文字            ——可传——  0  confirm 
    无背景色  清除所有样式，单纯文字       ——可传——  1  clear 
    灰色背景，可带文字                    ——可传——  2  gray 
    白色背景，灰色边框(取消按钮)，可带文字 ——可传——  3  cancel 
    只带Icon图标                         ——可传——  4  icon 
    只带图片                             ——可传——  5  img 
    div包图片，后面可跟文字               ——可传——  6  box-img  7  box-img-text 
    带i标签，i标签内嵌图片                ——可传——  8  i 
 * @param {String} className 按钮className 
 * @param {Function} onClick 按钮点击事件 
 * @param {Boolean} disabled 按钮是否显示 
 * @param {Object} style 按钮样式 
 * @param {} role 按钮权限 
 * @param {String} value 按钮文字 
 * @param {String} imgurl 按钮内图片路径 
 * @param {String} iconType 按钮内图标类型 
 */
export default class pButton extends Component {
    buttonType = () => {
        const {
            className, type, imgurl, iconType, iconStyle, iClassName, iconClassName, imgClassName, boxClassName,
        } = this.props;
        const btnClassName = btnClassName? (" "+className) : '';
        let btn = {
            // 按钮className
            className: 'p-l-s-b' + (className? (" "+className) : ''),
            // 按钮内嵌样式
            dom: null,
        };
        // 新的按钮样式，添加case即可，数字是简化传参用
        switch(type) {
            // 默认背景色，可带文字
            case 'confirm':
                btn.className += ' p-l-s-b-g';
                break;
            // 清除所有样式，单纯文字
            case 'clear':
                btn.className += ' p-l-s-b-c';
                break;
            // 灰色背景，可带文字
            case 'gray':
                btn.className += ' p-l-s-b-g-g';
                break;
            // 白色背景，灰色边框(取消按钮)，可带文字
            case 'cancel':
                btn.className += ' p-l-s-b-g-c';
                break;
            // 只带Icon图标
            case 'icon':
                btn.className += ' p-l-s-b-I-b';
                btn.dom = (<Icon className={ iconClassName || '' } type={ iconType } style={ iconStyle }></Icon>)
                break;
            // 只带图片
            case 'img':
                btn.className += ' p-l-s-b-i-b';
                btn.dom = (<img className={ imgClassName || '' } src={ imgurl }></img>)
                break;
            // div包图片，后面可跟文字
            case 'box-img':
            case 'box-img-text':
                btn.className += ((type == 'box-img') || (type == 4))? ' p-l-s-b-d-i-b' : ' p-l-s-b-d-i-t-b';
                btn.dom = (<div className={ boxClassName || '' }>
                    <img className={ imgClassName || '' } src={ imgurl }></img>
                </div>)
                break;
            // 带i标签，i标签内嵌图片
            case 'i':
                btn.className += ' p-l-s-b-i';
                btn.dom = (<i className={ iClassName || '' }></i>)
                break;
            // 带i标签，i标签内嵌图片
            case 'add':
                btn.className += ' p-l-s-b-a';
                break;
            default :
                btn = false;
                break;
        }
        return btn;
    }
    buttons = () => {
        const { onClick, disabled, children, style, role, value } = this.props;
        const buttonType = this.buttonType();
        return ( buttonType ? <button
            type = "button"
            role = { role }
            style = { style }
            onClick = { onClick }
            disabled = { disabled }
            className = {buttonType.className}
        >
            { buttonType.dom }
            { value || children || '' }
        </button>
        : <Button { ...this.props } >
            { children }
        </Button> )
    }
    render(){
        const { rolelist, isAButton, className, onClick, disabled, innerHTML, style, role, value, href, name } = this.props;
        return (
            <ButtonRoleGroup rolelist={rolelist}>
                {
                    isAButton ? <a
                        className = { 'p-l-s-b p-l-s-b-g' + (className? (" "+className) : '') }
                        style = { style }
                        value = { value }
                        role = { role }
                        name = { name }
                        href = { href }
                        onClick = { onClick }
                        disabled = { disabled }
                    >
                        { innerHTML }
                    </a>
                    : this.buttons()
                }  
            </ButtonRoleGroup>       
        )
    }
}
