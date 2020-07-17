import React, { Component } from 'react'
import { FormControl, Tree } from 'tinper-bee';
// import Tree from 'bee-tree';
// import 'bee-tree/build/Tree.css';
import Button from 'components/Button';
// import {gData} from './data'
import './TreeSelect.less';

/**
 * {} 内带 * 为 必传项
 * 列表页组件 例：pages/work_order/components/work-order-list  index.js 和 data文件夹里的两个js文件
 * @param {*Array} gData 树形结构数据 参考./data.js
 * @param {Boolean} searchBox 是否带搜索功能，默认不带，选择树节点的返回值：不带时有children属性，带时无children属性
 * @param {Function} onSelect 点击树节点方法
 * @param {Function} TreeSelectClick 确定按钮点击方法
 * @param {String} className 树样式
 */

const {TreeNode} = Tree;

export default class TreeSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedKeys: [],// 展开指定节点
            checkedKeys: [],// 选中复选框的树节点（多选框）
            selectedKeys: [],// 设置选中的树节点（点击）
            searchValue: '',// 搜索内容
            autoExpandParent: true,// 是否自动展开父节点
        }
        this.onExpand = this.onExpand.bind(this);// 展开/收起节点时触发的回调函数
        this.onCheck = this.onCheck.bind(this);// 点击复选框触发的回调方法
        this.onSelect = this.onSelect.bind(this);// 点击树节点触发的回调函数
        this.dataList = [];// 所有节点name集合
        // this.gData = props.gData||[];//gData;
    }
    async componentDidMount() {
        // 初始化，只提取一次所有节点的name
        await this.props.searchBox&&this.generateList(this.props.gData);
        this.onChange('');
    }
    generateList = (data) => {
        for (let i = 0; i < data.length; i++) {
            const node = data[i];
            const name = node.name;
            this.dataList.push({ name });
            if (node.children) {
                this.generateList(node.children);
            }
        }
    };
    getParentKey = (name, tree) => {
        let parentKey;
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node.children) {
                if (node.children.some(item => item.name === name)) {
                    parentKey = node.id;
                } else if (this.getParentKey(name, node.children)) {
                    parentKey = this.getParentKey(name, node.children);
                }
            }
        }
        return parentKey;
    };
    // 联想搜索
    onChange = (value) => {
        const expandedKeys = [];
        this.dataList.forEach((item) => {
            if (item.name.indexOf(value) > -1) {
                expandedKeys.push(this.getParentKey(item.name, this.props.gData));
            }
        });
        const uniqueExpandedKeys = [];
        expandedKeys.forEach((item) => {
            if (item && uniqueExpandedKeys.indexOf(item) === -1) {
                uniqueExpandedKeys.push(item);
            }
        });
        this.setState({
            expandedKeys: uniqueExpandedKeys,
            searchValue: value,
            autoExpandParent: true,
        });
    }
    // 展开/收起节点时触发的回调函数
    onExpand(expandedKeys,nodeInfo) {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }
    // 点击复选框触发的回调方法
    onCheck(checkedKeys) {
        this.setState({
            checkedKeys,
            selectedKeys: [],
        });
    }
    // 点击树节点触发的回调函数
    onSelect(selectedKeys, info) {
        const { onSelect, gData } = this.props;
        this.setState({ selectedKeys });
        onSelect&&onSelect(selectedKeys[0]&&this.getKeyData(selectedKeys[0],gData));
    }
    getKeyData = (id, tree) => {
        for (let i = 0; i < tree.length; i++) {
            if (tree[i].id == id) {
                let _tree = { ...tree[i] };
                this.props.searchBox && _tree.children && delete _tree.children;
                return _tree;
            } else if(tree[i].children) {
                const newNode = this.getKeyData(id, tree[i].children);
                if (newNode) return newNode;
            }
        }
    };
    // 点击确定方法
    TreeSelectClick = () => {
        const { TreeSelectClick, gData } = this.props;
        const { selectedKeys } = this.state;
        TreeSelectClick&&TreeSelectClick(selectedKeys[0]&&this.getKeyData(selectedKeys[0],gData));
    }
    // keydown的钩子事件
    onKeyDown = (e,treeNode)=>{
        console.log('***',e);
        return false;
    }
    render() {
        const { searchValue, expandedKeys, autoExpandParent } = this.state;
        const { gData, checkable, className, searchBox, defaultSelectedKeys, didisabledFirst, cancelUnSelect } = this.props;
        const loop = (data, dataIndex) => data.map((item) => {
            const index = ((searchValue===0)||searchValue)?item.name.search(searchValue):-1;
            const title = (<span className={((index===0)||index)&&(index > -1)?'u-tree-searchable-filter':''}>{item.name}</span>);
            didisabledFirst&&dataIndex++;
            return (
                <TreeNode key={item.id} title={title} isLeaf={!item.children} disabled={!dataIndex}>
                    { item.children?loop(item.children,dataIndex):null }
                </TreeNode>
            )
        });
        return (
            searchBox ? <div className='tree-select-modal-body'>
                <FormControl
                    style={{ width: 200 }}
                    placeholder=''
                    onChange={this.onChange}
                />
                <Button className='tree-select-confirm' type='gray' onClick={this.TreeSelectClick} value='确定'/>
                <Tree
                    className={'tree-select-box'+(className?(' '+className):'')}
                    checkable={checkable}
                    // lazyLoad={true}
                    onExpand={this.onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    defaultExpandAll={true}
                    onCheck={this.onCheck}
                    onSelect={this.onSelect}
                    cancelUnSelect={cancelUnSelect}
                    keyFun={this.onKeyDown}
                    defaultSelectedKeys={defaultSelectedKeys||[]}
                >
                    {loop(gData, -1)}
                </Tree>
            </div>
            : <Tree
                className={'tree-select-box'+(className?(' '+className):'')}
                defaultExpandAll={true}
                onSelect={this.onSelect}
                cancelUnSelect={cancelUnSelect}
                defaultSelectedKeys={defaultSelectedKeys||[]}
            >
                {loop(gData, -1)}
            </Tree>
        )
    }
}