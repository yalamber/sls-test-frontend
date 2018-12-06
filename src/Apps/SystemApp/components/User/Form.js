import React, { Component } from "react";
import { Form, Select, Row, Col, Input, Radio } from "antd";
import { get } from 'lodash';
import Button from "@components/uielements/button";
import { generateRandomPassword } from '@helpers/utility';
import { userValidation } from "@validations/usersValidation";
import Card from "@components/uielements/styles/card.style";
import { userStatus } from "@constants/userStatus";

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
class UserForm extends Component {
  constructor() {
    super();
    this.state = {
      passwordType: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.generatePassword = this.generatePassword.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.submit(this.props.mode, this.props.relId, values, this.resetForm);
      }
    });
  }

  resetForm() {
    this.setState({ passwordType: false });
    this.props.form.resetFields();
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

  renderRoleColumn() {
    const roleOptions = this.props.roles.map(role => (
      <Option key={role.roleId} value={role.roleId}>
        {role.title}
      </Option>
    ));
    const { getFieldDecorator } = this.props.form;
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

  render() {
    const { history, form } = this.props;
    const { getFieldDecorator } = form;
    const statusOptions = userStatus.map(status => (
      <Option key={status.id} value={status.id}>
        {status.name}
      </Option>
    ));
    return (
      <div>
        <Form onSubmit={this.handleSubmit} id="clientForm">
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
              <Row>
                <Col span={24}>
                  <FormItem label="Status" style={margin}>
                    {getFieldDecorator("status", {
                      rules: userValidation.status
                    })(
                      <Select showSearch placeholder="Status">
                        {statusOptions}
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Col>
            {this.renderRoleColumn()}
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
          <Row style={{marginTop: '10px'}}>
            <Col span={24}>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button
                  type="primary"
                  icon="left"
                  onClick={() => history.goBack()}
                >
                  Cancel
                </Button>

                <Button
                  id="btnSubmit"
                  type="primary"
                  htmlType="submit"
                  className=""
                  icon="save"
                >
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const mapPropsToFields = props => {
  let { currentUser, role } = props;
  //testData TODO: remove this after test
  role = {
    roleId: 2
  };
  currentUser = {
    status: 'active',
    username: 'adadadadada',
    resumeUrl: 'http://test.com',
    contactInformation: {
      emailAddress: 'teststs@sdsd.comsdsd',
      postalAddress: 'testing ok ',
      mobilePhone: '9843612873',
      smsPhone: 'test2334',
      linkedInUrl: 'testing ok',
    },
    instantMessengerInfos: [
      {service: 'facebook', messengerId: 'yalu'},
      {service: 'facebook', messengerId: 'yalu2'},
    ]
  };
  return {
    role: Form.createFormField({
      value: get(role, 'roleId')
    }),
    status: Form.createFormField({
      value: get(currentUser, 'status')
    }),
    username: Form.createFormField({
      value: get(currentUser, 'username')
    }),
    resumeUrl: Form.createFormField({
      value: get(currentUser, 'resumeUrl')
    }),
    'contactInformation.emailAddress': Form.createFormField({
      value: get(currentUser, 'contactInformation.emailAddress')
    }),
    'contactInformation.postalAddress': Form.createFormField({
      value: get(currentUser, 'contactInformation.postalAddress')
    }),
    'contactInformation.mobilePhone': Form.createFormField({
      value: get(currentUser, 'contactInformation.mobilePhone')
    }),
    'contactInformation.smsPhone': Form.createFormField({
      value: get(currentUser, 'contactInformation.smsPhone')
    }),
    'contactInformation.linkedInUrl': Form.createFormField({
      value: get(currentUser, 'contactInformation.linkedInUrl')
    }),
    'instantMessengerInfos[0]["service"]': Form.createFormField({
      value: get(currentUser, 'instantMessengerInfos[0]["service"]')
    }),
    'instantMessengerInfos[0]["messengerId"]': Form.createFormField({
      value: get(currentUser, 'instantMessengerInfos[0]["messengerId"]')
    }),
    'instantMessengerInfos[1]["service"]': Form.createFormField({
      value: get(currentUser, 'instantMessengerInfos[1]["service"]')
    }),
    'instantMessengerInfos[1]["messengerId"]': Form.createFormField({
      value: get(currentUser, 'instantMessengerInfos[1]["messengerId"]')
    }),
  };
};
const form = Form.create({ mapPropsToFields })(UserForm);
export default form;
