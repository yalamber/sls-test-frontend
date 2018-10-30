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
import UserForm from "./partials/TeamForm";
import {getTestingProviderTeam, updateProviderTeam} from "../../../../actions/testingProviderActions";

export default class extends Component {


  constructor() {
    super();
    this.state = {
      team: {},
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({loading: true});
    getTestingProviderTeam(this.props.match.params.id).then(res => {
      this.setState({team: res.data});
    }).finally(() => {
      this.setState({loading: false});
    });
  }

  handleSubmit(formData, resetForm) {
    this.setState({loading: true});
    updateProviderTeam(this.props.match.params.id, formData).then(res => {
      resetForm();
    }).finally(() => {
      this.setState({loading: false});
    });
  }

  render() {
    const {rowStyle, colStyle, gutter} = basicStyle;
    return (

      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Edit Team</ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <UserForm submit={this.handleSubmit} team={this.state.team}/>
              </Spin>
            </Box>
          </Col>
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Box title="Instruction">
              <ContentHolder>
                <p><b>Team Manager : </b> You can search team manager from the list. </p>
                <p><b>Team Name : </b> Team name must me alphabet with 5 to 25 characters.</p>
              </ContentHolder>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
