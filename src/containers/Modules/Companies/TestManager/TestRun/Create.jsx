import React, { Component } from "react";
import { Row, Col, message, Spin } from "antd";
import LayoutWrapper from "../../../../../components/utility/layoutWrapper.js";
import basicStyle from "../../../../../settings/basicStyle";
import PageHeader from "../../../../../components/utility/pageHeader";

import { TitleWrapper, ComponentTitle } from "../../../crud.style";

import Box from "../../../../../components/utility/box";
import TestRunForm from "./partials/TestRunForm";
import { addSuite } from "../../../../../helpers/http-api-client";
import {
  addTestRun,
  getAgencyTeams,
  getCompanySuites,
  getCompany
} from "../../../../../helpers/http-api-client";
import Errors from "../../../../Errors";
import { scrollToTop } from "../../../../../util/dom-util";

export default class extends Component {
  constructor() {
    super();
    this.state = {
      company: null,
      team: null,
      testSuites: [],
      agencyTeams: [],
      errors: {
        details: []
      },
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      try {
        const { companyId } = this.props.match.params;
        const responseCompanySuites = await getCompanySuites({
          query: { clientId: companyId }
        });
        const responseCompany = await getCompany(companyId);
        const responseAgencyTeams = await getAgencyTeams();
        const {
          data: { rows = [] }
        } = responseCompanySuites;

        this.setState({
          company: responseCompany.data,
          agencyTeams:
            responseAgencyTeams &&
            responseAgencyTeams.data &&
            responseAgencyTeams.data.rows &&
            responseAgencyTeams.data.rows.length
              ? responseAgencyTeams.data.rows
              : [],
          testSuites: rows,
          loading: false
        });
      } catch (e) {
        this.setState({ loading: false });
      }
    });
  }

  handleSubmit(formData, resetForm) {
    this.setState({ loading: true });
    addTestRun({ ...formData })
      .then(res => {
        message.success("Successfully Saved");
        this.props.history.goBack();
        resetForm();
      })
      .catch(error => {
        if (error.response.status === 422) {
          this.setState({ errors: error.response.data });
          scrollToTop();
        } else if (error.response.status === 500) {
          this.setState({ errors: { details: [error.response.data] } }, () => {
            scrollToTop();
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
          {this.state.company ? this.state.company.name : ""}
        </PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Create Test Run</ComponentTitle>
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
                <TestRunForm
                  agencyTeams={this.state.agencyTeams}
                  testSuites={this.state.testSuites}
                  submit={this.handleSubmit}
                />
              </Spin>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
