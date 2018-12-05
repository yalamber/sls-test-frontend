import React, { Component } from "react";
import { Row, Col, Icon, Spin, message } from "antd";
import { connect } from 'react-redux';
import _ from "lodash";
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
} = clientActions;

class Create extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { 
      match, 
      requestCurrentClient, 
      requestCurrentUser,
      requestClientUserRoles
    } = this.props;
    //get current client
    requestCurrentClient(match.params.clientId);
    //get client roles
    requestClientUserRoles();
    //get current user and set to edit if we have userId
    if(match.params.userId) {
      requestCurrentUser(match.params.userId);
    }
  }

  async handleSubmit() {
    
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { currentClient, clientUserRoles, currentClientUser, history, match } = this.props;

    let loading = currentClient.loading || clientUserRoles.loading || !!(match.params.userId && currentClientUser.loading);
    let title = 'Add User';
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
                  history={history}
                  handleSubmit={this.handleSubmit}
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
  }
)(Create);