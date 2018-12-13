import React, { Component } from "react";
import { connect } from 'react-redux';
import { get } from 'lodash';
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

const { requestCurrentClient, requestClientTeams } = clientActions;
const Option = Select.Option;
const FormItem = Form.Item;

class SuiteList extends Component {
  constructor() {
    super();
    this.state = {
      testSuites: [],
      selectedTeamId: undefined,
      loading: true,
      error: null,
      paginationOptions: {
        defaultCurrent: 1,
        current: 1,
        pageSize: 10,
        total: 1
      },
    };
    this.handleTeamChange = this.handleTeamChange.bind(this);
    this.isTeamSelected = this.isTeamSelected.bind(this);
    this.deleteTestSuite = this.deleteTestSuite.bind(this);
    this.onTablePaginationChange = this.onTablePaginationChange.bind(this);
    this.columns = [
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
        render: row => <ActionButtons row={row} deleteTestSuite={this.deleteTestSuite} history={this.props.history} />
      }
    ];
  }

  componentDidMount() {
    const { match, requestCurrentClient, requestClientTeams, location } = this.props;
    let queryParams = qs.parse(location.search, { ignoreQueryPrefix: true });
    //TODO: check state and params if same clientId already
    requestCurrentClient(match.params.clientId);
    requestClientTeams(match.params.clientId, {
      page: 1,
      pageSize: 50
    });
    //get all test suites
    let reqParams = {};
    if(queryParams.teamId) {
      reqParams.clientTeamId = queryParams.teamId;
    } else {
      reqParams.clientId = match.params.clientId;
    }
    this.fetchTestSuite(reqParams);
  }

  async fetchTestSuite(options) {
    try {
      this.setState({loading: true});
      let testSuites = await SWQAClient.getTestSuites(options);
      let updateState = {
        loading: false,
        testSuites: testSuites.rows,
        paginationOptions: {
          ...this.state.paginationOptions,
          total: testSuites.count
        }
      };
      if(options.clientTeamId) {
        updateState.selectedTeamId = parseInt(options.clientTeamId, 10); 
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
        if(this.state.selectedTeamId) {
          params.clientTeamId = this.state.selectedTeamId;
        } else {
          params.clientId = this.props.match.params.clientId;
        }
        let testSuites = await SWQAClient.getTestSuites(params);
        this.setState({
          loading: false,
          testSuites: get(testSuites, 'rows', []),
          paginationOptions: {
            ...this.state.paginationOptions,
            total: testSuites.count
          }
        });
      } catch(e) {
        this.setState({ loading: false, dataSource: [] });
      }
    });
  }

  handleTeamChange(teamId) {
    let {history, match} = this.props;
    this.setState({
      selectedTeamId: teamId,
    }, () => {
      history.push(`/admin/client/${match.params.clientId}/test-manager/test-suite?teamId=${teamId}`);
      this.fetchTestSuite({
        clientTeamId: teamId
      });
    });
  }

  isTeamSelected() {
    return !!this.state.selectedTeamId;
  }

  deleteTestSuite(row) {
    
  }

  render() {
    const margin = {
      margin: "5px 5px 10px 0px"
    };
    const { rowStyle, colStyle, gutter } = basicStyle;

    const { currentClient = { clientData: { name: '' }, teamList: { rows: [], count: 0 } }, history } = this.props;
    const teamsOptions = (
      currentClient.teamList.rows.map(team => (
        <Option key={team.clientTeamId} value={team.clientTeamId}>
          {team.name}
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
                  &nbsp; Test Suites
                </ComponentTitle>
                <ButtonHolders>
                  <Tooltip
                    placement="topRight"
                    title={!this.isTeamSelected()? "Please select Team.": ""}>
                    <ActionBtn
                      type="primary"
                      disabled={!this.isTeamSelected()}
                      onClick={() => history.push(`/admin/client/team/${this.state.selectedTeamId}/test-manager/test-suite/create`)}>
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
                        {teamsOptions}
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                <Table
                  locale={{ emptyText: "No Test Suites available" }}
                  size="middle"
                  bordered
                  pagination={{
                    ...this.state.paginationOptions,
                    onChange: this.onTablePaginationChange
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



export default connect(
  state => ({
    ...state.Client
  }),
  {
    requestCurrentClient,
    requestClientTeams
  }
)(SuiteList);
