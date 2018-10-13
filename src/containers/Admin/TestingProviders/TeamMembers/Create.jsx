import React, {Component} from 'react';
import {Row, Col} from 'antd';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import basicStyle from '../../../../settings/basicStyle';
import {
  TitleWrapper,
  ComponentTitle,
} from '../../crud.style';

import Box from '../../../../components/utility/box';
import UserForm from "./partials/UserForm";
import {addProviderUser} from "../../../../actions/testingProviderActions";

export default class extends Component {


  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(formData, resetForm) {
    addProviderUser({isProviderUser: true, isClientUser: false, ...formData}).then(res => {
      resetForm();
    })
  }

  render() {
    const {rowStyle, colStyle, gutter} = basicStyle;
    return (

      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Create new User</ComponentTitle>
              </TitleWrapper>
              <UserForm submit={this.handleSubmit}/>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
