import React, { Component } from "react";
import { Form, Row, Col, Icon, Spin, message } from "antd";
import Button from "@components/uielements/button";
import { connect } from 'react-redux';
import { get, omit, isArray } from 'lodash';
import { scrollToTop } from '@utils/dom-util';
import LayoutWrapper from "@components/utility/layoutWrapper";
import PageHeader from "@components/utility/pageHeader";
import IntlMessages from '@components/utility/intlMessages';
import basicStyle from "@settings/basicStyle";
import { TitleWrapper, ComponentTitle, ActionBtn } from "@utils/crud.style";
import Box from "@components/utility/box";
import agencyActions from '@app/SystemApp/redux/agency/actions';
import UserFormFields from "@appComponents/User/FormFields";
import SWQAClient from '@helpers/apiClient';

const {
  requestCurrentAgency,
  requestCurrentAgencyUser,
  requestAgencyUserRoles,
  clearCurrentAgencyUser,
} = agencyActions;

class CreateEdit extends Component {

  constructor(props) {
    super(props);
    this.mode = props.match.params.userId? 'edit': 'add';
  }

  componentDidMount() {
    const {
      match,
      requestCurrentAgency,
      requestCurrentAgencyUser,
      requestAgencyUserRoles,
      clearCurrentAgencyUser
    } = this.props;
    //get current client
    requestCurrentAgency(match.params.agencyId);
    //get client roles
    requestAgencyUserRoles();
    //get current user and set to edit if we have userId
    if(match.params.userId) {
      requestCurrentAgencyUser(match.params.agencyId, match.params.userId);
    } else {
      clearCurrentAgencyUser();
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, match, history} = this.props;
    form.validateFieldsAndScroll( async (err, values) => {
      let userData = values.user;
      if (!err) {
        try {
          this.setState({ loading: true });
          if(this.mode === 'edit') {
            let roleId = userData.role;
            let status = userData.status;
            userData = omit(userData, ['role', 'status']);
            let user = await SWQAClient.updateUser(match.params.userId, userData);
            //TODO: update role
            let membership = await SWQAClient.updateAgencyUser(
              match.params.agencyId, 
              user.userId,  
              {
                status: status,
                roleId: roleId
              }
            );
            if (membership) {
              message.success("Successfully Updated");
            }
            
          } else {
            let roleId = userData.role;
            let status = userData.status;
            userData = omit(userData, ['role']);
            //TODO in future add this in separate api with db transactions
            let user = await SWQAClient.createUser(userData);
            let membership = await SWQAClient.addAgencyUser(match.params.agencyId, {
              status: status,
              roleId: roleId,
              userId: user.userId
            });
            history.replace(`/admin/agency/${membership.agencyId}/user/${membership.userId}/details`);
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
      errorResponseData.forEach((msg) => {
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
    const { currentAgency, agencyUserRoles, currentAgencyUser, history, match, form } = this.props;
    let loading = currentAgency.loading || agencyUserRoles.loading || !!(match.params.userId && currentAgencyUser.loading);
    let title = this.mode === 'edit'? 'Edit User' : 'Add User';
    return (
      <LayoutWrapper>
        <PageHeader><IntlMessages id="client" /> - {currentAgency.agencyData.name}</PageHeader>
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
                <Form onSubmit={this.handleSubmit} id="agencyForm">
                  <UserFormFields
                    form={form}
                    roles={agencyUserRoles.rows}
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
  let { currentAgencyUser } = props;
  let currentUser = currentAgencyUser.data.user;
  let role = currentAgencyUser.data.role;
  let resumeUrl = get(currentUser, 'resumeUrl');
  let IM0Service = get(currentUser, 'instantMessengerInfos[0]["service"]');
  let IM0ID = get(currentUser, 'instantMessengerInfos[0]["messengerId"]');
  let IM1Service = get(currentUser, 'instantMessengerInfos[1]["service"]');
  let IM1ID = get(currentUser, 'instantMessengerInfos[1]["messengerId"]');
  return {
    'user.role': Form.createFormField({
      value: get(role, 'roleId')
    }),
    'user.status': Form.createFormField({
      value: get(currentAgencyUser, 'data.status')
    }),
    'user.username': Form.createFormField({
      value: get(currentUser, 'username')
    }),
    'user.resumeUrl': Form.createFormField({
      value: resumeUrl?resumeUrl:''
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
      value: IM0Service
    }),
    'user.instantMessengerInfos[0]["messengerId"]': Form.createFormField({
      value: IM0ID?IM0ID:''
    }),
    'user.instantMessengerInfos[1]["service"]': Form.createFormField({
      value: IM1Service
    }),
    'user.instantMessengerInfos[1]["messengerId"]': Form.createFormField({
      value: IM1ID?IM1ID:''
    }),
  };
};
const form = Form.create({ mapPropsToFields })(CreateEdit);

export default connect(
  state => ({
    ...state.Agency
  }),
  {
    requestAgencyUserRoles,
    requestCurrentAgency,
    requestCurrentAgencyUser,
    clearCurrentAgencyUser,
  }
)(form);
