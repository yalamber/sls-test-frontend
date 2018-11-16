import React, { Component } from "react";
import { Row, Col, Icon, Spin, message } from "antd";
import LayoutWrapper from "../../../../components/utility/layoutWrapper.js";
import PageHeader from "../../../../components/utility/pageHeader";
import basicStyle from "../../../../settings/basicStyle";
import Box from "../../../../components/utility/box";
import UsersActionButtons from "../users/partials/ActionButtons";
import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from "../../crud.style";
import {
  getAgencyTeam,
  getAgencyTeamMembers
} from "../../../../helpers/http-api-client";

export default class extends Component {
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
          dataIndex: "status",
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
      agency: {},
      agencyTeam: {},
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
    this.onTablePaginationChange = this.onTablePaginationChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    this.setState({ loading: true });
    try {
      let agencyTeam = await getAgencyTeam(this.props.match.params.teamId);
      let users = await getAgencyTeamMembers(this.props.match.params.teamId, {
        paginationOptions: this.state.paginationOptions
      });
      this.setState({
        loading: false,
        agencyTeam: agencyTeam.data,
        data: users.data.rows,
        paginationOptions: {
          ...this.state.paginationOptions,
          total: users.data.count
        }
      });
    } catch(e) {
      message.error("Problem occured.");
      this.setState({ loading: false });
    }
  }

  async onTablePaginationChange(page, pageSize) {
    this.setState({
      loading: true,
      paginationOptions: {
        ...this.state.paginationOptions,
        current: page,
        pageSize
      }
    }, async () => {
      try{
        let users = await getAgencyTeamMembers(this.props.match.params.teamId, {
          paginationOptions: this.state.paginationOptions
        });
        this.setState({
          loading: false,
          data: users.data.rows,
          paginationOptions: {
            ...this.state.paginationOptions,
            total: users.data.count
          }
        });
      } catch(e) {
        this.setState({ loading: false, data: [] });
      }
    });
  }

  render() {
    const margin = {
      margin: "5px 5px 10px 0px"
    };
    const { rowStyle, colStyle, gutter } = basicStyle;
    return (
      <LayoutWrapper>
        <PageHeader>
          Agency -> {
            this.state.agencyTeam && this.state.agencyTeam.client && this.state.agencyTeam.client.name
          } -> {this.state.agencyTeam && this.state.agencyTeam.name } -> Members List
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
                      this.props.history.push("/dashboard/agency/user/create");
                    }}
                  >
                    <Icon type="plus" />
                    Add new User
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <Table
                  locale={{ emptyText: "No users in agency team" }}
                  size="middle"
                  bordered
                  pagination={{
                    ...this.state.paginationOptions,
                    onChange: this.onTablePaginationChange
                  }}
                  columns={this.state.columns}
                  onRow={row => ({
                    onDoubleClick: () => {
                      this.props.history.push({
                        pathname: `/dashboard/agency/user/${
                          this.props.match.params.agencyId
                        }/edit/${row.userId}`,
                        state: {
                          row
                        }
                      });
                    }
                  })}
                  dataSource={this.state.data}
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
