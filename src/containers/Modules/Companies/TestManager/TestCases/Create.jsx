import React, {Component} from 'react';
import {Row, Col, Spin} from 'antd';
import LayoutWrapper from '../../../../../components/utility/layoutWrapper.js';
import basicStyle from '../../../../../settings/basicStyle';
import {
  TitleWrapper,
  ComponentTitle,
} from '../../../crud.style';

import Box from '../../../../../components/utility/box';
import TestCaseForm from "./partials/TestCaseForm";
import {addTestCase} from "../../../../../helpers/http-api-client";
import Errors from "../../../../Errors";

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

  handleSubmit(value, resetForm) {
    this.setState({loading: true});
    addTestCase(value).then(res => {
      resetForm();
    }).catch(error => {
      if (error.response.status === 422) {
        this.setState({errors: error.response.data});
      }
    }).finally(() => {
      this.setState({loading: false});
    });
  }

  render() {
    const {rowStyle, colStyle, gutter} = basicStyle;
    return (

      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Create Test Case</ComponentTitle>
              </TitleWrapper>
              <Row gutter={24}>
                <Col span={24}>
                  {this.state.errors.details.length ? <Errors errors={this.state.errors}/> : ''}
                </Col>
              </Row>
              <Spin spinning={this.state.loading}>
                <TestCaseForm submit={this.handleSubmit}/>
              </Spin>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
