import React, { Component } from 'react';
import Form from 'bee-form';
import { Row, FormControl, Button, } from "tinper-bee";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Checkbox, } from 'antd';
import logoImg from 'static/fe/static/assets/images/logo1.png';
import { actions } from 'mirrorx';
import { Success, Warning, Error } from "utils";
import './index.less';

const FormItem = Form.FormItem;

class LoginMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitDisabled: false,
    }
  }

  handleSubmit = () => {
    this.props.form.validateFields(async (err, values) => {
      this.setState({
        submitDisabled: true,
      });
      if (!err) {
        // 登录账号
        const loginResult = await actions.Login.login(values);
        if(loginResult && loginResult.success) {
          window.location.href=`${GLOBAL_COMPONENTS_URL}/fe/main#/`;
        } else {
          this.setState({
            submitDisabled: false,
          });
          if(loginResult && loginResult.message) {
            Error(loginResult.message);
          }
        }
      } else {
        this.setState({
          submitDisabled: false,
        });
      }
      
    });
  };

  render() {
    const {submitDisabled} = this.state;
    const { getFieldProps, getFieldError } = this.props.form;

    return (
      <Row className="full-layout login-page">
        <Row className="login-form">
          <div className="user-img">
            <img src={logoImg} alt="logo" />
            <b>LANIF</b>
            <span>Admin</span>
          </div>
          <FormItem>
            <FormControl
              size="lg"
              prefix={<UserOutlined />}
              placeholder="用户名"
              {...getFieldProps('loginAccount', {
                initialValue: "",
                validateTrigger: ['onChange','onBlur'],
                rules: [
                    {
                        validator(rule, value, callback, source, options) {
                            var errors = [];
                            if (!value) {
                                callback("请输入用户名");
                            } else {
                                callback(errors);
                            }
                        }
                    }
                ]
              }) }
            />
            <span className='error'>
                {getFieldError('loginAccount')}
            </span>
          </FormItem>
          <FormItem name="password" rules={[{ required: true, message: '请输入您的密码' }]}>
            <FormControl
              size="lg"
              prefix={<LockOutlined />}
              type="password"
              placeholder="密码"
              {...getFieldProps('password', {
                initialValue: "",
                validateTrigger: ['onChange','onBlur'],
                rules: [
                    {
                        validator(rule, value, callback, source, options) {
                            var errors = [];
                            if (!value) {
                                callback("请输入密码");
                            } else {
                                callback(errors);
                            }
                        }
                    }
                ]
              }) }
            />
            <span className='error'>
                {getFieldError('password')}
            </span>
          </FormItem>
          <FormItem name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </FormItem>
          <Button
            size="lg"
            type="primary"
            className="login-form-button"
            disabled={submitDisabled}
            onClick={this.handleSubmit.bind()}
          >
            登录
            </Button>
        </Row>
      </Row>
    );
  }
}
export default Form.createForm()(LoginMain);