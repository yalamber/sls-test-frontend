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
import clientActions from '@app/SystemApp/redux/agency/actions';
import ActionButtons from "./partials/ActionButtons";
import TestManagerActionButtons from './partials/TestManagerActionButtons';
const { requestAgencies, deleteAgency } = clientActions;

class AgencyList extends Component {
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
    this.props.deleteAgency(row.clientId);
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { list, history } = this.props;
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
                      history.push("agency/create");
                    }}>
                    <Icon type="plus" />
                    <IntlMessages id="client.add"/>
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              <Spin spinning={list.loading}>
                <Table
                  locale={{ emptyText: "No Agencies" }}
                  pagination={{
                    ...list.paginationOptions,
                    onChange: this.onTablePaginationChange
                  }}
                  bordered
                  rowKey="clientId"
                  columns={this.columns}
                  dataSource={list.rows}
                  onRow={row => ({
                    onDoubleClick: () => {
                      history.push(`agency/${row.clientId}/details`);
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
    ...state.Agency
  }),
  {
    requestAgencies,
    deleteAgency
  }
)(AgencyList);
