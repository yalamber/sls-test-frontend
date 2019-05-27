import React, { Component } from "react";
import { connect } from 'react-redux';
import { Row, Col, Icon, Spin } from "antd";
import qs from 'qs';
import { get } from 'lodash';
import { push, goBack } from 'connected-react-router';
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

class CompletedTestList extends Component {

  state = {
    testQueues: [],
    loading: false,
    error: null,
    limit: 10,
    totalCount: 0,
    currentPage: 1,
  };

  columns = [
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
    if (queryParams.assignedTeamId) {
      reqParams.assignedTeamId = queryParams.assignedTeamId
    }
    reqParams.page = queryParams.page ? Number(queryParams.page) : 1;
    return reqParams;
  }

  pushPage = (page) => {
    let pushUrlQuery = `?page=${page}`;
    return this.props.push(`/my-agency/test-manager/completed-tests${pushUrlQuery}`);
  };

  async fetchData(options) {
    // get agency id
    let activeCompanyTokenData = this.props.activeCompanyTokenData;
    let agencyId = get(activeCompanyTokenData, 'agencyData.agencyId', null);
    if (activeCompanyTokenData.type === 'agencyUser' && agencyId) {
      try {
        this.setState({ loading: true });
        options.offset = (this.state.limit * options.page) - this.state.limit;
        options.limit = this.state.limit;
        options.status = 'completed';
        let testQueueData = await SWQAClient.getTestQueues(options);
        let updateState = {
          loading: false,
          testQueues: testQueueData.rows,
          totalCount: testQueueData.count,
          currentPage: options.page
        };
        this.setState(updateState);
      } catch (e) {
        this.setState({
          error: e,
        });
      } finally {
        this.setState({
          loading: false
        })
      }
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
                  &nbsp; Completed Tests
                </ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <Table
                  locale={{ emptyText: "No Tests available" }}
                  bordered
                  pagination={{
                    total: this.state.totalCount,
                    pageSize: this.state.limit,
                    current: this.state.currentPage,
                    onChange: this.pushPage
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
)(CompletedTestList);
