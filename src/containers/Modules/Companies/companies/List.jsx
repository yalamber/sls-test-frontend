import React, { Component } from "react";
import { Row, Col, Icon, message, Spin } from "antd";
import LayoutWrapper from "../../../../components/utility/layoutWrapper.js";
import PageHeader from "../../../../components/utility/pageHeader";
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
import {
  deleteCompany,
  getCompanies
} from "../../../../helpers/http-api-client";

export default class extends Component {
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
          title: "Actions",
          key: "actions",
          render: row => <ActionButtons row={row} delete={this.handleDelete} />
        }
      ],
      data: [],
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

  async fetchData() {
    try{
      this.setState({ loading: true });
      let companies = await getCompanies({
        paginationOptions: this.state.paginationOptions
      });
      this.setState({
        loading: false,
        data: companies.data.rows,
        paginationOptions: {
          ...this.state.paginationOptions,
          total: companies.data.count
        }
      });
    } catch(e) {
      message.error("Something went wrong.");
      this.setState({ loading: false });
    }
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
      async () => {
        try{
          let companies = await getCompanies({
            paginationOptions: this.state.paginationOptions
          });
          this.setState({
            loading: false,
            data: companies.data.rows,
            paginationOptions: {
              ...this.state.paginationOptions,
              total: companies.data.count
            }
          });
        } catch(e) {
          this.setState({ loading: false, data: [] });
        }
      }
    );
  }

  handleDelete(row) {
    deleteCompany(row.clientId).then(res => {
      message.success("Successfully Deleted.");
      this.fetchData();
    });
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    return (
      <LayoutWrapper>
        <PageHeader>
           Companies
        </PageHeader>
          
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle></ComponentTitle>
                <ButtonHolders>
                  <ActionBtn
                    type="primary"
                    onClick={() => {
                      this.props.history.push("create")
                    }}
                  >
                    <Icon type="plus" />
                    Add Company
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <Table
                  pagination={{
                    ...this.state.paginationOptions,
                    onChange: this.onTablePaginationChange
                  }}
                  rowKey="clientId"
                  columns={this.state.columns}
                  dataSource={this.state.data}
                  onRow={row => ({
                    onDoubleClick: () => {
                      // this.props.history.push('details/' + row.clientId)
                      //this.props.history.push(`details/${row.clientId}`);
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
