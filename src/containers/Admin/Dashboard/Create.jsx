import React, {Component} from 'react';
import {Row, Col} from 'antd';
import {withRouter} from 'react-router-dom'
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import basicStyle from '../../../settings/basicStyle';
import ContentHolder from '../../../components/utility/contentHolder';

import {
  TitleWrapper,
  ComponentTitle,
} from '../crud.style';

import Box from '../../../components/utility/box';
import DashboardForm from "./partials/DashboardForm";

class Create extends Component {
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
              <DashboardForm/>
            </Box>
          </Col>
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Box title="Instruction">
              <ContentHolder>
                <p><b>Company Name : </b>  </p>
                <p><b>Team Name : </b> </p>
                <p><b>Board Name : </b> </p>
              </ContentHolder>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

export default withRouter(Create);
