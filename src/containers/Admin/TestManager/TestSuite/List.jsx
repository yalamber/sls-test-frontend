import React, {Component} from 'react';
import {Row, Col, Icon, Select, Tooltip, Spin, Form} from 'antd';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import basicStyle from '../../../../settings/basicStyle';
import Box from '../../../../components/utility/box';
import ActionButtons from "./partials/ActionButtons";
import Moment from 'react-moment';


import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from '../../crud.style';
import {getCompanies, getTeams} from "../../../../helpers/http-api-client";
import {deleteSuite, getSuites} from "../../../../helpers/http-api-client";
import {dateTime} from "../../../../constants/dateFormat";

const Option = Select.Option;
const FormItem = Form.Item;


export default class extends Component {
  constructor() {
    super();
    this.state = {
      columns: [
        {
          title: 'Title',
          dataIndex: 'name',
          key: 'title',
        },
        {
          title: 'Last Updated',
          render: (row) => <Moment format={dateTime}>{row.updatedBy}</Moment>,
          key: 'lastUpdated',
        },
        {
          title: 'Team',
          dataIndex: 'clientTeam.name',
          key: 'team',
        },
        {
          title: 'Last Updated by',
          dataIndex: 'lastUpdatedBy',
          key: 'lastUpdatedBy',
        },
        {
          title: 'Actions',
          key: 'actions',
          render: (row) => <ActionButtons row={row} delete={this.handleDelete}/>
        }
      ],
      dataSource: [],
      companies: [],
      teams: [],
      selectedCompany: undefined,
      selectedTeam: undefined,
      loading: false
    };
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.handleTeamChange = this.handleTeamChange.bind(this);
    this.isCompanyAndTeamSelected = this.isCompanyAndTeamSelected.bind(this);
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    getCompanies().then(res => {
      this.setState({companies: res.data});
      this.handleCompanyChange(this.props.match.params.companyId);
      this.handleTeamChange(this.props.match.params.teamId)
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

  updateRecords(companyId, teamId) {
    this.setState({loading: true});
    getSuites(companyId, teamId).then(res => {
      this.setState({dataSource: res.data})
    }).finally(() => {
      this.setState({loading: false});
    })
  }

  isCompanyAndTeamSelected() {
    return !!this.state.selectedCompany && !!this.state.selectedTeam;
  }

  handleDelete(id) {
    deleteSuite(id).then(res => {
      this.updateRecords(this.state.selectedCompany, this.state.selectedTeam);
    }).catch(error => {
      this.updateRecords(this.state.selectedCompany, this.state.selectedTeam);
      console.log(error);
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

    return (

      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Test Suites </ComponentTitle>
                <ButtonHolders>
                  <Tooltip placement="topRight"
                           title={!this.isCompanyAndTeamSelected() ? 'Please select company and team.' : ''}>
                    <ActionBtn type="primary" disabled={!this.isCompanyAndTeamSelected()} onClick={() => {
                      this.props.history.push('/dashboard/test-manager/suite/create/' + this.state.selectedCompany + '/' + this.state.selectedTeam)
                    }}>
                      <Icon type="plus"/>
                      Add New
                    </ActionBtn>
                  </Tooltip>
                </ButtonHolders>
              </TitleWrapper>
              <Row>
                <Col md={6} sm={24} xs={24} style={margin}>
                  <FormItem label="Company Name *">
                    <Select showSearch
                            placeholder="Please Choose Company Name"
                            style={{width: '100%'}}
                            onChange={this.handleCompanyChange}
                            value={this.state.selectedCompany}>
                      {companiesOptions}
                    </Select>
                  </FormItem>
                </Col>
                <Col md={6} sm={24} xs={24} style={margin}>
                  <FormItem label="Team Name:">
                    <Select showSearch
                            placeholder="Please Choose Team"
                            style={{width: '100%'}}
                            onChange={this.handleTeamChange}
                            value={this.state.selectedTeam}>
                      {teamsOptions}
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Spin spinning={this.state.loading}>
                <Table
                  locale={{emptyText: 'Please Select Company name'}}
                  size="middle"
                  bordered
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
