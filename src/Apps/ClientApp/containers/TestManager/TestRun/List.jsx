import React, { Component } from "react";
import { connect } from 'react-redux';
import { Row, Col, Icon, Spin } from "antd";
import { get } from 'lodash';
import LayoutWrapper from "@components/utility/layoutWrapper";
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
import ActionButtons from "./partials/ActionButtons";
import clientActions from '@app/SystemApp/redux/client/actions';

const { requestCurrentClient } = clientActions;

class TestRunList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: {},
      testRuns: [],
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
        title: "#ID",
        dataIndex: "testQueueRunId",
        key: "testQueueRunId"
      },
      {
        title: "Tester",
        render: row => <div>{get(row, 'testQueue.assignedUser.username', '-')}</div>,
        key: "assignedUser"
      },
      {
        title: "Test Suite",
        render: row => <div>{get(row, 'testQueue.testCase.testSuite.name', '-')}</div>,
        key: "testSuite"
      },
      {
        title: "Test Case",
        render: row => <div>{get(row, 'testQueue.testCase.title', '-')}</div>,
        key: "testCase"
      },
      {
        title: "Created",
        render: row => <Moment format={dateTime}>{row.createdAt}</Moment>,
        key: "createdAt"
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status"
      },
      {
        title: "Actions",
        key: "actions",
        render: row => <ActionButtons row={row} deleteTestQueue={this.deleteTestQueue} history={props.history} />
      }
    ];
  }

  componentDidMount() {
    const { requestCurrentClient } = this.props;
    //get client id
    let activeCompanyTokenData = this.props.activeCompanyTokenData;
    let clientId = get(activeCompanyTokenData, 'clientData.clientId', null);
    if(activeCompanyTokenData.type === 'clientUser' && clientId) {  
      requestCurrentClient(clientId);
      this.fetchData({
        clientId
      });
    }
  }

  fetchData = async (options) => {
    try {
      this.setState({loading: true});
      options.limit = this.state.paginationOptions.pageSize;
      let testRuns = await SWQAClient.getTestRuns(options);
      let updateState = {
        loading: false,
        testRuns: testRuns.rows,
        paginationOptions: {
          ...this.state.paginationOptions,
          total: testRuns.count
        }
      };
      if(options.clientTeamId) {
        updateState.selectedTeamId = parseInt(options.clientTeamId, 10); 
      }
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
        let testRuns = await SWQAClient.getTestRuns({
          clientId: this.props.match.params.clientId,
          limit: pageSize,
          offset
        });
        this.setState({
          loading: false,
          testRuns: get(testRuns, 'rows', []),
          paginationOptions: {
            ...this.state.paginationOptions,
            total: testRuns.count
          }
        });
      } catch(e) {
        this.setState({ loading: false, testRuns: [] });
      }
    });
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { history } = this.props;
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
                  &nbsp; Test Run
                </ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <Table
                  locale={{ emptyText: "No test run available" }}
                  size="middle"
                  bordered
                  pagination={{
                    ...this.state.paginationOptions,
                    onChange: this.onTablePaginationChange
                  }}
                  columns={this.columns}
                  dataSource={this.state.testRuns}
                  rowKey="testQueueRunId"
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
    ...state.Client,
    ...state.My
  }),
  {
    requestCurrentClient
  }
)(TestRunList);
