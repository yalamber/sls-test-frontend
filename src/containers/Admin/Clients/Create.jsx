import React, {Component} from 'react';
import {Row, Col} from 'antd';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import basicStyle from '../../../settings/basicStyle';
import ContentHolder from '../../../components/utility/contentHolder';
import {
  TitleWrapper,
  ComponentTitle,
} from '../crud.style';

import Box from '../../../components/utility/box';
import ClientForm from "./partials/ClientForm";

export default class extends Component {
  render() {
    const {rowStyle, colStyle, gutter} = basicStyle;
    return (

      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Create new client</ComponentTitle>
              </TitleWrapper>
              <ClientForm/>
            </Box>
          </Col>
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Box title="Information">
              <ContentHolder>
                <p><b>Client Name : </b> Client name must me alphabet with 5 to 25 characters. </p>
                <p><b>Client Location : </b> Client Location is location of client.</p>
              </ContentHolder>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
