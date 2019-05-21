import React, { Component } from "react";
import { connect } from "react-redux";
import { push, goBack } from 'connected-react-router';
import qs from 'qs';
import { message } from 'antd';
import List from '@appComponents/Common/List';
import ActionButtons from "./partials/ActionButtons";
import SWQAClient from "@helpers/apiClient";

class UsersList extends Component {

  state = {
    loading: false,
    users: [],
    limit: 10,
    totalCount: 0,
    currentPage: 1
  };

  columns = [
    {
      title: 'Username',
      dataIndex: 'user.username',
      key: 'title',
    },
    {
      title: 'Email',
      dataIndex: 'user.contactInformation.emailAddress',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role.title',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (row) => <ActionButtons row={row} deleteUser={this.handleDelete} push={this.props.push} />
    }
  ];

  componentDidMount() {
    const { location } = this.props;
    let currentPage = this.getPagefromLocation(location.search);
    this.fetchData(currentPage);
  }

  fetchData = async (page) => {
    try {
      this.setState({ loading: true });
      let usersData = await SWQAClient.getSystemUsers({
        offset: (this.state.limit * page) - this.state.limit,
        limit: this.state.limit
      });
      this.setState({
        loading: false,
        users: usersData.rows,
        totalCount: usersData.count,
        currentPage: page
      });
    } catch (e) {
      console.log(e);
      message.error("Problem occured.");
      this.setState({ loading: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.search !== prevProps.search) {
      let currentPage = this.getPagefromLocation(this.props.search);
      this.fetchData(this.props.match.params.teamId, currentPage);
    }
  }

  getPagefromLocation(search) {
    let queryParams = qs.parse(search, { ignoreQueryPrefix: true });
    return queryParams.page ? Number(queryParams.page) : 1;
  }

  handleDelete(row) {
    this.props.deleteSystemUser(row.userId);
  }

  render() {
    const { push } = this.props;
    return (
      <List {...this.props}
        onTableRow={(row) => ({
          onDoubleClick: () => push(`details/${row.systemUserId}`)
        })}
        loading={this.state.loading}
        title="System Users"
        pageHeader={'System Users'}
        columns={this.columns}
        createLink={`/admin/user/create`}
        createText="Add System User"
        data={this.state.users}
        paginationOptions={{
          total: this.state.totalCount,
          pageSize: this.state.limit,
          current: this.state.currentPage,
          onChange: (page) => push(`/admin/users?page=${page}`)
        }}
        rowKey="userId" />
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
)(UsersList);
