import React, { Component } from "react";
import { Form, Select, Row, Col, Input, Radio, Icon } from "antd";
import { withRouter } from "react-router-dom";
import Button from "../../../../../components/uielements/button";
import { userValidation } from "../../../../../Validations/usersValidation";
import { ActionWrapper } from "../../../crud.style";
import Card from "../../../../../components/uielements/styles/card.style";
import {
  getAgency,
  getAgencyTeams
} from "../../../../../helpers/http-api-client";
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
      teams: [],
      agencies: [],
      passwordType: false,
      selected: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.generatePassword = this.generatePassword.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.handleAgencyChange = this.handleAgencyChange.bind(this);
  }

  componentDidMount() {
    getAgency().then(res => {
      this.setState({ agencies: res.data.rows });
    });
  }

  componentWillReceiveProps(props) {
    if (props.user) {
      this.handleAgencyChange(props.user.clientTeams[0].agencyId);
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

  handleAgencyChange(agencyId) {
    getAgencyTeams({ query: { agencyId } }).then(res => {
      this.setState({ teams: res.data });
      this.setState({ selected: [] });
    });
  }

  resetForm() {
    this.setState({ passwordType: false });
    this.props.form.resetFields();
  }

  generage() {
    let length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  generatePassword(e) {
    this.setState({ passwordType: !this.state.passwordType });
    let password = "";
    if (e.target.value) {
      this.props.form.setFieldsValue({
        password: this.generage()
      });
    } else {
      this.props.form.setFieldsValue({
        password
      });
    }
  }

  render() {
    const margin = {
      margin: "5px 5px 0px 0"
    };
    const statusOptions = this.state.status.map(status => (
      <Option key={status.id}>{status.name}</Option>
    ));
    const teamOptions = this.state.teams.map(team => (
      <Option key={team.agencyTeamId}>{team.name}</Option>
    ));
    const agenciesOptions = this.state.agencies.map(agency => (
      <Option key={agency.agencyId}>{agency.name}</Option>
    ));
    const { getFieldDecorator } = this.props.form;

    const selectAfter = (
      <Select defaultValue="Services" style={{ width: 120 }}>
        <Option value="skype">Skype</Option>
        <Option value="whatsapp messenger">WhatsApp Messenger</Option>
        <Option value="facebook messenger">Facebook Messenger</Option>
        <Option value="viber">Viber</Option>
        <Option value="wechat">WeChat</Option>
        <Option value="bbm">BBM</Option>
        <Option value="telgram">Telegram</Option>
        <Option value="line">LINE</Option>
        <Option value="zalo">Zalo</Option>
      </Select>
    );

    //Responsive span
    const formResSpan = {
      xl: { span: 12 },
      lg: { span: 12 },
      md: { span: 24 },
      sm: { span: 24 }
    };

    return (
      <div>
        <Form onSubmit={this.handleSubmit} id="clientForm">
          <Row gutter={16}>
            <Col {...formResSpan}>
              <Row>
                <Col span={24}>
                  <FormItem label="Agency Name" style={margin}>
                    {getFieldDecorator("agency", {
                      rules: userValidation.agency
                    })(
                      <Select
                        showSearch
                        placeholder="Agency"
                        onChange={this.handleAgencyChange}
                      >
                        {agenciesOptions}
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
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

              <FormItem label="User Name" style={margin}>
                {getFieldDecorator("username", {
                  rules: userValidation.username
                })(<Input placeholder="Enter User Name" />)}
              </FormItem>
              <FormItem label="Password" style={margin}>
                {getFieldDecorator("password", {})(
                  <Input placeholder="Enter Password" />
                )}
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
            </Col>
            <Col {...formResSpan}>
              <Card title="Teams">
                <FormItem style={margin} label="Select Teams">
                  <InputGroup size="large">
                    <Col span={2}>
                      <Icon
                        type="search"
                        style={{
                          fontSize: "24px",
                          color: "#08c",
                          margin: "5px"
                        }}
                      />
                    </Col>
                    <Col span={22}>
                      {getFieldDecorator("agencyTeams", {
                        rules: userValidation.team
                      })(
                        <Select
                          showSearch
                          mode="multiple"
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          placeholder="Please choose teams"
                          style={{ width: "100%" }}
                        >
                          {teamOptions}
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
                    <Row>
                      <Col span={24}>
                        {/*<FormItem style={margin} label="Facebook:">
                          {getFieldDecorator('contactInformation.facebookHandle', {rules: userValidation.client})(
                            <Input placeholder="Facebook Account"/>
                          )}
                        </FormItem>*/}
                        <FormItem style={margin} label="Instant Messaging:">
                          {getFieldDecorator(
                            "contactInformation.instantMessaging1",
                            {}
                          )(
                            <Input
                              addonAfter={selectAfter}
                              defaultValue="mysite"
                            />
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        {/*<FormItem style={margin} label="Twitter:">
                          {getFieldDecorator('contactInformation.twitterHandle', {})(
                            <Input placeholder="Twitter Account" />
                          )}
                        </FormItem>*/}
                        <FormItem style={margin} label="Instant Messaging:">
                          {getFieldDecorator(
                            "contactInformation.instantMessaging2",
                            {}
                          )(
                            <Input
                              addonAfter={selectAfter}
                              defaultValue="mysite"
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
          <Row style={margin}>
            <Col span={24}>
              {this.props.errors.details.length ? (
                <Errors errors={this.props.errors} />
              ) : (
                ""
              )}
            </Col>
          </Row>
          <ActionWrapper style={margin}>
            <Button
              type="primary"
              style={margin}
              icon="left"
              onClick={() => this.props.history.goBack()}
            >
              Cancel
            </Button>
            <Button
              id="btnSubmit"
              type="primary"
              style={margin}
              htmlType="submit"
              className=""
              icon="save"
            >
              Submit
            </Button>
          </ActionWrapper>
        </Form>
      </div>
    );
  }
}

const mapPropsToFields = props => {
  if (!props.hasOwnProperty("user") || !props.user) {
    return;
  }
  let teams = props.user.agencyTeams.map(function(team) {
    return team.agencyTeamId.toString();
  });
  let agencyId = props.user.agencyTeams[0].agencyId.toString();
  return {
    agency: Form.createFormField({
      value: agencyId
    }),
    agencyTeams: Form.createFormField({
      value: teams
    }),
    status: Form.createFormField({
      value: props.user.status
    }),
    username: Form.createFormField({
      value: props.user.username
    }),
    "contactInformation.emailAddress": Form.createFormField({
      value: props.user.contactInformation.emailAddress
    }),
    "contactInformation.postalAddress": Form.createFormField({
      value: props.user.contactInformation.postalAddress
    }),
    "contactInformation.mobilePhone": Form.createFormField({
      value: props.user.contactInformation.mobilePhone
    }),
    "contactInformation.smsPhone": Form.createFormField({
      value: props.user.contactInformation.smsPhone
    }),
    "contactInformation.facebookHandle": Form.createFormField({
      value: props.user.contactInformation.facebookHandle
    }),
    "contactInformation.twitterHandle": Form.createFormField({
      value: props.user.contactInformation.twitterHandle
    }),
    "contactInformation.linkedInUrl": Form.createFormField({
      value: props.user.contactInformation.linkedInUrl
    }),
    resumeUrl: Form.createFormField({
      value: props.user.contactInformation.resumeUrl
    })
  };
};
const form = Form.create({ mapPropsToFields })(UserForm);
export default withRouter(form);
