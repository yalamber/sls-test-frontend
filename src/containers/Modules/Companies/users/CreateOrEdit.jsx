import React, { Component } from "react";
import { Row, Col, Spin } from "antd";
import { withRouter } from "react-router-dom";
import LayoutWrapper from "../../../../components/utility/layoutWrapper.js";
import PageHeader from "../../../../components/utility/pageHeader";
import basicStyle from "../../../../settings/basicStyle";
import { getErrorDataFromApiResponseError } from "../../../../util/response-message";
import { TitleWrapper, ComponentTitle } from "../../crud.style";
import _ from "lodash";
import Box from "../../../../components/utility/box";
import UserForm from "../users/partials/UserForm";
import { message } from "antd/lib/index";
import {
  getCompany,
  addUser,
  editUser,
  addUserToCompany
} from "../../../../helpers/http-api-client";

class Create extends Component {
  constructor() {
    super();
    this.state = {
      company: {},
      errors: {
        details: []
      },
      loading: false
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    this.setState({ loading: true });
    try {
      let company = await getCompany(this.props.match.params.companyId);
      this.setState({
        loading: false,
        company: company.data
      });
    } catch (e) {
      message.error("Problem occured.");
      this.setState({ loading: false });
    }
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

  // {
  // 	"username": "test2",
  // 	"password": "xyz123",
  // 	"status": "active",
  // 	"isProviderUser": true,
  // 	"resumeUrl": "http://test.com",
  // 	"contactInformation": {
  // 		"postalAddress": "Teste address",
  //         "emailAddress": "yalamber@mundhum.com",
  //         "mobilePhone": "9843612873",
  //         "smsPhone": "9843612873",
  //         "facebookHandle": "yalamber",
  //         "twitterHandle": "subba",
  //         "linkedInUrl": "linked.com/yalamber"
  // 	}
  // }
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
        <PageHeader>Company -> {this.state.company.name}</PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              {this.renderFormTypeTitle()}
              <Spin spinning={this.state.loading}>
                <UserForm
                  relId={this.state.company.clientId}
                  userType="clientUser"
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
