import React, {Component} from 'react';
import {Input, message} from 'antd';
import Form from '../../../../components/uielements/form';
import Button from '../../../../components/uielements/button';
import {Icon} from 'antd';
import {
  ActionWrapper,
} from '../../crud.style';
import {clientValidation} from "../../../../Validations/clientValidation";
import {addClient} from "../../../../actions/clientActions";

const FormItem = Form.Item;

class ClientForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        addClient(values).then(res => {
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
        <Form onSubmit={this.handleSubmit} id="clientForm">
          <FormItem hasFeedback label="Client Name" style={{marginBottom: '0px'}}>
            {getFieldDecorator('name', {rules: clientValidation.name})(
              <Input placeholder="Enter Client Name"/>)}
          </FormItem>
          <FormItem hasFeedback label="Client Location" style={{marginBottom: '0px'}}>
            {getFieldDecorator('location', {rules: clientValidation.location})(
              <Input placeholder="Enter Client Location"/>)}
          </FormItem>
          <ActionWrapper style={margin}>
            <Button id="btnSubmit" type="primary" style={margin} htmlType="submit">
              <Icon type="save"/> Submit
            </Button>
          </ActionWrapper>
        </Form>
      </div>
    );
  }
}

export default Form.create()(ClientForm)
