import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Row, Col, Icon, message, Spin } from "antd";
import LayoutWrapper from "../../../../components/utility/layoutWrapper.js";
import PageHeader from "../../../../components/utility/pageHeader";
import basicStyle from "../../../../settings/basicStyle";
import Box from "../../../../components/utility/box";
import ActionButtons from "./partials/ActionButtons";
import * as companiesListActions from "../../../../redux/companies/actions";
import TestManagerActionButtons from "../TestManager/partials/ActionButtons";

import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from "../../crud.style";
import {
  deleteCompany
} from "../../../../helpers/http-api-client";
import { getDefaultPaginationOptions } from '../../../../util/default-objects';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "Name",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "Company Admin",
          dataIndex: "owner.username",
          key: "company_admin"
        },
        {
          title: "Company Admin Email",
          dataIndex: "owner.contactInformation.emailAddress",
          key: "company_admin_email"
        },
        {
          title: "Location",
          dataIndex: "location",
          key: "location"
        },
        {
          title: "Test Manager Actions",
          key: "testManagerActions",
          render: row => <TestManagerActionButtons row={row} />
        },
        {
          title: "Actions",
          key: "actions",
          render: row => <ActionButtons row={row} delete={this.handleDelete} />
        }
      ],
      paginationOptions: getDefaultPaginationOptions().paginationOptions
    };
    // this.fetchData = this.fetchData.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onTablePaginationChange = this.onTablePaginationChange.bind(this);
  }

  componentDidMount() {
    this.props.actions.companiesListDidMount();
  }

  onTablePaginationChange(page, pageSize) {
    this.setState(
      {
        paginationOptions: {
          ...this.state.paginationOptions,
          current: page,
          pageSize
        }
      }, () => {
        const { paginationOptions } = this.state;
        this.props.actions.companiesListFetch({ paginationOptions });
      }
    );
  }

  handleDelete(row) {
    deleteCompany(row.clientId).then(res => {
      message.success("Successfully Deleted.");
      // this.fetchData();
    });
  }

  getPaginationOptions() {
    const { count } = this.props.Companies;
    return { ...this.state.paginationOptions, total: count };
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { rows, loading } = this.props.Companies;

    return (
      <LayoutWrapper>
        <PageHeader>Companies</PageHeader>

        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle />
                <ButtonHolders>
                  <ActionBtn
                    type="primary"
                    onClick={() => {
                      this.props.history.push("create");
                    }}
                  >
                    <Icon type="plus" />
                    Add Company
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              <Spin spinning={loading}>
                <Table
                  pagination={{
                    ...this.getPaginationOptions(),
                    onChange: this.onTablePaginationChange
                  }}
                  rowKey="clientId"
                  columns={this.state.columns}
                  dataSource={rows}
                  onRow={row => ({
                    onDoubleClick: () => {
                      // this.props.history.push('details/' + row.clientId)
                      // this.props.history.push(`details/${row.clientId}`);
                    }
                  })}
                />
              </Spin>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(companiesListActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(List);
