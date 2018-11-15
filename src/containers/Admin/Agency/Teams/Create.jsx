import React, { Component } from "react";
import { Row, Col, Spin } from "antd";
import LayoutWrapper from "../../../../components/utility/layoutWrapper.js";
import basicStyle from "../../../../settings/basicStyle";
import ContentHolder from "../../../../components/utility/contentHolder";

import { TitleWrapper, ComponentTitle } from "../../crud.style";

import Box from "../../../../components/utility/box";
import TeamForm from "./partials/TeamForm";
import { message } from "antd/lib/index";
import { createAgencyTeam } from "../../../../helpers/http-api-client";

export default class extends Component {
  constructor() {
    super();
    this.state = {
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(formData, resetForm) {
    this.setState({ loading: true });
    const { agencyId } = this.props.match.params;
    createAgencyTeam({ ...formData, agencyId })
      .then(res => {
        resetForm();
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { agencyId } = this.props.match.params;
    const { name } = this.props.location.state;
    const agencyName = name;
    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Create new Team for {agencyName}</ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <TeamForm submit={this.handleSubmit} />
              </Spin>
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
