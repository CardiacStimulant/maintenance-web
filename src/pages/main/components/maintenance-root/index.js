import React, { Component } from 'react'
import Form from 'bee-form';
import { Row, } from "tinper-bee";
import MaintenanceTop from "../top";
import $ from "jquery";
import './index.less';

class MaintenanceRoot extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        return (
            <Row className="maintenance-root">
                <MaintenanceTop />
            </Row>
        )
    }
}

export default Form.createForm()(MaintenanceRoot)