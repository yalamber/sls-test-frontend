import React, { Component } from "react";
import { Row, Col, Spin, Icon, message } from "antd";
import LayoutWrapper from "@components/utility/layoutWrapper.js";
import basicStyle from "@settings/basicStyle";
import { TitleWrapper, ComponentTitle, ActionBtn } from "@utils/crud.style";
import Box from "@components/utility/box";
import ClientForm from "./partials/CompanyForm";
import {
  addCompany,
  addCompanyUser,
  addTeam
} from "@helpers/http-api-client";

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
        this.setState({ loading: false });
        resetForm();
        message.success("Successfully Saved");
        this.props.history.goBack();
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
                <ComponentTitle> 
                  <ActionBtn
                    type="secondary"
                    onClick={() => this.props.history.goBack()}>
                    <Icon type="left" />Back
                  </ActionBtn>
                  &nbsp; Create Company
                </ComponentTitle>
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
