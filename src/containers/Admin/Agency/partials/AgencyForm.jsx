import React, { Component } from 'react';
import { Form, Select, Row, Col, Input, Radio, Icon } from 'antd';
import { withRouter } from 'react-router-dom'
import Button from '../../../../components/uielements/button';
import { userValidation } from '../../../../Validations/usersValidation';
import { agencyValidation } from '../../../../Validations/agencyValidation.js';
import {
  ActionWrapper,
} from '../../crud.style';
import Card from "../../../../components/uielements/styles/card.style";
import { getCompanies, getTeams } from "../../../../helpers/http-api-client";
import { userStatus } from "../../../../constants/userStatus";
import {
  TitleWrapper,
  ComponentTitle,
} from '../../crud.style'
import AgencyFormWrapper from './agency.style.js'

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;
const InputGroup = Input.Group;

class AgencyForm extends Component {
  constructor() {
    super();
    this.state = {
      status: userStatus,
      teams: [],
      companies: [],
      passwordType: false,
      selected: []
    };
  }

  componentDidMount() {
  }

  render() {
    const margin = {
      margin: '5px 5px 0px 0'
    };
    const statusOptions = this.state.status.map(status => <Option key={status.id}>{status.name}</Option>);
    const teamOptions = this.state.teams.map(team => <Option key={team.clientTeamId}>{team.name}</Option>);
    const companiesOptions = this.state.companies.map(company => <Option
      key={company.clientId}>{company.name}</Option>);
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        lg: { span: 9 },
        md: { span: 5 },
        sm: { span: 24 },
      },
      wrapperCol: {
        lg: { span: 15 },
        md: { span: 19 },
        sm: { span: 24 },
      },
    };
    const formItemLayout1 = {
      labelCol: {
        lg: { span: 3 },
        md: { span: 5 },
        sm: { span: 24 },
      },
      wrapperCol: {
        lg: { span: 21 },
        md: { span: 19 },
        sm: { span: 24 },
      },
    };

    //Responsive span
    const formResSpan = {
      xl: { span: 12 },
      lg: { span: 12 },
      md: { span: 24 },
      sm: { span: 24 },
    };

    //Margin bottom
    const marginBottom = {
      marginBottom: 14
    }

    const selectAfter = (
      <Select defaultValue="Services" style={{ width: 120 }}>
        <Option value=".com">Service One</Option>
        <Option value=".jp">Service Two</Option>
        <Option value=".cn">Service Three</Option>
        <Option value=".org">Service Four</Option>
      </Select>
    );

    return (
      <AgencyFormWrapper>
        <Form onSubmit={() => { }} id="clientForm">
          <Row gutter={16} style={marginBottom}>
            <Col {...formResSpan}>
              <FormItem style={margin} label="Agency Name:">
                {getFieldDecorator('contactInformation.agencyName', { rules: agencyValidation.agencyName })(
                  <Input placeholder="Enter Agency Name" />
                )}
              </FormItem>
            </Col>
            <Col {...formResSpan}>
              <FormItem style={margin} label="Agency Address:">
                {getFieldDecorator('contactInformation.agencyAddress', { rules: agencyValidation.agencyAddress })(
                  <TextArea placeholder="Enter Agency Address" rows={5} />
                )}
              </FormItem>
            </Col>
          </Row>

          <TitleWrapper>
            <ComponentTitle style={{ marginTop: 30}}>
              Agency Account Owner
            </ComponentTitle>
          </TitleWrapper>

          <Row gutter={16}>
            <Col span={24}>
              {/*<Card title="Contact Information" style={{ marginTop: '20px' }}>

              </Card>*/}
              <Row gutter={16}>
                <Col {...formResSpan}>
                  <FormItem style={margin} label="User Name:">
                    {getFieldDecorator('contactInformation.usernameAddress', { rules: agencyValidation.username })(
                      <Input placeholder="Enter User Name" />
                    )}
                  </FormItem>
                  <FormItem style={margin} label="Postal Address:">
                    {getFieldDecorator('contactInformation.postalAddress', { rules: agencyValidation.postalAddress })(
                      <TextArea placeholder="Enter Postal Address" rows={5} />
                    )}
                  </FormItem>
                  <FormItem style={margin} label="Email Address:">
                    {getFieldDecorator('contactInformation.emailAddress', { rules: agencyValidation.email })(
                      <Input placeholder="Enter Email Address" />
                    )}
                  </FormItem>
                </Col>
                <Col {...formResSpan}>
                  <FormItem label="Password" style={margin}>
                    {getFieldDecorator('password', { rules: agencyValidation.password })(
                      <Input
                        placeholder="Enter Password"
                      />
                    )}
                  </FormItem>
                  <FormItem style={margin}>
                    <RadioGroup onChange={this.generatePassword}>
                      <Radio value={false}>Custom Password</Radio>
                      <Radio value={true}>Generate Password</Radio>
                    </RadioGroup>
                  </FormItem>

                  <FormItem style={marginBottom} {...formItemLayout} label="Mobile Phone:">
                    {getFieldDecorator('contactInformation.mobilePhone', { rules: agencyValidation.mobile })(
                      <Input placeholder="Enter Mobile Phone" />
                    )}
                  </FormItem>
                  <FormItem style={marginBottom} {...formItemLayout} label="SMS/Text:">
                    {getFieldDecorator('contactInformation.sms', { rules: agencyValidation.sms })(
                      <Input placeholder="Enter SMS Phone" />
                    )}
                  </FormItem>
                  <FormItem
                    style={marginBottom}
                    label="Instant Messaging:"
                    {...formItemLayout}>
                    {getFieldDecorator('contactInformation.instantMessaging1', { rules: agencyValidation.instantMessaging })(
                      <Input
                        addonAfter={selectAfter}
                        defaultValue="mysite"
                      />
                    )}
                  </FormItem>
                  <FormItem
                    style={marginBottom}
                    label="Instant Messaging:"
                    {...formItemLayout}>
                    {getFieldDecorator('contactInformation.instantMessaging2', { rules: agencyValidation.instantMessaging })(
                      <Input
                        addonAfter={selectAfter}
                        defaultValue="mysite"
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <FormItem
                    style={marginBottom}
                    label="LinkedIn URL:"
                    {...formItemLayout1}>
                    {getFieldDecorator('contactInformation.likedinUrl', { rules: agencyValidation.linkedin })(
                      <Input
                        placeholder="Link"
                      />
                    )}
                  </FormItem>
                  <FormItem
                    style={[marginBottom]}
                    className={'agencyFormWrapper'}
                    label="Resume URL:"
                    {...formItemLayout1}>
                    {getFieldDecorator('contactInformation.resumeUrl', { rules: agencyValidation.resume })(
                      <Input
                        placeholder="Link"
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row type={"flex"} align={'middle'} justify={"center"}>
            <Col>
              <Button type="danger" style={margin} onClick={() => this.props.history.goBack()}>
                Cancel
              </Button>
            </Col>
            <Col>
              {/*htmlType="submit"*/}
              <Button id="btnSubmit" type="primary" style={margin} onClick={() => alert('clicked')} >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </AgencyFormWrapper >
    );
  }
}

const form = Form.create()(AgencyForm);
export default withRouter(form);
