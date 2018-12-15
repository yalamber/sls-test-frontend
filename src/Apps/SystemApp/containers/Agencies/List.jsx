import React, { Component } from 'react';
import { connect } from 'react-redux';
import IntlMessages from '@components/utility/intlMessages';
import ActionButtons from "./partials/ActionButtons";
import TestManagerActionButtons from './partials/TestManagerActionButtons';
import List from '@appComponents/Common/List';
import agencyActions from '@app/SystemApp/redux/agency/actions';

const { requestAgencies, deleteAgency } = agencyActions;

class AgencyList extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.onTablePaginationChange = this.onTablePaginationChange.bind(this);
    this.columns = [
      {
        title: <IntlMessages id="agency.name"/>,
        dataIndex: "name",
        key: "name"
      },
      {
        title: <IntlMessages id="agency.owner"/>,
        dataIndex: "owner.username",
        key: "agency_owner"
      },
      {
        title: <IntlMessages id="agency.owner.email"/>,
        dataIndex: "owner.contactInformation.emailAddress",
        key: "agency_owner_email"
      },
      {
        title: <IntlMessages id="agency.location"/>,
        dataIndex: "location",
        key: "location"
      },
      {
        title: <IntlMessages id="agency.testManagerActions"/>,
        key: "testManagerActions",
        render: row => <TestManagerActionButtons
          row={row}
          history={this.props.history}
          delete={this.handleDelete}
          setCurrentAgency={props.setCurrentAgency} />
      },
      {
        title: <IntlMessages id="actions"/>,
        key: "actions",
        render: row => <ActionButtons
          row={row}
          history={this.props.history}
          delete={this.handleDelete}
          setCurrentAgency={props.setCurrentAgency} />
      }
    ];
  }

  componentDidMount() {
    this.props.requestAgencies({
      page: 1,
      pageSize: 5
    });
  }

  onTablePaginationChange(page, pageSize) {
    this.props.requestAgencies({
      page,
      pageSize
    });
  }

  handleDelete(row) {
    this.props.deleteAgency(row.agencyId);
  }

  render() {
    return (
      <List {...this.props} 
        title = "Agencies"
        onTablePaginationChange={this.onTablePaginationChange} 
        onTableRow={(row) => ({
          onDoubleClick: () => {
            this.props.history.push(`/admin/agency/${row.agencyId}/details`);
          }
        })}
        loading={this.props.list.loading}
        columns={this.columns}
        createLink={`/admin/agency/create/`}
        data={this.props.list.rows}
        paginationOptions={this.props.list.paginationOptions}
        rowKey="agencyId" />
    );
  }
}

export default connect(
  state => ({
    ...state.Agency
  }),
  {
    requestAgencies,
    deleteAgency
  }
)(AgencyList);
