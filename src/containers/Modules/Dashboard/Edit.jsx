import React, {Component} from 'react';
import {Row, Col, message} from 'antd';
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
import {getDashboard, updateDashboard} from "../../../helpers/http-api-client";

class Create extends Component {

  constructor() {
    super();
    this.state = {dashboard: {}}
  }

  handleSubmit(formData, resetForm) {
    updateDashboard(this.props.match.params.id, formData).then(res => {
      message.success("Successfully saved.");
      resetForm();
    })
  }

  componentDidMount() {
    getDashboard(this.props.match.params.id).then(res => {
      this.setState({dashboard: res.data});
    });
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
                  Edit Dashboard
                </ComponentTitle>
              </TitleWrapper>
              <DashboardForm submit={this.handleSubmit.bind(this)} dashboard={this.state.dashboard}/>
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
