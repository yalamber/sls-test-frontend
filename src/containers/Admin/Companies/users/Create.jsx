import React, {Component} from 'react';
import {Row, Col, Alert} from 'antd';
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
import {addCompanyUser} from "../../../../actions/companyActions";

class Create extends Component {
  constructor() {
    super();
    this.state = {
      errors: {
        details: []
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(formData, resetForm) {
    addCompanyUser({isProviderUser: false, isClientUser: true, ...formData}).then(res => {
      if (res.status) {
        message.success("Successfully Saved");
        resetForm();
      }
    }).catch(error => {
      if (error.response.status === 403) {
        this.setState({errors: error.response.data});
      }
    })
  }

  render() {
    const {rowStyle, colStyle, gutter} = basicStyle;
    const margin = {
      margin: '0px 0px 15px 0px'
    };
    const errors = this.state.errors.details.map(error => {
      return <li>{error.message}</li>
    });
    return (

      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>
                  Create User
                </ComponentTitle>
              </TitleWrapper>
              <Row gutter={24}>
                <Col span={24}>
                  {this.state.errors.details.length ? <Alert
                    style={margin}
                    message="Validation Errors:"
                    description={
                      <ul style={{paddingLeft: '16px'}}>
                        {errors}
                      </ul>
                    }
                    type="error"
                  /> : ''}
                </Col>
              </Row>
              <UserForm submit={this.handleSubmit}/>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

export default withRouter(Create);
