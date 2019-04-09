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
    this.state = {
      data: [],
      loading: true,
      error: null,
      userId: null,
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

  // componentDidMount() {
  //   this.onTablePaginationChange(1, 10);
  // }

  componentDidMount() {
    const { requestCurrentAgency } = this.props;
    let activeCompanyTokenData = this.props.activeCompanyTokenData;
    const agencyId = get(activeCompanyTokenData, 'agencyData.agencyId', null);
    if(activeCompanyTokenData.type === 'agencyUser' && agencyId) {
      requestCurrentAgency(agencyId);
      this.onTablePaginationChange(agencyId)(1, 10);
      this.setState({userId: agencyId});
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

  

  // onTablePaginationChange(page, pageSize) {
  //   //get agency id
  //   let activeCompanyTokenData = this.props.activeCompanyTokenData;
  //   let agencyId = get(activeCompanyTokenData, 'agencyData.clientId', null);
  //   if(activeCompanyTokenData.type === 'agencyUser' && agencyId) {
  //     this.setState({
  //       loading: true,
  //       paginationOptions: {
  //         ...this.state.paginationOptions,
  //         current: page,
  //         pageSize
  //       }
  //     }, async () => {
  //       try{
  //         let offset = pageSize * (page - 1);
  //         let users = await SWQAAgency.getAgencyUsers(agencyId, {
  //           limit: pageSize,
  //           offset
  //         });
  //         this.setState({
  //           loading: false,
  //           data: get(users, 'rows', []),
  //           paginationOptions: {
  //             ...this.state.paginationOptions,
  //             total: users.count
  //           }
  //         });
  //       } catch(e) {
  //         this.setState({ loading: false, data: [], error: e });
  //       }
  //     });
  //   }
  // }

  render() {
    const { currentAgency = { agencyData: { name: '' } }, history } = this.props;
    return (
      <List {...this.props}
        title = "Users"
        onTablePaginationChange={this.onTablePaginationChange(this.state.userId && this.state.userId)}
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
