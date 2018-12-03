import React, { Component } from "react";
import LayoutWrapper from "@components/utilitylayoutWrapper";
import { Row, Col, Form, Input, Spin } from "antd";
import { withRouter } from "react-router-dom";
import Box from "@components/utility/box";
import Button from "@validations/uielements/button";
import basicStyle from "@settings/basicStyle";
import TestQueueEditForm from "./partials/TestQueueEditForm";
import Errors from "../../../containers/Errors";

import { ActionWrapper, TitleWrapper, ComponentTitle } from "../crud.style";

import { testCaseValidation } from "../../../Validations/testCaseValidation";

const FormItem = Form.Item;
const { TextArea } = Input;
const { rowStyle, colStyle, gutter } = basicStyle;

const margin = {
  margin: "5px 5px 0px 0"
};

class CompletedTestEdit extends Component {
  constructor() {
    super();
    this.state = { loading: true };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    setTimeout(x => {
      this.setState({ loading: false })
    }, 500)
  }

  handleSubmit(formData, resetForm) {
    this.setState({ loading: true });
    // addCompany(formData).then(res => {
      // if (res.status) {
      //   addTeam({ clientId: res.data.clientId, name: "Company Admin" }).then(
      //     res => {
      //       this.setState({ loading: false });
      //       resetForm();
      //       message.success("Successfully Saved");
      //       this.props.history.goBack();
      //     }
      //   );
      // }
    // });
    return true;
  }

  render() {
    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Edit - Test Queues</ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <TestQueueEditForm submit={this.handleSubmit} />
              </Spin>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

export default withRouter(CompletedTestEdit);
