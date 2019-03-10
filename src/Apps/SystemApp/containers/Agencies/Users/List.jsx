import React, { Component } from "react";
import { connect } from "react-redux";
import List from '@appComponents/Common/List';
import agencyActions from '@app/SystemApp/redux/agency/actions';
import ActionButtons from "./partials/ActionButtons";
const { requestAgencyUsers, requestCurrentAgency } = agencyActions;

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
      this.props.requestAgencyUsers(agencyId, {
        page,
        pageSize
      });
    }
  }

  render() {
    const { currentAgency = { agencyData: { name: '' } }, match } = this.props;
    return (
      <List {...this.props}
        pageHeader = {`Agency - ${currentAgency.agencyData.name}`}
        title = "Users"
        onTablePaginationChange={this.onTablePaginationChange}
        onTableRow={(row) => ({
          onDoubleClick: () => {
            this.props.history.push(`/admin/agency/${row.agencyId}/user/${row.userId}/details`);
          }
        })}
        loading={currentAgency.userList.loading}
        columns={this.columns}
        createLink={`/admin/agency/${match.params.agencyId}/user/create/`}
        data={currentAgency.userList.rows}
        paginationOptions={currentAgency.userList.paginationOptions}
        rowKey="userId" />
    )
  }
}

export default connect(
  state => ({
    ...state.Agency
  }),
  {
    requestCurrentAgency,
    requestAgencyUsers
  }
)(UserList);
