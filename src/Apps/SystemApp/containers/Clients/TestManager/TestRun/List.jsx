import React, { Component } from "react";
import { connect } from 'react-redux';
import { Row, Col, Icon, Spin } from "antd";
import { get } from 'lodash';
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
import clientActions from '@app/SystemApp/redux/client/actions';

const { requestCurrentClient } = clientActions;

class TestRunList extends Component {
  constructor() {
    super();
    this.state = {
      client: {},
      testRuns: [],
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
        title: "Agency Team",
        dataIndex: "agencyTeam.name",
        key: "agencyTeam"
      },
      {
        title: "Run Title",
        dataIndex: "runTitle",
        key: "runTitle"
      },
      {
        title: "Created",
        render: row => <Moment format={dateTime}>{row.createdAt}</Moment>,
        key: "createdAt"
      },
      {
        title: "TC Count",
        dataIndex: "tcCount",
        key: "tcCount"
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status"
      }
    ];
  }

  componentDidMount() {
    const { match, requestCurrentClient } = this.props;
    requestCurrentClient(match.params.clientId);
    this.fetchData({
      clientId: match.params.clientId
    });
  }

  async fetchData(options) {
    try {
      this.setState({loading: true});
      options.limit = this.state.paginationOptions.pageSize;
      let testRuns = await SWQAClient.getTestRuns(options);
      let updateState = {
        loading: false,
        testRuns: testRuns.rows,
        paginationOptions: {
          ...this.state.paginationOptions,
          total: testRuns.count
        }
      };
      if(options.clientTeamId) {
        updateState.selectedTeamId = parseInt(options.clientTeamId, 10); 
      }
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
        let testRuns = await SWQAClient.getTestRuns({
          clientId: this.props.match.params.clientId,
          limit: pageSize,
          offset
        });
        this.setState({
          loading: false,
          testRuns: get(testRuns, 'rows', []),
          paginationOptions: {
            ...this.state.paginationOptions,
            total: testRuns.count
          }
        });
      } catch(e) {
        this.setState({ loading: false, testRuns: [] });
      }
    });
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { currentClient, history } = this.props;
    return (
      <LayoutWrapper>
        <PageHeader>
          Client - {get(currentClient, 'clientData.name', '')}
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
                  &nbsp; Test Run
                </ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <Table
                  locale={{ emptyText: "No test run available" }}
                  size="middle"
                  bordered
                  pagination={{
                    ...this.state.paginationOptions,
                    onChange: this.onTablePaginationChange
                  }}
                  columns={this.columns}
                  dataSource={this.state.testRuns}
                  rowKey="testRunId"
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
)(TestRunList);
