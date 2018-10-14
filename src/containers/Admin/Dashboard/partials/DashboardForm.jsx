import React, {Component} from 'react';
import {Form, Select, Row, Col, Input} from 'antd';
import {withRouter} from 'react-router-dom'
import Button from '../../../../components/uielements/button';
import {teamValidation} from '../../../../Validations/teamValidation';
import {
  ActionWrapper,
} from '../../crud.style';
import {getCompanies, getTeams} from "../../../../actions/companyActions";

const FormItem = Form.Item;
const Option = Select.Option;

class DashboardForm extends Component {
  constructor() {
    super();
    this.state = {
      companies: [],
      teams: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentDidMount() {
    getCompanies().then(res => {
      this.setState({companies: res.data});
    });
    if (this.props.match.params.id) {
      this.handleCompanyChange(this.props.match.params.id);
    }
  }

  handleCompanyChange(companyId) {
    getTeams(companyId).then(res => {
      this.setState({teams: res.data});
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.submit(values, this.resetForm)
      }
    });
  }

  resetForm() {
    this.props.form.resetFields();
    this.props.history.goBack();
  }

  render() {
    const margin = {
      margin: '5px 5px 0px 0'
    };
    const clientsOptions = this.state.companies.map(company => <Option key={company.clientId}>{company.name}</Option>);
    const teamsOptions = this.state.teams.map(team => <Option key={team.clientTeamId}>{team.name}</Option>);
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} id="clientForm">
          <Row>
            <Col span={24}>
              <Row>
                <Col span={24}>
                  <FormItem label="Company Name" style={margin}>
                    {getFieldDecorator('company', {
                      rules: teamValidation.companyName,
                      initialValue: this.props.match.params.id,
                      onChange: this.handleCompanyChange
                    })(
                      <Select showSearch placeholder="Please select company">
                        {clientsOptions}
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <FormItem label="Team Name" style={margin}>
                    {getFieldDecorator('teamId', {
                      rules: teamValidation.companyName,
                    })(
                      <Select showSearch placeholder="Please select team">
                        {teamsOptions}
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <FormItem label="Board Name" style={margin}>
                    {getFieldDecorator('name', {rules: teamValidation.teamName})(
                      <Input placeholder="Enter Board name"/>
                    )}
                  </FormItem>
                </Col>
              </Row>
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
  if (!props.hasOwnProperty('dashboard')) {
    return;
  }

  return {
    company: Form.createFormField({
      value: [2]
    }),
    teamId: Form.createFormField({
      value: props.dashboard.clientTeamId
    }),
    name: Form.createFormField({
      value: props.dashboard.name
    }),
  };
};
const form = Form.create({mapPropsToFields})(DashboardForm);
export default withRouter(form);
