import React, { Component } from "react";
import { Form, Row, Col, Icon, Spin } from "antd";
import Button from "@components/uielements/button";
import { connect } from 'react-redux';
import { get } from 'lodash';
import LayoutWrapper from "@components/utility/layoutWrapper";
import PageHeader from "@components/utility/pageHeader";
import IntlMessages from '@components/utility/intlMessages';
import basicStyle from "@settings/basicStyle";
import { TitleWrapper, ComponentTitle, ActionBtn } from "@utils/crud.style";
import Box from "@components/utility/box";
import agencyActions from '@app/SystemApp/redux/agency/actions';
import UserFormFields from "@appComponents/User/FormFields";

const {
  requestCurrentAgency,
  requestCurrentAgencyUser,
  requestAgencyUserRoles,
  requestCreateAgencyUser,
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
    const { form, match} = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if(this.mode === 'edit') {
          //this.props.requestUpdateClientUser(match.params.clientId, userId, values, this.props.history);
        } else {
          //create user and add to client
          this.props.requestCreateAgencyUser(match.params.agencyId, values.user, this.props.history, 'systemApp');
        }
      }
    });
  }

  resetForm() {
    this.setState({ passwordType: false });
    this.props.form.resetFields();
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
  //testData TODO: remove this after test
  /*role = {
    roleId: 2
  };
  currentUser = {
    status: 'active',
    username: 'adadadadada',
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
  };*/
  return {
    'user.role': Form.createFormField({
      value: get(role, 'roleId')
    }),
    'user.status': Form.createFormField({
      value: get(currentUser, 'status')
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
    ...state.Agency
  }),
  {
    requestAgencyUserRoles,
    requestCurrentAgency,
    requestCurrentAgencyUser,
    clearCurrentAgencyUser,
    requestCreateAgencyUser,
  }
)(form);
