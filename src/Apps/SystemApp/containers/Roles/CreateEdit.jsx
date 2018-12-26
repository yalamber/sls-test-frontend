import React, { Component } from "react";
import { Row, Col, Spin, message } from "antd";
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
    this.mode = props.match.roleId ? 'edit': 'add';
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try{
      this.setState({
        loading: true
      });
      let roleTypes = await SWQAClient.getRoleTypes();
      let types = roleTypes.map((roleType) => ({ key: roleType, name: roleType }));
      if(this.mode === 'edit') {
        let role = await SWQAClient.getRole(this.props.match.params.roleId);
        this.setState({
          role,
          types
        });
      } else {  
        this.setState({
          types
        });
      }
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
      if(this.mode == 'add') {  
        let role = await SWQAClient.createRole(formData);
        message.success("Successfully created.");
        this.props.history.goBack();
      } else {
        let role = await SWQAClient.updateRole(this.props.match.params.roleId, formData); 
        message.success("Successfully updated.");
      }
    } catch(e) {

    } finally {
      this.setState({ loading: false });
    }
  }

  renderFormTypeTitle() {
    if (this.mode === "edit") {
      const { title } = this.props.location.state;

      return (
        <TitleWrapper>
          <ComponentTitle>Edit Role - {title}</ComponentTitle>
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
                  rowData={this.state.role}
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
