import React, { Component } from "react";
import { Row, Col, Spin } from "antd";
import LayoutWrapper from "../../../components/utility/layoutWrapper.js";
import basicStyle from "../../../settings/basicStyle";
import { TitleWrapper, ComponentTitle } from "../crud.style";

import Box from "../../../components/utility/box";
import AgencyForm from "./partials/AgencyForm";
import { message } from "antd/lib/index";
import {
  createAgency,
  createAgencyUser,
  addTeam
} from "../../../helpers/http-api-client";

export default class extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      errors: {
        details: []
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(formData, resetForm) {
    this.setState({ loading: true });

    createAgency({
      ...formData,
      owner: { ...formData.owner, status: "active" }
    })
      .then(res => {
        if (res.status) {
          this.setState({ loading: false });
          resetForm();
          message.success("Successfully Saved");
          this.props.history.goBack();
        }
      })
      .catch(error => {
        this.setState({ loading: false, errors: error.response.data });
        // resetForm();
        // message.error("Failed to save");
        // this.props.history.goBack();
      });
    return true;
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Create Agency</ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <AgencyForm
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
