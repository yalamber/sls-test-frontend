import React, { Component } from "react";
import { connect } from 'react-redux';
import { push, goBack } from 'connected-react-router';
import { Row, Col, Icon, Spin, message, Menu, Button, Dropdown } from "antd";
import { get, omit } from 'lodash';
import qs from "qs";
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

class TestQueueList extends Component {
  state = {
    selectedQueue: [],
    teams: [],
    testQueues: [],
    loading: false,
    error: null,
    limit: 10,
    totalCount: 0,
    currentPage: 1,
    assignQueue: {
      loading: false,
      error: null
    }
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

  pushPage = (page) => {
    let pushUrlQuery = `?page=${page}`;
    return this.props.push(`/my-agency/test-manager/test-queue${pushUrlQuery}`);
  }

  fetchData = async (options) => {
    // get agency id
    let activeCompanyTokenData = this.props.activeCompanyTokenData;
    let agencyId = get(activeCompanyTokenData, 'agencyData.agencyId', null);
    if (activeCompanyTokenData.type === 'agencyUser' && agencyId) {
      try {
        this.setState({ loading: true });
        options.offset = (this.state.limit * options.page) - this.state.limit;
        options.limit = this.state.limit;
        options.status = 'unassigned';
        let teamsData = await SWQAClient.getAgencyTeams(agencyId, {
          limit: 50,
          offset: 0
        });
        let testQueueData = await SWQAClient.getTestQueues(omit(options, ['page']));
        let updateState = {
          teams: teamsData.rows,
          testQueues: testQueueData.rows,
          totalCount: testQueueData.count,
          currentPage: options.page
        };
        this.setState(updateState);
      } catch (e) {
        this.setState({
          error: e,
        });
        message.error('Something went wrong!');
      } finally {
        this.setState({
          loading: false
        })
      }
    }
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedQueue: selectedRowKeys });
  }

  assignToMe = async () => {
    try {
      this.setState({
        assignQueue: {
          loading: true
        }
      });
      let params = {
        testQueueIds: this.state.selectedQueue
      };
      await SWQAClient.assignTestQueue(params);
      message.success('Test assigned successfully');
      //fetch new test queue
      this.fetchData(this.getFetchReqParams(this.props.location.search));
      if(this.state.testQueues.length === 0) {
        let page = this.state.currentPage-1;
        if(page > 0) {
          this.pushPage(page);
        }
      }
    } catch (e) {
      console.log(e);
      this.setState({
        assignQueue: {
          error: e
        }
      });
      message.error('Something went wrong!');
    } finally {
      this.setState({
        assignQueue: {
          loading: false
        }
      })
    }
  }

  handleTeamMenuClick = async (e) => {
    try {
      this.setState({
        assignQueue: {
          loading: true
        }
      });
      let params = {
        testQueueIds: this.state.selectedQueue,
        assignedTeamId: e.key
      };
      //TODO: assign to team
      await SWQAClient.assignTestQueue(params);
      message.success('queue assigned successfully');
      this.fetchData(this.getFetchReqParams(this.props.location.search));
    } catch (e) {
      this.setState({
        assignQueue: {
          error: e
        }
      });
    } finally {
      this.setState({
        assignQueue: {
          loading: false
        }
      })
    }
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { goBack } = this.props;
    //table row selection
    const rowSelection = {
      selectedRowKeys: this.state.selectedQueue,
      onChange: this.onSelectChange,
    };
    const teamsOptions = this.state.teams.map(team => (
      <Menu.Item key={team.agencyTeamId}><Icon type="team" />{team.name}</Menu.Item>
    ));
    const teamMenu = (
      <Menu onClick={this.handleTeamMenuClick}>
        {teamsOptions}
      </Menu>
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
                  &nbsp; Test Queue
                </ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <Button onClick={this.assignToMe} disabled={this.state.selectedQueue.length === 0} style={{ marginBottom: 16, marginRight: 10 }}>
                  Assign to me
                </Button>
                <Dropdown overlay={teamMenu} disabled={this.state.selectedQueue.length === 0}>
                  <Button style={{ marginBottom: 16, marginRight: 10 }}>
                    Assign to team <Icon type="down" />
                  </Button>
                </Dropdown>
                <Table
                  rowSelection={rowSelection}
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
)(TestQueueList);
