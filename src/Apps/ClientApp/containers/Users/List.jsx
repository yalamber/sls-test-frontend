import React, { Component } from "react";
import { connect } from "react-redux";
import { get } from 'lodash';
import List from '@appComponents/Common/List';
import SWQAClient from '@helpers/apiClient';
import ActionButtons from "./partials/ActionButtons";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      error: null,
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
          let users = await SWQAClient.getClientUsers(clientId, {
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
          this.setState({ loading: false, data: [], error: e });
        }
      });
    }
  }

  render() {
    const { history } = this.props;
    return (
      <List {...this.props}
        title = "Users"
        onTablePaginationChange={this.onTablePaginationChange}
        onTableRow={(row) => ({
          onDoubleClick: () => {
            history.push(`/my-client/${row.userId}/details`);
          }
        })}
        loading={this.state.loading}
        columns={this.columns}
        createLink={`/my-client/user/create/`}
        data={this.state.data}
        paginationOptions={this.state.paginationOptions}
        rowKey="userId" />
    )
  }
}

export default connect(
  state => ({
    ...state.My
  })
)(UserList);
