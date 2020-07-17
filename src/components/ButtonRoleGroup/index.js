/**
 * 按钮权限组件
 */

import React, { Component } from 'react';
// let rolelist = await commentAction.getRoleList(constant.YYCTIC001004);
// this.setState({ rolelist: rolelist });
/**
 * 按钮权限组件
 *
 * @class ButtonRoleGroup
 * @extends {Component}
 */
class ButtonRoleGroup extends Component {
    /**
     * 判断组件是否为权限内
     *
     * @param {JSX} comp 传入的按钮组件，通过props.role获得
     * @returns boolean
     */
    hasRoleComp = (role) => {
        if(!role) return true;
        let { rolelist } = this.props;
        for (let i = 0; i < rolelist.length; i++) {
            if (rolelist[i] == role) {
                return true;
            } 
        }
        return null;
    }

    createChildren = (children) => {
        let newChildren = [];
        children.map((Comp, key) => {
            newChildren.push(this.hasRoleComp(Comp.props.role) && Comp);
        });
        return newChildren;
    }

    createElement = () => {
        let { rolelist, children } = this.props;
        switch(true){
            case !Array.isArray(rolelist):
                return children;
            case Array.isArray(children):
                return this.createChildren(children);
            case !Array.isArray(children) && ( !children.props.role || this.hasRoleComp(children.props.role) ):
                return children;
            default:
                return null;
        }
    }

    render() {
        return ( this.createElement() );
    }
}
export default ButtonRoleGroup;