import React, { Component } from "react";
import { Row, Col, Icon, Select, Tooltip, message } from "antd";
import LayoutWrapper from "../../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../../components/utility/pageHeader";
import basicStyle from "../../../../../settings/basicStyle";
import Box from "../../../../../components/utility/box";
import ActionButtons from "./partials/ActionButtons";
import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from "../../../crud.style";
import { getCompanies, getTeams } from "../../../../../helpers/http-api-client";
import {
  getSuites,
  getCompany,
  deleteTestCase,
  getTestCase
} from "../../../../../helpers/http-api-client";
import Moment from "react-moment";
import { dateTime } from "../../../../../constants/dateFormat";

const Option = Select.Option;

export default class extends Component {
  constructor() {
    super();
    this.state = {
      columns: [
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
          key: "suite"
        },
        {
          title: "Created by",
          dataIndex: "createdByUserId",
          key: "createdByUserId"
        },
        {
          title: "Actions",
          key: "actions",
          render: row => <ActionButtons row={row} delete={this.handleDelete} />
        }
      ],
      company: {},
      dataSource: [],
      paginationOptions: {
        defaultCurrent: 1,
        current: 1,
        pageSize: 5,
        total: 1
      },
      suites: [],
      selectedSuite: undefined
    };
    this.handleSuiteChange = this.handleSuiteChange.bind(this);
    this.isSuiteSelected = this.isSuiteSelected.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onTablePaginationChange = this.onTablePaginationChange.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      try {
        const resCompany = await getCompany(this.props.match.params.companyId);
        const resCompanySuites = await getSuites({
          query: {
            clientId: this.props.match.params.companyId
          },
          paginationOptions: this.state.paginationOptions
        });

        const {
          data: { rows = [], count }
        } = resCompanySuites;

        this.setState({
          loading: false,
          company: resCompany.data,
          suites: rows,
          paginationOptions: {
            ...this.state.paginationOptions,
            total: count
          },
        });
      } catch (error) {
        this.setState({ loading: false });
      }
    });
  }

  handleCompanyChange(companyId) {
    this.setState({ loading: true }, async () => {
      try {
        const resCompanySuites = await getSuites({
          query: { clientId: companyId }
        });
        this.setState({ suites: resCompanySuites.data.rows });
      } catch (error) {
        this.setState({ loading: false });
      }
    });
  }

  handleSuiteChange(suiteId) {
    const { companyId } = this.props.match.params;
    this.setState({ loading: true, selectedSuite: suiteId }, async () => {
      try {
        const resTestCase = await getTestCase({
          query: { clientId: companyId, testSuiteId: suiteId },
          paginationOptions: this.state.paginationOptions
        });
        const {
          data: { rows = [], count = 1 }
        } = resTestCase;
        this.setState({ dataSource: rows, loading: false });
      } catch (error) {
        this.setState({ loading: false });
      }
    });
  }

  updateRecords() {
    getTestCase({
      query: {
        clientId: this.props.match.params.companyId,
        testSuiteId: this.state.selectedSuite
      },
      paginationOptions: this.state.paginationOptions
    }).then(res => {
      this.setState({ dataSource: res.data.rows });
    });
  }

  isSuiteSelected() {
    return !!this.state.selectedSuite;
  }

  handleDelete(row) {
    deleteTestCase(row.testCaseId).then(res => {
      message.success("Successfully Deleted.");
      this.updateRecords();
    });
  }

  onTablePaginationChange(page, pageSize) {
    this.setState(
      {
        loading: true,
        paginationOptions: {
          ...this.state.paginationOptions,
          current: page,
          pageSize
        }
      },
      async () => {
        try{
          const resTestCase = await getTestCase({
            paginationOptions: this.state.paginationOptions
          });
          this.setState({
            loading: false,
            dataSource: resTestCase.data.rows,
            paginationOptions: {
              ...this.state.paginationOptions,
              total: resTestCase.data.count
            }
          });
        } catch(e) {
          this.setState({ loading: false, dataSource: [] });
        }
      }
    );
  }

  render() {
    const margin = {
      margin: "5px 5px 10px 0px"
    };

    const { rowStyle, colStyle, gutter } = basicStyle;
    const suiteOptions = this.state.suites.map(suite => (
      <Option key={suite.testSuiteId} value={suite.testSuiteId}>
        {suite.name}
      </Option>
    ));

    return (
      <LayoutWrapper>
        <PageHeader>
          {this.state.company && this.state.company.name
            ? this.state.company.name
            : ""}
        </PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Test Cases</ComponentTitle>
                <ButtonHolders>
                  <Tooltip
                    placement="topRight"
                    title={
                      !this.isSuiteSelected() ? "Please select Suite." : ""
                    }
                  >
                    <ActionBtn
                      type="primary"
                      disabled={!this.isSuiteSelected()}
                      onClick={() => {
                        this.props.history.push(`create/${this.state.selectedSuite}`);
                      }}
                    >
                      <Icon type="plus" />
                      Add New
                    </ActionBtn>
                  </Tooltip>
                </ButtonHolders>
              </TitleWrapper>
              <Row>
                <Col md={6} sm={24} xs={24} style={margin}>
                  <Select
                    showSearch
                    placeholder="Please Choose Test Suite"
                    style={{ width: "100%" }}
                    onChange={this.handleSuiteChange}
                  >
                    {suiteOptions}
                  </Select>
                </Col>
              </Row>
              <Table
                locale={{ emptyText: "Please Select Company name" }}
                size="middle"
                bordered
                pagination={{
                  ...this.state.paginationOptions,
                  onChange: this.onTablePaginationChange
                }}
                columns={this.state.columns}
                dataSource={this.state.dataSource}
                rowKey="testCaseId"
              />
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
