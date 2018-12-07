import React, { Component } from "react";
import { Row, Col, Spin } from "antd";
import LayoutWrapper from "@components/utility/layoutWrapper";
import basicStyle from "@settings/basicStyle";
import Box from "@components/utility/box";

export default class extends Component {
  constructor() {
    super();
    this.state = { loading: false, types: [] };
  }
  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <Spin spinning={this.state.loading}>
                TODO
              </Spin>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
