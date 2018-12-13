import React, { Component } from "react";
import { connect } from 'react-redux';
import qs from "qs";
import { Row, Col, Icon, Select, Tooltip, Spin, Form } from "antd";
import LayoutWrapper from "@components/utility/layoutWrapper";
import PageHeader from "@components/utility/pageHeader";
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
import clientActions from '@app/SystemApp/redux/client/actions';
import { dateTime } from "@constants/dateFormat";

const { requestCurrentClient } = clientActions;
const Option = Select.Option;
const FormItem = Form.Item;

class TestCaseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testCases: [],
      testSuites: [],
      selectedSuiteId: undefined,
      loading: true,
      error: null,
    };
    this.handleSuiteChange = this.handleSuiteChange.bind(this);
    this.isSuiteSelected = this.isSuiteSelected.bind(this);
    this.deleteTestCase = this.deleteTestCase.bind(this);
    this.columns = [
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
        title: "Created by",
        dataIndex: "createdByUserId",
        key: "createdByUserId"
      },
      {
        title: "Actions",
        key: "actions",
        render: row => <ActionButtons row={row} delete={this.handleDelete} history={props.history} />
      }
    ];
  }

  componentDidMount() {
    const { match, requestCurrentClient, location } = this.props;
    let queryParams = qs.parse(location.search, { ignoreQueryPrefix: true });
    //TODO: check stat and params if same clientId already
    requestCurrentClient(match.params.clientId);
    //get all test cases
    let reqParams = {};
    if(queryParams.caseId) {
      reqParams.caseId = queryParams.caseId;
    } else {
      reqParams.clientId = match.params.clientId;
    }
    this.fetchTestSuites(match.params.clientId);
    this.fetchTestCase(reqParams);
  }

  async fetchTestSuites() {
    let testSuites = await SWQAClient.getTestSuites({
      limit: 50,
      clientId: this.props.match.params.clientId
    });
    console.log(testSuites);
    this.setState({
      testSuites: testSuites.rows
    });
  }

  async fetchTestCase(options) {
    try {
      this.setState({loading: true});
      let testCases = await SWQAClient.getTestCases(options);
      let updateState = {
        loading: false,
        testCases: testCases.rows
      };
      if(options.suiteId) {
        updateState.selectedSuiteId = parseInt(options.suiteId, 10); 
      }
      this.setState(updateState);
    } catch(e) {
      this.setState({
        loading: false,
        error: e,
      });
    }
  }

  handleSuiteChange(suiteId) {
    let {history, match} = this.props;
    this.setState({
      selectedSuiteId: suiteId,
    }, () => {
      history.push(`/admin/client/${match.params.clientId}/test-manager/test-case?suiteId=${suiteId}`);
      this.fetchTestCase({
        testSuiteId: suiteId
      });
    });
  }

  isSuiteSelected() {
    return !!this.state.selectedSuiteId;
  }

  deleteTestCase(row) {
    
  }

  render() {
    const margin = {
      margin: "5px 5px 10px 0px"
    };
    const { rowStyle, colStyle, gutter } = basicStyle;

    const { currentClient, history } = this.props;
    const suitesOptions = (
      this.state.testSuites.map(suite => (
        <Option key={suite.testSuiteId} value={suite.testSuiteId}>
          {suite.name}
        </Option>
      ))
    );
    return (
      <LayoutWrapper>
        <PageHeader>
          Client - {currentClient.clientData.name}
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
                  &nbsp; Test Cases
                </ComponentTitle>
                <ButtonHolders>
                  <Tooltip
                    placement="topRight"
                    title={!this.isSuiteSelected()? "Please select Suite.": ""}>
                    <ActionBtn
                      type="primary"
                      disabled={!this.isSuiteSelected()}
                      onClick={() => history.push(`/admin/client/test-manager/test-suite/${this.state.selectedSuiteId}/test-case/create`)}>
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
                  pagination={true}
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
    ...state.Client
  }),
  {
    requestCurrentClient
  }
)(TestCaseList);
