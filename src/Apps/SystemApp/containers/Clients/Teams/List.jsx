import React, { Component } from "react";
import { connect } from "react-redux";
import clientActions from '@app/SystemApp/redux/client/actions';
import TeamList from '@appComponents/Team/List';
import ActionButtons from "./partials/ActionButtons";
const { requestClientTeams, requestCurrentClient } = clientActions;

class List extends Component {
  constructor(props) {
    super(props);
    this.onTablePaginationChange = this.onTablePaginationChange.bind(this);
    this.columns = [
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
    const { match } = this.props;
    this.props.requestCurrentClient(match.params.clientId);
    this.onTablePaginationChange(match.params.clientId)(1, 5);    
  }

  onTablePaginationChange(clientId) {
    return (page, pageSize) => {  
      this.props.requestClientTeams(clientId, {
        page,
        pageSize
      });
    }
  }

  render() {
    const { currentClient = { clientData: { name: '' }, teamList: [] }, match } = this.props;
    return (
      <TeamList {...this.props} 
        onTablePaginationChange={this.onTablePaginationChange} 
        onTableRow={(row) => ({
          onDoubleClick: () => {
            this.props.history.push(`/admin/client/${match.params.clientId}/team/${row.clientTeamId}/details`);
          }
        })}
        loading={currentClient.teamList.loading}
        pageHeader={`Client - ${currentClient.clientData.name}`}
        columns={this.columns}
        createLink={`/admin/client/${match.params.clientId}/team/create/`}
        data={currentClient.teamList.rows}
        paginationOptions={currentClient.teamList.paginationOptions}
        rowKey="clientTeamId" />
    );
  }
}

export default connect(
  state => ({
    ...state.Client
  }),
  {
    requestCurrentClient,
    requestClientTeams
  }
)(List);
