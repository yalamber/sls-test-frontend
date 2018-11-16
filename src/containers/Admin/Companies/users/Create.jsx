import React, { Component } from "react";
import { Row, Col, Spin } from "antd";
import { withRouter } from "react-router-dom";
import LayoutWrapper from "../../../../components/utility/layoutWrapper.js";
import basicStyle from "../../../../settings/basicStyle";
import { getErrorDataFromApiResponseError } from "../../../../util/response-message";
import { TitleWrapper, ComponentTitle } from "../../crud.style";
import _ from "lodash";

import Box from "../../../../components/utility/box";
import UserForm from "../users/partials/UserForm";
import { message } from "antd/lib/index";
import {
  addCompanyUser,
  addCompanyTeamMember
} from "../../../../helpers/http-api-client";

class Create extends Component {
  constructor() {
    super();
    this.state = {
      errors: {
        details: []
      },
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(formData, resetForm) {
    this.setState({ loading: true });
    const teamId = formData.clientTeams;
    formData = _.omit(formData, "company");
    formData = _.omit(formData, "clientTeams");

    let userAdded = false;
    addCompanyUser({ ...formData })
      .then(res => {
        if (res.status) {
          userAdded = true;

          const { userId } = res.data;
          return addCompanyTeamMember({ teamId: teamId[0], userId });
        }
      })
      .then(res => {
        message.success("Successfully Saved");
        resetForm();
        this.setState({ errors: { details: [] } });
        this.props.history.goBack();
      })
      .catch(error => {
        if (userAdded === true) {
          message.success("Successfully added the new user");
          message.error("But failed to assign to the team");
        }
        // if (error.response.status === 422) {
        this.setState({ errors: getErrorDataFromApiResponseError(error) });
        // }
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Create User</ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <UserForm
                  submit={this.handleSubmit}
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
