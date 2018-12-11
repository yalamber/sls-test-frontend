import React, { Component } from 'react';
import { connect } from 'react-redux';
import IntlMessages from '@components/utility/intlMessages';
import ActionButtons from "./partials/ActionButtons";
import TestManagerActionButtons from './partials/TestManagerActionButtons';
import CompanyList from '@appComponents/Company/List';
import clientActions from '@app/SystemApp/redux/client/actions';

const { requestClients, deleteClient } = clientActions;

class ClientList extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.onTablePaginationChange = this.onTablePaginationChange.bind(this);
    this.columns = [
      {
        title: <IntlMessages id="client.name"/>,
        dataIndex: "name",
        key: "name"
      },
      {
        title: <IntlMessages id="client.owner"/>,
        dataIndex: "owner.username",
        key: "client_owner"
      },
      {
        title: <IntlMessages id="client.owner.email"/>,
        dataIndex: "owner.contactInformation.emailAddress",
        key: "client_owner_email"
      },
      {
        title: <IntlMessages id="client.location"/>,
        dataIndex: "location",
        key: "location"
      },
      {
        title: <IntlMessages id="client.testManagerActions"/>,
        key: "testManagerActions",
        render: row => <TestManagerActionButtons
          row={row}
          history={this.props.history}
          delete={this.handleDelete}
          setCurrentClient={props.setCurrentClient} />
      },
      {
        title: <IntlMessages id="actions"/>,
        key: "actions",
        render: row => <ActionButtons
          row={row}
          history={this.props.history}
          delete={this.handleDelete}
          setCurrentClient={props.setCurrentClient} />
      }
    ];
  }

  componentDidMount() {
    this.props.requestClients({
      page: 1,
      pageSize: 5
    });
  }

  onTablePaginationChange(page, pageSize) {
    this.props.requestClients({
      page,
      pageSize
    });
  }

  handleDelete(row) {
    this.props.deleteClient(row.clientId);
  }

  render() {
    return (
      <CompanyList {...this.props} 
        listType="client"
        onTablePaginationChange={this.onTablePaginationChange} 
        columns={this.columns} />
    );
  }
}

export default connect(
  state => ({
    ...state.Client
  }),
  {
    requestClients,
    deleteClient
  }
)(ClientList);
