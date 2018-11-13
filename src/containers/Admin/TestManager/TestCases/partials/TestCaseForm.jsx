import React, {Component} from 'react';
import {Form, Row, Col, Input, message, Select, Divider} from 'antd';
import {withRouter} from 'react-router-dom'
import Button from '../../../../../components/uielements/button';
import {
  ActionWrapper,
} from '../../../crud.style';
import {getCompanies, getTeams} from "../../../../../helpers/http-api-client";
import {getSuites} from "../../../../../helpers/http-api-client";
import {testCaseValidation} from "../../../../../Validations/testCaseValidation";

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;

class TeamForm extends Component {
  constructor() {
    super();
    this.state = {
      status: [
        {key: "active", value: 'Active'},
        {key: "inactive", value: 'Inactive'},
      ],
      selectedCompany: null,
      selectedTeam: null,
      selectedSuite: null,
      companies: [],
      teams: [],
      suites: [],
      stepsCount: 1
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.handleTeamChange = this.handleTeamChange.bind(this);
    this.handleSuiteChange = this.handleSuiteChange.bind(this);
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
    message.success("Success");
    this.props.history.goBack();
    this.props.form.resetFields();
  }

  componentDidMount() {
    getCompanies().then(res => {
      this.setState({companies: res.data});
      this.handleCompanyChange(this.props.match.params.companyId);
      this.handleTeamChange(this.props.match.params.teamId)
    })
  }

  handleCompanyChange(companyId) {
    this.setState({selectedTeam: null});
    this.props.form.setFieldsValue({
      team: null
    });
    this.props.form.setFieldsValue({
      suite: null
    });
    this.setState({selectedCompany: companyId});
    getTeams(companyId).then(res => {
      this.setState({teams: res.data});
    });
    this.updateSuite(companyId, null);
  }

  handleTeamChange(teamId) {
    this.setState({selectedTeam: teamId});
    this.props.form.setFieldsValue({
      suite: null
    });
    this.props.form.setFieldsValue({
      team: this.state.selectedTeam
    });
    this.updateSuite(null, teamId);
  }

  updateSuite(companyId, teamId) {
    getSuites(companyId, teamId).then(res => {
      this.setState({suites: res.data});
    })
  }

  handleSuiteChange(suiteId) {
    this.setState({selectedSuite: suiteId});
  }

  render() {
    const statusOptions = this.state.status.map(status => <Option key={status.key}>{status.value}</Option>);
    const companyOptions = this.state.companies.map(company => <Option key={company.clientId}>{company.name}</Option>);
    const teamOptions = this.state.teams.map(team => <Option key={team.clientTeamId}>{team.name}</Option>);
    const suiteOptions = this.state.suites.map(suite => <Option key={suite.testSuiteId}>{suite.name}</Option>);
    const margin = {
      margin: '5px 5px 0px 0'
    };
    const {getFieldDecorator} = this.props.form;

    let tmp = [];
    for (let i = 0; i < this.state.stepsCount; i++) {
      tmp.push(i);
    }
    const plural = this.state.stepsCount > 1 ? 's' : '';
    const steps = tmp.map(function(i) {
      return (
        <Row key={i}>
          <Col md={24} sm={24} xs={24}>
            <FormItem label={"Step" + plural + " #" + (i + 1)} style={margin}>
              {getFieldDecorator('testCaseSteps[' + i + ']', {})(
                <TextArea placeholder="Steps" rows={5}/>
              )}
            </FormItem>
          </Col>
        </Row>
      );
    });
    return (
      <div>
        <Form onSubmit={this.handleSubmit} id="clientForm">
          <Row gutter={16}>
            <Col span={24}>
              <Row>
                <Col md={6} sm={24} xs={24}>
                  <FormItem label="Compant Name" style={margin}>
                    {getFieldDecorator('company', {
                      rules: testCaseValidation.company,
                      onChange: this.handleCompanyChange,
                      initialValue: this.state.selectedCompany
                    })(
                      <Select showSearch placeholder="Choose Company Name">
                        {companyOptions}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col md={6} sm={24} xs={24}>
                  <FormItem label="Team Name" style={margin}>
                    {getFieldDecorator('team', {
                      rules: testCaseValidation.team,
                      onChange: this.handleTeamChange,
                      initialValue: this.state.selectedTeam
                    })(
                      <Select showSearch placeholder="Choose Team Name">
                        {teamOptions}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col md={6} sm={24} xs={24}>
                  <FormItem label="Test Suite Name" style={margin}>
                    {getFieldDecorator('testSuiteId', {
                      rules: testCaseValidation.suite,
                      onChange: this.handleSuiteChange
                    })(
                      <Select showSearch placeholder="Choose Suite Name">
                        {suiteOptions}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col md={6} sm={24} xs={24}>
                  <FormItem label="Status" style={margin}>
                    {getFieldDecorator('status', {rules: testCaseValidation.status})(
                      <Select showSearch placeholder="Choose Status">
                        {statusOptions}
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col md={24} sm={24} xs={24}>
                  <FormItem label="Title" style={margin}>
                    {getFieldDecorator('title', {rules: testCaseValidation.title})(
                      <TextArea placeholder="Title"/>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col md={24} sm={24} xs={24}>
                  <FormItem label="Description" style={margin}>
                    {getFieldDecorator('description', {rules: testCaseValidation.description})(
                      <TextArea placeholder="Description"/>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col md={12} sm={24} xs={24}>
                  <FormItem label="Developer Comment" style={margin}>
                    {getFieldDecorator('developerComments', {})(
                      <TextArea placeholder="Developer Comments" rows={5}/>
                    )}
                  </FormItem>
                </Col>
                <Col md={12} sm={24} xs={24}>
                  <FormItem label="Analyst Comment" style={margin}>
                    {getFieldDecorator('analystComments', {})(
                      <TextArea placeholder="Analyst Comments" rows={5}/>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Divider>Test Step(s)</Divider>
              {steps}
              <Button style={margin} block type="default" icon="plus" size="small"
                      onClick={() => this.setState({stepsCount: this.state.stepsCount + 1})}>Add
                Step</Button>
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

const form = Form.create()(TeamForm);
export default withRouter(form);
