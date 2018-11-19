import React, { Component } from 'react';
import { Form, Select, Row, Col, Input, Radio, Icon } from 'antd';
import { withRouter } from 'react-router-dom'
import Button from '../../../../../components/uielements/button';
import { userValidation } from '../../../../../Validations/usersValidation';
import {
  ActionWrapper,
} from '../../../crud.style';
import Card from "../../../../../components/uielements/styles/card.style";
import { getCompany, getAgency, getRoles } from "../../../../../helpers/http-api-client";
import { userStatus } from "../../../../../constants/userStatus";
import Errors from "../../../../Errors";

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;
const InputGroup = Input.Group;

class UserForm extends Component {
  constructor() {
    super();
    this.state = {
      status: userStatus,
      roles: [],
      passwordType: false,
      selected: []
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.generatePassword = this.generatePassword.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    //get company teams and roles 
    try{
      let roles = await getRoles({
        query: {
          type: this.props.userType
        },
        paginationOptions: {
          defaultCurrent: 1,
          current: 1,
          pageSize: 20,
          total: 1
        }
      });
      switch(this.props.userType){
        case 'clientUser':
          let company = await getCompany(this.props.relId);
          this.setState({
            roles: roles.data.rows,
            company: company.data
          });
        break;
        case 'agencyUser':
          let agency = await getAgency(this.props.relId);
          this.setState({
            roles: roles.data.rows,
            agency: agency.data
          });
        break;
      }
    } catch(e) {

    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.submit(values, this.resetForm);
      }
    });
  }

  resetForm() {
    this.setState({passwordType: false});
    this.props.form.resetFields();
  }

  generateRandom() {
    let length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  generatePassword(e) {
    this.setState({ passwordType: !this.state.passwordType });
    let password = '';
    if (e.target.value) {
      this.props.form.setFieldsValue({
        password: this.generateRandom()
      });
    } else {
      this.props.form.setFieldsValue({
        password
      });
    }
  }

  render() {
    const margin = {
      margin: '5px 5px 0px 0'
    };
    const statusOptions = this.state.status.map(status => <Option key={status.id}>{status.name}</Option>);
    const roleOptions = this.state.roles.map(role => <Option key={role.roleId}>{role.title}</Option>);
    const { getFieldDecorator } = this.props.form;

    const IMSelectAfter = (name) => {
      return getFieldDecorator(name, {
        initialValue: '',
      })(
        <Select  style={{ width: 120 }}>
          <Option value="">Services</Option>
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

    //Responsive span
    const formResSpan = {
      xl: { span: 12 },
      lg: { span: 12 },
      md: { span: 24 },
      sm: { span: 24 },
    };

    return (
      <div>
        <Form onSubmit={this.handleSubmit} id="clientForm">
          <Row gutter={16}>
            <Col {...formResSpan}>
              <FormItem label="User Name" style={margin}>
                {getFieldDecorator('username', { rules: userValidation.username })(
                  <Input placeholder="Enter User Name" />
                )}
              </FormItem>
              <FormItem label="Password" style={margin}>
                {getFieldDecorator('password', { rules: userValidation.password })(
                  <Input
                    placeholder="Enter Password"
                  />
                )}
              </FormItem>
              <FormItem style={margin}>
                <RadioGroup style={margin} onChange={this.generatePassword} value={this.state.passwordType}>
                  <Radio value={false}>Custom Password</Radio>
                  <Radio value={true}>Generate Password</Radio>
                </RadioGroup>
              </FormItem>
              <Row>
                <Col span={24}>
                  <FormItem label="Status" style={margin}>
                    {getFieldDecorator('status', { rules: userValidation.status })(
                      <Select showSearch placeholder="Status">
                        {statusOptions}
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Col>
            <Col {...formResSpan}>
              <Card title="Role">
                <FormItem style={margin} label="Select Role">
                  <InputGroup size="large">
                    <Col span={22}>
                      {getFieldDecorator('role', { rules: userValidation.role })(
                        <Select showSearch
                          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                          placeholder="Please choose role"
                          style={{ width: '100%' }}>
                          {roleOptions}
                        </Select>
                      )}
                    </Col>
                  </InputGroup>
                </FormItem>
              </Card>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Card title="Contact Information" style={{ marginTop: '20px' }}>
                <Row gutter={16}>
                  <Col {...formResSpan}>
                    <FormItem style={margin} label="Postal Address:">
                      {getFieldDecorator('contactInformation.postalAddress', { rules: userValidation.client })(
                        <TextArea placeholder="Enter Postal Address" rows={9} />
                      )}
                    </FormItem>
                    <FormItem style={margin} label="Email Address:">
                      {getFieldDecorator('contactInformation.emailAddress', { rules: userValidation.email })(
                        <Input placeholder="Enter Email Address" />
                      )}
                    </FormItem>
                  </Col>
                  <Col {...formResSpan}>
                    <FormItem style={margin} label="Mobile Phone:">
                      {getFieldDecorator('contactInformation.mobilePhone', { rules: userValidation.client })(
                        <Input placeholder="Enter Mobile Phone" />
                      )}
                    </FormItem>
                    <FormItem style={margin} label="SMS:">
                      {getFieldDecorator('contactInformation.smsPhone', { rules: userValidation.client })(
                        <Input placeholder="Enter SMS Phone" />
                      )}
                    </FormItem>
                    <Row>
                      <Col span={24}>
                        <FormItem
                          style={margin}
                          label="Instant Messaging:"
                          >
                          {getFieldDecorator('instantMessengerInfos[0]["messengerId"]', { 
                            initialValue: ''
                           })(
                            <Input
                              addonAfter={IMSelectAfter('instantMessengerInfos[0]["service"]')}
                            />
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <FormItem
                          style={margin}
                          label="Instant Messaging:"
                        >
                          {getFieldDecorator('instantMessengerInfos[1]["messengerId"]', {})(
                            <Input
                              addonAfter={IMSelectAfter('instantMessengerInfos[1]["service"]')}
                            />
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Card title="Skills" style={{ marginTop: '20px' }}>
                <FormItem label="LinkedIn URL" style={margin}>
                  {getFieldDecorator('contactInformation.linkedInUrl', { rules: userValidation.client })(
                    <Input
                      placeholder="Linkedin URL"
                    />
                  )}
                </FormItem>
                <FormItem label="Resume URL" style={margin}>
                  {getFieldDecorator('resumeUrl', {})(
                    <Input
                      placeholder="Resume URL"
                    />
                  )}
                </FormItem>
              </Card>
            </Col>
          </Row>
          <Row style={margin}>
            <Col span={24}>
              {this.props.errors.details.length ? <Errors errors={this.props.errors} /> : ''}
            </Col>
          </Row>
          <ActionWrapper style={margin}>
            <Button type="primary" style={margin} icon="left" onClick={() => this.props.history.goBack()}>
              Cancel
            </Button>
            <Button id="btnSubmit" type="primary" style={margin} htmlType="submit" className="" icon="save">
              Submit
            </Button>
          </ActionWrapper>
        </Form>
      </div>
    );
  }
}

const mapPropsToFields = (props) => {
  if (!props.hasOwnProperty('user') || !props.user) {
    return;
  }
  //get role and set for edit
  
  let clientId = props.relId;
  return {
    company: Form.createFormField({
      value: clientId
    }),
    /*role: Form.createFormField({
      value: role
    }),*/
    status: Form.createFormField({
      value: props.user.status
    }),
    username: Form.createFormField({
      value: props.user.username
    }),
    'contactInformation.emailAddress': Form.createFormField({
      value: props.user.contactInformation.emailAddress
    }),
    'contactInformation.postalAddress': Form.createFormField({
      value: props.user.contactInformation.postalAddress
    }),
    'contactInformation.mobilePhone': Form.createFormField({
      value: props.user.contactInformation.mobilePhone
    }),
    'contactInformation.smsPhone': Form.createFormField({
      value: props.user.contactInformation.smsPhone
    }),
    'contactInformation.facebookHandle': Form.createFormField({
      value: props.user.contactInformation.facebookHandle
    }),
    'contactInformation.twitterHandle': Form.createFormField({
      value: props.user.contactInformation.twitterHandle
    }),
    'contactInformation.linkedInUrl': Form.createFormField({
      value: props.user.contactInformation.linkedInUrl
    }),
    resumeUrl: Form.createFormField({
      value: props.user.contactInformation.resumeUrl
    }),
  };
};
const form = Form.create({mapPropsToFields})(UserForm);
export default withRouter(form);
