import React, { Component } from "react";
import { connect } from 'react-redux';
import { push, goBack } from 'connected-react-router';
import { get, isArray, omit } from 'lodash';
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

class SuiteList extends Component {
  state = {
    teams: [],
    testSuites: [],
    selectedTeamId: undefined,
    loading: true,
    error: null,
    limit: 10,
    totalCount: 0,
    currentPage: 1
  };
  columns = [
    {
      title: "Id",
      dataIndex: "testSuiteId",
      key: "testSuiteId"
    },
    {
      title: "Title",
      dataIndex: "name",
      key: "title"
    },
    {
      title: "Last Updated",
      render: row => <Moment format={dateTime}>{row.updatedBy}</Moment>,
      key: "lastUpdated"
    },
    {
      title: "Team",
      dataIndex: "clientTeam.name",
      key: "team"
    },
    {
      title: "Actions",
      key: "actions",
      render: row => <ActionButtons row={row} deleteTestSuite={this.deleteTestSuite}
        sendToQueue={this.sendToQueue} push={this.props.push} />
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
    if (queryParams.teamId) {
      reqParams.clientTeamId = queryParams.teamId;
    }
    reqParams.page = queryParams.page ? Number(queryParams.page) : 1;
    return reqParams;
  }

  pushPage = (page) => {
    let pushUrlQuery = `?page=${page}`;
    if(this.state.selectedTeamId) {
      pushUrlQuery = `?teamId=${this.state.selectedTeamId}&page=${page}`
    }
    return this.props.push(`/my-client/test-manager/test-suites${pushUrlQuery}`);
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
        let teamData = await SWQAClient.getClientTeams(clientId, {
          offset: 0,
          limit: 50
        });
        options.offset = (this.state.limit * options.page) - this.state.limit;
        options.limit = this.state.limit;
        let testSuiteData = await SWQAClient.getTestSuites(omit(options, ['page']));
        let updateState = {
          loading: false,
          teams: teamData.rows,
          testSuites: testSuiteData.rows,
          totalCount: testSuiteData.count,
          currentPage: options.page
        };
        if (options.clientTeamId) {
          updateState.selectedTeamId = parseInt(options.clientTeamId, 10);
        } else {
          updateState.selectedTeamId = undefined;
        }
        this.setState(updateState);
      } catch (e) {
        this.setState({
          loading: false,
          error: e
        });
        message.error('Something went wrong!');
      }
    }
  }

  handleTeamChange = (teamId) => {
    let { push } = this.props;
    if(teamId === 'all') {
      this.setState({
        selectedTeamId: undefined,
      }, () => push(`/my-client/test-manager/test-suites`));
    } else {
      this.setState({
        selectedTeamId: teamId,
      }, () => push(`/my-client/test-manager/test-suites?teamId=${teamId}`));
    }
  }

  isTeamSelected = () => {
    return !!this.state.selectedTeamId;
  }

  deleteTestSuite = async (suiteId) => {
    try {
      await SWQAClient.deleteTestSuite(suiteId);
      message.success("Test suite deleted");
      //fetch new set of test suties
      await this.fetchData(this.getFetchReqParams(this.props.search));
      if(this.state.testSuites.length === 0) {
        let page = this.state.currentPage-1;
        if(page > 0) {
          this.pushPage(page);
        }
      }
    } catch (e) {
      console.log(e);
      message.error("Problem occured.");
    }
  }

  sendToQueue = async (row) => {
    if (isArray(row.testCases)) {
      let testCaseIds = row.testCases.map((testCase) => {
        return testCase.testCaseId;
      })
      let data = {
        testCaseIds: testCaseIds,
      };
      return await SWQAClient.sendToQueue(data);
    } else {
      throw new Error('Test case Ids not set');
    }
  }

  render() {
    const margin = {
      margin: "5px 5px 10px 0px"
    };
    const { rowStyle, colStyle, gutter } = basicStyle;

    const { goBack, push } = this.props;
    const teamsOptions = (
      this.state.teams.map(team => (
        <Option key={team.clientTeamId} value={team.clientTeamId}>
          {team.name}
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
                  &nbsp; Test Suites
                </ComponentTitle>
                <ButtonHolders>
                  <Tooltip
                    placement="topRight"
                    title={!this.isTeamSelected() ? "Please select Team." : ""}>
                    <ActionBtn
                      type="primary"
                      disabled={!this.isTeamSelected()}
                      onClick={() => push(`/my-client/team/${this.state.selectedTeamId}/test-manager/test-suite/create`)}>
                      <Icon type="plus" />
                      Add New
                    </ActionBtn>
                  </Tooltip>
                </ButtonHolders>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <Row>
                  <Col md={6} sm={24} xs={24} style={margin}>
                    <FormItem label="Team Name:">
                      <Select
                        showSearch
                        placeholder="Please Choose Team"
                        style={{ width: "100%" }}
                        value={this.state.selectedTeamId}
                        onChange={this.handleTeamChange}
                        optionFilterProp="children"
                        filterOption={(input, option) => {
                          return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }}
                      >
                        <Option key="all" value="all">
                          All teams
                        </Option>
                        {teamsOptions}
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                <Table
                  locale={{ emptyText: "No Test Suites available" }}
                  bordered
                  pagination={{
                    total: this.state.totalCount,
                    pageSize: this.state.limit,
                    current: this.state.currentPage,
                    onChange: this.pushPage
                  }}
                  columns={this.columns}
                  dataSource={this.state.testSuites}
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
)(SuiteList);
