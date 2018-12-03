import React, {Component} from 'react';
import {Row, Col, message} from 'antd';
import {withRouter} from 'react-router-dom'
import LayoutWrapper from '@validations/utility/layoutWrapper.js';
import basicStyle from '@settings/basicStyle';
import ContentHolder from '@validations/utility/contentHolder';

import {
  TitleWrapper,
  ComponentTitle,
} from '../crud.style';

import Box from '@validations/utility/box';
import DashboardForm from "./partials/DashboardForm";
import {addDashboard} from "@helpers/http-api-client";

class Create extends Component {

  handleSubmit(formData, resetForm) {
    addDashboard(formData).then(res => {
      message.success("Successfully saved.");
      resetForm();
    })
  }

  render() {
    const {rowStyle, colStyle, gutter} = basicStyle;
    return (

      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={12} sm={23} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>
                  Create Dashboard
                </ComponentTitle>
              </TitleWrapper>
              <DashboardForm submit={this.handleSubmit.bind(this)}/>
            </Box>
          </Col>
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Box title="Instruction">
              <ContentHolder>
                <p><b>Company Name : </b></p>
                <p><b>Team Name : </b></p>
                <p><b>Board Name : </b></p>
              </ContentHolder>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

export default withRouter(Create);
