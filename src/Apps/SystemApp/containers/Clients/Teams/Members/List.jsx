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
        pageSize: 1,
        total: 1
      },
      loading: false
    };
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
            history={props.history}
            deleteMember={() => {
              alert('Not implemented yet');
            }} />
        )
      }
    ];
  }

  fetchData = async () => {
    try {
      const { match } = this.props;
      this.setState({ loading: true });
      let team = await SWQAClient.getClientTeam(match.params.teamId);
      let users = await SWQAClient.getClientTeamMembers(match.params.teamId, {
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

  onTablePaginationChange = async (page, pageSize) => {
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
        let users = await SWQAClient.getClientTeamMembers(this.props.match.params.teamId, {
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

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { match, history } = this.props;
    const { teamId } = match.params;
    return (
      <List {...this.props}
        onTablePaginationChange={this.onTablePaginationChange}
        onTableRow={(row) => ({
          onDoubleClick: () => {
            history.push(`/admin/client/team/${row.teamId}/member/${row.userId}/details`);
          }
        })}
        loading={this.state.loading}
        title="Members"
        pageHeader={[`Client - ${ get(this.state, 'team.client.name', '') }`, <br/>, `Team - ${ get(this.state, 'team.name', '') }`]}
        columns={this.columns}
        createLink={`/admin/client/team/${teamId}/member/add`}
        createText="Add Team Member"
        data={this.state.data}
        paginationOptions={this.state.paginationOptions}
        rowKey="userId" />
    );
  }
}

export default MemberList;
