import React, {Component} from 'react';
import {Form, Select, Row, Col, Input} from 'antd';
import {withRouter} from 'react-router-dom'
import Button from '@components/uielements/button';
import {teamValidation} from '@validations/teamValidation';
import {
  ActionWrapper,
} from '@utils/crud.style';
import {getCompanies} from "@helpers/http-api-client";

const FormItem = Form.Item;
const Option = Select.Option;

class TeamForm extends Component {
  constructor() {
    super();
    this.state = {
      companies: [],
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
    this.props.history.goBack();
  }

  render() {
    const margin = {
      margin: '5px 5px 0px 0'
    };
    const agenciesOptions = this.state.companies.map(company => <Option key={company.agencyId}>{company.name}</Option>);
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} id="agencyForm">
          <Row gutter={16}>
            <Col span={24}>
              <Row>
                <Col span={24}>
                  <FormItem label="Team Name" style={margin}>
                    {getFieldDecorator('name', {rules: teamValidation.teamName})(
                      <Input placeholder="Team Name"/>
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
  if (!props.hasOwnProperty('team')) {
    return;
  }
  return {
    agencyId: Form.createFormField({
      value: props.team.agencyId ? props.team.agencyId.toString() : ''
    }),
    name: Form.createFormField({
      value: props.team.name
    })
  };
};
const form = Form.create({mapPropsToFields})(TeamForm);
export default withRouter(form);
