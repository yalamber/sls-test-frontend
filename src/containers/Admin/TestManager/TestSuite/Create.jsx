import React, {Component} from 'react';
import {Row, Col} from 'antd';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import basicStyle from '../../../../settings/basicStyle';
import PageHeader from "../../../../components/utility/pageHeader";

import {
  TitleWrapper,
  ComponentTitle,
} from '../../crud.style';

import Box from '../../../../components/utility/box';
import TestSuiteForm from "./partials/TestSuiteForm";

export default class extends Component {
  render() {
    const {rowStyle, colStyle, gutter} = basicStyle;
    return (

      <LayoutWrapper>
        <PageHeader>ACME Software Company | Driver and Protocol Team</PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Create Test Suite</ComponentTitle>
              </TitleWrapper>
              <TestSuiteForm/>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
