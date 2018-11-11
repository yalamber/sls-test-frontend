import {
import React, { Component } from "react";
import { Row, Col, Spin } from "antd";
import { withRouter } from "react-router-dom";
import LayoutWrapper from "../../../../components/utility/layoutWrapper.js";
import basicStyle from "../../../../settings/basicStyle";
import { TitleWrapper, ComponentTitle } from "../../crud.style";

import Box from "../../../../components/utility/box";
import UserEditForm from "../users/partials/UserEditForm";
import { updateLastUserRowData } from '../../../../util/history-location-helper';
import { message } from "antd/lib/index";
import { saveEditCompanyUser } from "../../../../actions/companyActions";

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

  comoponentDidMount() {
    console.log("got mounted");
    console.log("prop here", this.props);
  }

  handleSubmit(formData, resetForm) {
    this.setState({ loading: true });
    const { companyId, userId } = this.props.match.params;
    saveEditCompanyUser(
      {
        companyId,
        userId
      },
      {
        isProviderUser: false,
        isClientUser: true,
        ...formData
      }
    )
      .then(res => {
        if (res && res.status) {
          message.success("Successfully Saved");
          resetForm();
          this.setState({ errors: { details: [] } });
          updateLastUserRowData(this.props.history, { ...this.props.location.state, row: res.data })
        }
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
    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Edit User</ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <UserEditForm
                  data={this.props.location.state}
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
