import React, { Component } from "react";
import { connect } from "react-redux";
import { get } from 'lodash';
import List from '@appComponents/Common/List';
import clientActions from "@app/SystemApp/redux/client/actions";
import ActionButtons from "./partials/ActionButtons";
const { requestClientUsers, requestCurrentClient} = clientActions;

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
    const { requestCurrentClient } = this.props;
    let activeCompanyTokenData = this.props.activeCompanyTokenData;
    let clientId = get(activeCompanyTokenData, 'clientData.clientId', null);
    if(activeCompanyTokenData.type === 'clientUser' && clientId) {
      requestCurrentClient(clientId);
      this.onTablePaginationChange(clientId)(1, 5);
    }
  }

  onTablePaginationChange(clientId) {
    return (page, pageSize) => {
      this.props.requestClientUsers(clientId, {
        page,
        pageSize
      });
    }
  }

  render() {
    const { currentClient = { clientData: { name: ''} }, history } = this.props;
    return (
      <List {...this.props}
        title = "Users"
        onTablePaginationChange={this.onTablePaginationChange}
        onTableRow={(row) => ({
          onDoubleClick: () => {
            history.push(`/my-client/user/${row.userId}/details`);
          }
        })}
        loading={currentClient.userList.loading}
        columns={this.columns}
        createLink={`/my-client/user/create/`}
        data={currentClient.userList.rows}
        paginationOptions={currentClient.userList.paginationOptions}
        rowKey="userId" />
    )
  }
}

export default connect(
  state => ({
    ...state.Client,
    ...state.My
  }),
  {
    requestCurrentClient,
    requestClientUsers
  }
)(UserList);
