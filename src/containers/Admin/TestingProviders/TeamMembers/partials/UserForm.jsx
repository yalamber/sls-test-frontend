import React, {Component} from 'react';
import {Form, Select, Row, Col, Input, Radio, Icon} from 'antd';
import Button from '../../../../../components/uielements/button';
import {userValidation} from '../../../../../Validations/usersValidation';
import {
  ActionWrapper,
} from '../../../crud.style';
import Card from "../../../../../components/uielements/styles/card.style";
import {getTestingProviderTeams} from "../../../../../actions/testingProviderActions";
import {userStatus} from "../../../../../constants/userStatus";

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;
const InputGroup = Input.Group;

class UserForm extends Component {
  constructor() {
    super();
    this.state = {
      status: userStatus,
      teams: [],
      passwordType: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.generatePassword = this.generatePassword.bind(this);
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
    this.props.form.resetFields();
  }

  generage() {
    let length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  generatePassword(e) {
    let password = '';
    if (e.target.value) {
      this.props.form.setFieldsValue({
        password: this.generage()
      });
    } else {
      this.props.form.setFieldsValue({
        password
      });
    }
  }

  componentDidMount() {
    getTestingProviderTeams().then(res => {
      this.setState({teams: res.data})
    });
  }

  render() {
    const margin = {
      margin: '5px 5px 0px 0'
    };
    const statusOptions = this.state.status.map(status => <Option key={status.id}>{status.name}</Option>);
    const teamOptions = this.state.teams.map(team => <Option key={team.providerTeamId}>{team.name}</Option>);

    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} id="clientForm">
          <Row gutter={16}>
            <Col span={12}>
              <Row>
                <Col span={24}>
                  <FormItem label="Status" style={margin}>
                    {getFieldDecorator('status', {rules: userValidation.status})(
                      <Select placeholder="Status">
                        {statusOptions}
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>

              <FormItem label="User Name" style={margin}>
                {getFieldDecorator('username', {rules: userValidation.username})(
                  <Input placeholder="Enter User Name"/>
                )}
              </FormItem>
              <FormItem label="Password" style={margin}>
                {getFieldDecorator('password', {rules: userValidation.client})(
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
              <Row>
                <Col span={24}>
                  <FormItem label="Citizenship" style={margin}>
                    <Select placeholder="Citizenship">
                      <Option value={0}>Citizenship</Option>
                      <Option value={1}>Passport</Option>
                    </Select>

                  </FormItem>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Card title="Teams">
                <FormItem style={margin}>
                  <InputGroup size="large">
                    <Col span={2}>
                      <Icon type="search" style={{fontSize: '24px', color: '#08c', margin: '5px'}}/>
                    </Col>
                    <Col span={22}>
                      {getFieldDecorator('providerTeams', {rules: userValidation.status})(
                        <Select mode="multiple" placeholder="Please choose teams" style={{width: '100%'}}>
                          {teamOptions}
                        </Select>
                      )}
                    </Col>
                  </InputGroup>
                </FormItem>
              </Card>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Card title="Contact Information" style={{marginTop: '20px'}}>
                <Row gutter={16}>
                  <Col span={12}>
                    <FormItem style={margin} label="Postal Address:">
                      {getFieldDecorator('contactInformation.postalAddress', {rules: userValidation.client})(
                        <TextArea placeholder="Enter Postal Address" rows={9}/>
                      )}
                    </FormItem>
                    <FormItem style={margin} label="Email Address:">
                      {getFieldDecorator('contactInformation.emailAddress', {rules: userValidation.email})(
                        <Input placeholder="Enter Email Address"/>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem style={margin} label="Mobile Phone:">
                      {getFieldDecorator('contactInformation.mobilePhone', {rules: userValidation.client})(
                        <Input placeholder="Enter Mobile Phone"/>
                      )}
                    </FormItem>
                    <FormItem style={margin} label="SMS:">
                      {getFieldDecorator('contactInformation.smsPhone', {rules: userValidation.client})(
                        <Input placeholder="Enter SMS Phone"/>
                      )}
                    </FormItem>
                    <Row>
                      <Col span={12}>
                        <FormItem style={margin} label="Instant Messaging:">

                          {getFieldDecorator('contactInformation.facebookHandle', {rules: userValidation.client})(
                            <Input placeholder="Instant Messaging"/>
                          )}

                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem style={margin} label="Service">

                          <Select placeholder="Instant Messaging Service">
                            <Option value={0}>Facebook</Option>
                            <Option value={1}>Twiter</Option>
                          </Select>

                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem style={margin} label="Instant Messaging:">
                          {getFieldDecorator('contactInformation.twitterHandle', {})(
                            <Input placeholder="Instant Messaging"/>
                          )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem style={margin} label="Service">

                          <Select placeholder="Instant Messaging Service">
                            <Option value={0}>Facebook</Option>
                            <Option value={1}>Twiter</Option>
                          </Select>

                        </FormItem>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Card title="Skills" style={{marginTop: '20px'}}>
                <FormItem label="LinkedIn URL" style={margin}>
                  {getFieldDecorator('contactInformation.linkedInUrl', {rules: userValidation.client})(
                    <Input
                      placeholder="https:://linkedin.com/amttmg"
                    />
                  )}
                </FormItem>
                <FormItem label="Resume URL" style={margin}>
                  {/* {getFieldDecorator('contactInformation.resumeUrl', {})(*/}
                  <Input
                    placeholder="https:://amrittamang.com.np/amttmg.pdf"
                  />
                  {/*   )}*/}
                </FormItem>
              </Card>
            </Col>
          </Row>
          <ActionWrapper style={margin}>
            <Button id="btnSubmit" type="primary" style={margin} htmlType="submit" className="" icon="save">
              Submit
            </Button>
          </ActionWrapper>
        </Form>
      </div>
    );
  }
}

export default Form.create()(UserForm)
