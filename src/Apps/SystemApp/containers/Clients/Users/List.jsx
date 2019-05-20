import React, { Component } from "react";
import { connect } from "react-redux";
import { push, goBack } from 'connected-react-router';
import qs from 'qs';
import { message }  from 'antd';
import List from '@appComponents/Common/List';
import ActionButtons from "./partials/ActionButtons";
import SWQAClient from "@helpers/apiClient";

class UserList extends Component {
  columns = [
    {
      title: "Name",
      dataIndex: "user.username",
      key: "name"
    },
    {
      title: "Role",
      dataIndex: "role.title",
      key: "role"
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status"
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
      let usersData = await SWQAClient.getClientUsers(clientId, {
        offset: (this.state.limit * page) - this.state.limit,
        limit: this.state.limit
      }); 
      this.setState({
        client: clientData,
        users: usersData.rows,
        totalCount: usersData.count,
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
    console.log(search);
    let queryParams = qs.parse(search, { ignoreQueryPrefix: true });
    return queryParams.page?Number(queryParams.page):1;
  }

  render() {
    const { match, push } = this.props;
    return (
      <List {...this.props}
        pageHeader={`Client - ${this.state.client.name}`}
        title="Users"
        onTableRow={(row) => ({
          onDoubleClick: () => push(`/admin/client/${row.clientId}/user/${row.userId}/details`)
        })}
        loading={this.state.loading}
        columns={this.columns}
        createLink={`/admin/client/${match.params.clientId}/user/create/`}
        data={this.state.users}
        paginationOptions={{
          total: this.state.totalCount,
          pageSize: this.state.limit,
          current: this.state.currentPage,
          onChange: (page) => push(`/admin/client/${match.params.clientId}/users?page=${page}`)
        }}
        rowKey="userId" />
    )
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
)(UserList);
