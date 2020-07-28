
import React, { Component } from 'react'
import { Row, Col } from "tinper-bee";
import './SearchBar.less';
import Button from 'components/Button';
import ButtonRoleGroup from 'components/ButtonRoleGroup';

export default class SearchBar extends Component {
    state = {
        expand:this.props.openMoreBtn?false:true
    };

    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            this.props.search(err, values)
        });
    }

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }
    
    isArrayFn = (value) => {
        if (typeof Array.isArray === "function") {
            return Array.isArray(value);
        }else{
            return Object.prototype.toString.call(value) === "[object Array]";
        }
    }

    render(){
        const { searchDatas, searchButtons, openMoreBtn, handleSearch } = this.props;
        const { expand } = this.state;
        const openMoreBtnNum = openMoreBtn||searchDatas.length;
        const count = expand ? searchDatas.length : openMoreBtnNum;
        let searchButtonsLeft = [], searchButtonsRight = [];
        if(searchButtons){
            if(this.isArrayFn(searchButtons)){
                searchButtonsRight = searchButtons;
            } else {
                searchButtons.left&&(searchButtonsLeft = searchButtons.left);
                searchButtons.right&&(searchButtonsRight = searchButtons.right);
            }
        }
        const hasSearchButtons = searchButtons || handleSearch || openMoreBtn;
        return (
            <Row className="form-item-layout">
                {
                    searchDatas.length ? searchDatas.map(({attr,components,key,className},i) => (
                        <Col key={key} style={{display: `${i < count?'block':'none'}`}} {...attr} className={className||''}>
                            { components }
                        </Col>
                    )) : null
                }
                {
                    hasSearchButtons ? <Col lg={12} md={12} sm={12} xs={12} className="form-item-btn-box">
                        {
                            searchButtonsLeft&&searchButtonsLeft.map((item,i) => {
                                let style = {float:'left'};
                                if(i==0) style.marginLeft = 0;
                                return (
                                    item.type ?
                                    <Button style={style} key={i} {...item}/>
                                    : <ButtonRoleGroup rolelist={item.rolelist}>
                                        <div style={{...style, display: 'inline-block'}}>{item.dom}</div>
                                    </ButtonRoleGroup>
                                )
                            })
                        }
                        {
                            searchButtonsRight&&searchButtonsRight.map((item,i) => ( item.type ?
                                <Button key={i} {...item}/>
                                : <ButtonRoleGroup rolelist={item.rolelist}>{item.dom}</ButtonRoleGroup> ))
                        }
                        {
                            handleSearch?<Button type="gray" className="search-btn" onClick={this.handleSearch} value="查询"/>:null
                        }
                        {
                            openMoreBtn&&(searchDatas.length>openMoreBtnNum)
                            ?<Button type="gray" className="search-btn" onClick={this.toggle} value={expand?'普通':'高级'}/>:null
                        }
                    </Col> : null
                }
            </Row>
        )
    }
}