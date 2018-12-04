import React, { Component } from "react";
import { Row, Col, Icon, Spin, message } from "antd";
import { connect } from 'react-redux';
import _ from "lodash";
import LayoutWrapper from "@components/utility/layoutWrapper";
import PageHeader from "@components/utility/pageHeader";
import basicStyle from "@settings/basicStyle";
import { getErrorDataFromApiResponseError } from "@utils/response-message";
import { TitleWrapper, ComponentTitle, ActionBtn } from "@utils/crud.style";
import Box from "@components/utility/box";
import {
  addUser,
  editUser,
  addUserToCompany
} from "@helpers/http-api-client";
import clientActions from '@app/SystemApp/redux/client/actions';

import UserForm from "./partials/UserForm";
const { requestCurrentClient } = clientActions;

class Create extends Component {
  constructor() {
    super();
    this.state = {
      errors: {
        details: []
      },
      loading: false
    };
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    this.props.requestCurrentClient(match.params.clientId);
  }

  async handleSubmit(formData, resetForm) {
    try {
      this.setState({ loading: true });
      let role = formData.role;
      formData = _.omit(formData, "role");

      let user = await addUser({ ...formData });
      let companyUser = await addUserToCompany(
        user.data.userId,
        this.state.company.clientId,
        {
          roleId: role,
          status: formData.status
        }
      );
      if (companyUser.status === 200) {
        message.success("Successfully Saved");
        resetForm();
        this.setState({ errors: { details: [] } });
        this.props.history.goBack();
      }
    } catch (error) {
      this.setState({ errors: getErrorDataFromApiResponseError(error) });
    } finally {
      this.setState({ loading: false });
    }
  }
 
  handleEditSubmit(formData, resetForm) {
    this.setState({ loading: true }, async () => {
      try {
        // let role = formData.role;
        // formData = _.omit(formData, "role");
        const { userId } = this.props.match.params;
        let responseEditUser = await editUser(userId, { ...formData });
        // let companyUser = await editUser(userId, formData);
        if (responseEditUser.status === 200) {
          message.success("Successfully Saved");
          resetForm();
          this.setState({ errors: { details: [] }, loading: false });
          this.props.history.goBack();
        } else {
          this.setState({
            errors: getErrorDataFromApiResponseError(responseEditUser),
            loading: false
          });
        }
      } catch (error) {
        this.setState({
          errors: getErrorDataFromApiResponseError(error),
          loading: false
        });
      }
    });
  }

  getFormMode() {
    const isEditKeyWordFoundInUrl = new RegExp(`/edit`).test(
      this.props.match.url
    );
    if (isEditKeyWordFoundInUrl) {
      return "edit";
    } else {
      return "create";
    }
  }

  renderFormTypeTitle(history) {
    let title = 'Create User';
    if (this.getFormMode() === "edit") {
      const {
        user: { username = "" }
      } = this.props.location.state;
      title = 'Edit user';
    }
    return (
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
    );
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { currentClient, history, match } = this.props;
    return (
      <LayoutWrapper>
        <PageHeader>Client - {currentClient.clientData.name}</PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              {this.renderFormTypeTitle()}
              <Spin spinning={this.state.loading}>
                <UserForm
                  relId={match.params.clientId}
                  userType="clientUser"
                  formType={this.getFormMode()}
                  rowData={{ ...history.location.state }}
                  submit={
                    this.getFormMode() === "create"
                      ? this.handleSubmit
                      : this.handleEditSubmit
                  }
                  errors={this.state.errors}
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
    requestCurrentClient
  }
)(Create);