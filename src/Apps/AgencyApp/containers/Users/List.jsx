import React, { Component } from "react";
import { connect } from "react-redux";
import { get } from 'lodash';
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
          history={this.props.history} />
      }
    ];
  }

  componentDidMount() {
    const { requestCurrentAgency } = this.props;
    let activeCompanyTokenData = this.props.activeCompanyTokenData;
    let agencyId = get(activeCompanyTokenData, 'agencyData.agencyId', null);
    if(activeCompanyTokenData.type === 'agencyUser' && agencyId) {  
      requestCurrentAgency(agencyId);
      this.onTablePaginationChange(agencyId)(1, 5);    
    }
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
    const { currentAgency = { agencyData: { name: '' } }, history, match } = this.props;
    return (
      <List {...this.props} 
        title = "Users"
        onTablePaginationChange={this.onTablePaginationChange} 
        onTableRow={(row) => ({
          onDoubleClick: () => {
            history.push(`/my-agency/user/${row.userId}/details`);
          }
        })}
        loading={currentAgency.userList.loading}
        columns={this.columns}
        createLink={`/my-agency/user/create/`}
        data={currentAgency.userList.rows}
        paginationOptions={currentAgency.userList.paginationOptions}
        rowKey="userId" />
    )
  }
}

export default connect(
  state => ({
    ...state.Agency,
    ...state.My
  }),
  {
    requestCurrentAgency,
    requestAgencyUsers
  }
)(UserList);
