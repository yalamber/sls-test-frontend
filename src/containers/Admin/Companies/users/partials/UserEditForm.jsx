import _ from "lodash";
import React, { Component } from "react";
import { Form, Select, Row, Col, Input, Radio, Icon } from "antd";
import { withRouter } from "react-router-dom";
import Button from "../../../../../components/uielements/button";
import { userValidation } from "../../../../../Validations/usersValidation";
import { ActionWrapper } from "../../../crud.style";
import Card from "../../../../../components/uielements/styles/card.style";
import { getCompanies, getTeams } from "../../../../../actions/companyActions";
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
      companies: [],
      passwordType: false,
      selected: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.generatePassword = this.generatePassword.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
  }

  componentDidMount() {
    const { companyId } = this.props.match.params;
    getCompanies().then(res => {
      this.setState({ companies: res.data }, () => {
        this.handleCompanyChange(companyId);
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.submit(values, this.resetForm);
      }
    });
  }

  handleCompanyChange(companyId) {
    getTeams(companyId).then(res => {
      const { selectedTeam } = this.props.data;
      this.setState({ teams: res.data });
      if (res.data && res.data.length) {
        const found = _.find(
          res.data,
          (item => item.clientTeamId + "": selectedTeam)
        );

        return this.setState({
          selected: [found.clientTeamId + ""]
        });
      }

      return this.setState({
        selected: []
      });
    });
  }

  resetForm() {
    //this.props.history.goBack();
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

    const {
      data: { row }
    } = this.props;

    const { selectedTeam } = this.props.data;
    const { companyId } = this.props.match.params;
    const statusOptions = this.state.status.map(status => (
      <Option key={status.id}>{status.name}</Option>
    ));
    const { teams, selected } = this.state;

    const teamOptions = teams.map(team => (
      <Option key={team.clientTeamId}>{team.name}</Option>
    ));
    const currentTeam = _.find(
      teams,
      item => item.clientTeamId + "" === selectedTeam
    );

    const companiesOptions = this.state.companies.map(company => (
      <Option key={company.clientId}>{company.name}</Option>
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
                  <FormItem label="Company Name" style={margin}>
                    {getFieldDecorator("company", {
                      initialValue: companyId,
                      rules: userValidation.company
                    })(
                      <Select
                        showSearch
                        placeholder="Company"
                        onChange={this.handleCompanyChange}
                      >
                        {companiesOptions}
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <FormItem label="Status" style={margin}>
                    {getFieldDecorator("status", {
                      initialValue: row.status,
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
                  initialValue: row.username,
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
                      {getFieldDecorator("clientTeams", {
                        initialValue:
                          currentTeam && currentTeam.clientTeamId + "",
                        rules: userValidation.team
                      })(
                        <Select
                          showSearch
                          mode="multiple"
                          filterOption={(input, option) => {
                            return (
                              option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            );
                          }}
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
                        initialValue: row.contactInformation.postalAddress,
                        rules: userValidation.client
                      })(
                        <TextArea placeholder="Enter Postal Address" rows={9} />
                      )}
                    </FormItem>
                    <FormItem style={margin} label="Email Address:">
                      {getFieldDecorator("contactInformation.emailAddress", {
                        initialValue: row.contactInformation.emailAddress,
                        rules: userValidation.email
                      })(<Input placeholder="Enter Email Address" />)}
                    </FormItem>
                  </Col>
                  <Col {...formResSpan}>
                    <FormItem style={margin} label="Mobile Phone:">
                      {getFieldDecorator("contactInformation.mobilePhone", {
                        initialValue: row.contactInformation.mobilePhone,
                        rules: userValidation.client
                      })(<Input placeholder="Enter Mobile Phone" />)}
                    </FormItem>
                    <FormItem style={margin} label="SMS:">
                      {getFieldDecorator("contactInformation.smsPhone", {
                        initialValue: row.contactInformation.smsPhone,
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
                            { }
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
                    initialValue: row.contactInformation.linkedInUrl,
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

const form = Form.create()(UserForm);
export default withRouter(form);
