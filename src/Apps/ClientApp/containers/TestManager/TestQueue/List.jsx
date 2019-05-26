import React, { Component } from "react";
import { connect } from 'react-redux';
import { push, goBack } from 'connected-react-router';
import { Row, Col, Icon, Spin, message } from "antd";
import { get, omit } from 'lodash';
import qs from "qs";
import LayoutWrapper from "@components/utility/layoutWrapper";
import IntlMessages from '@components/utility/intlMessages';
import basicStyle from "@settings/basicStyle";
import Box from "@components/utility/box";
import ActionButtons from "./partials/ActionButtons";
import Moment from "react-moment";
import {
  ActionBtn,
  TitleWrapper,
  ComponentTitle,
  TableClickable as Table
} from "@utils/crud.style";
import SWQAClient from '@helpers/apiClient';
import { dateTime } from "@constants/dateFormat";

class TestQueueList extends Component {
  state = {
    testQueues: [],
    loading: false,
    error: null,
    limit: 10,
    totalCount: 0,
    currentPage: 1
  };

  columns = [
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
    },
    {
      title: "Actions",
      key: "actions",
      render: row => <ActionButtons row={row} deleteTestQueue={this.deleteTestQueue} />
    }
  ];

  componentDidMount() {
    const { location } = this.props;
    this.fetchData(this.getFetchReqParams(location.search));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.search !== prevProps.search) {
      this.fetchData(this.getFetchReqParams(this.props.search));
    }
  }

  getFetchReqParams = (search) => {
    let queryParams = qs.parse(search, { ignoreQueryPrefix: true });
    let reqParams = {};
    reqParams.page = queryParams.page ? Number(queryParams.page) : 1;
    return reqParams;
  }

  fetchData = async (options) => {
    // get client id
    let activeCompanyTokenData = this.props.activeCompanyTokenData;
    let clientId = get(activeCompanyTokenData, 'clientData.clientId', null);
    if (activeCompanyTokenData.type === 'clientUser' && clientId) {
      try {
        this.setState({ loading: true });
        options.offset = (this.state.limit * options.page) - this.state.limit;
        options.limit = this.state.limit;
        let testQueueData = await SWQAClient.getTestQueues(omit(options, ['page']));
        let updateState = {
          testQueues: testQueueData.rows,
          totalCount: testQueueData.count,
          currentPage: options.page
        };
        this.setState(updateState);
      } catch (e) {
        this.setState({
          error: e,
        });
        message.error('Unable to fetch test queue');
      } finally {
        this.setState({
          loading: false
        })
      }
    }
  }

  deleteTestQueue = async (queueId) => {
    try {
      await SWQAClient.deleteTestQueue(queueId);
      message.success("Test queue deleted");
      //fetch new set of test cases
      await this.fetchData(this.getFetchReqParams(this.props.search));
      if(this.state.testQueues.length === 0) {
        let page = this.state.currentPage-1;
        if(page > 1) {
          let pushUrlQuery = `?page=${page}`;
          return this.props.push(`/my-client/test-manager/test-queue${pushUrlQuery}`);
        }
      }
    } catch (e) {
      console.log(e);
      message.error("Problem occured.");
    }
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { goBack, push } = this.props;
    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>
                  <ActionBtn
                    type="secondary"
                    onClick={() => goBack()}
                  >
                    <Icon type="left" /> <IntlMessages id="back" />
                  </ActionBtn>
                  &nbsp; Test Queue
                </ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <Table
                  locale={{ emptyText: "No Test Queue available" }}
                  bordered
                  pagination={{
                    total: this.state.totalCount,
                    pageSize: this.state.limit,
                    current: this.state.currentPage,
                    onChange: (page) => {
                      let pushUrlQuery = `?page=${page}`;
                      return push(`/my-client/test-manager/test-queue${pushUrlQuery}`);
                    }
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

const mapStateToProps = state => ({
  ...state.My,
  pathname: state.router.location.pathname,
  search: state.router.location.search,
  hash: state.router.location.hash,
})

export default connect(
  mapStateToProps,
  {
    goBack,
    push
  }
)(TestQueueList);
