import React, {Component} from 'react';
import {Row, Col, message, Spin} from 'antd';
import {withRouter} from 'react-router-dom'
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import basicStyle from '../../../../settings/basicStyle';
import ContentHolder from '../../../../components/utility/contentHolder';

import {
  TitleWrapper,
  ComponentTitle,
} from '../../crud.style';

import Box from '../../../../components/utility/box';
import TeamForm from "./partials/TeamForm";
import {updateTeam, getClientTeam} from "../../../../actions/companyActions";

class Create extends Component {

  constructor() {
    super();
    this.state = {
      team: {},
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(formData, resetForm) {
    this.setState({loading: true});
    updateTeam(formData, this.props.match.params.id).then(res => {
      resetForm();
      this.setState({loading: true});
      message.success('Successfully Saved.')
    });
    return true;
  }

  componentDidMount() {
    this.setState({loading: true});
    getClientTeam(this.props.match.params.id).then(res => {
      this.setState({team: res.data, loading: false})
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
                <ComponentTitle>
                  Edit Team
                </ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <TeamForm team={this.state.team} submit={this.handleSubmit}/>
              </Spin>
            </Box>
          </Col>
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Box title="Instruction">
              <ContentHolder>
                <p><b>Company Name : </b> You can select company from list. </p>
                <p><b>Team Name : </b> Team name must me alphabet with 5 to 25 characters.</p>
              </ContentHolder>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

export default withRouter(Create);
