import React, { Component } from "react";
import { Row, Col, Spin, message } from "antd";
import _ from "lodash";
import LayoutWrapper from "@components/utility/layoutWrapper";
import PageHeader from "@components/utility/pageHeader";
import basicStyle from "@settings/basicStyle";
import { getErrorDataFromApiResponseError } from "@utils/response-message";
import { TitleWrapper, ComponentTitle } from "@utils/crud.style";
import Box from "@components/utility/box";
import MemberForm from "./partials/MemberForm";
import {
  getUser,
  getCompanyTeam,
  addCompanyTeamMember,
  getRoles
} from "@helpers/http-api-client";

class CreateEdit extends Component {
  constructor() {
    super();
    this.state = {
      client: {},
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
        team: responseCompanyTeam,
        client: responseCompanyTeam.client,
        roles: responseRoles.rows,
        users: responseUser.rows
      });
    } catch (e) {
      message.error("Problem occured.");
      this.setState({ loading: false });
    }
  }

  async handleSubmit(formData, resetForm) {
    try {
      const { teamId } = this.props.match.params;
      this.setState({ loading: true });

      const { status, userId, roleId } = formData;
      let responseCompanyTeamMember = await addCompanyTeamMember({
        userId,
        teamId,
        status,
        roleId,
      });
      if (responseCompanyTeamMember.status === 200) {
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
    const { rowStyle, colStyle, gutter } = basicStyle;
    console.log(this.state);
    return (
      <LayoutWrapper>
        <PageHeader>
          {this.state.client.name} 
          - {this.state.team.name}
        </PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Add Team Member</ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <MemberForm
                  relId={this.state.client.clientId}
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

export default CreateEdit;
