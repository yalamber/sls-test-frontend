import React, { Component } from "react";
import { Row, Col, message, Spin } from "antd";
import LayoutWrapper from "../../../../components/utility/layoutWrapper.js";
import basicStyle from "../../../../settings/basicStyle";
import PageHeader from "../../../../components/utility/pageHeader";

import { TitleWrapper, ComponentTitle } from "../../crud.style";

import Box from "../../../../components/utility/box";
import TestSuiteForm from "./partials/TestSuiteForm";
import { addSuite } from "../../../../helpers/http-api-client";
import { getClientTeam, getCompany } from "../../../../helpers/http-api-client";
import Errors from "../../../Errors";
import { scrollToTop } from '../../../../util/dom-util';

export default class extends Component {
  constructor() {
    super();
    this.state = {
      company: null,
      team: null,
      errors: {
        details: []
      },
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    getCompany(this.props.match.params.companyId).then(res => {
      this.setState({ company: res.data });
    });
    getClientTeam(this.props.match.params.teamId).then(res => {
      this.setState({ team: res.data });
    });
  }

  handleSubmit(formData, resetForm) {
    this.setState({ loading: true });
    addSuite({ clientTeamId: this.props.match.params.teamId, ...formData })
      .then(res => {
        message.success("Successfully Saved");
        this.props.history.push(
          "../../list/" +
            this.props.match.params.companyId +
            "/" +
            this.props.match.params.teamId
        );
        resetForm();
      })
      .catch(error => {
        if (error.response.status === 422) {
          this.setState({ errors: error.response.data });
          scrollToTop();
        } else if (error.response.status === 500) {
          this.setState({ errors: { details: [error.response.data] } }, () => {
            scrollToTop()
          });
        }
      })
      .finally(() => {
        this.setState({ loading: false });
      });
    return true;
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    return (
      <LayoutWrapper>
        <PageHeader>
          {this.state.company ? this.state.company.name : ""} |{" "}
          {this.state.team ? this.state.team.name : ""}
        </PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Create Test Suite</ComponentTitle>
              </TitleWrapper>
              <Row gutter={24}>
                <Col span={24}>
                  {this.state.errors.details.length ? (
                    <Errors errors={this.state.errors} />
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
              <Spin spinning={this.state.loading}>
                <TestSuiteForm submit={this.handleSubmit} />
              </Spin>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
