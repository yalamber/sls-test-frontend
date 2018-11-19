import React, { Component } from "react";
import { Row, Col, Spin } from "antd";
import { withRouter } from "react-router-dom";
import LayoutWrapper from "../../../../components/utility/layoutWrapper.js";
import PageHeader from "../../../../components/utility/pageHeader";
import basicStyle from "../../../../settings/basicStyle";
import { getErrorDataFromApiResponseError } from "../../../../util/response-message";
import { TitleWrapper, ComponentTitle } from "../../crud.style";
import _ from "lodash";
import Box from "../../../../components/utility/box";
import UserForm from "../users/partials/UserForm";
import { message } from "antd/lib/index";
import {
  getCompany,
  addCompanyUser
} from "../../../../helpers/http-api-client";

class Create extends Component {
  constructor() {
    super();
    this.state = {
      company: {},
      errors: {
        details: []
      },
      loading: false
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchData();  
  }

  async fetchData() {
    this.setState({ loading: true });
    try {
      let company = await getCompany(this.props.match.params.companyId);
      this.setState({
        loading: false,
        company: company.data
      });
    } catch(e) {
      message.error("Problem occured.");
      this.setState({ loading: false });
    }
  }

  async handleSubmit(formData, resetForm) {
    try {
      this.setState({ loading: true });
      const teamIds = formData.clientTeams;
      console.log(formData);
      formData = _.omit(formData, "company");
      formData = _.omit(formData, "clientTeams");
      return;
      let companyUser = await addCompanyUser({ ...formData });
      if (companyUser.status) {
        message.success("Successfully Saved");
        resetForm();
        this.setState({ errors: { details: [] } });
        this.props.history.goBack();
      }
    } catch(error) {
      this.setState({ errors: getErrorDataFromApiResponseError(error) });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    return (
      <LayoutWrapper>
        <PageHeader>
          Company -> {this.state.company.name}
        </PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Create User</ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <UserForm
                  relId={this.state.company.clientId}
                  userType="clientUser"
                  submit={this.handleSubmit}
                  errors={this.state.errors}
                />
              </Spin>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

export default withRouter(Create);
