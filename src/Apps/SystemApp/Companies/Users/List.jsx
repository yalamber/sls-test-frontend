import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Icon, Spin, message } from "antd";
import LayoutWrapper from "@components/utility/layoutWrapper.js";
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

class List extends Component {
  constructor() {
    super();
    this.state = {
      columns: [
        {
          title: "Name",
          dataIndex: "user.username",
          key: "name",
          sorter: (a, b) => a.name >= b.name
        },
        {
          title: "Rating",
          dataIndex: "rating",
          key: "rating",
          sorter: (a, b) => a.rating >= b.rating
        },
        {
          title: "Status",
          dataIndex: "user.status",
          key: "status",
          sorter: (a, b) => a.status >= b.status
        },
        {
          title: "Actions",
          key: "actions",
          render: row => (
            <UsersActionButtons
              selectedTeam={this.state.selectedTeam}
              row={row}
              info={this.handleInfo}
            />
          )
        }
      ],
      company: {},
      paginationOptions: getDefaultPaginationOptions().paginationOptions
    };
    // this.fetchData = this.fetchData.bind(this);
    this.onTablePaginationChange = this.onTablePaginationChange.bind(this);
  }

  componentDidMount() {
    const { companyId } = this.props.match.params;
    this.props.actions.companiesUsersListDidMount({ companyId });
  }

  // async fetchData() {
  //   this.setState({ loading: true });
  //   try {
  //     let company = await getCompany(this.props.match.params.companyId);
  //     let users = await getCompanyUsers(this.props.match.params.companyId, {
  //       paginationOptions: this.state.paginationOptions
  //     });
  //     this.setState({
  //       loading: false,
  //       company: company.data,
  //       data: users.data.rows,
  //       paginationOptions: {
  //         ...this.state.paginationOptions,
  //         total: users.data.count
  //       }
  //     });
  //   } catch (e) {
  //     message.error("Problem occured.");
  //     this.setState({ loading: false });
  //   }
  // }

  onTablePaginationChange(page, pageSize) {
    const { companyId } = this.props.match.params;
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
          companyId
        });
      }
    );
  }

  getPaginationOptions() {
    const { count } = this.props.CompanyUsers;
    return { ...this.state.paginationOptions, total: count };
  }

  render() {
    const margin = {
      margin: "5px 5px 10px 0px"
    };

    const { rowStyle, colStyle, gutter } = basicStyle;
    const { rows, loading } = this.props.CompanyUsers;

    return (
      <LayoutWrapper>
        <PageHeader>
          Company -> {this.state.company.name} -> Users List
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
                    <Icon type="left" />Go Back
                  </ActionBtn>
                </ComponentTitle>
                <ButtonHolders>
                  <ActionBtn
                    type="primary"
                    onClick={() => {
                      this.props.history.push(
                        `/dashboard/company/user/create/${
                          this.state.company.clientId
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
                  locale={{ emptyText: "No users in company" }}
                  size="middle"
                  bordered
                  pagination={{
                    ...this.getPaginationOptions(),
                    onChange: this.onTablePaginationChange
                  }}
                  columns={this.state.columns}
                  onRow={row => ({
                    onDoubleClick: () => {
                      this.props.history.push({
                        pathname: `/dashboard/company/user/${
                          this.props.match.params.companyId
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
