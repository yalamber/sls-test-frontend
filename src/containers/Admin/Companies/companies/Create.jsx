import React, {Component} from 'react';
import {Row, Col, Spin} from 'antd';
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
import {addCompany, addTeam} from "../../../../actions/companyActions";

export default class extends Component {

  constructor() {
    super();
    this.state = {loading: false};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(formData, resetForm) {
    this.setState({loading: true});
    addCompany(formData).then(res => {
      if (res.status) {
        addTeam({clientId: res.data.clientId, name: "Company Admin"}).then(res => {
          this.setState({loading: false});
          resetForm();
          message.success("Successfully Saved");
          this.props.history.goBack();
        });
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
              <Spin spinning={this.state.loading}>
                <ClientForm submit={this.handleSubmit}/>
              </Spin>
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
