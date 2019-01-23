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
    this.handleSubmit = this.handleSubmit.bind(this);
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
    //get current agency
    requestCurrentAgency(match.params.agencyId);
    //get agency roles
    requestAgencyUserRoles();
    //get current user and set to edit if we have userId
    if(match.params.userId) {
      requestCurrentAgencyUser(match.params.agencyId, match.params.userId);
    } else {
      clearCurrentAgencyUser();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if(this.mode === 'edit') {
          //this.props.requestUpdateAgencyUser(this.props.match.agencyId, userId, values, this.props.history);
        } else {
          //create user and add to agency
          this.props.requestCreateAgencyUser(this.props.match.agencyId, values.user, this.props.history, 'systemApp');

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
        <PageHeader><IntlMessages id="agency" /> - {currentAgency.agencyData.name}</PageHeader>
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
    role: Form.createFormField({
      value: get(role, 'roleId')
    }),
    status: Form.createFormField({
      value: get(currentUser, 'status')
    }),
    username: Form.createFormField({
      value: get(currentUser, 'username')
    }),
    resumeUrl: Form.createFormField({
      value: get(currentUser, 'resumeUrl')
    }),
    'contactInformation.emailAddress': Form.createFormField({
      value: get(currentUser, 'contactInformation.emailAddress')
    }),
    'contactInformation.postalAddress': Form.createFormField({
      value: get(currentUser, 'contactInformation.postalAddress')
    }),
    'contactInformation.mobilePhone': Form.createFormField({
      value: get(currentUser, 'contactInformation.mobilePhone')
    }),
    'contactInformation.smsPhone': Form.createFormField({
      value: get(currentUser, 'contactInformation.smsPhone')
    }),
    'contactInformation.linkedInUrl': Form.createFormField({
      value: get(currentUser, 'contactInformation.linkedInUrl')
    }),
    'instantMessengerInfos[0]["service"]': Form.createFormField({
      value: get(currentUser, 'instantMessengerInfos[0]["service"]')
    }),
    'instantMessengerInfos[0]["messengerId"]': Form.createFormField({
      value: get(currentUser, 'instantMessengerInfos[0]["messengerId"]')
    }),
    'instantMessengerInfos[1]["service"]': Form.createFormField({
      value: get(currentUser, 'instantMessengerInfos[1]["service"]')
    }),
    'instantMessengerInfos[1]["messengerId"]': Form.createFormField({
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