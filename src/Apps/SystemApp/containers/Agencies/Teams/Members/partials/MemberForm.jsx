import React, { Component } from "react";
import { Form, Select, Row, Col, Input, Radio, Icon } from "antd";
import { withRouter } from "react-router-dom";
import Button from "@components/uielements/button";
import { userValidation } from "@validations/usersValidation";
import { ActionWrapper } from "@utils/crud.style";
import Card from "@components/uielements/styles/card.style";
import {
  getCompany,
  getAgency,
  getRoles
} from "@helpers/http-api-client";
import { userStatus } from "@constants/userStatus";
import Errors from "@utils/Errors";

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;
const InputGroup = Input.Group;

class MemberForm extends Component {
  constructor() {
    super();
    this.state = {
      statuses: userStatus,
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
    try {
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
      switch (this.props.userType) {
        case "clientUser":
          let company = await getCompany(this.props.relId);
          this.setState({
            roles: roles.data.rows,
            company: company.data
          });
          break;
        case "agencyUser":
          let agency = await getAgency(this.props.relId);
          this.setState({
            roles: roles.data.rows,
            agency: agency.data
          });
          break;
      }
    } catch (e) {}
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
    this.setState({ passwordType: false });
    this.props.form.resetFields();
  }

  generateRandom() {
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
        password: this.generateRandom()
      });
    } else {
      this.props.form.setFieldsValue({
        password
      });
    }
  }

  renderSelect({
    props,
    optionPropOptions = {},
    data,
    field,
    fieldDecoratorOptions = {}
  }) {
    const { getFieldDecorator } = this.props.form;
    const elementProp = {
      ...props,
      style: { width: "100%" }
    };
    return getFieldDecorator(field, fieldDecoratorOptions)(
      <Select {...elementProp}>
        {data.map(d => (
          <Option
            key={d[optionPropOptions.props.key] + ""}
            value={d[optionPropOptions.props.value] + ""}
          >
            {d[optionPropOptions.display]}
          </Option>
        ))}
      </Select>
    );
  }

  render() {
    const margin = {
      margin: "5px 5px 0px 0"
    };
    const statusOptions = this.state.statuses.map(status => (
      <Option key={status.id}>{status.name}</Option>
    ));
    const roleOptions = this.state.roles.map(role => (
      <Option key={role.roleId}>{role.title}</Option>
    ));
    const { getFieldDecorator } = this.props.form;
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
              <FormItem label="User Name" style={margin}>
                {this.renderSelect({
                  field: "userId",
                  fieldDecoratorOptions: {
                    rules: userValidation.username
                  },
                  props: {
                    placeholder: "User Name"
                  },
                  optionPropOptions: {
                    props: {
                      key: "userId",
                      value: "userId"
                    },
                    display: "username"
                  },
                  data: this.props.users
                })}
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
            <Col {...formResSpan}>
              <Card title="Role">
                <FormItem style={margin} label="Select Role">
                  <InputGroup size="large">
                    <Col span={22}>
                      {this.renderSelect({
                        field: "roleId",
                        fieldDecoratorOptions: {
                          rules: userValidation.role
                        },
                        props: {
                          showSearch: true,
                          placeholder: "Please choose role",
                          filterOption: (input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                        },

                        optionPropOptions: {
                          props: {
                            key: "roleId",
                            value: "roleId"
                          },
                          display: "title"
                        },
                        data: this.props.roles
                      })}
                    </Col>
                  </InputGroup>
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
  };
};
const form = Form.create({ mapPropsToFields })(MemberForm);
export default withRouter(form);
