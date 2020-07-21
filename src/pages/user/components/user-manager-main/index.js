import React, { Component } from 'react';
import Form from 'bee-form';
import { Row, FormControl, Button, } from "tinper-bee";
import './index.less';

const FormItem = Form.FormItem;

class UserManagerMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitDisabled: false,
    }
  }

  render() {
    const {submitDisabled} = this.state;
    const { getFieldProps, getFieldError } = this.props.form;

    return (
      <Row className="full-layout login-page">
        user
      </Row>
    );
  }
}
export default Form.createForm()(UserManagerMain);