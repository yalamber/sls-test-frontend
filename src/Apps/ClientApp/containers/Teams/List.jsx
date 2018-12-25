import React, { Component } from "react";
import { connect } from "react-redux";
import { get } from 'lodash';
import SWQAClient from '@helpers/apiClient';
import ActionButtons from "./partials/ActionButtons";
import TeamList from '@appComponents/Team/List';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      data: [],
      paginationOptions: {
        defaultCurrent: 1,
        current: 1,
        pageSize: 10,
        total: 1
      },
    }
    this.onTablePaginationChange = this.onTablePaginationChange.bind(this);
    this.columns = [
      {
        title: "Id", 
        dataIndex: "clientTeamId",
        key: "clientTeamId"
      },
      {
        title: "Team Name",
        dataIndex: "name",
        key: "name"
      },
      {
        className: 'column-actions',
        title: "Actions",
        key: "actions",
        render: row => <ActionButtons 
          row={row}
          clientId={props.match.params.clientId}
          history={this.props.history} />
      }
    ];
  }

  componentDidMount() {
    this.onTablePaginationChange(1, 10);    
  }

  onTablePaginationChange(page, pageSize) {
    //get client id
    let activeCompanyTokenData = this.props.activeCompanyTokenData;
    let clientId = get(activeCompanyTokenData, 'clientData.clientId', null);
    if(activeCompanyTokenData.type === 'clientUser' && clientId) {
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
          let teams = await SWQAClient.getClientTeams(clientId, {
            limit: pageSize,
            offset
          });
          this.setState({
            loading: false,
            data: get(teams, 'rows', []),
            paginationOptions: {
              ...this.state.paginationOptions,
              total: teams.count
            }
          });
        } catch(e) {
          this.setState({ loading: false, data: [], error: e });
        }
      });
    }
  }

  render() {
    return (
      <TeamList {...this.props} 
        onTablePaginationChange={this.onTablePaginationChange} 
        onTableRow={(row) => ({
          onDoubleClick: () => {
            this.props.history.push(`/my-client/team/${row.clientTeamId}/details`);
          }
        })}
        loading={this.state.loading}
        columns={this.columns}
        createLink={`/my-client/team/create`}
        data={this.state.data}
        paginationOptions={this.state.paginationOptions}
        rowKey="clientTeamId"/>
    );
  }
}

export default connect(
  state => ({
    ...state.My  
  })
)(List);
