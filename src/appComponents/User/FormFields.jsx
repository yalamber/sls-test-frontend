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
  state = {
    passwordType: false
  };

  generatePassword = (e) => {
    let {fieldName} = this.props;
    this.setState({ passwordType: !this.state.passwordType });
    if (e.target.value) {
      this.props.form.setFieldsValue({
        [`${fieldName}.password`]: generateRandomPassword()
      });
    } else {
      this.props.form.setFieldsValue({
        [`${fieldName}.password`]: ""
      });
    }
  }

  getPasswordFieldDecoratorOption() {
    if (this.props.mode === "add") {
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
        <Option value="telegram">Telegram</Option>
        <Option value="line">LINE</Option>
        <Option value="zalo">Zalo</Option>
      </Select>
    );
  }

  renderRoleColumn(fieldName, getFieldDecorator) {
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
                {getFieldDecorator(`${fieldName}.role`, {
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

  renderStatusSelector(fieldName, getFieldDecorator) {
    const statusOptions = userStatus.map(status => (
      <Option key={status.id} value={status.id}>
        {status.label}
      </Option>
    ));
    return (
      <FormItem hasFeedback label="Status" style={margin}>
        {getFieldDecorator(`${fieldName}.status`, {
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
    const { form, fieldName } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
          <Row gutter={16}>
            <Col {...formResSpan}>
              <FormItem hasFeedback label="User Name" style={margin}>
                {getFieldDecorator(`${fieldName}.username`, {
                  rules: userValidation.username
                })(<Input placeholder="Enter User Name" />)}
              </FormItem>
              <FormItem hasFeedback label="Password" style={margin}>
                {getFieldDecorator(`${fieldName}.password`,
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
              {this.props.showRoleSelector && this.renderStatusSelector(fieldName, getFieldDecorator)}
            </Col>
            {this.props.showRoleSelector && this.renderRoleColumn(fieldName, getFieldDecorator)}
            { !this.props.showRoleSelector &&
              <Col {...formResSpan}>
                {this.renderStatusSelector(fieldName, getFieldDecorator)}
              </Col>
            }
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Card title="Contact Information" style={{ marginTop: "20px" }}>
                <Row gutter={16}>
                  <Col {...formResSpan}>
                    <FormItem hasFeedback style={margin} label="Postal Address:">
                      {getFieldDecorator(`${fieldName}.contactInformation.postalAddress`, {
                        rules: userValidation.client
                      })(
                        <TextArea placeholder="Enter Postal Address" rows={9} />
                      )}
                    </FormItem>
                    <FormItem hasFeedback style={margin} label="Email Address:">
                      {getFieldDecorator(`${fieldName}.contactInformation.emailAddress`, {
                        rules: userValidation.email
                      })(<Input placeholder="Enter Email Address" />)}
                    </FormItem>
                  </Col>
                  <Col {...formResSpan}>
                    <FormItem hasFeedback style={margin} label="Mobile Phone:">
                      {getFieldDecorator(`${fieldName}.contactInformation.mobilePhone`, {
                        rules: userValidation.client
                      })(<Input placeholder="Enter Mobile Phone" />)}
                    </FormItem>
                    <FormItem hasFeedback style={margin} label="SMS:">
                      {getFieldDecorator(`${fieldName}.contactInformation.smsPhone`, {
                        rules: userValidation.client
                      })(<Input placeholder="Enter SMS Phone" />)}
                    </FormItem>
                    <FormItem style={margin} label="Instant Messaging: ">
                      {getFieldDecorator(`${fieldName}.instantMessengerInfos[0]["messengerId"]`)(
                        <Input addonBefore={this.getIMServiceSelector(`${fieldName}.instantMessengerInfos[0]["service"]`)} style={{ width: '100%' }} />
                      )}
                    </FormItem>
                    <FormItem style={margin}>
                      {getFieldDecorator(`${fieldName}.instantMessengerInfos[1]["messengerId"]`)(
                        <Input addonBefore={this.getIMServiceSelector(`${fieldName}.instantMessengerInfos[1]["service"]`)} style={{ width: '100%' }} />
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
                <FormItem hasFeedback label="LinkedIn URL" style={margin}>
                  {getFieldDecorator(`${fieldName}.contactInformation.linkedInUrl`, {
                    rules: userValidation.client
                  })(<Input placeholder="Linkedin URL" />)}
                </FormItem>
                <FormItem label="Resume URL" style={margin}>
                  {getFieldDecorator(`${fieldName}.resumeUrl`, {})(
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
  showRoleSelector: PropTypes.bool,
  fieldName: PropTypes.string
};

UserFormFields.defaultProps = {
  fieldName: 'user',
  mode: 'add'
};

export default UserFormFields;
