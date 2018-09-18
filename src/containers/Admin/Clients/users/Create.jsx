import React, {Component} from 'react';
import {Row, Col} from 'antd';
import {withRouter} from 'react-router-dom'
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import basicStyle from '../../../../settings/basicStyle';
import {
  TitleWrapper,
  ComponentTitle,
} from '../../crud.style';

import Box from '../../../../components/utility/box';
import UserForm from "../users/partials/UserForm";

class Create extends Component {
  render() {
    const {rowStyle, colStyle, gutter} = basicStyle;
    return (

      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>
                  Create User
                </ComponentTitle>
              </TitleWrapper>
              <UserForm/>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

export default withRouter(Create);
