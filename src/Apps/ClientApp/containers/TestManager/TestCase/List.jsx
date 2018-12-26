import React, { Component } from "react";
import { connect } from 'react-redux';
import { get } from 'lodash';
import qs from "qs";
import Moment from "react-moment";
import { Row, Col, Icon, Select, Tooltip, Spin, Form } from "antd";
import LayoutWrapper from "@components/utility/layoutWrapper";
import IntlMessages from '@components/utility/intlMessages';
import basicStyle from "@settings/basicStyle";
import Box from "@components/utility/box";
import ActionButtons from "./partials/ActionButtons";
import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from "@utils/crud.style";
import SWQAClient from '@helpers/apiClient';
import clientActions from '@app/SystemApp/redux/client/actions';
import { dateTime } from "@constants/dateFormat";

const { requestCurrentClient } = clientActions;
const Option = Select.Option;
const FormItem = Form.Item;

//TODO work on search system for test suites

class TestCaseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testCases: [],
      testSuites: [],
      selectedSuiteId: undefined,
      loading: true,
      error: null,
      paginationOptions: {
        defaultCurrent: 1,
        current: 1,
        pageSize: 10,
        total: 1
      },
    };
    this.handleSuiteChange = this.handleSuiteChange.bind(this);
    this.isSuiteSelected = this.isSuiteSelected.bind(this);
    this.deleteTestCase = this.deleteTestCase.bind(this);
    this.sendToQueue = this.sendToQueue.bind(this);
    this.onTablePaginationChange = this.onTablePaginationChange.bind(this);
    this.columns = [
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
        render: row => <ActionButtons row={row} sendToQueue={this.sendToQueue} delete={this.handleDelete} history={props.history} />
      }
    ];
  }

  componentDidMount() {
    const { requestCurrentClient, location, activeCompanyTokenData } = this.props;
    let queryParams = qs.parse(location.search, { ignoreQueryPrefix: true });
    //TODO: check stat and params if same clientId already
    //get client id
    let clientId = get(activeCompanyTokenData, 'clientData.clientId', null);
    if(activeCompanyTokenData.type === 'clientUser' && clientId) {  
      requestCurrentClient(clientId);
      //get all test cases
      let reqParams = {};
      if(queryParams.suiteId) {
        reqParams.testSuiteId = queryParams.suiteId;
      } else {
        reqParams.clientId = clientId;
      }
      this.fetchTestSuites(clientId);
      this.fetchTestCase(reqParams); 
    }
  }

  async fetchTestSuites(clientId) {
    let testSuites = await SWQAClient.getTestSuites({
      limit: 50,
      clientId
    });
    this.setState({
      testSuites: testSuites.rows
    });
  }

  async fetchTestCase(options) {
    try {
      this.setState({loading: true});
      options.limit = this.state.paginationOptions.pageSize;
      let testCases = await SWQAClient.getTestCases(options);
      let updateState = {
        loading: false,
        testCases: testCases.rows,
        paginationOptions: {
          ...this.state.paginationOptions,
          total: testCases.count
        }
      };
      if(options.testSuiteId) {
        updateState.selectedSuiteId = parseInt(options.testSuiteId, 10); 
      }
      this.setState(updateState);
    } catch(e) {
      this.setState({
        loading: false,
        error: e,
      });
    }
  }

  onTablePaginationChange(page, pageSize) {
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
        let params = {
          limit: pageSize,
          offset
        };
        if(this.state.selectedSuiteId) {
          params.testSuiteId = this.state.selectedSuiteId;
        } else {
          params.clientId = this.props.match.params.clientId;
        }
        let testRuns = await SWQAClient.getTestCases(params);
        this.setState({
          loading: false,
          testRuns: get(testRuns, 'rows', []),
          paginationOptions: {
            ...this.state.paginationOptions,
            total: testRuns.count
          }
        });
      } catch(e) {
        this.setState({ testRuns: [], error: e });
      } finally {
        this.setState({ loading: false });
      }
    });
  }

  handleSuiteChange(suiteId) {
    let {history} = this.props;
    this.setState({
      selectedSuiteId: suiteId,
    }, () => {
      history.push(`/my-client/test-manager/test-cases?suiteId=${suiteId}`);
      this.fetchTestCase({
        testSuiteId: suiteId
      });
    });
  }

  isSuiteSelected() {
    return !!this.state.selectedSuiteId;
  }

  async deleteTestCase(row) {
    
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

    const { history } = this.props;
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
                    onClick={() => history.goBack()}
                  >
                    <Icon type="left" /> <IntlMessages id="back" />
                  </ActionBtn>
                  &nbsp; Test Cases
                </ComponentTitle>
                <ButtonHolders>
                  <Tooltip
                    placement="topRight"
                    title={!this.isSuiteSelected()? "Please select Suite.": ""}>
                    <ActionBtn
                      type="primary"
                      disabled={!this.isSuiteSelected()}
                      onClick={() => history.push(`/my-client/test-manager/test-suite/${this.state.selectedSuiteId}/test-case/create`)}>
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
                  size="middle"
                  bordered
                  pagination={{
                    ...this.state.paginationOptions,
                    onChange: this.onTablePaginationChange
                  }}
                  columns={this.columns}
                  dataSource={this.state.testCases}
                  rowKey="testSuiteId"
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
)(TestCaseList);
