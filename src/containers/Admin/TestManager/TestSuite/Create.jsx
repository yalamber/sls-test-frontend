import React, {Component} from 'react';
import {Row, Col, message} from 'antd';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import basicStyle from '../../../../settings/basicStyle';
import PageHeader from "../../../../components/utility/pageHeader";

import {
  TitleWrapper,
  ComponentTitle,
} from '../../crud.style';

import Box from '../../../../components/utility/box';
import TestSuiteForm from "./partials/TestSuiteForm";
import {addSuite} from "../../../../actions/testManagerActions";
import {getClientTeam, getCompany} from "../../../../actions/companyActions";

export default class extends Component {

  constructor() {
    super();
    this.state = {company: null, team: null};
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    getCompany(this.props.match.params.companyId).then(res => {
      this.setState({company: res.data});
    });
    getClientTeam(this.props.match.params.teamId).then(res => {
      this.setState({team: res.data});
    });
  }

  handleSubmit(formData, resetForm) {
    addSuite({clientTeamId: this.props.match.params.teamId, ...formData}).then(res => {
      message.success("Successfully Saved");
      this.props.history.push('../../list/' + this.props.match.params.companyId + '/' + this.props.match.params.teamId);
      resetForm();
    });
    return true
  }

  render() {
    const {rowStyle, colStyle, gutter} = basicStyle;
    return (

      <LayoutWrapper>
        <PageHeader>{this.state.company ? this.state.company.name : ''} | {this.state.team ? this.state.team.name : ''}</PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Create Test Suite</ComponentTitle>
              </TitleWrapper>
              <TestSuiteForm submit={this.handleSubmit}/>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
