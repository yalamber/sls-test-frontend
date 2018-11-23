import React, { Component } from "react";
import { Form, Row, Col, Input, Select } from "antd";
import { withRouter } from "react-router-dom";
import Button from "../../../../../../components/uielements/button";
import { ActionWrapper } from "../../../../crud.style";
import { testSuiteValidation } from "../../../../../../Validations/testSuiteValidation";

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;

const margin = {
  margin: "5px 5px 0px 0"
};

class TestRunForm extends Component {
  constructor() {
    super();
    this.state = {
      status: [
        { key: "active", value: "Active" },
        { key: "inactive", value: "Inactive" }
      ]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
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
    this.props.form.resetFields();
  }

  renderDropDownSuite() {
    const { getFieldDecorator } = this.props.form;
    const testSuitesOptions = this.props.testSuites.map(suite => (
      <Option key={suite.testSuiteId} value={suite.testSuiteId}>{suite.name}</Option>
    ));

    return (
      <FormItem label="Test Suite to Run" style={margin}>
        {getFieldDecorator("testSuiteId", {
          rules: testSuiteValidation.suite
        })(<Select showSearch>{testSuitesOptions}</Select>)}
      </FormItem>
    );
  }

  renderDropDownAgencyTeam() {
    const { getFieldDecorator } = this.props.form;
    const agencyTeamsOptions = this.props.agencyTeams.map(agency => (
      <Option key={agency.agencyTeamId} value={agency.agencyTeamId}>{agency.name}</Option>
    ));

    return (
      <FormItem label="Agency Team" style={margin}>
        {getFieldDecorator("agencyTeamId", {
          rules: testSuiteValidation.suite
        })(<Select showSearch>{agencyTeamsOptions}</Select>)}
      </FormItem>
    );
  }

  render() {
    const statusOptions = this.state.status.map(status => (
      <Option key={status.key}>{status.value}</Option>
    ));
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} id="clientForm">
          <Row gutter={16}>
            <Col span={24}>
              <Row>
                <Col span={12}>{this.renderDropDownSuite()}</Col>
                <Col span={12}>
                  <FormItem label="Status" style={margin}>
                    {getFieldDecorator("status", {
                      rules: testSuiteValidation.status
                    })(<Select showSearch>{statusOptions}</Select>)}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12}>{this.renderDropDownAgencyTeam()}</Col>
                <Col span={24}>
                  <FormItem label="Stats" style={margin}>
                    {getFieldDecorator("stats", {
                      rules: testSuiteValidation.description
                    })(<Input maxLength={1000} placeholder="stats" />)}
                  </FormItem>
                </Col>
              </Row>
            </Col>
          </Row>
          <ActionWrapper style={margin}>
            <Button
              type="primary"
              style={margin}
              icon="left"
              onClick={() => {
                this.props.history.push(
                  "../../list/" +
                    this.props.match.params.companyId +
                    "/" +
                    this.props.match.params.teamId
                );
              }}
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

const form = Form.create()(TestRunForm);
export default withRouter(form);
