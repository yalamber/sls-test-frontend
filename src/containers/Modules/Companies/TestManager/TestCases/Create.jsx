import React, { Component } from "react";
import { Row, Col, message, Spin } from "antd";
import LayoutWrapper from "../../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../../components/utility/pageHeader";
import basicStyle from "../../../../../settings/basicStyle";
import { TitleWrapper, ComponentTitle } from "../../../crud.style";

import Box from "../../../../../components/utility/box";
import TestCaseForm from "./partials/TestCaseForm";
import {
  addTestCase,
  getSuite
} from "../../../../../helpers/http-api-client";
import Errors from "../../../../Errors";

export default class extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      company: {},
      team: {},
      suite: {},
      errors: {
        details: []
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      try {
        const { companyId, suiteId } = this.props.match.params;
        const resSuite = await getSuite(suiteId);
        if (resSuite.data) {
          const { data } = resSuite;
          const { clientTeam } = data;
          const { client } = clientTeam;
          this.setState({
            loading: false,
            team: clientTeam,
            company: client,
            suite: data
          });
        } else {
          this.setState({ loading: false })
        }
      } catch (error) {
        this.setState({ loading: false });
      }
    });
  }

  handleSubmit(value, resetForm) {
    const formData = { ...value, testSuiteId: this.state.suite.testSuiteId };

    this.setState({ loading: true });
    addTestCase(formData)
      .then(res => {
        message.success("Success");
        resetForm();
      })
      .catch(error => {
        if (error.response.status === 422) {
          this.setState({ errors: error.response.data });
        }
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { company, suite, team } = this.state;
    return (
      <LayoutWrapper>
        <PageHeader>
          {company && company.name ? company.name : ""} | {team && team.name ? team.name : ""} | {suite && suite.name ? suite.name : ""}
        </PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Create Test Case</ComponentTitle>
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
                <TestCaseForm submit={this.handleSubmit} />
              </Spin>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
