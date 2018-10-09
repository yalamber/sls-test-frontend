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
import UserForm from "./partials/TeamForm";
import {getTestingProviderTeam, updateProviderTeam} from "../../../../actions/testingProviderActions";

export default class extends Component {


  constructor() {
    super();
    this.state = {
      team: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    getTestingProviderTeam(this.props.match.params.id).then(res => {
      this.setState({team: res.data});
    });
  }

  handleSubmit(formData, resetForm) {
    updateProviderTeam(this.props.match.params.id, formData).then(res => {
      resetForm();
    })
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
              <UserForm submit={this.handleSubmit} team={this.state.team}/>
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
