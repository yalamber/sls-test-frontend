import React, { Component } from "react";
import { connect } from 'react-redux';
import { push, goBack } from 'connected-react-router';
import { get, omit } from 'lodash';
import qs from "qs";
import { Row, Col, Icon, Select, Tooltip, Spin, Form, message } from "antd";
import LayoutWrapper from "@components/utility/layoutWrapper";
import IntlMessages from '@components/utility/intlMessages';
import basicStyle from "@settings/basicStyle";
import Box from "@components/utility/box";
import ActionButtons from "./partials/ActionButtons";
import Moment from "react-moment";
import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from "@utils/crud.style";
import SWQAClient from '@helpers/apiClient';
import { dateTime } from "@constants/dateFormat";

const Option = Select.Option;
const FormItem = Form.Item;

class TestCaseList extends Component {
  state = {
    testCases: [],
    testSuites: [],
    selectedSuiteId: undefined,
    loading: true,
    error: null,
    limit: 10,
    totalCount: 0,
    currentPage: 1
  };
  columns = [
    {
      title: "Id",
      dataIndex: "testCaseId",
      key: "testCaseId"
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Last Updated",
      render: row => <Moment format={dateTime}>{row.updatedAt}</Moment>,
      key: "updatedAt"
    },
    {
      title: "Suite",
      dataIndex: "testSuite.name",
      key: "case"
    },
    {
      title: "Actions",
      key: "actions",
      render: row => <ActionButtons row={row} sendToQueue={this.sendToQueue} deleteTestCase={this.deleteTestCase} push={this.props.push} />
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

  getFetchReqParams = (search, minusPage = false) => {
    let queryParams = qs.parse(search, { ignoreQueryPrefix: true });
    let reqParams = {};
    if (queryParams.suiteId) {
      reqParams.testSuiteId = queryParams.suiteId;
    }
    reqParams.page = queryParams.page ? Number(queryParams.page) : 1;
    if(minusPage > 1) {
      reqParams.page = reqParams.page-1;
    }
    return reqParams;
  }

  pushPage = (page) => {
    let pushUrlQuery = `?page=${page}`;
    if(this.state.selectedSuiteId) {
      pushUrlQuery = `?suiteId=${this.state.selectedSuiteId}&page=${page}`
    }
    return this.props.push(`/my-client/test-manager/test-cases${pushUrlQuery}`);
  }

  fetchData = async (options) => {
    // get client id
    let activeCompanyTokenData = this.props.activeCompanyTokenData;
    let clientId = get(activeCompanyTokenData, 'clientData.clientId', null);
    if (activeCompanyTokenData.type === 'clientUser' && clientId) {
      this.setState({
        loading: true
      });
      try {
        let testSuiteData = await SWQAClient.getTestSuites({
          offset: 0,
          limit: 50,
          clientId
        });
        options.offset = (this.state.limit * options.page) - this.state.limit;
        options.limit = this.state.limit;
        let testCaseData = await SWQAClient.getTestCases(omit(options, ['page']));
        let updateState = {
          loading: false,
          testSuites: testSuiteData.rows,
          testCases: testCaseData.rows,
          totalCount: testCaseData.count,
          currentPage: options.page
        };
        if (options.testSuiteId) {
          updateState.selectedSuiteId = parseInt(options.testSuiteId, 10);
        }
        this.setState(updateState);
      } catch (e) {
        this.setState({
          loading: false,
          error: e
        });
        message.error('Unable to fetch test suites');
      }
    }
  }

  handleSuiteChange = (suiteId) => {
    let { push } = this.props;
    this.setState({
      selectedSuiteId: suiteId,
    }, () => push(`/my-client/test-manager/test-cases?suiteId=${suiteId}`));
  }

  isSuiteSelected = () => {
    return !!this.state.selectedSuiteId;
  }

  deleteTestCase = async (caseId) => {
    try {
      // await
      await SWQAClient.deleteTestCase(caseId);
      message.success("Test case deleted");
      //fetch new set of test cases
      await this.fetchData(this.getFetchReqParams(this.props.search));
      if(this.state.testCases.length === 0) {
        let page = this.state.currentPage-1;
        if(page > 1) {
          this.pushPage(page);
        }
      }
    } catch (e) {
      console.log(e);
      message.error("Problem occured.");
    }
  }

  async sendToQueue(row) {
    let data = {
      testCaseIds: [row.testCaseId],
    };
    return await SWQAClient.sendToQueue(data);
  }

  render() {
    const margin = {
      margin: "5px 5px 10px 0px"
    };
    const { rowStyle, colStyle, gutter } = basicStyle;

    const { push, goBack } = this.props;
    const suitesOptions = (
      this.state.testSuites.map(suite => (
        <Option key={suite.testSuiteId} value={suite.testSuiteId}>
          {suite.name}
        </Option>
      ))
    );
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
                  &nbsp; Test Cases
                </ComponentTitle>
                <ButtonHolders>
                  <Tooltip
                    placement="topRight"
                    title={!this.isSuiteSelected() ? "Please select Suite." : ""}>
                    <ActionBtn
                      type="primary"
                      disabled={!this.isSuiteSelected()}
                      onClick={() => push(`/my-client/test-manager/test-suite/${this.state.selectedSuiteId}/test-case/create`)}>
                      <Icon type="plus" />
                      Add New
                    </ActionBtn>
                  </Tooltip>
                </ButtonHolders>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <Row>
                  <Col md={6} sm={24} xs={24} style={margin}>
                    <FormItem label="Suite Name:">
                      <Select
                        showSearch
                        placeholder="Please Choose Suite"
                        style={{ width: "100%" }}
                        value={this.state.selectedSuiteId}
                        onChange={this.handleSuiteChange}
                        optionFilterProp="children"
                        filterOption={(input, option) => {
                          return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }}
                      >
                        {suitesOptions}
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                <Table
                  locale={{ emptyText: "No Test Cases available" }}
                  bordered
                  pagination={{
                    total: this.state.totalCount,
                    pageSize: this.state.limit,
                    current: this.state.currentPage,
                    onChange: this.pushPage
                  }}
                  columns={this.columns}
                  dataSource={this.state.testCases}
                  rowKey="testCaseId"
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
)(TestCaseList);
