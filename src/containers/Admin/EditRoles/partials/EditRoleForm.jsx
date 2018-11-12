import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Divider, Input, Select} from 'antd';
import Form from '../../../../components/uielements/form';
import Button from '../../../../components/uielements/button';
import {Icon, Row, Col} from 'antd';
import {
  ActionWrapper,
} from '../../crud.style';
import { editRolesValidation } from "../../../../Validations/editRoleValidation";
import {userValidation} from "../../../../Validations/usersValidation";
import {generatePassword} from "../../../../helpers/utility";
import Card from "../../../../components/uielements/styles/card.style";

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;

class CompanyForm extends Component {
  constructor() {
    super();
    this.state = {
      passwordType: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
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
            <Col lg={6} md={6} sm={24} xs={24} style={margin}>
              <FormItem hasFeedback label="Role Name" style={{marginBottom: '0px'}}>
                {getFieldDecorator('role.name', {rules: editRolesValidation.name})(
                  <Input placeholder="Enter Role Name"/>)}
              </FormItem>
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} style={margin}>
              <FormItem hasFeedback label="Key" style={{marginBottom: '0px'}}>
                {getFieldDecorator('role.key', {rules: editRolesValidation.key})(
                  <Input placeholder="Enter Key"/>)}
              </FormItem>
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} style={margin}>
              <FormItem hasFeedback label="Type" style={{marginBottom: '0px'}}>
                {getFieldDecorator('company.type', {rules: editRolesValidation.type})(
                  <Select showSearch placeholder="Please Choose Type" style={{...margin, width: '100%'}}>
                    <Option key="type 1">Type 1</Option>
                    <Option key="type 2">Type 2</Option>
                    <Option key="type 3">Type 3</Option>
                    <Option key="type 4">Type 4</Option>
                    <Option key="type 5">Type 5</Option>
                    <Option key="type 6">Type 6</Option>
                  </Select>)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col lg={19} md={20} sm={24} xs={24} style={margin}>
              <FormItem label="Description" style={margin}>
                {getFieldDecorator('role.description', {rules: editRolesValidation.description})(
                  <Input placeholder="Enter Description"/>
                )}
              </FormItem>
            </Col>
          </Row>
          <ActionWrapper style={margin}>
            <Button type="danger" style={margin} icon="left" onClick={() => this.props.history.goBack()}>
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
