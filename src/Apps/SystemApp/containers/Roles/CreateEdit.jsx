import React, { Component } from "react";
import { Row, Col, Spin, message } from "antd";
import { get } from 'lodash';
import LayoutWrapper from "@components/utility/layoutWrapper";
import basicStyle from "@settings/basicStyle";
import { TitleWrapper, ComponentTitle } from "@utils/crud.style";
import Box from "@components/utility/box";
import SWQAClient from '@helpers/apiClient';
import RoleForm from "./partials/RoleForm";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loading: false, 
      role: null,
      types: [], 
      error: null 
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.mode = props.match.params.roleId ? 'edit': 'add';
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try{
      this.setState({
        loading: true
      });
      let role = null;
      let roleTypes = await SWQAClient.getRoleTypes();
      let types = roleTypes.map((roleType) => ({ key: roleType, name: roleType }));
      if(this.mode === 'edit') {
        role = await SWQAClient.getRole(this.props.match.params.roleId);
      } 
      console.log(role);
      this.setState({
        role,
        types
      });
      
    } catch(e) {
      this.setState({
        error: e
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  }

  async handleSubmit(formData, resetForm) {
    try{
      this.setState({loading: true});
      if(this.mode === 'add') {  
        await SWQAClient.createRole(formData);
        message.success("Successfully created.");
        this.props.history.goBack();
      } else {
        await SWQAClient.updateRole(this.props.match.params.roleId, formData); 
        message.success("Successfully updated.");
      }
    } catch(e) {

    } finally {
      this.setState({ loading: false });
    }
  }

  renderFormTypeTitle() {
    if (this.mode === "edit") {
      return (
        <TitleWrapper>
          <ComponentTitle>Edit Role - {get(this.state, 'role.title', '')}</ComponentTitle>
        </TitleWrapper>
      );
    }

    return (
      <TitleWrapper>
        <ComponentTitle>Create New Role</ComponentTitle>
      </TitleWrapper>
    );
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              {this.renderFormTypeTitle()}
              <Spin spinning={this.state.loading}>
                <RoleForm
                  submit={this.handleSubmit}
                  roleData={this.state.role}
                  types={this.state.types}
                />
              </Spin>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
