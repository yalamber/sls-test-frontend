import React, { Component } from "react";
import { message } from "antd";
import { get } from 'lodash';
import ActionButtons from "./partials/ActionButtons";
import List from '@appComponents/Common/List';
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
        pageSize: 10,
        total: 1
      },
      loading: false
    };
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
    const { match, history } = this.props;
    const { teamId } = match.params;
    return (
      <List {...this.props} 
        onTablePaginationChange={this.onTablePaginationChange} 
        onTableRow={(row) => ({
          onDoubleClick: () => {
            history.push(`/my-agency/team/${row.teamId}/member/${row.userId}/details`);
          }
        })}
        loading={this.state.loading}
        title="Members"
        pageHeader={[`Team - ${ get(this.state, 'team.name', '') }`]}
        columns={this.columns}
        createLink={`/my-agency/team/${teamId}/member/add`}
        createText="Add Team Member"
        data={this.state.data}
        paginationOptions={this.state.paginationOptions}
        rowKey="userId" />
    );
  }
}

export default MemberList;