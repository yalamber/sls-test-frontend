import React, { Component } from "react";
import { connect } from "react-redux";
import { push, goBack } from 'connected-react-router';
import { get } from 'lodash';
import qs from 'qs';
import SWQAClient from '@helpers/apiClient';
import ActionButtons from "./partials/ActionButtons";
import TeamList from '@appComponents/Team/List';

class List extends Component {
  state = {
    loading: true,
    error: null,
    data: [],
    limit: 10,
    totalCount: 0,
    currentPage: 1
  };

  columns = [
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
      className: 'column-actions',
      title: "Actions",
      key: "actions",
      render: row => <ActionButtons
        row={row}
        agencyId={this.props.match.params.agencyId}
        push={this.props.push} />
    }
  ];

  componentDidMount() {
    const { location } = this.props;
    let currentPage = this.getPagefromLocation(location.search);
    this.fetchData(currentPage);
  }

  async fetchData(page) {
    //get agency id
    let activeCompanyTokenData = this.props.activeCompanyTokenData;
    let agencyId = get(activeCompanyTokenData, 'agencyData.agencyId', null);
    if (activeCompanyTokenData.type === 'agencyUser' && agencyId) {
      this.setState({
        loading: true
      }, async () => {
        try {
          let teamsData = await SWQAClient.getAgencyTeams(agencyId, {
            limit: this.state.limit,
            offset: (this.state.limit * page) - this.state.limit
          });
          this.setState({
            loading: false,
            data: teamsData.rows,
            totalCount: teamsData.count,
            currentPage: page
          });
        } catch (e) {
          this.setState({ loading: false, data: [], error: e });
        } 
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.search !== prevProps.search) {
      let currentPage = this.getPagefromLocation(this.props.search);
      this.fetchData(currentPage);
    }
  }

  getPagefromLocation(search) {
    let queryParams = qs.parse(search, { ignoreQueryPrefix: true });
    return queryParams.page ? Number(queryParams.page) : 1;
  }

  render() {
    return (
      <TeamList {...this.props}
        onTablePaginationChange={this.onTablePaginationChange}
        onTableRow={(row) => ({
          onDoubleClick: () => this.props.push(`/my-agency/team/${row.agencyTeamId}/details`)
        })}
        loading={this.state.loading}
        columns={this.columns}
        createLink={`/my-agency/team/create`}
        data={this.state.data}
        paginationOptions={{
          total: this.state.totalCount,
          pageSize: this.state.limit,
          current: this.state.currentPage,
          onChange: (page) => this.props.push(`/my-agency/teams?page=${page}`)
        }}
        rowKey="agencyTeamId" />
    );
  }
}

const mapStateToProps = state => ({
  ...state.My,
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
)(List);
