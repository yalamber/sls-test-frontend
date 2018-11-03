import React, { Component } from "react";
import CommonFilter from "../../../components/CommonFilter";
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import {
  TableClickable as Table,
  TitleWrapper,
  ComponentTitle
} from "../crud.style";
import { Row, Col, Radio, Select } from "antd";
import Box from "../../../components/utility/box";
import basicStyle from "../../../settings/basicStyle";

import { getCompanies, getTeams } from "../../../actions/companyActions";
import { getSuites } from "../../../actions/testManagerActions";
import CommonActionButton from "../../../components/CommonActionButton";

const RadioGroup = Radio.Group;
const { Option } = Select;
const { rowStyle, colStyle, gutter } = basicStyle;

const columns = [
  {
    title: "Date / Time",
    dataIndex: "date",
    render: text => <a href="javascript:;">{text}</a>,
    defaultSortOrder: "ascend",
    sorter: (a, b) => a.date > b.date
  },
  {
    title: "Number",
    dataIndex: "number",
    defaultSortOrder: "ascend",
    sorter: (a, b) => a.number > b.number
  },
  {
    title: "Test Case Title",
    dataIndex: "title",
    defaultSortOrder: "ascend",
    sorter: (a, b) => a.title > b.title
  },
  {
    title: "Status",
    dataIndex: "status",
    defaultSortOrder: "ascend",
    sorter: (a, b) => a.status > b.status
  },
  {
    title: "Run Title",
    dataIndex: "runTitle",
    defaultSortOrder: "ascend",
    sorter: (a, b) => a.runTitle > b.runTitle
  }
];
const data = [
  {
    id: 1,
    date: new Date().toString(),
    number: 1,
    title: "Some Test Title",
    status: "current state",
    runTitle: "this is some run title"
  },
  {
    id: 2,
    date: new Date().toString(),
    number: 2234,
    title: "2 Some Test Title",
    status: "2 current state",
    runTitle: "2 this is some run title"
  },
  {
    id: 3,
    date: new Date().toString(),
    number: 22,
    title: "3 Some Test Title",
    status: "3 current state",
    runTitle: "3 this is some run title"
  }
];

export default class CompletedTests extends Component {
  constructor() {
    super();
    this.state = {
      companies: [],
      teams: [],
      suites: [],
      selectedCompany: undefined,
      selectedTeam: undefined,
      selectedSuite: undefined
    };

    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.handleTeamChange = this.handleTeamChange.bind(this);
    this.handleSuiteChange = this.handleSuiteChange.bind(this);

    data.forEach(datum => {
      datum._historyPushEdit = `complete-tests/edit/${datum.id}`;
    });

    if (columns[columns.length-1].key !== "actions") {
      columns.push({
        title: "Actions",
        key: "actions",
        render: row => (
          <CommonActionButton
            row={row}
            edit={() => this.props.history.push(row._historyPushEdit)}
          />
        )
      });
    }
  }

  componentDidMount() {
    getCompanies().then(res => {
      this.setState({ companies: res.data });
    });
  }

  handleCompanyChange(companyId) {
    this.setState({ selectedTeam: undefined });
    getTeams(companyId).then(res => {
      this.setState({ teams: res.data });
    });
    this.setState({ selectedCompany: companyId });
    this.updateRecords(companyId, null);
  }

  handleTeamChange(teamId) {
    this.setState({ selectedTeam: teamId });
    this.updateRecords(null, teamId);
  }

  handleSuiteChange(suiteId) {
    this.setState({ selectedSuite: suiteId });
  }

  render() {
    // rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      },
      getCheckboxProps: record => ({
        disabled: record.name === "Disabled User", // Column configuration not to be checked
        name: record.name
      })
    };

    const companiesOptions = this.state.companies.map(company => (
      <Option key={company.clientId}>{company.name}</Option>
    ));
    const teamsOptions = this.state.teams.map(team => (
      <Option key={team.clientTeamId}>{team.name}</Option>
    ));
    const suiteOptions = this.state.suites.map(suite => (
      <Option key={suite.testSuiteId}>{suite.name}</Option>
    ));

    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Completed Tests</ComponentTitle>
              </TitleWrapper>
              <CommonFilter />
              <Table
                onRow={record => {
                  return {
                    onDoubleClick: () => {
                      this.props.history.push(record._historyPushEdit);
                    }
                  };
                }}
                dataSource={data}
                columns={columns}
                rowSelection={rowSelection}
              />
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
