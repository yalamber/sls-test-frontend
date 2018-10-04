import React, {Component} from 'react';
import {Row, Col} from 'antd';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import basicStyle from '../../../../settings/basicStyle';
import ContentHolder from '../../../../components/utility/contentHolder';
import {
  TitleWrapper,
  ComponentTitle,
} from '../../crud.style';

import Box from '../../../../components/utility/box';
import ClientForm from "./partials/CompanyForm";
import {message} from "antd/lib/index";
import {addCompany} from "../../../../actions/companyActions";

export default class extends Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(formData) {
    addCompany(formData).then(res => {
      if (res.status) {
        message.success("Successfully Saved");
        this.props.history.goBack();
      }
    });
    return true;
  }

  render() {
    const {rowStyle, colStyle, gutter} = basicStyle;
    return (

      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Create Company</ComponentTitle>
              </TitleWrapper>
              <ClientForm submit={this.handleSubmit}/>
            </Box>
          </Col>
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Box title="Instruction">
              <ContentHolder>
                <p><b>Company Name : </b> Company name must me alphabet with 5 to 25 characters. </p>
                <p><b>Company Location : </b> Company Location is location of client.</p>
              </ContentHolder>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}