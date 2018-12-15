import React, { Component } from "react";
import { connect } from "react-redux";
import List from '@appComponents/Common/List';
import clientActions from '@app/SystemApp/redux/client/actions';
import ActionButtons from "./partials/ActionButtons";
const { requestClientUsers, requestCurrentClient } = clientActions;

class UserList extends Component {
  constructor(props) {
    super(props);
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
      this.props.requestClientUsers(clientId, {
        page,
        pageSize
      });
    }
  }

  render() {
    const { currentClient = { clientData: { name: '' } }, history, match } = this.props;
    return (
      <List {...this.props} 
        pageHeader = {`Client - ${currentClient.clientData.name}`}
        title = "Users"
        onTablePaginationChange={this.onTablePaginationChange} 
        onTableRow={(row) => ({
          onDoubleClick: () => {
            this.props.history.push(`/admin/client/${row.clientId}/user/${row.userId}/details`);
          }
        })}
        loading={currentClient.userList.loading}
        columns={this.columns}
        createLink={`/admin/client/${match.params.clientId}/user/create/`}
        data={currentClient.userList.rows}
        paginationOptions={currentClient.userList.paginationOptions}
        rowKey="userId" />
    )
  }
}

export default connect(
  state => ({
    ...state.Client
  }),
  {
    requestCurrentClient,
    requestClientUsers
  }
)(UserList);
