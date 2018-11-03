import React, {Component} from 'react';
import {Row, Col, Spin} from 'antd';
import {withRouter} from 'react-router-dom'
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import basicStyle from '../../../../settings/basicStyle';
import {
  TitleWrapper,
  ComponentTitle,
} from '../../crud.style';

import Box from '../../../../components/utility/box';
import UserForm from "../users/partials/UserForm";
import {message} from "antd/lib/index";
import {updateCompanyUser, getUser} from "../../../../actions/companyActions";
import Errors from "../../../Errors";

class Create extends Component {
  constructor() {
    super();
    this.state = {
      errors: {
        details: []
      },
      user: null,
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(formData, resetForm) {
    this.setState({loading: true});
    updateCompanyUser(this.props.match.params.id, {
      isProviderUser: false,
      isClientUser: true, ...formData
    }).then(res => {
      if (res.status) {
        message.success("Successfully Saved");
        resetForm();
        this.setState({errors: {details: []}});
      }
    }).catch(error => {
      if (error.response.status === 422) {
        this.setState({errors: error.response.data});
        window.scrollTo(0, 0)
      }
    }).finally(() => {
      this.setState({loading: false});
    })
  }

  componentDidMount() {
    this.setState({loading: true});
    getUser(this.props.match.params.id).then(res => {
      this.setState({user: res.data});
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
                <ComponentTitle>
                  Edit User
                </ComponentTitle>
              </TitleWrapper>
              <Row gutter={24}>
                <Col span={24}>
                  {this.state.errors.details.length ? <Errors errors={this.state.errors}/> : ''}
                </Col>
              </Row>
              <Spin spinning={this.state.loading}>
                <UserForm submit={this.handleSubmit} user={this.state.user} errors={this.state.errors}/>
              </Spin>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

export default withRouter(Create);
