import React, { Component } from "react";
import { connect } from 'react-redux';
import { Divider, Form, Row, Col, Spin, Icon, Input, message } from "antd";
import { get } from 'lodash';
import { setFormValidaitonError } from '@helpers/utility';
import { scrollToTop } from '@utils/dom-util';
import Button from "@components/uielements/button";
import LayoutWrapper from "@components/utility/layoutWrapper";
import basicStyle from "@settings/basicStyle";
import { TitleWrapper, ComponentTitle, ActionBtn } from "@utils/crud.style";
import Box from "@components/utility/box";
import clientActions from '@app/SystemApp/redux/client/actions';
import { clientValidation } from "@validations/clientValidation";
import UserFormFields from "@appComponents/User/FormFields";
import ErrorBox from '@appComponents/Common/Error';
import SWQAClient from '@helpers/apiClient';

const FormItem = Form.Item;
const {
  requestCurrentClient,
  requestClientUserRoles,
  requestCreateClientUser,
  clearCurrentClient,
} = clientActions;

class CreateEdit extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, error: null };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.mode = props.match.params.clientId? 'edit': 'add';
  }

  componentDidMount() {
    this._isMounted = true;
    const {
      match,
      requestCurrentClient,
      requestClientUserRoles,
      clearCurrentClient,
    } = this.props;
    //get client roles
    requestClientUserRoles();
    if(match.params.clientId) {
      //get current client
      requestCurrentClient(match.params.clientId);
    } else {
      clearCurrentClient();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSubmit(e) {
    const { history, match, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        try {
          this.setState({ loading: true });
          if(this.mode === 'edit') {
            let client = await SWQAClient.updateClient(match.params.clientId, values);
            if (client) {
              this.setState({ loading: false });
              message.success("Successfully Saved");
            }
          } else {
            let client = await SWQAClient.createClient(values);
            history.replace(`/admin/client/${client.clientId}/details`);
          }
        } catch(e) {
          message.error("something went wrong");
          this.setState({ error: e }, () => {
            setFormValidaitonError(form, e);
            //set custom error to fields
            this.setErrorFields(form, e);
            scrollToTop();
          });
        } finally {
          if(this._isMounted) {
            this.setState({ loading: false });
          }
        }
      }
    });
  }

  setErrorFields(form, e) {
    const errorResponseData = get(e, 'response.data');
    if(errorResponseData && errorResponseData.length > 0) {
      let fieldObject = {};
      errorResponseData.forEach((msg) => {
        if(msg.path === 'username') {
          fieldObject['owner.username'] = {
            value: msg.value,
            errors: [new Error(msg.message)]
          };
        }
        if(msg.path === 'email') {
          fieldObject['owner.contactInformation.emailAddress'] = {
            value: msg.value,
            errors: [new Error(msg.message)]
          };
        }
      });
      form.setFields(fieldObject);
    }
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const {  clientUserRoles, history, form  } = this.props;
    const margin = {
      margin: '0px 10px 10px 0px'
    };
    let title = this.mode === 'edit'? 'Edit Client' : 'Add Client';
    const { getFieldDecorator } = form;
    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>
                  <ActionBtn
                    type="secondary"
                    onClick={() => history.goBack()}>
                    <Icon type="left" />Back
                  </ActionBtn>
                  &nbsp; {title}
                </ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <Form onSubmit={this.handleSubmit} id="companyForm">
                  <Row>
                    {this.state.error && <ErrorBox error={this.state.error} />}
                  </Row>
                  <Row>
                    <Col md={12} sm={24} xs={24}>
                      <FormItem hasFeedback label="Client Name" style={margin}>
                        {getFieldDecorator('name', {rules: clientValidation.name})(
                          <Input placeholder="Enter Client Name"/>)}
                      </FormItem>
                    </Col>
                    <Col md={12} sm={24} xs={24}>
                      <FormItem hasFeedback label="Client Location" style={margin}>
                        {getFieldDecorator('location', {rules: clientValidation.location})(
                          <Input placeholder="Enter Client Location"/>)}
                      </FormItem>
                    </Col>
                  </Row>
                  {this.mode === 'add' &&
                    <div>
                      <Divider orientation="left">Client Account Owner</Divider>
                      <UserFormFields
                        fieldName="owner"
                        form={form}
                        mode={this.mode}
                        roles={clientUserRoles.rows} />
                    </div>
                  }
                  <Row style={{marginTop: '10px'}}>
                    <Col span={24}>
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button
                          type="primary"
                          icon="left"
                          onClick={() => history.goBack()}
                        >
                          Cancel
                        </Button>

                        <Button
                          id="btnSubmit"
                          type="primary"
                          htmlType="submit"
                          className=""
                          icon="save"
                        >
                          Submit
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Spin>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}


