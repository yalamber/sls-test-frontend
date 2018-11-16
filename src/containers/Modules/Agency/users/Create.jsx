import React, { Component } from "react";
import { Row, Col, Spin } from "antd";
import { withRouter } from "react-router-dom";
import LayoutWrapper from "../../../../components/utility/layoutWrapper.js";
import basicStyle from "../../../../settings/basicStyle";
import { TitleWrapper, ComponentTitle } from "../../crud.style";

import Box from "../../../../components/utility/box";
import UserForm from "./partials/UserForm";
import { message } from "antd/lib/index";
import { addAgencyUser } from "../../../../helpers/http-api-client";

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

  handleSubmit(formData, resetForm) {
    alert("sending")
    // this.setState({ loading: true });
    // if (formData || !formData) {
    //   console.log("o we got", formData);
      // return this.setState({ loading: false });
    // }
    /*addAgencyUser({ ...formData })
      .then(res => {
        if (res.status) {
          message.success("Successfully Saved");
          resetForm();
          this.setState({ errors: { details: [] } });
        }
      })
      .catch(error => {
        if (error.response.status === 422) {
          this.setState({ errors: error.response.data });
        }
      })
      .finally(() => {
        this.setState({ loading: false });
      });*/
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Create User</ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <UserForm
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
