import React, { Component } from "react";
import { Row, Col, Spin } from "antd";
import LayoutWrapper from "../../../../components/utility/layoutWrapper.js";
import basicStyle from "../../../../settings/basicStyle";
import ContentHolder from "../../../../components/utility/contentHolder";
import { getErrorDataFromApiResponseError } from "../../../../util/response-message";
import { message } from "antd/lib/index";
import { TitleWrapper, ComponentTitle } from "../../crud.style";

import Box from "../../../../components/utility/box";
import ClientEditForm from "./partials/CompanyEditForm";
import { editCompany, getCompany } from "../../../../helpers/http-api-client";

export default class extends Component {
  constructor() {
    super();
    this.state = {
      company: {},
      errors: {
        details: []
      },
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(formData, resetForm) {
    this.setState({ loading: true });
    editCompany(this.props.match.params.id, formData)
      .then(res => {
        if (res.status) {
          resetForm();
          this.setState({ loading: false });
          message.success("Successfully Saved");
          this.props.history.goBack();
        }
      })
      .catch(error => {
        this.setState({ loading: false, errors: getErrorDataFromApiResponseError(error) });
      });
    return true;
  }

  componentDidMount() {
    this.setState({ loading: true });
    getCompany(this.props.match.params.id).then(res => {
      this.setState({ company: res.data, loading: false });
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
                <ComponentTitle>Edit Company</ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <ClientEditForm
                  company={this.state.company}
                  errors={this.state.errors}
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
