import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Icon, message, Spin } from 'antd';
import IntlMessages from '@components/utility/intlMessages';
import LayoutWrapper from '@components/utility/layoutWrapper';
import basicStyle from '@settings/basicStyle';
import Box from '@components/utility/box';
import * as companiesListActions from '@redux/companies/actions';
import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from '@utils/crud.style';
import {
  deleteCompany
} from '@helpers/http-api-client';
import { getDefaultPaginationOptions } from '@utils/default-objects';

import TestManagerActionButtons from './partials/TestManagerActionButtons';
import ActionButtons from './partials/ActionButtons';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
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
      ],
      paginationOptions: getDefaultPaginationOptions().paginationOptions
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.onTablePaginationChange = this.onTablePaginationChange.bind(this);
  }

  componentDidMount() {
    this.props.actions.companiesListDidMount();
  }

  onTablePaginationChange(page, pageSize) {
    this.setState(
      {
        paginationOptions: {
          ...this.state.paginationOptions,
          current: page,
          pageSize
        }
      }, () => {
        const { paginationOptions } = this.state;
        this.props.actions.companiesListFetch({ paginationOptions });
      }
    );
  }

  handleDelete(row) {
    deleteCompany(row.clientId).then(res => {
      message.success("Successfully Deleted.");
      // this.fetchData();
    });
  }

  getPaginationOptions() {
    const { count } = this.props.Companies;
    return { ...this.state.paginationOptions, total: count };
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { rows, loading } = this.props.Companies;

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
                      this.props.history.push("company/create");
                    }}
                  >
                    <Icon type="plus" />
                    <IntlMessages id="client.add"/>
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              <Spin spinning={loading}>
                <Table
                  pagination={{
                    ...this.getPaginationOptions(),
                    onChange: this.onTablePaginationChange
                  }}
                  rowKey="clientId"
                  columns={this.state.columns}
                  dataSource={rows}
                  onRow={row => ({
                    onDoubleClick: () => {
                      // this.props.history.push('details/' + row.clientId)
                      // this.props.history.push(`details/${row.clientId}`);
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

const mapStateToProps = (state) => {
  return {
    ...state
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(companiesListActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(List);
