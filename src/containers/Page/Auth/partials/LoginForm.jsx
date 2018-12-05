import React, {Component} from 'react';
import {Form, Input, Checkbox} from 'antd';
import {withRouter, Link} from 'react-router-dom'
import Button from '@components/uielements/button';
import IntlMessages from '@components/utility/intlMessages';
import {loginValidation} from '@validations/loginValidation';

const FormItem = Form.Item;

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      userCred: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.submit(values);
      }
    });
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
                {getFieldDecorator('username', {rules: loginValidation.username})(
                    <Input  placeholder="Username" />
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('password', {rules: loginValidation.password})(
                    <Input  type="password" placeholder="Password" />
                )}
            </FormItem>
            <FormItem>
                <div className="isoInputWrapper isoLeftRightComponent">
                  <Checkbox>
                    <IntlMessages id="page.signInRememberMe" />
                  </Checkbox>
                  <Button type="primary"  htmlType="submit">
                    <IntlMessages id="page.signInButton" />
                  </Button>
                </div>
            </FormItem>
            <FormItem>
                <div className="isoCenterComponent isoHelperWrapper">
                    {/*<Link to="/forgot-password" className="isoForgotPass">
                        <IntlMessages id="page.signInForgotPass" />
                    </Link>*/}
                    <Link to="/request-account">
                        <IntlMessages id="page.requestAccount" />
                    </Link>
                </div>
            </FormItem>
        </Form>
      </div>
    );
  }
}

const form = Form.create()(LoginForm);
export default withRouter(form);