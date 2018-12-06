import React, { Component } from "react";
import { Row, Col, Icon, Spin } from "antd";
import { connect } from 'react-redux';
import LayoutWrapper from "@components/utility/layoutWrapper";
import PageHeader from "@components/utility/pageHeader";
import basicStyle from "@settings/basicStyle";
import { TitleWrapper, ComponentTitle, ActionBtn } from "@utils/crud.style";
import Box from "@components/utility/box";
import clientActions from '@app/SystemApp/redux/client/actions';
import UserForm from "@app/SystemApp/components/User/Form";

const { 
  requestCurrentClient, 
  requestCurrentClientUser, 
  requestClientUserRoles,
  requestClearCurrentClientUser, 
  requestCreateClientUser,
} = clientActions;

class CreateEdit extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { 
      match, 
      requestCurrentClient, 
      requestCurrentClientUser,
      requestClientUserRoles,
      requestClearCurrentClientUser
    } = this.props;
    //get current client
    requestCurrentClient(match.params.clientId);
    //get client roles
    requestClientUserRoles();
    //get current user and set to edit if we have userId
    if(match.params.userId) {
      requestCurrentClientUser(match.params.clientId, match.params.userId);
    } else {
      requestClearCurrentClientUser();
    }
  }

  async handleSubmit(mode, clientId, values, reset) {
    if(mode === 'edit') {

    } else {
      //create user and add to client
      this.props.requestCreateClientUser(clientId, values, this.props.history);
    }
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { currentClient, clientUserRoles, currentClientUser, history, match } = this.props;
    let mode = 'add';
    if(match.params.userId) {
      mode = 'edit';
    }
    let loading = currentClient.loading || clientUserRoles.loading || !!(match.params.userId && currentClientUser.loading);
    
    let title = mode === 'edit'? 'Edit User' : 'Add User';
    return (
      <LayoutWrapper>
        <PageHeader>Client - {currentClient.clientData.name}</PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>        
              <TitleWrapper>
                <ComponentTitle>
                  <ActionBtn
                    type="secondary"
                    onClick={() => history.goBack()}
                  >
                    <Icon type="left" /> Go Back
                  </ActionBtn>
                  &nbsp; {title}
                </ComponentTitle>
              </TitleWrapper>
              <Spin spinning={loading}>
                <UserForm
                  relId={match.params.clientId}
                  userType="clientUser"
                  mode={mode}
                  currentUser={currentClientUser.data.user}
                  role={currentClientUser.data.role}
                  history={history}
                  submit={this.handleSubmit}
                  roles={clientUserRoles.rows}
                />
              </Spin>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

export default connect(
  state => ({
    ...state.Client
  }),
  {
    requestClientUserRoles,
    requestCurrentClient,
    requestCurrentClientUser,
    requestClearCurrentClientUser,
    requestCreateClientUser,
  }
)(CreateEdit);