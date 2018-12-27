import React, { Component } from "react";
import { connect } from 'react-redux';
import { Row, Col, Icon, Spin, Button, Dropdown, Menu, message } from "antd";
import { get } from 'lodash';
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
//some actions for system app can be reused
import agencyActions from '@app/SystemApp/redux/agency/actions';

const { requestCurrentAgency, requestAgencyTeams } = agencyActions;

class TestQueueList extends Component {
  constructor() {
    super();
    this.state = {
      selectedQueue: [],
      agency: {},
      testQueues: [],
      loading: false,
      error: null,
      paginationOptions: {
        defaultCurrent: 1,
        current: 1,
        pageSize: 10,
        total: 1
      },
      assignQueue: {
        loading: false,
        error: null
      }
    };
    this.columns = [
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
  }

  componentDidMount() {
    const { requestCurrentAgency, requestAgencyTeams } = this.props;
    let activeCompanyTokenData = this.props.activeCompanyTokenData;
    let agencyId = get(activeCompanyTokenData, 'agencyData.agencyId', null);
    if(activeCompanyTokenData.type === 'agencyUser' && agencyId) {    
      requestCurrentAgency(agencyId);
      requestAgencyTeams(agencyId, {
        page: 1,
        pageSize: 50
      });
      this.fetchData({
        agencyId
      });
    }
  }

  fetchData = async (options) => {
    try {
      this.setState({loading: true});
      options.limit = this.state.paginationOptions.pageSize;
      options.status = 'unassigned';
      let testQueues = await SWQAClient.getTestQueues(options);
      let updateState = {
        loading: false,
        testQueues: testQueues.rows,
        paginationOptions: {
          ...this.state.paginationOptions,
          total: testQueues.count
        }
      };
      this.setState(updateState);
    } catch(e) {
      this.setState({
        error: e,
      });
    } finally {
      this.setState({
        loading: false
      })
    }
  }

  onTablePaginationChange = async (page, pageSize) => {
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
        let testQueues = await SWQAClient.getTestQueues({
          limit: pageSize,
          offset,
          status: 'unassigned'
        });
        this.setState({
          loading: false,
          testQueues: get(testQueues, 'rows', []),
          paginationOptions: {
            ...this.state.paginationOptions,
            total: testQueues.count
          }
        });
      } catch(e) {
        this.setState({ loading: false, testQueues: [] });
      }
    });
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
      message.success('queue assigned successfully');
      this.props.history('/my-agency/test-manager/assigned-tests');
    } catch(e) {
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

  handleTeamMenuClick = (e) => {
    console.log(e);

  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { currentAgency = { agencyData: { name: '' }, teamList: { rows: [], count: 0 } }, history } = this.props;
    //table row selection
    const rowSelection = {
      selectedRowKeys: this.state.selectedQueue,
      onChange: this.onSelectChange,
    };
    const teamsOptions = currentAgency.teamList.rows.map(team => (
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
                    onClick={() => history.goBack()}
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
                  locale={{ emptyText: "No test run available" }}
                  size="middle"
                  bordered
                  pagination={{
                    ...this.state.paginationOptions,
                    onChange: this.onTablePaginationChange
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

export default connect(
  state => ({
    ...state.Agency,
    ...state.My
  }),
  {
    requestCurrentAgency,
    requestAgencyTeams
  }
)(TestQueueList);