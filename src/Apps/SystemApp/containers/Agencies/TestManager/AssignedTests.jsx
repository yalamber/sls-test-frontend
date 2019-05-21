import React, { Component } from "react";
import { connect } from 'react-redux';
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

class AssignedTestList extends Component {
  state = {
    agency: {},
    testQueues: [],
    loading: false,
    error: null,
    limit: 10,
    totalCount: 0,
    currentPage: 1
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
    let { match } = this.props;
    let queryParams = qs.parse(search, { ignoreQueryPrefix: true });
    let reqParams = {};
    reqParams.agencyId = match.params.agencyId;
    reqParams.status = 'assigned';
    reqParams.page = queryParams.page ? Number(queryParams.page) : 1;
    return reqParams;
  }

  async fetchData(options) {
    try {
      this.setState({ loading: true });
      let agency = await SWQAClient.getAgency(this.props.match.params.agencyId);
      options.offset = (this.state.limit * options.page) - this.state.limit;
      options.limit = this.state.limit;
      let testQueueData = await SWQAClient.getTestQueues(omit(options, ['page']));
      let updateState = {
        agency,
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

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { currentAgency, goBack, push } = this.props;
    return (
      <LayoutWrapper>
        <PageHeader>
          Agency - {this.state.agency.name}
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
                  &nbsp; Assigned Tests
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
                    onChange: (page) => {
                      let pushUrlQuery = `?page=${page}`;
                      return push(`/admin/agency/${this.props.match.params.agencyId}/test-manager/assigned-tests${pushUrlQuery}`);
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
)(AssignedTestList);
