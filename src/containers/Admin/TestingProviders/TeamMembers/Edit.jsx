import React, {Component} from 'react';
import {Row, Col, Spin} from 'antd';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import basicStyle from '../../../../settings/basicStyle';
import {
  TitleWrapper,
  ComponentTitle,
} from '../../crud.style';

import Box from '../../../../components/utility/box';
import UserForm from "./partials/UserForm";
import {addProviderUser, getProviderUser} from "../../../../helpers/http-api-client";

export default class extends Component {


  constructor() {
    super();
    this.state = {
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({loading: true});
    getProviderUser(this.props.match.params.id).then(res => {
      this.setState({user: res.data});
    }).finally(() => {
      this.setState({loading: false});
    })
  }

  handleSubmit(formData, resetForm) {
    this.setState({loading: true});
    addProviderUser({isProviderUser: true, isClientUser: false, ...formData}).then(res => {
      resetForm();
    }).finally(() => {
      this.setState({loading: false});
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
                <ComponentTitle>Edit User</ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <UserForm submit={this.handleSubmit} user={this.state.user}/>
              </Spin>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
