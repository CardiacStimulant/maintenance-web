import React, { Component } from 'react'
import Form from 'bee-form';
import { Row, Icon, } from "tinper-bee";
import $ from "jquery";
import './index.less';

class MaintenanceTop extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        return (
            <Row className="maintenance-top">
                <Row className="maintenance-top-left"></Row>
                <Row className="maintenance-top-right">
                    <Icon type="uf-userset" />
                </Row>
            </Row>
        )
    }
}

export default Form.createForm()(MaintenanceTop)