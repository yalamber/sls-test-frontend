import React, { Component } from "react";
import { Row, Col, Spin } from "antd";
import { withRouter } from "react-router-dom";
import LayoutWrapper from "../../../../../components/utility/layoutWrapper.js";
import PageHeader from "../../../../../components/utility/pageHeader";
import basicStyle from "../../../../../settings/basicStyle";
import { getErrorDataFromApiResponseError } from "../../../../../util/response-message";
import { TitleWrapper, ComponentTitle } from "../../../crud.style";
import _ from "lodash";
import Box from "../../../../../components/utility/box";
import MemberForm from "./partials/MemberForm";
import { message } from "antd/lib/index";
import {
  getUser,
  addUser,
  getCompanyTeam,
  addUserToCompany,
  getRoles
} from "../../../../../helpers/http-api-client";

class Create extends Component {
  constructor() {
    super();
    this.state = {
      company: {},
      team: {},
      users: [],
      roles: [],
      errors: {
        details: []
      },
      loading: false
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const { teamId } = this.props.match.params;
    this.setState({ loading: true });
    try {
      let responseCompanyTeam = await getCompanyTeam(teamId);
      let responseUser = await getUser();
      let responseRoles = await this.getRolesByType();

      this.setState({
        loading: false,
        team: responseCompanyTeam.data,
        company: responseCompanyTeam.data.client,
        roles: responseRoles.data.rows,
        users: responseUser.data.rows
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

  async getRolesByType(opts = {}) {
    const { type = 'clientTeamUser' } = opts;
    const data = await getRoles({ query: { type } });
    return data;
  }

  render() {
    console.log("this.prop", this.props);
    const { rowStyle, colStyle, gutter } = basicStyle;
    return (
      <LayoutWrapper>
        <PageHeader>
          {this.state.company.name} -> {this.state.team.name}
        </PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Add Team Member</ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <MemberForm
                  relId={this.state.company.clientId}
                  userType="clientUser"
                  submit={this.handleSubmit}
                  users={this.state.users}
                  roles={this.state.roles}
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
