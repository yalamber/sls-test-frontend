import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Input, message} from 'antd';
import Form from '../../../../../components/uielements/form';
import Button from '../../../../../components/uielements/button';
import {Icon} from 'antd';
import {
  ActionWrapper,
} from '../../../crud.style';
import {companyValidation} from "../../../../../Validations/companyValidation";
import {addCompany} from "../../../../../actions/companyActions";

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
        addCompany(values).then(res => {
          if (res.status) {
            message.success(res.message);
            this.props.form.resetFields();
          }
        });
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

const form = Form.create()(CompanyForm);
export default withRouter(form);
