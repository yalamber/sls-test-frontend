import React, { Component } from "react";
import { connect } from "react-redux";
import { push, goBack } from 'connected-react-router';
import { get } from 'lodash';
import qs from 'qs';
import { message }  from 'antd';
import List from '@appComponents/Common/List';
import ActionButtons from "./partials/ActionButtons";
import SWQAClient from "@helpers/apiClient";


class UserList extends Component {
  state = {
    users: [],
    loading: true,
    error: null,
    limit: 10,
    totalCount: 0,
    currentPage: 1
  };

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
        push={this.props.push} />
    }
  ];

  componentDidMount() {
    const { location } = this.props;
    let currentPage = this.getPagefromLocation(location.search);
    this.fetchData(currentPage);
  }

  async fetchData(page) {
    //get client id
    let activeCompanyTokenData = this.props.activeCompanyTokenData;
    let clientId = get(activeCompanyTokenData, 'clientData.clientId', null);
    if (activeCompanyTokenData.type === 'clientUser' && clientId) {
      this.setState({
        loading: true
      });
      try {
        let usersData = await SWQAClient.getClientUsers(clientId, {
          limit: this.state.limit,
          offset: (this.state.limit * page) - this.state.limit
        }); 
        this.setState({
          loading: false,
          users: usersData.rows,
          totalCount: usersData.count,
          currentPage: page
        });
      } catch (e) {
        message.error('Data fetch failed');
        this.setState({
          loading: false,
          error: e
        });
      }
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
    return queryParams.page?Number(queryParams.page):1;
  }


  render() {
    const { push } = this.props;
    return (
      <List {...this.props}
        title="Users"
        onTableRow={(row) => ({
          onDoubleClick: () => push(`/my-client/user/${row.userId}/details`)
        })}
        loading={this.state.loading}
        columns={this.columns}
        createLink={`/my-client/user/create/`}
        data={this.state.users}
        paginationOptions={{
          total: this.state.totalCount,
          pageSize: this.state.limit,
          current: this.state.currentPage,
          onChange: (page) => push(`/my-client/users?page=${page}`)
        }}
        rowKey="userId" />
    )
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
)(UserList);
