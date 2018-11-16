import React, { Component } from "react";
import { Row, Col, Spin } from "antd";
import LayoutWrapper from "../../../components/utility/layoutWrapper.js";
import basicStyle from "../../../settings/basicStyle";
import { TitleWrapper, ComponentTitle } from "../crud.style";

import Box from "../../../components/utility/box";
import {
  getRoleTypes,
  addRole,
  editRole
} from "../../../helpers/http-api-client";
import RoleForm from "./partials/RoleForm";
import { message } from "antd/lib/index";
import {
  addCompany,
  addCompanyUser,
  addTeam
} from "../../../helpers/http-api-client";

export default class extends Component {
  constructor() {
    super();
    this.state = { loading: false, types: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.setState(
      {
        loading: true
      },
      () => {
        getRoleTypes({})
          .then(res => {
            if (res.status === 200) {
              const types =
                res.data && res.data.length
                  ? res.data.map(type => ({ key: type, name: type }))
                  : [];
              this.setState({ types, loading: false });
            }
          })
          .catch(errors => {
            this.setState({
              loading: false,
              errors: errors
            });
          });
      }
    );
  }

  handleSubmit(formData, resetForm) {
    this.setState({ loading: true }, () => {
      if (this.getFormMode() === "create") {
        addRole({ ...formData })
          .then(res => {
            if (res.status === 200) {
              message.success("Successfully saved.");
              resetForm();
              this.props.history.goBack();
            }
          })
          .finally(res => {
            this.setState({ loading: false });
          });
      } else {
        const { roleId } = this.props.history.location.state;
        editRole(roleId, { ...formData })
          .then(res => {
            if (res.status === 200) {
              message.success("Successfully saved.");
              resetForm();
              this.props.history.goBack();
            }
          })
          .finally(res => {
            this.setState({ loading: false });
          });
      }
    });
  }

  getFormMode() {
    const isEditKeyWordFoundInUrl = new RegExp(`roles/edit`).test(
      this.props.match.url
    );
    if (isEditKeyWordFoundInUrl) {
      return "edit";
    } else {
      return "create";
    }
  }

  renderFormTypeTitle() {
    if (this.getFormMode() === "edit") {
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
                  rowData={{ ...this.props.history.location.state }}
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
