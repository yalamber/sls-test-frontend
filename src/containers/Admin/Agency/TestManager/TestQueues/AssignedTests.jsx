import React, {Component} from 'react';
import {Row, Col, Select, Spin, Checkbox, Radio} from 'antd';
import LayoutWrapper from '../../../../../components/utility/layoutWrapper.js';
import basicStyle from '../../../../../settings/basicStyle';
import Box from '../../../../../components/utility/box';

import {
  TitleWrapper,
  ComponentTitle,
  TableClickable as Table
} from '../../../crud.style';
import {getCompanies, getTeams} from "../../../../../actions/companyActions";
import {getSuites} from "../../../../../actions/testManagerActions";

const Option = Select.Option;
const RadioGroup = Radio.Group;


export default class extends Component {
  constructor() {
    super();
    this.state = {
      columns: [
        {
          title: 'Number',
          dataIndex: 'number',
          key: 'number',
        },
        {
          title: 'Test Case Title',
          dataIndex: 'title',
          key: 'title',
          sorter: true
        },
        {
          title: 'Test Run',
          dataIndex: 'runTitle',
          key: 'runTitle',
          sorter: true
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          sorter: true
        },
      ],
      dataSource: [
        {
          number: 111,
          title: 'Lorem Ipsum is simply dummy text of the printing',
          status: 'Not Run',
          runTitle: 'Spring 17'
        },
        {
          number: 112,
          title: 'Lorem Ipsum is simply dummy text of the printing',
          status: 'Running',
          runTitle: 'Spring 17'
        },
        {number: 113, title: 'Lorem Ipsum is simply dummy text of the printing', status: 'Pass', runTitle: 'Spring 17'},
      ],
      companies: [],
      teams: [],
      suites: [],
      selectedCompany: undefined,
      selectedTeam: undefined,
      selectedSuite: undefined,
      loading: false
    };
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.handleTeamChange = this.handleTeamChange.bind(this);
    this.handleSuiteChange = this.handleSuiteChange.bind(this);
  }

  componentDidMount() {
    getCompanies().then(res => {
      this.setState({companies: res.data});
    });

  }

  handleCompanyChange(companyId) {
    this.setState({selectedTeam: undefined});
    getTeams(companyId).then(res => {
      this.setState({teams: res.data});
    });
    this.setState({selectedCompany: companyId});
    this.updateRecords(companyId, null);
  }

  handleTeamChange(teamId) {
    this.setState({selectedTeam: teamId});
    this.updateRecords(null, teamId);
  }

  handleSuiteChange(suiteId) {
    this.setState({selectedSuite: suiteId});
  }

  updateRecords(companyId, teamId) {
    getSuites(companyId, teamId).then(res => {
      this.setState({suites: res.data})
    })
  }

  render() {
    const margin = {
      margin: '5px 5px 10px 0px'
    };
    const {rowStyle, colStyle, gutter} = basicStyle;
    const companiesOptions = this.state.companies.map(company => <Option
      key={company.clientId}>{company.name}</Option>);
    const teamsOptions = this.state.teams.map(team => <Option key={team.clientTeamId}>{team.name}</Option>);
    const suiteOptions = this.state.suites.map(suite => <Option key={suite.testSuiteId}>{suite.name}</Option>);

    return (

      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>{`<Agency Name> - <Team Name>`}</ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <Table
                  locale={{emptyText: 'Please Select Company name'}}
                  size="middle"
                  onRow={()=>({
                    onDoubleClick: ()=> alert("now running the test!")
                  })}
                  pagination={true}
                  columns={this.state.columns}
                  dataSource={this.state.dataSource}
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
