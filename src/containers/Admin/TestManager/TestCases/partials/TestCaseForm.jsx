import React, {Component} from 'react';
import {Form, Row, Col, Input, message, Select, Divider} from 'antd';
import {withRouter} from 'react-router-dom'
import Button from '../../../../../components/uielements/button';
import {teamValidation} from '../../../../../Validations/teamValidation';
import {
  ActionWrapper,
} from '../../../crud.style';
import {getCompanies, getTeams} from "../../../../../actions/companyActions";
import {getSuites} from "../../../../../actions/testManagerActions";

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;

class TeamForm extends Component {
  constructor() {
    super();
    this.state = {
      status: [
        {id: 1, name: 'Active'},
        {id: 2, name: 'Inactive'},
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
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        message.success("Success");
      }
    });
  }

  componentDidMount() {
    getCompanies().then(res => {
      this.setState({companies: res.data});
    })
  }

  handleCompanyChange(companyId) {
    this.setState({selectedCompany: companyId});
    getTeams(companyId).then(res => {
      this.setState({teams: res.data});
    })
  }

  handleTeamChange(teamId) {
    this.setState({selectedTeam: teamId});
    getSuites(this.state.selectedCompany, this.state.selectedTeam).then(res => {
      this.setState({suites: res.data});
    })
  }

  handleSuiteChange(suiteId) {
    this.setState({selectedSuite: suiteId});
  }

  render() {
    const statusOptions = this.state.status.map(status => <Option key={status.id}>{status.name}</Option>);
    const companyOptions = this.state.companies.map(company => <Option key={company.id}>{company.name}</Option>);
    const teamOptions = this.state.teams.map(team => <Option key={team.id}>{team.name}</Option>);
    const suiteOptions = this.state.suites.map(suite => <Option key={suite.id}>{suite.title}</Option>);
    const margin = {
      margin: '5px 5px 0px 0'
    };
    const {getFieldDecorator} = this.props.form;

    let tmp = [];
    for (let i = 0; i < this.state.stepsCount; i++) {
      tmp.push(i);
    }
    const steps = tmp.map(function(i) {
      return (
        <Row key={i}>
          <Col md={24} sm={24} xs={24}>
            <FormItem label={"Steps #" + (i + 1)} style={margin}>
              {getFieldDecorator('step[' + i + ']', {})(
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
                      rules: teamValidation.teamManager,
                      onChange: this.handleCompanyChange
                    })(
                      <Select placeholder="Choose Company Name">
                        {companyOptions}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col md={6} sm={24} xs={24}>
                  <FormItem label="Team Name" style={margin}>
                    {getFieldDecorator('team', {rules: teamValidation.teamManager, onChange: this.handleTeamChange})(
                      <Select placeholder="Choose Team Name">
                        {teamOptions}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col md={6} sm={24} xs={24}>
                  <FormItem label="Test Suite Name" style={margin}>
                    {getFieldDecorator('test_suite_name', {
                      rules: teamValidation.teamManager,
                      onChange: this.handleSuiteChange
                    })(
                      <Select placeholder="Choose Suite Name">
                        {suiteOptions}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col md={6} sm={24} xs={24}>
                  <FormItem label="Status" style={margin}>
                    {getFieldDecorator('status', {rules: teamValidation.teamManager})(
                      <Select placeholder="Choose Status">
                        {statusOptions}
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col md={24} sm={24} xs={24}>
                  <FormItem label="Description" style={margin}>
                    {getFieldDecorator('description', {rules: teamValidation.teamName})(
                      <TextArea placeholder="Description"/>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col md={12} sm={24} xs={24}>
                  <FormItem label="Developer Comment" style={margin}>
                    {getFieldDecorator('dev_comment', {})(
                      <TextArea placeholder="Developer Comments" rows={5}/>
                    )}
                  </FormItem>
                </Col>
                <Col md={12} sm={24} xs={24}>
                  <FormItem label="Analyst Comment" style={margin}>
                    {getFieldDecorator('analyst_comment', {})(
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
