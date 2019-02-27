import React, { Component } from "react";
import { connect } from "react-redux";
import { get } from "lodash";
import SWQAClient from "@helpers/apiClient";
import ActionButtons from "./partials/ActionButtons";
import TeamList from "@appComponents/Team/List";

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
      }
    };
    this.columns = [
      {
        title: "Id",
        dataIndex: "agencyTeamId",
        key: "agencyTeamId"
      },
      {
        title: "Team Name",
        dataIndex: "name",
        key: "name"
      },
      {
        className: "column-actions",
        title: "Actions",
        key: "actions",
        render: row => (
          <ActionButtons
            row={row}
            agencyId={props.match.params.agencyId}
            history={this.props.history}
          />
        )
      }
    ];
  }

  onTablePaginationChange = (page, pageSize) => {
    //get agency id
    let activeCompanyTokenData = this.props.activeCompanyTokenData;
    let agencyId = get(activeCompanyTokenData, "agencyData.agencyId", null);
    if (activeCompanyTokenData.type === "agencyUser" && agencyId) {
      this.setState(
        {
          loading: true,
          paginationOptions: {
            ...this.state.paginationOptions,
            current: page,
            pageSize
          }
        },
        async () => {
          try {
            let offset = pageSize * (page - 1);
            let teams = await SWQAClient.getAgencyTeams(agencyId, {
              limit: pageSize,
              offset
            });
            this.setState({
              loading: false,
              data: get(teams, "rows", []),
              paginationOptions: {
                ...this.state.paginationOptions,
                total: teams.count
              }
            });
          } catch (e) {
            this.setState({ loading: false, data: [], error: e });
          }
        }
      );
    }
  }
  
  componentDidMount() {
    this.onTablePaginationChange(1, 10);
  }

  render() {
    return (
      <TeamList
        {...this.props}
        onTablePaginationChange={this.onTablePaginationChange}
        onTableRow={row => ({
          onDoubleClick: () => {
            this.props.history.push(
              `/my-agency/team/${row.agencyTeamId}/details`
            );
          }
        })}
        loading={this.state.loading}
        columns={this.columns}
        createLink={`/my-agency/team/create`}
        data={this.state.data}
        paginationOptions={this.state.paginationOptions}
        rowKey="agencyTeamId"
      />
    );
  }
}

export default connect(state => ({
  ...state.My
}))(List);
