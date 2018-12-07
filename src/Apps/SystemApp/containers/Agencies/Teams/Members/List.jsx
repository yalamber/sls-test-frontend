import React, { Component } from "react";
import { Row, Col, Icon, Spin, message } from "antd";
import { get } from 'lodash';
import LayoutWrapper from "@components/utility/layoutWrapper";
import PageHeader from "@components/utility/pageHeader";
import basicStyle from "@settings/basicStyle";
import Box from "@components/utility/box";
import ActionButtons from "./partials/ActionButtons";
import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from "@utils/crud.style";
import {
  getCompanyTeam,
  getCompanyTeamMembers,
  deleteCompanyTeamMember
} from "@helpers/http-api-client";

class MemberList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "Username",
          dataIndex: "user.username",
          key: "name",
          sorter: (a, b) => a.name >= b.name
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
            <ActionButtons
              row={row}
              history={props.history} />
          )
        }
      ],
      clientTeam: {},
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
      let clientTeam = await getCompanyTeam(this.props.match.params.teamId);
      let users = await getCompanyTeamMembers(this.props.match.params.teamId, {
        paginationOptions: this.state.paginationOptions
      });
      this.setState({
        loading: false,
        clientTeam: clientTeam,
        data: get(users, 'rows', []),
        paginationOptions: {
          ...this.state.paginationOptions,
          total: users.count
        }
      });
    } catch(e) {
      console.log(e);
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
        let users = await getCompanyTeamMembers(this.props.match.params.teamId, {
          paginationOptions: this.state.paginationOptions
        });
        this.setState({
          loading: false,
          data: get(users, 'rows', []),
          paginationOptions: {
            ...this.state.paginationOptions,
            total: users.count
          }
        });
      } catch(e) {
        this.setState({ loading: false, dataSource: [] });
      }
    });
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { match, history } = this.props;
    const { teamId, clientId } = match.params;
    return (
      <LayoutWrapper>
        <PageHeader>
          { this.state.clientTeam && this.state.clientTeam.client && this.state.clientTeam.client.name } -
           {this.state.clientTeam && this.state.clientTeam.name } - Members List
        </PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>
                  <ActionBtn
                    type="secondary"
                    onClick={() => history.goBack()}>
                    <Icon type="left" /> Go Back
                  </ActionBtn>
                </ComponentTitle>
                <ButtonHolders>
                  <ActionBtn
                    type="primary"
                    onClick={() => {
                      history.push(`/admin/agency/team/${teamId}/member/add`);
                    }}>
                    <Icon type="plus" />
                    Add team member
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <Table
                  locale={{ emptyText: "No memebrs in client team" }}
                  size="middle"
                  bordered
                  pagination={{
                    ...this.state.paginationOptions,
                    onChange: this.onTablePaginationChange
                  }}
                  columns={this.state.columns}
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

export default MemberList;