import React, { Component } from 'react';
import { Row, Col, Icon, Spin } from 'antd';
import { connect } from 'react-redux';
import LayoutWrapper from '@components/utility/layoutWrapper';
import IntlMessages from '@components/utility/intlMessages';
import basicStyle from '@settings/basicStyle';
import Box from '@components/utility/box';
import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from '@utils/crud.style';
import clientActions from '@app/SystemApp/redux/client/actions';
import ActionButtons from "./partials/ActionButtons";
import TestManagerActionButtons from './partials/TestManagerActionButtons';
const { requestClients, deleteClient } = clientActions;

const columns = [
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
    render: row => <TestManagerActionButtons row={row} />
  },
  {
    title: <IntlMessages id="actions"/>,
    key: "actions",
    render: row => <ActionButtons row={row} delete={this.handleDelete} />
  }
];

class ClientList extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.onTablePaginationChange = this.onTablePaginationChange.bind(this);
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
    const { rowStyle, colStyle, gutter } = basicStyle;
    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle><IntlMessages id="clients"/></ComponentTitle>
                <ButtonHolders>
                  <ActionBtn
                    type="primary"
                    onClick={() => {
                      this.props.history.push("client/create");
                    }}
                  >
                    <Icon type="plus" />
                    <IntlMessages id="client.add"/>
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              <Spin spinning={this.props.list.loading}>
                <Table
                  pagination={{
                    ...this.props.list.paginationOptions,
                    onChange: this.onTablePaginationChange
                  }}
                  rowKey="clientId"
                  columns={columns}
                  dataSource={this.props.list.rows}
                  onRow={row => ({
                    onDoubleClick: () => {
                      this.props.history.push(`client/${row.clientId}/details`);
                    }
                  })}
                />
              </Spin>
            </Box>

          </Col>
        </Row>
      </LayoutWrapper>
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
