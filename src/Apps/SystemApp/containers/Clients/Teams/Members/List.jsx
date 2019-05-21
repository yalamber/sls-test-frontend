import React, { Component } from "react";
import { connect } from "react-redux";
import { push, goBack } from 'connected-react-router';
import { get } from 'lodash';
import qs from 'qs';
import { message } from 'antd';
import List from '@appComponents/Common/List';
import ActionButtons from "./partials/ActionButtons";
import SWQAClient from "@helpers/apiClient";

class MemberList extends Component {
  state = {
    loading: false,
    team: {},
    data: [],
    limit: 10,
    totalCount: 0,
    currentPage: 1
  };

  columns = [
    {
      title: "Username",
      dataIndex: "user.username",
      key: "name",
      sorter: (a, b) => a.name >= b.name
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
        <ActionButtons
          row={row}
          push={this.props.push}
          deleteMember={() => this.deleteMember(this.props.match.params.teamId, row.user.userId)} />
      )
    }
  ];

  componentDidMount() {
    const { match, location } = this.props;
    let currentPage = this.getPagefromLocation(location.search);
    this.fetchData(match.params.teamId, currentPage);
  }

  fetchData = async (teamId, page) => {
    try {
      const { match } = this.props;
      this.setState({ loading: true });
      let team = await SWQAClient.getClientTeam(match.params.teamId);
      let userData = await SWQAClient.getClientTeamMembers(match.params.teamId, {
        offset: (this.state.limit * page) - this.state.limit,
        limit: this.state.limit
      });
      this.setState({
        loading: false,
        team,
        users: userData.rows,
        totalCount: userData.count,
        currentPage: page
      });
    } catch (e) {
      console.log(e);
      message.error("Problem occured.");
      this.setState({ loading: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.search !== prevProps.search) {
      let currentPage = this.getPagefromLocation(this.props.search);
      this.fetchData(this.props.match.params.teamId, currentPage);
    }
  }

  getPagefromLocation(search) {
    let queryParams = qs.parse(search, { ignoreQueryPrefix: true });
    return queryParams.page ? Number(queryParams.page) : 1;
  }

  deleteMember = async (teamId, userId) => {
    try {
      await SWQAClient.deleteClientTeamMember(teamId, userId);
      message.success('Member Removed from Team');
      this.fetchData(teamId, this.state.currentPage);
    } catch (e) {
      console.log(e);
      message.error("Problem occured.");
    }
  }

  render() {
    const { match, push } = this.props;
    const { teamId } = match.params;
    return (
      <List {...this.props}
        onTableRow={(row) => ({
          onDoubleClick: () => push(`/admin/client/team/${row.teamId}/member/${row.userId}/details`)
        })}
        loading={this.state.loading}
        title="Members"
        pageHeader={!this.state.loading && [`Client - ${ get(this.state, 'team.client.name', '') }`, <br key="0" />, `Team - ${ get(this.state, 'team.name', '') }`]}
        columns={this.columns}
        createLink={`/admin/client/team/${teamId}/member/add`}
        createText="Add Team Member"
        data={this.state.users}
        paginationOptions={{
          total: this.state.totalCount,
          pageSize: this.state.limit,
          current: this.state.currentPage,
          onChange: (page) => push(`/admin/client/team/${match.params.teamId}/members?page=${page}`)
        }}
        rowKey="userId" />
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  search: state.router.location.search,
  hash: state.router.location.hash,
})

export default connect(
  mapStateToProps,
  {
    goBack,
    push
  }
)(MemberList);
