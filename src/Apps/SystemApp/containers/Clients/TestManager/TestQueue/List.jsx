import React, { Component } from "react";
import { connect } from 'react-redux';
import { Row, Col, Icon, Spin } from "antd";
import { get } from 'lodash';
import LayoutWrapper from "@components/utility/layoutWrapper";
import PageHeader from "@components/utility/pageHeader";
import IntlMessages from '@components/utility/intlMessages';
import basicStyle from "@settings/basicStyle";
import Box from "@components/utility/box";
import Moment from "react-moment";
import {
  ActionBtn,
  TitleWrapper,
  ComponentTitle,
  TableClickable as Table
} from "@utils/crud.style";
import SWQAClient from '@helpers/apiClient';
import { dateTime } from "@constants/dateFormat";
import clientActions from '@app/SystemApp/redux/client/actions';

const { requestCurrentClient } = clientActions;

class TestQueueList extends Component {
  constructor() {
    super();
    this.state = {
      client: {},
      testQueues: [],
      loading: false,
      error: null,
      paginationOptions: {
        defaultCurrent: 1,
        current: 1,
        pageSize: 10,
        total: 1
      },
    };
    this.fetchData = this.fetchData.bind(this);
    this.onTablePaginationChange = this.onTablePaginationChange.bind(this);
    this.columns = [
      {
        title: "Test Case",
        dataIndex: "testCase.title",
        key: "testCaseTitle"
      },
      {
        title: "Test Suite",
        dataIndex: "testCase.testSuite.name",
        key: "testSuiteName"
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status"
      },
      {
        title: "Created",
        render: row => <Moment format={dateTime}>{row.createdAt}</Moment>,
        key: "createdAt"
      }
    ];
  }

  componentDidMount() {
    const { match, requestCurrentClient } = this.props;
    requestCurrentClient(match.params.clientId);
    this.fetchData({
      clientId: match.params.clientId
    });
  }

  async fetchData(options) {
    try {
      this.setState({loading: true});
      options.limit = this.state.paginationOptions.pageSize;
      let testQueues = await SWQAClient.getTestQueues(options);
      let updateState = {
        loading: false,
        testQueues: testQueues.rows,
        paginationOptions: {
          ...this.state.paginationOptions,
          total: testQueues.count
        }
      };
      this.setState(updateState);
    } catch(e) {
      this.setState({
        error: e,
      });
    } finally {
      this.setState({
        loading: false
      })
    }
  }

  async onTablePaginationChange(page, pageSize) {
    this.setState({
      loading: true,
      paginationOptions: {
        ...this.state.paginationOptions,
        current: page,
        pageSize
      }
    }, async () => {
      try{
        let offset = pageSize * (page - 1);
        let testQueues = await SWQAClient.getTestQueues({
          clientId: this.props.match.params.clientId,
          limit: pageSize,
          offset
        });
        this.setState({
          loading: false,
          testQueues: get(testQueues, 'rows', []),
          paginationOptions: {
            ...this.state.paginationOptions,
            total: testQueues.count
          }
        });
      } catch(e) {
        this.setState({ loading: false, testQueues: [] });
      }
    });
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { currentClient, history } = this.props;
    return (
      <LayoutWrapper>
        <PageHeader>
          Client - {get(currentClient, 'clientData.name', '')}
        </PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>
                  <ActionBtn
                    type="secondary"
                    onClick={() => history.goBack()}
                  >
                    <Icon type="left" /> <IntlMessages id="back" />
                  </ActionBtn>
                  &nbsp; Test Queue
                </ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <Table
                  locale={{ emptyText: "No Test Queue available" }}
                  size="middle"
                  bordered
                  pagination={{
                    ...this.state.paginationOptions,
                    onChange: this.onTablePaginationChange
                  }}
                  columns={this.columns}
                  dataSource={this.state.testQueues}
                  rowKey="testQueueId"
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
    requestCurrentClient
  }
)(TestQueueList);