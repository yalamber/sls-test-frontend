import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Icon, Spin, message } from "antd";
import LayoutWrapper from "@components/utility/layoutWrapper";
import PageHeader from "@components/utility/pageHeader";
import basicStyle from "@settings/basicStyle";
import Box from "@components/utility/box";
import UsersActionButtons from "./partials/ActionButtons";
import * as companiesUsersListActions from "@redux/companies/users/actions";
import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from "@utils/crud.style";
import {
  getCompany,
  getCompanyUsers,
  deleteCompanyUser
} from "@helpers/http-api-client";
import { getDefaultPaginationOptions } from "@utils/default-objects";
const columns = [
  {
    title: "Name",
    dataIndex: "user.username",
    key: "name"
  },
  {
    title: "Rating",
    dataIndex: "rating",
    key: "rating"
  },
  {
    title: "Status",
    dataIndex: "user.status",
    key: "status"
  },
  {
    title: "Actions",
    key: "actions",
    render: row => <UsersActionButtons row={row} />
  }
];

class List extends Component {
  constructor() {
    super();
    this.state = {
      client: {},
      paginationOptions: getDefaultPaginationOptions().paginationOptions
    };
    this.onTablePaginationChange = this.onTablePaginationChange.bind(this);
  }

  componentDidMount() {
    const { clientId } = this.props.match.params;
    this.props.actions.companiesUsersListDidMount({ clientId });
  }

  onTablePaginationChange(page, pageSize) {
    const { clientId } = this.props.match.params;
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
        this.props.actions.companiesUsersListFetch({
          paginationOptions,
          clientId
        });
      }
    );
  }

  getPaginationOptions() {
    const { count } = this.props.CompanyUsers;
    return { ...this.state.paginationOptions, total: count };
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { rows, loading } = this.props.CompanyUsers;

    return (
      <LayoutWrapper>
        <PageHeader>
          Company -> {this.state.client.name} -> Users List
        </PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>
                  <ActionBtn
                    type="secondary"
                    onClick={() => this.props.history.goBack()}
                  >
                    <Icon type="left" /> Go Back
                  </ActionBtn>
                </ComponentTitle>
                <ButtonHolders>
                  <ActionBtn
                    type="primary"
                    onClick={() => {
                      this.props.history.push(
                        `/client/user/create/${
                          this.state.client.clientId
                        }`
                      );
                    }}
                  >
                    <Icon type="plus" />
                    Add new User
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              <Spin spinning={loading}>
                <Table
                  locale={{ emptyText: "No users in client" }}
                  size="middle"
                  bordered
                  pagination={{
                    ...this.getPaginationOptions(),
                    onChange: this.onTablePaginationChange
                  }}
                  columns={columns}
                  onRow={row => ({
                    onDoubleClick: () => {
                      this.props.history.push({
                        pathname: `/dashboard/client/user/${
                          this.props.match.params.clientId
                        }/edit/${row.userId}`,
                        state: {
                          ...row
                        }
                      });
                    }
                  })}
                  dataSource={rows}
                  rowKey="userId"
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
    Companies: state.Companies,
    CompanyUsers: state.CompanyUsers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: { ...bindActionCreators(companiesUsersListActions, dispatch) }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
