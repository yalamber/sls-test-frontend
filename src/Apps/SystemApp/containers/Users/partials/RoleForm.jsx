import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Select } from 'antd';
import Form from '@components/uielements/form';
import Button from '@components/uielements/button';
import { Icon, Row, Col } from 'antd';
import {
  ActionWrapper,
} from '@utils/crud.style';
import { editRolesValidation } from "@validations/editRoleValidation";

const FormItem = Form.Item;
const Option = Select.Option;

class GenericForm extends Component {
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

  renderTypeOptions() {
    return this.props.types.map(type => <Option key={type.key}>{type.name}</Option>)
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
        <Form onSubmit={this.handleSubmit} id="GenericForm">
          <Row>
            <Col lg={6} md={6} sm={24} xs={24} style={margin}>
              <FormItem hasFeedback label="Role Name" style={{marginBottom: '0px'}}>
                {getFieldDecorator('title', {rules: editRolesValidation.title})(
                  <Input placeholder="Enter Role Name"/>)}
              </FormItem>
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} style={margin}>
              <FormItem hasFeedback label="Key" style={{marginBottom: '0px'}}>
                {getFieldDecorator('key', {rules: editRolesValidation.key})(
                  <Input placeholder="Enter Key"/>)}
              </FormItem>
            </Col>
            <Col lg={6} md={6} sm={24} xs={24} style={margin}>
              <FormItem hasFeedback label="Type" style={{marginBottom: '0px'}}>
                {getFieldDecorator('type', {rules: editRolesValidation.type})(
                  <Select showSearch placeholder="Please Choose Type" style={{...margin, width: '100%'}}>
                    {this.renderTypeOptions()}
                  </Select>)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col lg={19} md={20} sm={24} xs={24} style={margin}>
              <FormItem label="Description" style={margin}>
                {getFieldDecorator('description', {rules: editRolesValidation.description})(
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
  if (!props.hasOwnProperty('rowData')) {
    return;
  }
  return {
    title: Form.createFormField({
      value: props.rowData.title
    }),
    key: Form.createFormField({
      value: props.rowData.key
    }),
    description: Form.createFormField({
      value: props.rowData.description
    }),
    type: Form.createFormField({
      value: props.rowData.type
    }),
  };
};
const form = Form.create({mapPropsToFields})(GenericForm);
export default withRouter(form);
