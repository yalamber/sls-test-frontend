import React, { Component } from "react";
import { connect } from "react-redux";
import agencyActions from '@app/SystemApp/redux/agency/actions';
import TeamList from '@appComponents/Team/List';
import ActionButtons from "./partials/ActionButtons";
const { requestAgencyTeams, requestCurrentAgency } = agencyActions;

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
          agencyId={props.match.params.agencyId}
          history={this.props.history} />
      }
    ];
  }

  componentDidMount() {
    const { match } = this.props;
    this.props.requestCurrentAgency(match.params.agencyId);
    this.onTablePaginationChange(match.params.agencyId)(1, 5);    
  }

  onTablePaginationChange(agencyId) {
    return (page, pageSize) => {  
      this.props.requestAgencyTeams(agencyId, {
        page,
        pageSize
      });
    }
  }

  render() {
    const { currentAgency = { agencyData: { name: '' }, teamList: [] }, match } = this.props;
    return (
      <TeamList {...this.props} 
        onTablePaginationChange={this.onTablePaginationChange} 
        onTableRow={(row) => ({
          onDoubleClick: () => {
            this.props.history.push(`/admin/agency/${match.params.agencyId}/team/${row.agencyTeamId}/details`);
          }
        })}
        loading={currentAgency.teamList.loading}
        pageHeader={`Agency - ${currentAgency.agencyData.name}`}
        columns={this.columns}
        createLink={`/admin/agency/${match.params.agencyId}/team/create/`}
        data={currentAgency.teamList.rows}
        paginationOptions={currentAgency.teamList.paginationOptions}
        rowKey="agencyTeamId" />
    );
  }
}

export default connect(
  state => ({
    ...state.Agency
  }),
  {
    requestCurrentAgency,
    requestAgencyTeams
  }
)(List);
