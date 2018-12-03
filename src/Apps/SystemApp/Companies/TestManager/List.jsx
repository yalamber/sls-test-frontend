import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Icon, message, Spin } from "antd";
import LayoutWrapper from "@components/utility/layoutWrapper";
import basicStyle from "@settings/basicStyle";
import Box from "@components/utility/box";
import ActionButtons from "./partials/ActionButtons";
import * as companiesTestManagerListActions from "@redux/companies/test-manager/actions";
import * as companiesListActions from "@redux/companies/actions";
import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from "@utils/crud.style";
import {
  deleteCompany
} from "@helpers/http-api-client";

import { getDefaultPaginationOptions } from '@utils/default-objects';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          sorter: true
        },
        {
          title: "Company Admin",
          dataIndex: "owner.username",
          key: "company_admin",
          sorter: true
        },
        {
          title: "Company Admin Email",
          dataIndex: "owner.contactInformation.emailAddress",
          key: "company_admin_email",
          sorter: true
        },
        {
          title: "Location",
          dataIndex: "location",
          key: "location",
          sorter: true
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
    this.props.actions.companiesTestManagerListDidMount();
  }

  // fetchData() {
  //   this.setState({ loading: true });
  //   getCompanies({
  //     paginationOptions: this.state.paginationOptions
  //   }).then(res => {
  //     this.setState({
  //       dataSource: res.data.rows,
  //       loading: false,
  //       paginationOptions: {
  //         ...this.state.paginationOptions,
  //         total: res.data.count
  //       }
  //     });
  //   });
  // }

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
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Testing Manager</ComponentTitle>
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
                      this.props.history.push(`details/${row.clientId}`);
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

const mapStateToProps = state => {
  return {
    ...state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      { ...companiesTestManagerListActions, ...companiesListActions },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
