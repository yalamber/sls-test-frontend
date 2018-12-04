import React, { Component } from "react";
import { Row, Col, message, Spin } from "antd";
import { withRouter } from "react-router-dom";
import LayoutWrapper from "@components/utility/layoutWrapper";
import basicStyle from "@settings/basicStyle";
import ContentHolder from "@components/utility/contentHolder";
import { getErrorMessageFromApiResponseError } from "@utils/response-message";

import { TitleWrapper, ComponentTitle } from "@utils/crud.style";

import Box from "@components/utility/box";
import TeamForm from "./partials/TeamForm";
import { addCompanyTeam } from "@helpers/http-api-client";

class Create extends Component {
  constructor() {
    super();
    this.state = {
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(formData, resetForm) {
    const { clientId } = this.props.location.state.row;
    this.setState({ loading: true });
    addCompanyTeam({ ...formData, clientId })
      .then(res => {
        resetForm();
        message.success("Successfully Saved.");
      })
      .catch(error => {
        message.error(getErrorMessageFromApiResponseError(error));
      })
      .finally(() => {
        this.setState({ loading: false });
      });
    return true;
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { name } = this.props.location.state.row;
    const companyName = name;
    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Box>
              <Spin spinning={this.state.loading}>
                <TitleWrapper>
                  <ComponentTitle>Create Team for {companyName}</ComponentTitle>
                </TitleWrapper>
              </Spin>
              <TeamForm submit={this.handleSubmit} />
            </Box>
          </Col>
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Box title="Instruction">
              <ContentHolder>
                <p>
                  <b>Team Name : </b> Team name must be alphabet with 5 to 25
                  characters.
                </p>
              </ContentHolder>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

export default withRouter(Create);
