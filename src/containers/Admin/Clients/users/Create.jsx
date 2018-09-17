import React, {Component} from 'react';
import {Row, Col, Icon} from 'antd';
import {withRouter} from 'react-router-dom'
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from "../../../../components/utility/pageHeader";

import basicStyle from '../../../../settings/basicStyle';
import {
  TitleWrapper,
  ComponentTitle, ActionBtn,
} from '../../crud.style';

import Box from '../../../../components/utility/box';
import UserForm from "../users/partials/UserForm";

class Create extends Component {
  render() {
    const {rowStyle, colStyle, gutter} = basicStyle;
    return (

      <LayoutWrapper>
        <PageHeader>ACME Software Company | Create User</PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>
                  <ActionBtn type="secondary" onClick={()=>this.props.history.goBack()}>
                    <Icon type="left"/>Go Back
                  </ActionBtn>
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
