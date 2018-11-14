import React, { Component } from "react";
import { Row, Col, Icon, message, Spin } from "antd";
import LayoutWrapper from "../../../../components/utility/layoutWrapper.js";
import basicStyle from "../../../../settings/basicStyle";
import Box from "../../../../components/utility/box";
import ActionButtons from "./partials/ActionButtons";

import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from "../../crud.style";
import { getAgency } from "../../../../helpers/http-api-client";

export default class extends Component {
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
      dataSource: [],
      paginationOptions: {
        defaultCurrent: 1,
        current: 1,
        pageSize: 5,
        total: 1
      },
      loading: false
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onTablePaginationChange = this.onTablePaginationChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.setState({ loading: true });
    getAgency({
      paginationOptions: this.state.paginationOptions
    }).then(res => {
      this.setState({
        dataSource: res.data.rows,
        loading: false,
        paginationOptions: {
          ...this.state.paginationOptions,
          total: res.data.count
        }
      });
    });
  }

  onTablePaginationChange(page, pageSize) {
    this.setState(
      {
        loading: true,
        paginationOptions: {
          ...this.state.paginationOptions,
          current: page,
          pageSize
        }
      },
      () => {
        getAgency({
          paginationOptions: this.state.paginationOptions
        })
          .then(agencies => {
            this.setState({
              loading: false,
              dataSource: agencies.data.rows,
              paginationOptions: {
                ...this.state.paginationOptions,
                total: agencies.data.count
              }
            });
          })
          .catch(agencies => {
            this.setState({ loading: false, dataSource: [] });
          });
      }
    );
  }

  handleDelete(row) {
    // deleteCompany(row.clientId).then(res => {
    //   message.success("Successfully Deleted.");
    //   this.fetchData();
    // });
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Agency Testing Manager</ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <Table
                  pagination={{
                    ...this.state.paginationOptions,
                    onChange: this.onTablePaginationChange
                  }}
                  rowKey="clientId"
                  columns={this.state.columns}
                  dataSource={this.state.dataSource}
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
