import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Form, Select, Row, Col, Input, Radio } from "antd";
import { generateRandomPassword } from '@helpers/utility';
import { userValidation } from "@validations/usersValidation";
import Card from "@components/uielements/styles/card.style";
import userStatus from "@constants/userStatus";

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;
const InputGroup = Input.Group;

const margin = {
  margin: "5px 5px 0px 0",
};
//Responsive span
const formResSpan = {
  xl: { span: 12 },
  lg: { span: 12 },
  md: { span: 24 },
  sm: { span: 24 }
};


class UserFormFields extends Component {
  constructor() {
    super();
    this.state = {
      passwordType: false
    };
    this.generatePassword = this.generatePassword.bind(this);
  }

  generatePassword(e) {
    this.setState({ passwordType: !this.state.passwordType });
    let password = "";
    if (e.target.value) {
      this.props.form.setFieldsValue({
        password: generateRandomPassword()
      });
    } else {
      this.props.form.setFieldsValue({
        password
      });
    }
  }

  getPasswordFieldDecoratorOption() {
    if (this.props.formType === "create") {
      return {
        rules: userValidation.password
      };
    }
    return { rules: [{ min: 6 }] };
  }

  getIMServiceSelector(name) {
    const { getFieldDecorator } = this.props.form;
    return getFieldDecorator(name, {})(
      <Select style={{ width: 150 }} placeholder="Select IM service">
        <Option value="skype">Skype</Option>
        <Option value="whatsapp">WhatsApp Messenger</Option>
        <Option value="facebook">Facebook Messenger</Option>
        <Option value="viber">Viber</Option>
        <Option value="wechat">WeChat</Option>
        <Option value="bbm">BBM</Option>
        <Option value="telgram">Telegram</Option>
        <Option value="line">LINE</Option>
        <Option value="zalo">Zalo</Option>
      </Select>
    );
  }

  renderRoleColumn(getFieldDecorator) {
    const roleOptions = this.props.roles.map(role => (
      <Option key={role.roleId} value={role.roleId}>
        {role.title}
      </Option>
    ));
    return (
      <Col {...formResSpan}>
        <Card title="Role">
          <FormItem style={margin} label="Select Role">
            <InputGroup size="large">
              <Col span={22}>
                {getFieldDecorator("role", {
                  rules: userValidation.role
                })(
                  <Select
                    showSearch
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    placeholder="Please choose role"
                    style={{ width: "100%" }}
                  >
                    {roleOptions}
                  </Select>
                )}
              </Col>
            </InputGroup>
          </FormItem>
        </Card>
      </Col>
    );
  }

  renderStatusSelector(getFieldDecorator) {
    const statusOptions = userStatus.map(status => (
      <Option key={status.id} value={status.id}>
        {status.label}
      </Option>
    ));
    return (
      <FormItem label="Status" style={margin}>
        {getFieldDecorator("status", {
          rules: userValidation.status
        })(
          <Select showSearch placeholder="Status">
            {statusOptions}
          </Select>
        )}
      </FormItem>
    )
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
          <Row gutter={16}>
            <Col {...formResSpan}>
              <FormItem label="User Name" style={margin}>
                {getFieldDecorator("username", {
                  rules: userValidation.username
                })(<Input placeholder="Enter User Name" />)}
              </FormItem>
              <FormItem label="Password" style={margin}>
                {getFieldDecorator(
                  "password",
                  this.getPasswordFieldDecoratorOption()
                )(<Input placeholder="Enter Password" />)}
              </FormItem>
              <FormItem style={margin}>
                <RadioGroup
                  style={margin}
                  onChange={this.generatePassword}
                  value={this.state.passwordType}
                >
                  <Radio value={false}>Custom Password</Radio>
                  <Radio value={true}>Generate Password</Radio>
                </RadioGroup>
              </FormItem>
              {this.props.showRoleSelector && this.renderStatusSelector(getFieldDecorator)}
            </Col>
            {this.props.showRoleSelector && this.renderRoleColumn(getFieldDecorator)}
            { !this.props.showRoleSelector && 
              <Col {...formResSpan}>
                {this.renderStatusSelector(getFieldDecorator)}
              </Col>
            }
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Card title="Contact Information" style={{ marginTop: "20px" }}>
                <Row gutter={16}>
                  <Col {...formResSpan}>
                    <FormItem style={margin} label="Postal Address:">
                      {getFieldDecorator("contactInformation.postalAddress", {
                        rules: userValidation.client
                      })(
                        <TextArea placeholder="Enter Postal Address" rows={9} />
                      )}
                    </FormItem>
                    <FormItem style={margin} label="Email Address:">
                      {getFieldDecorator("contactInformation.emailAddress", {
                        rules: userValidation.email
                      })(<Input placeholder="Enter Email Address" />)}
                    </FormItem>
                  </Col>
                  <Col {...formResSpan}>
                    <FormItem style={margin} label="Mobile Phone:">
                      {getFieldDecorator("contactInformation.mobilePhone", {
                        rules: userValidation.client
                      })(<Input placeholder="Enter Mobile Phone" />)}
                    </FormItem>
                    <FormItem style={margin} label="SMS:">
                      {getFieldDecorator("contactInformation.smsPhone", {
                        rules: userValidation.client
                      })(<Input placeholder="Enter SMS Phone" />)}
                    </FormItem>
                    <FormItem style={margin} label="Instant Messaging: ">
                      {getFieldDecorator('instantMessengerInfos[0]["messengerId"]')(
                        <Input addonBefore={this.getIMServiceSelector('instantMessengerInfos[0]["service"]')} style={{ width: '100%' }} />
                      )}
                    </FormItem>
                    <FormItem style={margin}>
                      {getFieldDecorator('instantMessengerInfos[1]["messengerId"]')(
                        <Input addonBefore={this.getIMServiceSelector('instantMessengerInfos[1]["service"]')} style={{ width: '100%' }} />
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Card title="Skills" style={{ marginTop: "20px" }}>
                <FormItem label="LinkedIn URL" style={margin}>
                  {getFieldDecorator("contactInformation.linkedInUrl", {
                    rules: userValidation.client
                  })(<Input placeholder="Linkedin URL" />)}
                </FormItem>
                <FormItem label="Resume URL" style={margin}>
                  {getFieldDecorator("resumeUrl", {})(
                    <Input placeholder="Resume URL" />
                  )}
                </FormItem>
              </Card>
            </Col>
          </Row>
      </div>
    );
  }
}

UserFormFields.propTypes = {
  form: PropTypes.object,
  roles: PropTypes.array,
  showRoleSelector: PropTypes.bool
};

export default UserFormFields;