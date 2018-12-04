import React, { Component } from "react";
import { Row, Col, Spin, message } from "antd";
import { withRouter } from "react-router-dom";
import _ from "lodash";

import LayoutWrapper from "@components/utility/layoutWrapper";
import PageHeader from "@components/utility/pageHeader";
import basicStyle from "@settings/basicStyle";
import { getErrorDataFromApiResponseError } from "@utils/response-message";
import { TitleWrapper, ComponentTitle } from "@utils/crud.style";
import { getAgency, addAgencyUser, addUserToAgency, editUser } from "@helpers/http-api-client";
import Box from "@components/utility/box";
import UserForm from "../../Clients/Users/partials/UserForm";

class Create extends Component {
  constructor() {
    super();
    this.state = {
      agency: {},
      errors: {
        details: []
      },
      loading: false
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    this.setState({ loading: true });
    try {
      let agency = await getAgency(this.props.match.params.agencyId);
      this.setState({
        loading: false,
        agency: agency.data
      });
    } catch(e) {
      message.error("Problem occured.");
      this.setState({ loading: false });
    }
  }

  async handleSubmit(formData, resetForm) {
    try {
      this.setState({ loading: true });
      let role = formData.role;
      formData = _.omit(formData, "role");
      let user = await addAgencyUser({ ...formData });
      let agencyUser = await addUserToAgency(user.data.userId, this.state.agency.agencyId, {
        roleId: role,
        status: formData.status
      })
      if (agencyUser.status === 200) {
        message.success("Successfully Saved");
        resetForm();
        this.setState({ errors: { details: [] } });
        this.props.history.goBack();
      }
    } catch(error) {
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

  renderFormTypeTitle() {
    if (this.getFormMode() === "edit") {
      const {
        user: { username = "" }
      } = this.props.location.state;

      return (
        <TitleWrapper>
          <ComponentTitle>Edit User - {username}</ComponentTitle>
        </TitleWrapper>
      );
    }

    return (
      <TitleWrapper>
        <ComponentTitle>Create New User</ComponentTitle>
      </TitleWrapper>
    );
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    return (
      <LayoutWrapper>
        <PageHeader>
          Agency -> {this.state.agency.name}
        </PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              {this.renderFormTypeTitle()}
              <Spin spinning={this.state.loading}>
                <UserForm
                  relId={this.state.agency.agencyId}
                  userType="agencyUser"
                  formType={this.getFormMode()}
                  rowData={{ ...this.props.history.location.state }}
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

export default withRouter(Create);
