import React, { Component } from "react";
import { connect } from "react-redux";
import { push, goBack } from 'connected-react-router';
import qs from 'qs';
import { message }  from 'antd';
import List from '@appComponents/Common/List';
import ActionButtons from "./partials/ActionButtons";
import SWQAClient from "@helpers/apiClient";

class TeamList extends Component {

  columns = [
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
        clientId={this.props.match.params.clientId}
        push={this.props.push} />
    }
  ];

  state = {
    loading: true,
    client: {},
    users: [],
    limit: 10,
    totalCount: 0,
    currentPage: 1
  }


  componentDidMount() {
    const { match, location } = this.props;
    let currentPage = this.getPagefromLocation(location.search);
    this.fetchData(match.params.clientId, currentPage);
  }

  async fetchData(clientId, page) {
    this.setState({
      loading: true
    });
    try {
      let clientData = await SWQAClient.getClient(clientId);
      let teamsData = await SWQAClient.getClientTeams(clientId, {
        offset: (this.state.limit * page) - this.state.limit,
        limit: this.state.limit
      }); 
      this.setState({
        client: clientData,
        teams: teamsData.rows,
        totalCount: teamsData.count,
        currentPage: page
      });
    } catch (e) {
      console.log(e);
      message.error('Data fetch failed');
    } finally {
      this.setState({
        loading: false
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.search !== prevProps.search) {
      let currentPage = this.getPagefromLocation(this.props.search);
      this.fetchData(this.props.match.params.clientId, currentPage);
    }
  }

  getPagefromLocation(search) {
    let queryParams = qs.parse(search, { ignoreQueryPrefix: true });
    return queryParams.page?Number(queryParams.page):1;
  }

  render() {
    const { match, push } = this.props;
    return (
      <List {...this.props}
        onTableRow={(row) => ({
          onDoubleClick: () => push(`/admin/client/team/${row.clientTeamId}/details`)
        })}
        loading={this.state.loading}
        title="Teams"
        pageHeader={`Client - ${this.state.client.name}`}
        columns={this.columns}
        createLink={`/admin/client/${match.params.clientId}/team/create/`}
        data={this.state.teams}
        paginationOptions={{
          total: this.state.totalCount,
          pageSize: this.state.limit,
          current: this.state.currentPage,
          onChange: (page) => push(`/admin/client/${match.params.clientId}/teams?page=${page}`)
        }}
        rowKey="clientTeamId" />
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
)(TeamList);
