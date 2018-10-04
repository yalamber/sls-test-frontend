import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Input} from 'antd';
import Form from '../../../../../components/uielements/form';
import Button from '../../../../../components/uielements/button';
import {Icon} from 'antd';
import {
  ActionWrapper,
} from '../../../crud.style';
import {companyValidation} from "../../../../../Validations/companyValidation";

const FormItem = Form.Item;

class CompanyForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.props.submit(values)) {
          this.props.form.resetFields();
        }
      }
    });

  }

  render() {
    const margin = {
      margin: '10px 8px 8px 0'
    };
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} id="companyForm">
          <FormItem hasFeedback label="Company Name" style={{marginBottom: '0px'}}>
            {getFieldDecorator('name', {rules: companyValidation.name})(
              <Input placeholder="Enter Company Name"/>)}
          </FormItem>
          <FormItem hasFeedback label="Company Location" style={{marginBottom: '0px'}}>
            {getFieldDecorator('location', {rules: companyValidation.location})(
              <Input placeholder="Enter Company Location"/>)}
          </FormItem>
          <ActionWrapper style={margin}>
            <Button type="primary" style={margin} icon="left" onClick={() => this.props.history.goBack()}>
              Cancel
            </Button>
            <Button id="btnSubmit" type="primary" style={margin} htmlType="submit">
              <Icon type="save"/> Submit
            </Button>
          </ActionWrapper>
        </Form>
      </div>
    );
  }
}

const mapPropsToFields = (props) => {
  if (!props.hasOwnProperty('company')) {
    return;
  }
  return {
    name: Form.createFormField({
      value: props.company.name
    }),
    location: Form.createFormField({
      value: props.company.location
    }),
  };
};
const form = Form.create({mapPropsToFields})(CompanyForm);
export default withRouter(form);
