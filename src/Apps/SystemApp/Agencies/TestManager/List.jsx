import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Icon, message, Spin } from "antd";
import LayoutWrapper from "@components/utility/layoutWrapper.js";
import basicStyle from "@settings/basicStyle";
import Box from "@components/utility/box";
import ActionButtons from "./partials/ActionButtons";

import * as agenciesTestManagerListActions from "@redux/agencies/test-manager/actions";
import * as agenciesListActions from "@redux/agencies/actions";
import { getDefaultPaginationOptions } from "@util/default-objects";
import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from "@utils/crud.style";

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
          title: "Agency Admin",
          dataIndex: "owner.username",
          key: "agency_admin",
          sorter: true
        },
        {
          title: "Agency Admin Email",
          dataIndex: "owner.contactInformation.emailAddress",
          key: "agency_admin_email",
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
    this.handleDelete = this.handleDelete.bind(this);
    this.onTablePaginationChange = this.onTablePaginationChange.bind(this);
  }

  componentDidMount() {
    this.props.actions.agenciesTestManagerListDidMount();
  }

  onTablePaginationChange(page, pageSize) {
    this.setState(
      {
        paginationOptions: {
          ...this.state.paginationOptions,
          current: page,
          pageSize
        }
      },
      () => {
        const { paginationOptions } = this.state;
        this.props.actions.agenciesListFetch({ paginationOptions });
      }
    );
  }

  handleDelete(row) {}

  getPaginationOptions() {
    const { count } = this.props.Agencies;
    return { ...this.state.paginationOptions, total: count };
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { rows, loading } = this.props.Agencies;

    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Agency Testing Manager</ComponentTitle>
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
      { ...agenciesTestManagerListActions, ...agenciesListActions },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
