import React, { Component } from "react";
import { connect } from "react-redux";
import { message } from "antd";
import { push, goBack } from 'connected-react-router';
import { get } from 'lodash';
import qs from 'qs';
import SWQAClient from '@helpers/apiClient';
import ActionButtons from "./partials/ActionButtons";
import List from '@appComponents/Common/List';

class MemberList extends Component {
  state = {
    team: {},
    data: [],
    error: null,
    loading: false,
    limit: 10,
    totalCount: 0,
    currentPage: 1,
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

  deleteMember = async (teamId, userId) => {
    try {
      await SWQAClient.deleteClientTeamMember(teamId, userId);
      message.success('Member Removed from Team');
      await this.fetchData(this.getPagefromLocation(this.props.search));
      if(this.state.data.length === 0) {
        let page = this.state.currentPage-1;
        if(page > 0) {
          this.pushPage(page);
        }
      }
    } catch (e) {
      console.log(e);
      message.error("Problem occured.");
    }
  }

  fetchData = async (page) => {
    try {
      const { match } = this.props;
      this.setState({ loading: true });
      let team = await SWQAClient.getClientTeam(match.params.teamId);
      let teamMemberData = await SWQAClient.getClientTeamMembers(match.params.teamId, {
        limit: this.state.limit,
        offset: (this.state.limit * page) - this.state.limit
      });
      this.setState({
        loading: false,
        team,
        data: teamMemberData.rows,
        totalCount: teamMemberData.count,
        currentPage: page
      });
    } catch (e) {
      message.error('Something went wrong!');
      this.setState({ loading: false });
    }
  }

  componentDidMount() {
    const { location } = this.props;
    let currentPage = this.getPagefromLocation(location.search);
    this.fetchData(currentPage);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.search !== prevProps.search) {
      let currentPage = this.getPagefromLocation(this.props.search);
      this.fetchData(currentPage);
    }
  }

  getPagefromLocation = (search) => {
    let queryParams = qs.parse(search, { ignoreQueryPrefix: true });
    return queryParams.page ? Number(queryParams.page) : 1;
  }

  pushPage = (page) => this.props.push(`/my-client/team/${this.props.match.params.teamId}/members?page=${page}`);

  render() {
    const { match, push } = this.props;
    const { teamId } = match.params;
    return (
      <List {...this.props}
        onTableRow={(row) => ({
          onDoubleClick: () => push(`/my-client/team/${row.teamId}/member/${row.userId}/details`)
        })}
        loading={this.state.loading}
        title="Members"
        pageHeader={[`Team - ${get(this.state, 'team.name', '')}`]}
        columns={this.columns}
        createLink={`/my-client/team/${teamId}/member/add`}
        createText="Add Team Member"
        data={this.state.data}
        paginationOptions={{
          total: this.state.totalCount,
          pageSize: this.state.limit,
          current: this.state.currentPage,
          onChange: this.pushPage
        }}
        rowKey="userId" />
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  search: state.router.location.search,
  hash: state.router.location.hash,
});

export default connect(
  mapStateToProps,
  {
    goBack,
    push
  }
)(MemberList);

