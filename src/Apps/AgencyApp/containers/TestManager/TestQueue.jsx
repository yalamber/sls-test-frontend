import React, { Component } from "react";
import { connect } from 'react-redux';
import { Row, Col, Icon, Spin, Button } from "antd";
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
import agencyActions from '@app/SystemApp/redux/agency/actions';
import { select } from "redux-saga/effects";

const { requestCurrentAgency } = agencyActions;

class TestQueueList extends Component {
  constructor() {
    super();
    this.state = {
      selectedQueue: [],
      agency: {},
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
    this.columns = [
      {
        title: "Id",
        dataIndex: "testQueueId",
        key: "testQueueId"
      },
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
    const { requestCurrentAgency } = this.props;
    let activeCompanyTokenData = this.props.activeCompanyTokenData;
    let agencyId = get(activeCompanyTokenData, 'agencyData.agencyId', null);
    if(activeCompanyTokenData.type === 'agencyUser' && agencyId) {    
      requestCurrentAgency(agencyId);
      this.fetchData({
        agencyId
      });
    }
  }

  fetchData = async (options) => {
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

  onTablePaginationChange = async (page, pageSize) => {
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

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedQueue: selectedRowKeys });
  }


  assignToMe = () => {

  }

  assignToTeam = () => {

  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { history } = this.props;
    const rowSelection = {
      selectedRowKeys: this.state.selectedQueue,
      onChange: this.onSelectChange,
    };
    return (
      <LayoutWrapper>
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
                <Button onClick={this.assignToMe} disabled={this.state.selectedQueue.length === 0} style={{ marginBottom: 16, marginRight: 10 }}>
                  Assign to me
                </Button>
                <Button onClick={this.assignToTeam} disabled={this.state.selectedQueue.length === 0} style={{ marginBottom: 16, marginRight: 10 }}>
                  Assign to team
                </Button>
                <Table
                  rowSelection={rowSelection}
                  locale={{ emptyText: "No test run available" }}
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
    ...state.Agency,
    ...state.My
  }),
  {
    requestCurrentAgency
  }
)(TestQueueList);