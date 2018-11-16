import React, { Component } from "react";
import { Row, Col, Icon, message, Spin } from "antd";
import LayoutWrapper from "../../../../components/utility/layoutWrapper.js";
import PageHeader from "../../../../components/utility/pageHeader";
import { withRouter } from "react-router-dom";

import basicStyle from "../../../../settings/basicStyle";
import {
  TitleWrapper,
  ComponentTitle,
  TableClickable as Table,
  ButtonHolders,
  ActionBtn
} from "../../crud.style";

import Box from "../../../../components/utility/box";
import TeamActionButtons from "../teams/partials/ActionButtons";
import {
  deleteCompanyTeam,
  getCompany,
  getCompanyTeams
} from "../../../../helpers/http-api-client";

class CompanyTeams extends Component {
  constructor() {
    super();
    this.state = {
      teamColumns: [
        {
          title: "Teams",
          dataIndex: "name",
          key: "name",
          sorter: (a, b) => a.name >= b.name,
          render: text => (
            <p>
              <Icon type="team" /> {text}
            </p>
          )
        },
        {
          title: "Team Admin",
          dataIndex: "teamAdmin",
          key: "teamAdmin",
          sorter: (a, b) => a.teamAdmin >= b.teamAdmin,
          render: text => (
            <p>
              <Icon type="team" /> {text}
            </p>
          )
        },
        {
          title: "Rating",
          dataIndex: "teamRating",
          key: "teamRating",
          sorter: (a, b) => a.teamRating >= b.teamRating,
          render: text => (
            <p>
              <Icon type="team" /> {text}
            </p>
          )
        },
        {
          title: "Actions",
          key: "actions",
          render: row => <TeamActionButtons row={row} info={this.handleInfo} />
        }
      ],
      data: [],
      paginationOptions: {
        defaultCurrent: 1,
        current: 1,
        pageSize: 5,
        total: 1
      },
      company: null,
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
    try {
      this.setState({ loading: true });
      let company = await getCompany(this.props.match.params.companyId);
      let teams = await getCompanyTeams({
        query: {
          clientId: this.props.match.params.companyId
        },
        paginationOptions: this.state.paginationOptions
      });
      this.setState({
        company: company.data,
        data: teams.data.rows,
        paginationOptions: {
          ...this.state.paginationOptions,
          total: teams.data.count
        },
        loading: false
      });
    } catch (e) {
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
        try {
          let teams = await getCompanyTeams({
            query: {
              companyId: this.props.match.params.companyId
            },
            paginationOptions: this.state.paginationOptions
          });
          this.setState({
            loading: false,
            data: teams.data.rows,
            paginationOptions: {
              ...this.state.paginationOptions,
              total: teams.data.count
            }
          });
        } catch (e) {
          this.setState({ loading: false, data: [] });
        }
      }
    );
  }

  async handleDelete(row) {
    try {
      let deleteCompanyTeam = await deleteCompanyTeam(row.teamId);
      message.success("Successfully Deleted.");
      this.fetchData();
    } catch (e) {
      //TODO: show msg
    }
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const margin = {
      margin: "10px 20px 18px 10px"
    };
    return (
      <LayoutWrapper>
        <PageHeader>
          {this.state.company ? this.state.company.name : ""} Teams
        </PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <Spin spinning={this.state.loading}>
                <TitleWrapper style={margin}>
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
                          {
                            pathname: `/dashboard/company/team/${
                              this.props.match.params.companyId
                            }/create`
                          },
                          {
                            ...this.props.location.state
                          }
                        );
                      }}
                    >
                      <Icon type="usergroup-add" />
                      Add Team
                    </ActionBtn>
                  </ButtonHolders>
                </TitleWrapper>
                <Col md={24} sm={24} xs={24}>
                  <Table
                    pagination={{
                      ...this.state.paginationOptions,
                      onChange: this.onTablePaginationChange
                    }}
                    size="middle"
                    style={margin}
                    columns={this.state.teamColumns}
                    dataSource={this.state.data}
                    rowKey="teamId"
                    onRow={record => {
                      return {
                        onDoubleClick: e => {
                          this.props.history.push(
                            `/dashboard/company/teams/${
                              record.clientTeamId
                            }/members`
                          );
                        }
                      };
                    }}
                    bordered
                  />
                </Col>
              </Spin>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

export default withRouter(CompanyTeams);
