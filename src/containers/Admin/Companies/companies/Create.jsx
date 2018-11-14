import React, { Component } from "react";
import { Row, Col, Spin } from "antd";
import LayoutWrapper from "../../../../components/utility/layoutWrapper.js";
import basicStyle from "../../../../settings/basicStyle";
import { TitleWrapper, ComponentTitle } from "../../crud.style";

import Box from "../../../../components/utility/box";
import ClientForm from "./partials/CompanyForm";
import { message } from "antd/lib/index";
import {
  addCompany,
  addCompanyUser,
  addTeam
} from "../../../../helpers/http-api-client";

export default class extends Component {
  constructor() {
    super();
    this.state = { loading: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(formData, resetForm) {
    this.setState({ loading: true });
    addCompany({ ...formData.company, owner: formData.user }).then(res => {
      if (res.status) {
        /*addTeam({ clientId: res.data.clientId, name: "Company Admin" }).then(
          res => {
            addCompanyUser({
              clientTeams: [res.data.clientTeamId],
              ...formData.user
            }).then(res => {*/
              this.setState({ loading: false });
              resetForm();
              message.success("Successfully Saved");
              this.props.history.goBack();
            /*});
          }
        );*/
      }
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
                <ComponentTitle>Create Company</ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <ClientForm submit={this.handleSubmit} />
              </Spin>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
