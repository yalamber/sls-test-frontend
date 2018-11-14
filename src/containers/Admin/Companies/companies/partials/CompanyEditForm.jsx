import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Divider, Input, Radio} from 'antd';
import Form from '../../../../../components/uielements/form';
import Button from '../../../../../components/uielements/button';
import {Icon, Row, Col} from 'antd';
import {
  ActionWrapper,
} from '../../../crud.style';
import {companyValidation} from "../../../../../Validations/companyValidation";
import {userValidation} from "../../../../../Validations/usersValidation";
import {generatePassword} from "../../../../../helpers/utility";
import Card from "../../../../../components/uielements/styles/card.style";

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;

class CompanyForm extends Component {
  constructor() {
    super();
    this.state = {
      passwordType: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.generatePassword = this.generatePassword.bind(this);
  }

  generatePassword(e) {
    this.setState({passwordType: !this.state.passwordType});
    if (e.target.value) {
      this.props.form.setFieldsValue({
        user: {password: generatePassword()}
      });
    } else {
      this.props.form.setFieldsValue({
        user: {password: ''}
      });
    }
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
    this.setState({passwordType: false});
    this.props.form.resetFields();
  }

  render() {
    const margin = {
      margin: '0px 10px 10px 0px'
    };
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} id="companyForm">
          <Row>
            <Col md={11} sm={24} xs={24} style={margin}>
              <FormItem hasFeedback label="Company Name" style={{marginBottom: '0px'}}>
                {getFieldDecorator('name', {rules: companyValidation.name})(
                  <Input placeholder="Enter Company Name"/>)}
              </FormItem>
            </Col>
            <Col md={11} sm={24} xs={24} style={margin}>
              <FormItem hasFeedback label="Company Location" style={{marginBottom: '0px'}}>
                {getFieldDecorator('location', {rules: companyValidation.location})(
                  <Input placeholder="Enter Company Location"/>)}
              </FormItem>
            </Col>
          </Row>
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
    })
  };
};
const form = Form.create({mapPropsToFields})(CompanyForm);
export default withRouter(form);
