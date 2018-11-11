import React, {Component} from 'react';
import {Row, Col, Spin} from 'antd';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import basicStyle from '../../../settings/basicStyle';
import {
  TitleWrapper,
  ComponentTitle,
} from '../crud.style';

import Box from '../../../components/utility/box';
import EditRoleForm from "./partials/EditRoleForm";
import {message} from "antd/lib/index";
import {addCompany, addCompanyUser, addTeam} from "../../../actions/companyActions";

export default class extends Component {

  constructor() {
    super();
    this.state = {loading: false};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(formData, resetForm) {
    alert('Create');
  }

  render() {
    const {rowStyle, colStyle, gutter} = basicStyle;
    return (

      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              {/*<TitleWrapper>
                <ComponentTitle>Create Company</ComponentTitle>
              </TitleWrapper>*/}
              <Spin spinning={this.state.loading}>
                <EditRoleForm submit={this.handleSubmit}/>
              </Spin>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
