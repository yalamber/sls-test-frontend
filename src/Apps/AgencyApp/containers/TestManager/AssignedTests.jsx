import React, { Component } from "react";
import { connect } from 'react-redux';
import qs from 'qs';
import { omit, get, find } from 'lodash';
import { push, goBack } from 'connected-react-router';
import { Row, Col, Icon, Spin, message, Button, Menu, Dropdown } from "antd";
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
import ActionButtons from './partials/AssignedTestActionButtons';
import SWQAClient from '@helpers/apiClient';
import { dateTime } from "@constants/dateFormat";

const ButtonGroup = Button.Group;

class AssignedTestList extends Component {
  state = {
    agencyId: null,
    assignedToType: 'me', //me or team
    selectedAssignedTeam: null,
    teams: [],
    testQueues: [],
    loading: false,
    error: null,
    limit: 10,
    totalCount: 0,
    currentPage: 1,
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
      title: "",
      render: row => <ActionButtons row={row} unassign={this.unassign} push={this.props.push} />
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
    if(queryParams.assignedTeamId) {
      reqParams.assignedTeamId = queryParams.assignedTeamId
    }
    reqParams.page = queryParams.page ? Number(queryParams.page) : 1;
    return reqParams;
  }

  fetchData = async (options) => {
    // get agency id
    let activeCompanyTokenData = this.props.activeCompanyTokenData;
    let agencyId = get(activeCompanyTokenData, 'agencyData.agencyId', null);
    if (activeCompanyTokenData.type === 'agencyUser' && agencyId) {
      try {
        this.setState({ loading: true });
        let teamsData = await SWQAClient.getAgencyTeams(agencyId, {
          limit: 50,
          offset: 0
        });
        options.offset = (this.state.limit * options.page) - this.state.limit;
        options.limit = this.state.limit;
        options.status = 'assigned';
        let testQueueData = await SWQAClient.getTestQueues(omit(options, ['page']));
        let updateState = {
          teams: teamsData.rows,
          testQueues: testQueueData.rows,
          totalCount: testQueueData.count,
          currentPage: options.page
        };
        if(options.assignedTeamId) {
          updateState.assignedTeamId = options.assignedTeamId;
          updateState.assignedToType = 'team';
        }
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

  unassign = async (row) => {
    try {
      await SWQAClient.unassignTestQueue(row.testQueueId);
      message.success('queue unassigned successfully');
      //fetch new test queue
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

  handleMeClick = (e) => {
    this.setState({
      assignedToType: 'me',
      selectedAssignedTeam: null,
      loading: true
    }, () => this.props.push(`/my-agency/test-manager/assigned-tests`));
  }

  handleTeamMenuClick = (e) => {
    if (e.key) {
      let selectedTeam = find(this.state.teams, function (o) { 
        return o.agencyTeamId === parseInt(e.key); 
      });
      this.setState({
        selectedAssignedTeam: selectedTeam,
        assignedToType: 'team',
        loading: true
      }, () => this.props.push(`/my-agency/test-manager/assigned-tests?assignedTeamId=${selectedTeam.agencyTeamId}`));
    }
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { push, goBack } = this.props;
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
                  &nbsp; Assigned Tests  {this.state.selectedAssignedTeam ? `for Team ${this.state.selectedAssignedTeam.name}` : ''}
                </ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <div style={{ marginBottom: 15 }}>
                  Show Tests assigned to: &nbsp;
                  <ButtonGroup>
                    <Button type={(this.state.assignedToType === 'me' ? 'primary' : 'default')} onClick={this.handleMeClick}>Me</Button>
                    <Dropdown overlay={teamMenu}>
                      <Button type={(this.state.assignedToType === 'team' ? 'primary' : 'default')}>
                        My Teams <Icon type="down" />
                      </Button>
                    </Dropdown>
                  </ButtonGroup>
                </div>
                <Table
                  locale={{ emptyText: "No Tests available" }}
                  bordered
                  pagination={{
                    total: this.state.totalCount,
                    pageSize: this.state.limit,
                    current: this.state.currentPage,
                    onChange: (page) => {
                      let pushUrlQuery = `?page=${page}`;
                      if(this.state.selectedAssignedTeam) {
                        pushUrlQuery = `?assignedTeamId=${this.state.selectedAssignedTeam.agencyTeamId}&page=${page}`
                      }
                      return push(`/my-agency/test-manager/assigned-tests${pushUrlQuery}`);
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
)(AssignedTestList);