const mapPropsToFields = (props) => {
  let { currentClient } = props;
  return {
    'name': Form.createFormField({
      value: get(currentClient, 'clientData.name')
    }),
    'location': Form.createFormField({
      value: get(currentClient, 'clientData.location')
    }),
  };
  /*let currentClient = {
    name: 'test client',
    location: 'test location',
    owner: {
      status: 'active',
      username: 'test',
      resumeUrl: 'http://test.com',
      contactInformation: {
        emailAddress: 'teststs@sdsd.comsdsd',
        postalAddress: 'testing ok ',
        mobilePhone: '9843612873',
        smsPhone: 'test2334',
        linkedInUrl: 'testing ok',
      },
      instantMessengerInfos: [
        {service: 'facebook', messengerId: 'yalu'},
        {service: 'facebook', messengerId: 'yalu2'},
      ]
    }
  };
  return {
    'name': Form.createFormField({
      value: get(currentClient, 'name')
    }),
    'location': Form.createFormField({
      value: get(currentClient, 'location')
    }),
    'owner.role': Form.createFormField({
      value: get(currentClient, 'owner.role.roleId')
    }),
    'owner.status': Form.createFormField({
      value: get(currentClient, 'owner.status')
    }),
    'owner.username': Form.createFormField({
      value: get(currentClient, 'owner.username')
    }),
    'owner.resumeUrl': Form.createFormField({
      value: get(currentClient, 'owner.resumeUrl')
    }),
    'owner.contactInformation.emailAddress': Form.createFormField({
      value: get(currentClient, 'owner.contactInformation.emailAddress')
    }),
    'owner.contactInformation.postalAddress': Form.createFormField({
      value: get(currentClient, 'owner.contactInformation.postalAddress')
    }),
    'owner.contactInformation.mobilePhone': Form.createFormField({
      value: get(currentClient, 'owner.contactInformation.mobilePhone')
    }),
    'owner.contactInformation.smsPhone': Form.createFormField({
      value: get(currentClient, 'owner.contactInformation.smsPhone')
    }),
    'owner.contactInformation.linkedInUrl': Form.createFormField({
      value: get(currentClient, 'owner.contactInformation.linkedInUrl')
    }),
    'owner.instantMessengerInfos[0]["service"]': Form.createFormField({
      value: get(currentClient, 'owner.instantMessengerInfos[0]["service"]')
    }),
    'owner.instantMessengerInfos[0]["messengerId"]': Form.createFormField({
      value: get(currentClient, 'owner.instantMessengerInfos[0]["messengerId"]')
    }),
    'owner.instantMessengerInfos[1]["service"]': Form.createFormField({
      value: get(currentClient, 'owner.instantMessengerInfos[1]["service"]')
    }),
    'owner.instantMessengerInfos[1]["messengerId"]': Form.createFormField({
      value: get(currentClient, 'owner.instantMessengerInfos[1]["messengerId"]')
    }),
  };*/
};
const form = Form.create({mapPropsToFields})(CreateEdit);

export default connect(
  state => ({
    ...state.Client
  }),
  {
    requestClientUserRoles,
    requestCurrentClient,
    requestCreateClientUser,
    clearCurrentClient,
  }
)(form);
