import React, { Component } from "react";
import { connect } from 'react-redux';
import { Row, Col, Icon, Spin, message, Radio  } from "antd";
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
import agencyActions from '@app/SystemApp/redux/agency/actions';
import ActionButtons from "./partials/AssignedTestActionButtons";

const { requestCurrentAgency, requestAgencyTeams } = agencyActions;

class AssignedTestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agencyId: null,
      assignedTo: 'me',
      testQueues: [],
      loading: false,
      error: null,
      paginationOptions: {
        defaultCurrent: 1,
        current: 1,
        pageSize: 10,
        total: 1
      },
    };
    this.fetchData = this.fetchData.bind(this);
    this.onTablePaginationChange = this.onTablePaginationChange.bind(this);
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
      },
      {
        title: "",
        render: row => <ActionButtons row={row} unassign={this.unassign} history={props.history} />
      }
    ];
  }

  componentDidMount() {
    const { activeCompanyTokenData, requestCurrentAgency } = this.props;
    let agencyId = get(activeCompanyTokenData, 'agencyData.agencyId', null);
    if(activeCompanyTokenData.type === 'agencyUser' && agencyId) {    
      requestCurrentAgency(agencyId);
      requestAgencyTeams(agencyId, {
        page: 1,
        pageSize: 50
      });
      this.fetchData({
        agencyId: agencyId
      });
    }
  }

  async fetchData(options) {
    try {
      this.setState({loading: true});
      options.limit = this.state.paginationOptions.pageSize;
      options.status = 'assigned';
      if(this.state.assignedTo === 'team') {
        options.assignedToTeam = 1;
      }
      let testQueues = await SWQAClient.getTestQueues(options);
      let updateState = {
        agencyId: options.agencyId,
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

  async onTablePaginationChange(page, pageSize) {
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
          agencyId: this.props.match.params.agencyId,
          status: 'assigned',
          limit: pageSize,
          offset
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

  unassign = async (row) => {
    try {
      await SWQAClient.unassignTestQueue(row.testQueueId);
      message.success('queue unassigned successfully');
      this.fetchData({
        agencyId: this.props.currentAgency.agencyData.agencyId
      });
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

  onAssignedTypeChange = (e) => {
    this.setState({
      assignedTo: e.target.value
    }, () => {
      this.fetchData({
        agencyId: this.state.agencyId
      });
    });
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { history } = this.props;
    
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
                  &nbsp; Assigned Tests
                </ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                Show Tests assigned to: &nbsp;
                <Radio.Group defaultValue="me" buttonStyle="solid" 
                  style={{marginBottom: 16}} 
                  onChange={this.onAssignedTypeChange}>
                  <Radio.Button value="me">Me</Radio.Button>
                  <Radio.Button value="team">My Teams</Radio.Button>
                </Radio.Group>
                <Table
                  locale={{ emptyText: "No Tests available" }}
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
)(AssignedTestList);