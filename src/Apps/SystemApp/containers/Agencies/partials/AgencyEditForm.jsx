import React, { Component } from "react";
import { Form, Select, Row, Col, Input, Icon } from "antd";
import { withRouter } from "react-router-dom";
import Button from "@components/uielements/button";
import { agencyValidation } from "@validations/agencyValidation.js";
import Errors from "@utils/Errors";
import { userStatus } from "@constants/userStatus";
import AgencyFormWrapper from "./agency.style.js";

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

class AgencyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: userStatus,
      teams: [],
      companies: [],
      passwordType: false,
      selected: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentDidMount() {

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
                })(<TextArea maxLength={200} placeholder="Enter Agency Address" rows={5} />)}
              </FormItem>
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


const mapPropsToFields = (props) => {
  if (!props.hasOwnProperty('agency')) {
    return;
  }
  return {
    name: Form.createFormField({
      value: props.agency.name
    }),
    location: Form.createFormField({
      value: props.agency.location
    })
  };
};
const form = Form.create({mapPropsToFields})(AgencyForm);
export default withRouter(form);
