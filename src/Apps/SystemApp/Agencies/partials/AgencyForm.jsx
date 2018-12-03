import React, { Component } from "react";
import { Form, Select, Row, Col, Input, Radio, Icon, InputNumber } from "antd";
import { withRouter } from "react-router-dom";
import Button from "@components/uielements/button";
import { agencyValidation } from "@validations/agencyValidation.js";
import Errors from "@util/Errors";
import { userStatus } from "@constants/userStatus";
import { TitleWrapper, ComponentTitle } from "@util/crud.style";
import AgencyFormWrapper from "./agency.style.js";

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;
const InputGroup = Input.Group;

class AgencyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: userStatus,
      teams: [],
      companies: [],
      passwordType: false,
      selected: [],
      mobileNumber: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentDidMount() {
    // console.log("this.p", this.props);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      values.owner.contactInformation.mobilePhone = values.owner.contactInformation.mobilePhone ? `${values.owner.contactInformation.mobilePhone}` : values.owner.contactInformation.mobilePhone;

      if (!err) {
        this.props.submit(values, this.resetForm);
      }
    });
  }

  resetForm() {
    this.setState({ passwordType: false });
    this.props.form.resetFields();
  }

  formatMobileNumber(v) {
    var value = `${v}`.substr(0, 15);
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1 $2');
    value = value.replace(/(\d{4})(\d)/, '$1 $2');
    value = value.replace(/(\d{4})(\d)/, '$1 $2');

    return `${value}`;
  }

  formatMobileParser(v) {
    if (value && value.length > 14) return `${value}`;

    var value = `${v}`;
    value = value.replace(/\D/g, '');

    return parseInt(value);
  }

  render() {
    const margin = {
      margin: "5px 5px 0px 0"
    };
    const statusOptions = this.state.status.map(status => (
      <Option key={status.id}>{status.name}</Option>
    ));
    const teamOptions = this.state.teams.map(team => (
      <Option key={team.clientTeamId}>{team.name}</Option>
    ));
    const companiesOptions = this.state.companies.map(company => (
      <Option key={company.clientId}>{company.name}</Option>
    ));
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        lg: { span: 9 },
        md: { span: 5 },
        sm: { span: 24 }
      },
      wrapperCol: {
        lg: { span: 15 },
        md: { span: 19 },
        sm: { span: 24 }
      }
    };
    const formItemLayout1 = {
      labelCol: {
        lg: { span: 3 },
        md: { span: 5 },
        sm: { span: 24 }
      },
      wrapperCol: {
        lg: { span: 21 },
        md: { span: 19 },
        sm: { span: 24 }
      }
    };

    //Responsive span
    const formResSpan = {
      xl: { span: 12 },
      lg: { span: 12 },
      md: { span: 24 },
      sm: { span: 24 }
    };

    //Margin bottom
    const marginBottom = {
      marginBottom: 14
    };

    const selectAfter = (
      <Select defaultValue="Services" style={{ width: 120 }}>
        <Option value=".com">Service One</Option>
        <Option value=".jp">Service Two</Option>
        <Option value=".cn">Service Three</Option>
        <Option value=".org">Service Four</Option>
      </Select>
    );

    return (
      <AgencyFormWrapper>
        <Form onSubmit={this.handleSubmit} id="clientForm">
          <Row gutter={16} style={marginBottom}>
            <Col {...formResSpan}>
              <FormItem style={margin} label="Agency Name:">
                {getFieldDecorator("name", {
                  initialValue: "",
                  rules: agencyValidation.agencyName
                })(<Input placeholder="Enter Agency Name" />)}
              </FormItem>
            </Col>
            <Col {...formResSpan}>
              <FormItem style={margin} label="Agency Address:">
                {getFieldDecorator("location", {
                  initialValue: "",
                  rules: agencyValidation.agencyAddress
                })(<TextArea placeholder="Enter Agency Address" rows={5} />)}
              </FormItem>
            </Col>
          </Row>

          <TitleWrapper>
            <ComponentTitle style={{ marginTop: 30 }}>
              Agency Account Owner
            </ComponentTitle>
          </TitleWrapper>

          <Row gutter={16}>
            <Col span={24}>
              {/*<Card title="Contact Information" style={{ marginTop: '20px' }}>

              </Card>*/}
              <Row gutter={16}>
                <Col {...formResSpan}>
                  <FormItem style={margin} label="User Name:">
                    {getFieldDecorator("owner.username", {
                      initialValue: "",
                      rules: agencyValidation.username
                    })(<Input placeholder="Enter User Name" />)}
                  </FormItem>
                  <FormItem style={margin} label="Postal Address:">
                    {getFieldDecorator(
                      "owner.contactInformation.postalAddress",
                      {
                        initialValue: "",
                        rules: agencyValidation.postalAddress
                      }
                    )(<TextArea placeholder="Enter Postal Address" rows={5} />)}
                  </FormItem>
                  <FormItem style={margin} label="Email Address:">
                    {getFieldDecorator(
                      "owner.contactInformation.emailAddress",
                      {
                        initialValue: "",
                        rules: agencyValidation.email
                      }
                    )(<Input placeholder="Enter Email Address" />)}
                  </FormItem>
                </Col>
                <Col {...formResSpan}>
                  <FormItem label="Password" style={margin}>
                    {getFieldDecorator("owner.password", {
                      initialValue: "",
                      rules: agencyValidation.password
                    })(<Input placeholder="Enter Password" />)}
                  </FormItem>
                  <FormItem style={margin}>
                    <RadioGroup onChange={this.generatePassword}>
                      <Radio value={false}>Custom Password</Radio>
                      <Radio value={true}>Generate Password</Radio>
                    </RadioGroup>
                  </FormItem>

                  <FormItem
                    style={marginBottom}
                    {...formItemLayout}
                    label="Mobile Phone:"
                  >
                    {getFieldDecorator("owner.contactInformation.mobilePhone", {
                      initialValue: "",
                      rules: agencyValidation.mobile
                    })(
                      <InputNumber
                        placeholder="Enter Mobile Phone"
                        formatter={this.formatMobileNumber.bind(this)}
                        parser={this.formatMobileParser.bind(this)}
                      />)}
                  </FormItem>
                  <FormItem
                    style={marginBottom}
                    {...formItemLayout}
                    label="SMS/Text:"
                  >
                    {getFieldDecorator("owner.contactInformation.smsPhone", {
                      initialValue: "",
                      rules: agencyValidation.sms
                    })(<Input placeholder="Enter SMS Phone" />)}
                  </FormItem>
                  {/*<FormItem
                    style={marginBottom}
                    label="Instant Messaging:"
                    {...formItemLayout}
                  >
                    {getFieldDecorator("owner.contactInformation.instantMessaging1", {
                      initialValue: "",
                      rules: agencyValidation.instantMessaging
                    })(
                      <Input addonAfter={selectAfter} defaultValue="mysite" />
                    )}
                  </FormItem>
                  <FormItem
                    style={marginBottom}
                    label="Instant Messaging:"
                    {...formItemLayout}
                  >
                    {getFieldDecorator("owner.contactInformation.instantMessaging2", {
                      initialValue: "",
                      rules: agencyValidation.instantMessaging
                    })(
                      <Input addonAfter={selectAfter} defaultValue="mysite" />
                    )}
                  </FormItem>*/}
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <FormItem
                    style={marginBottom}
                    label="LinkedIn URL:"
                    {...formItemLayout1}
                  >
                    {getFieldDecorator("owner.contactInformation.linkedInUrl", {
                      initialValue: "",
                      rules: agencyValidation.linkedin
                    })(<Input placeholder="Link" />)}
                  </FormItem>
                  <FormItem
                    style={marginBottom}
                    label="FaceBook handle:"
                    {...formItemLayout1}
                  >
                    {getFieldDecorator(
                      "owner.contactInformation.facebookHandle",
                      {
                        initialValue: "",
                        rules: agencyValidation.linkedin
                      }
                    )(<Input placeholder="Link" />)}
                  </FormItem>
                  <FormItem
                    style={marginBottom}
                    label="Twitter handle:"
                    {...formItemLayout1}
                  >
                    {getFieldDecorator(
                      "owner.contactInformation.twitterHandle",
                      {
                        initialValue: "",
                        rules: agencyValidation.linkedin
                      }
                    )(<Input placeholder="Link" />)}
                  </FormItem>
                  {/*}<FormItem
                    style={[marginBottom]}
                    className={"agencyFormWrapper"}
                    label="Resume URL:"
                    {...formItemLayout1}
                  >
                    {getFieldDecorator("contactInformation.resumeUrl", {
                      initialValue: "",
                      rules: agencyValidation.resume
                    })(<Input placeholder="Link" />)}
                  </FormItem> */}
                </Col>
              </Row>
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
          <Row type={"flex"} align={"middle"} justify={"center"}>
            <Col>
              <Button
                type="danger"
                style={margin}
                onClick={() => this.props.history.goBack()}
              >
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                id="btnSubmit"
                type="primary"
                style={margin}
                htmlType="submit"
              >
                <Icon type="save" /> Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </AgencyFormWrapper>
    );
  }
}

const form = Form.create()(AgencyForm);
export default withRouter(form);
