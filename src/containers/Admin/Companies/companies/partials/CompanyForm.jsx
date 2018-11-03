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
                {getFieldDecorator('company.name', {rules: companyValidation.name})(
                  <Input placeholder="Enter Company Name"/>)}
              </FormItem>
            </Col>
            <Col md={11} sm={24} xs={24} style={margin}>
              <FormItem hasFeedback label="Company Location" style={{marginBottom: '0px'}}>
                {getFieldDecorator('company.location', {rules: companyValidation.location})(
                  <Input placeholder="Enter Company Location"/>)}
              </FormItem>
            </Col>
          </Row>
          <Divider orientation="left">Company Account Owner</Divider>

          <Row>
            <Col md={11} sm={24} xs={24} style={margin}>
              <FormItem label="User Name" style={margin}>
                {getFieldDecorator('user.username', {rules: userValidation.username})(
                  <Input placeholder="Enter User Name"/>
                )}
              </FormItem>
            </Col>
            <Col md={11} sm={24} xs={24} style={margin}>
              <FormItem label="Password" style={margin}>
                {getFieldDecorator('user.password', {rules: userValidation.password})(
                  <Input
                    placeholder="Enter Password"
                  />
                )}
              </FormItem>
              <FormItem style={margin}>
                <RadioGroup style={margin} onChange={this.generatePassword} value={this.state.passwordType}>
                  <Radio value={false}>Custom Password</Radio>
                  <Radio value={true}>Generate Password</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <FormItem style={margin} label="Postal Address:">
                {getFieldDecorator('user.contactInformation.postalAddress', {rules: userValidation.client})(
                  <TextArea placeholder="Enter Postal Address" rows={10}/>
                )}
              </FormItem>
              <FormItem style={margin} label="Email Address:">
                {getFieldDecorator('user.contactInformation.emailAddress', {rules: userValidation.email})(
                  <Input placeholder="Enter Email Address"/>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem style={margin} label="Mobile Phone:">
                {getFieldDecorator('user.contactInformation.mobilePhone', {rules: userValidation.client})(
                  <Input placeholder="Enter Mobile Phone"/>
                )}
              </FormItem>
              <FormItem style={margin} label="SMS:">
                {getFieldDecorator('user.contactInformation.smsPhone', {rules: userValidation.client})(
                  <Input placeholder="Enter SMS Phone"/>
                )}
              </FormItem>
              <Row>
                <Col span={24}>
                  <FormItem style={margin} label="Facebook:">
                    {getFieldDecorator('user.contactInformation.facebookHandle', {rules: userValidation.client})(
                      <Input placeholder="Facebook Account"/>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <FormItem style={margin} label="Twitter:">
                    {getFieldDecorator('user.contactInformation.twitterHandle', {})(
                      <Input placeholder="Twitter Account"/>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Card title="Skills" style={margin}>
                <FormItem label="LinkedIn URL" style={margin}>
                  {getFieldDecorator('user.contactInformation.linkedInUrl', {rules: userValidation.client})(
                    <Input
                      placeholder="Linkedin URL"
                    />
                  )}
                </FormItem>
                <FormItem label="Resume URL" style={margin}>
                  {getFieldDecorator('user.resumeUrl', {})(
                    <Input
                      placeholder="Resume URL"
                    />
                  )}
                </FormItem>
              </Card>
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
    }),
  };
};
const form = Form.create({mapPropsToFields})(CompanyForm);
export default withRouter(form);
