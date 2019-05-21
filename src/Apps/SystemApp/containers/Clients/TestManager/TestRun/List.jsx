import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { push, goBack } from 'connected-react-router';
import { Row, Col, Icon, Spin } from "antd";
import { omit } from 'lodash';
import qs from "qs";
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

class TestRunList extends Component {

  state = {
    client: {},
    testRuns: [],
    loading: false,
    error: null,
    limit: 10,
    totalCount: 0,
    currentPage: 1
  };

  columns = [
    {
      title: "Assigned Team",
      dataIndex: "testQueue.assignedTeam.name",
      key: "agencyTeam"
    },
    {
      title: "Assigned User",
      dataIndex: "testQueue.assignedUser.username",
      key: "agencyTeam"
    },
    {
      title: "Created",
      render: row => <Moment format={dateTime}>{row.createdAt}</Moment>,
      key: "createdAt"
    },
    {
      title: "Test Case",
      render: row => <Link to={`/admin/client/test-manager/test-case/${row.testQueue.testCase.testCaseId}/details`}>{row.testQueue.testCase.title}</Link>,
      key: "testCase"
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status"
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
    let { match } = this.props;
    let queryParams = qs.parse(search, { ignoreQueryPrefix: true });
    let reqParams = {};
    reqParams.clientId = match.params.clientId;
    reqParams.page = queryParams.page ? Number(queryParams.page) : 1;
    return reqParams;
  }

  async fetchData(options) {
    try {
      this.setState({ loading: true });
      let client = await SWQAClient.getClient(this.props.match.params.clientId);
      options.offset = (this.state.limit * options.page) - this.state.limit;
      options.limit = this.state.limit;
      let testRunData = await SWQAClient.getTestRuns(omit(options, ['page']));
      let updateState = {
        client,
        testRuns: testRunData.rows,
        totalCount: testRunData.count,
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

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { goBack, push} = this.props;
    return (
      <LayoutWrapper>
        <PageHeader>
          Client - {this.state.client.name}
        </PageHeader>
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
                  &nbsp; Test Runs
                </ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <Table
                  locale={{ emptyText: "No test run available" }}
                  bordered
                  pagination={{
                    total: this.state.totalCount,
                    pageSize: this.state.limit,
                    current: this.state.currentPage,
                    onChange: (page) => {
                      let pushUrlQuery = `?page=${page}`;
                      return push(`/admin/client/${this.props.match.params.clientId}/test-manager/test-run${pushUrlQuery}`);
                    }
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

const mapStateToProps = state => ({
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
)(TestRunList);
