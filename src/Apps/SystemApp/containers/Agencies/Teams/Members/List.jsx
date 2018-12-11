import React, { Component } from "react";
import { Row, Col, Icon, Spin, message } from "antd";
import { get } from 'lodash';
import LayoutWrapper from "@components/utility/layoutWrapper";
import PageHeader from "@components/utility/pageHeader";
import IntlMessages from "@components/utility/intlMessages";
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
import SWQAClient from '@helpers/apiClient';

class MemberList extends Component {
  constructor(props) {
    super(props);
    //initial state
    this.state = {
      team: {},
      data: [],
      paginationOptions: {
        defaultCurrent: 1,
        current: 1,
        pageSize: 1,
        total: 1
      },
      loading: false
    };
    //
    this.fetchData = this.fetchData.bind(this);
    this.onTablePaginationChange = this.onTablePaginationChange.bind(this);
    this.columns = [
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
    ];
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const { match } = this.props;
      this.setState({ loading: true });
      let team = await SWQAClient.getAgencyTeam(match.params.teamId);
      let users = await SWQAClient.getAgencyTeamMembers(match.params.teamId, {
        limit: this.state.paginationOptions.pageSize,
      });
      this.setState({
        loading: false,
        team,
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
        let offset = pageSize * (page - 1);
        let users = await SWQAClient.getAgencyTeamMembers(this.props.match.params.teamId, {
          limit: pageSize,
          offset
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
    const { teamId } = match.params;
    return (
      <LayoutWrapper>
        <PageHeader>
          Agency - { get(this.state, 'team.agency.name', '') }
          <br />
          Team - { get(this.state, 'team.name', '') }
        </PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>
                  <ActionBtn
                    type="secondary"
                    onClick={() => history.goBack()}>
                    <Icon type="left" /> <IntlMessages id="back" />
                  </ActionBtn> Members
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
                  locale={{ emptyText: "No memebrs in agency team" }}
                  size="middle"
                  bordered
                  pagination={{
                    ...this.state.paginationOptions,
                    onChange: this.onTablePaginationChange
                  }}
                  columns={this.columns}
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