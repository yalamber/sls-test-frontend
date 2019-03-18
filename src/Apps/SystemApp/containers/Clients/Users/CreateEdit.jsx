import React, { Component } from "react";
import { Form, Row, Col, Icon, Spin, message } from "antd";
import Button from "@components/uielements/button";
import { connect } from 'react-redux'
import { get, omit, isArray } from 'lodash';
import { scrollToTop } from '@utils/dom-util';
import LayoutWrapper from "@components/utility/layoutWrapper";
import PageHeader from "@components/utility/pageHeader";
import IntlMessages from '@components/utility/intlMessages';
import basicStyle from "@settings/basicStyle";
import { TitleWrapper, ComponentTitle, ActionBtn } from "@utils/crud.style";
import Box from "@components/utility/box";
import clientActions from '@app/SystemApp/redux/client/actions';
import UserFormFields from "@appComponents/User/FormFields";
import SWQAClient from '@helpers/apiClient';

const {
  requestCurrentClient,
  requestCurrentClientUser,
  requestClientUserRoles,
  clearCurrentClientUser,
} = clientActions;

class CreateEdit extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: false, error: null };
    this.mode = props.match.params.userId? 'edit': 'add';
  }

  componentDidMount() {
    const {
      match,
      requestCurrentClient,
      requestCurrentClientUser,
      requestClientUserRoles,
      clearCurrentClientUser
    } = this.props;
    //get current client
    requestCurrentClient(match.params.clientId);
    //get client roles
    requestClientUserRoles();
    //get current user and set to edit if we have userId
    if(match.params.userId) {
      requestCurrentClientUser(match.params.clientId, match.params.userId);
    } else {
      clearCurrentClientUser();
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, match, history } = this.props;
    form.validateFieldsAndScroll( async (err, values) => {
      let userData = values.user;
      if (!err) {
        try {
          this.setState({ loading: true });
          if(this.mode === 'edit') {
            let user = await SWQAClient.updateUser(match.params.userId, userData);
            if (user) {
              message.success("Successfully Saved");
            }
          } else {
            let roleId = userData.role;
            let status = userData.status;
            userData = omit(userData, ['role']);
            //TODO in future add this in separate api with db transactions
            let user = await SWQAClient.createUser(userData);
            let membership = await SWQAClient.addClientUser(match.params.clientId, {
              status: status,
              roleId: roleId,
              userId: user.userId
            });
            history.replace(`/admin/client/${membership.clientId}/user/${membership.userId}/details`);
          }
        } catch(e) {
          message.error("something went wrong");
          this.setState({ error: e }, () => {
            console.log(e);
            //set custom error to fields
            this.setErrorFields(form, e);
            scrollToTop();
          });
        } finally{
          this.setState({ loading: false });
        }
      }
    });
  }

  resetForm = () => {
    this.setState({ passwordType: false });
    this.props.form.resetFields();
  }

  setErrorFields = (form, e) => {
    const errorResponseData = get(e, 'response.data.errors');
    if(errorResponseData && isArray(errorResponseData)) {
      let fieldObject = {};
      errorResponseData.map((msg) => {
        if(msg.path === 'username') {
          fieldObject['user.username'] = {
            value: msg.value,
            errors: [new Error(msg.message)]
          };
        }
        if(msg.path === 'email') {
          fieldObject['user.contactInformation.emailAddress'] = {
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
    const { currentClient, clientUserRoles, currentClientUser, history, match, form } = this.props;
    let loading = currentClient.loading || clientUserRoles.loading || !!(match.params.userId && currentClientUser.loading);
    let title = this.mode === 'edit'? 'Edit User' : 'Add User';
    return (
      <LayoutWrapper>
        <PageHeader><IntlMessages id="client" /> - {currentClient.clientData.name}</PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>
                  <ActionBtn
                    type="secondary"
                    onClick={() => history.goBack()}
                  >
                    <Icon type="left" /> <IntlMessages id="back" />
                  </ActionBtn>
                  &nbsp; {title}
                </ComponentTitle>
              </TitleWrapper>
              <Spin spinning={loading}>
                <Form onSubmit={this.handleSubmit} id="clientForm">
                  <UserFormFields
                    form={form}
                    roles={clientUserRoles.rows}
                    mode={this.mode}
                    showRoleSelector={true} />
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


const mapPropsToFields = props => {
  let { currentClientUser } = props;
  let currentUser = currentClientUser.data.user;
  let role = currentClientUser.data.role;
  return {
    'user.role': Form.createFormField({
      value: get(role, 'roleId')
    }),
    'user.status': Form.createFormField({
      value: get(currentClientUser, 'data.status')
    }),
    'user.username': Form.createFormField({
      value: get(currentUser, 'username')
    }),
    'user.resumeUrl': Form.createFormField({
      value: get(currentUser, 'resumeUrl')
    }),
    'user.contactInformation.emailAddress': Form.createFormField({
      value: get(currentUser, 'contactInformation.emailAddress')
    }),
    'user.contactInformation.postalAddress': Form.createFormField({
      value: get(currentUser, 'contactInformation.postalAddress')
    }),
    'user.contactInformation.mobilePhone': Form.createFormField({
      value: get(currentUser, 'contactInformation.mobilePhone')
    }),
    'user.contactInformation.smsPhone': Form.createFormField({
      value: get(currentUser, 'contactInformation.smsPhone')
    }),
    'user.contactInformation.linkedInUrl': Form.createFormField({
      value: get(currentUser, 'contactInformation.linkedInUrl')
    }),
    'user.instantMessengerInfos[0]["service"]': Form.createFormField({
      value: get(currentUser, 'instantMessengerInfos[0]["service"]')
    }),
    'user.instantMessengerInfos[0]["messengerId"]': Form.createFormField({
      value: get(currentUser, 'instantMessengerInfos[0]["messengerId"]')
    }),
    'user.instantMessengerInfos[1]["service"]': Form.createFormField({
      value: get(currentUser, 'instantMessengerInfos[1]["service"]')
    }),
    'user.instantMessengerInfos[1]["messengerId"]': Form.createFormField({
      value: get(currentUser, 'instantMessengerInfos[1]["messengerId"]')
    }),
  };
};
const form = Form.create({ mapPropsToFields })(CreateEdit);

export default connect(
  state => ({
    ...state.Client
  }),
  {
    requestClientUserRoles,
    requestCurrentClient,
    requestCurrentClientUser,
    clearCurrentClientUser,
  }
)(form);
