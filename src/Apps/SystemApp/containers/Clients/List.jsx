import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { push, goBack } from 'connected-react-router';
import qs from 'qs';
import IntlMessages from '@components/utility/intlMessages';
import ActionButtons from "./partials/ActionButtons";
import TestManagerActionButtons from './partials/TestManagerActionButtons';
import List from '@appComponents/Common/List';
import SWQAClient from "@helpers/apiClient";

class ClientList extends Component {
  columns = [
    {
      title: <IntlMessages id="client.name" />,
      dataIndex: "name",
      key: "name"
    },
    {
      title: <IntlMessages id="client.owner" />,
      dataIndex: "owner.username",
      key: "client_owner"
    },
    {
      title: <IntlMessages id="client.owner.email" />,
      dataIndex: "owner.contactInformation.emailAddress",
      key: "client_owner_email"
    },
    {
      title: <IntlMessages id="client.location" />,
      dataIndex: "location",
      key: "location"
    },
    {
      title: <IntlMessages id="client.testManagerActions" />,
      key: "testManagerActions",
      render: row => <TestManagerActionButtons
        row={row}
        history={this.props.history}
        setCurrentClient={this.props.setCurrentClient} />
    },
    {
      title: <IntlMessages id="actions" />,
      key: "actions",
      render: row => <ActionButtons
        row={row}
        history={this.props.history}
        setCurrentClient={this.props.setCurrentClient} />
    }
  ];

  state = {
    loading: true,
    clients: [],
    limit: 2,
    totalCount: 0,
    currentPage: 1
  }

  async fetchData(page) {
    this.setState({
      loading: true
    });
    try {
      let data = await SWQAClient.getClients({
        offset: (this.state.limit * page) - this.state.limit,
        limit: this.state.limit
      });
      this.setState({
        clients: data.rows,
        totalCount: data.count,
        currentPage: page
      });
    } catch (e) {
      console.log(e);
      message.error('Data fetch failed');
    } finally {
      this.setState({
        loading: false
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.search !== prevProps.search) {
      let currentPage = this.getPagefromLocation(this.props.search);
      this.fetchData(currentPage);
    }
  }

  componentDidMount() {
    let currentPage = this.getPagefromLocation(this.props.location.search);
    this.fetchData(currentPage);
  }

  getPagefromLocation(search) {
    let queryParams = qs.parse(search, { ignoreQueryPrefix: true });
    return queryParams.page?Number(queryParams.page):1;
  }

  render() {
    return (
      <List {...this.props}
        title="Clients"
        onTablePaginationChange={this.onTablePaginationChange}
        onTableRow={(row) => ({
          onDoubleClick: () => {
            this.props.push(`/admin/client/${row.clientId}/details`);
          }
        })}
        goBack={this.props.goBack}
        push={this.props.push}
        loading={this.state.loading}
        columns={this.columns}
        createLink={`/admin/client/create/`}
        data={this.state.clients}
        paginationOptions={{
          total: this.state.totalCount,
          pageSize: this.state.limit,
          current: this.state.currentPage,
          onChange: (page) => {
            this.props.push(`/admin/clients?page=${page}`);
          }
        }}
        rowKey="clientId" />
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
    push,
    goBack
  }
)(ClientList);
