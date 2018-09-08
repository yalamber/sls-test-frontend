import React, {Component} from 'react';
import {Input} from 'antd';
import Form from '../../../components/uielements/form';
import Button from '../../../components/uielements/button';
import {Icon} from 'antd';
import {
  ActionWrapper,
} from '../crud.style';

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
        alert(JSON.stringify(values));
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
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Please input client name',
                },
              ],
            })(<Input
              prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
              label="Name"
              name="name"
              placeholder="Enter Client Name"
            />)}
          </FormItem>
          <FormItem hasFeedback label="Client Location" style={{marginBottom: '0px'}}>
            {getFieldDecorator('location', {
              rules: [
                {
                  required: true,
                  message: 'Please input client Location.',
                },
              ],
            })(<Input
              prefix={<Icon type="environment" style={{color: 'rgba(0,0,0,.25)'}}/>}
              label="Location"
              name="location"
              placeholder="Enter Client Location"
            />)}
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
