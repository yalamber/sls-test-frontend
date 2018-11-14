import React, {Component} from 'react';
import {Row, Col, Icon, Select, Tooltip, message} from 'antd';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import basicStyle from '../../../../settings/basicStyle';
import Box from '../../../../components/utility/box';
import ActionButtons from "./partials/ActionButtons";
import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from '../../crud.style';
import {getCompanies, getTeams} from "../../../../helpers/http-api-client";
import {deleteTestCase, getCases} from "../../../../helpers/http-api-client";
import Moment from "react-moment";
import {dateTime} from "../../../../constants/dateFormat";

const Option = Select.Option;


export default class extends Component {
  constructor() {
    super();
    this.state = {
      columns: [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Last Updated',
          render: (row) => <Moment format={dateTime}>{row.updatedAt}</Moment>,
          key: 'updatedAt',
        },
        {
          title: 'Suite',
          dataIndex: 'suite',
          key: 'suite',
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
      selectedCompany: 0,
      selectedTeam: 0,
    };
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.handleTeamChange = this.handleTeamChange.bind(this);
    this.isCompanyAndTeamSelected = this.isCompanyAndTeamSelected.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    getCompanies().then(res => {
      this.setState({companies: res.data.rows})
    });
  }

  handleCompanyChange(companyId) {
    getTeams(companyId).then(res => {
      this.setState({teams: res.data});
    });
    this.setState({selectedCompany: companyId});
    this.updateRecords();
  }

  handleTeamChange(teamId) {
    this.setState({selectedTeam: teamId});
    this.updateRecords();
  }

  updateRecords() {
    getCases(this.state.selectedCompany, this.state.selectedTeam).then(res => {
      this.setState({dataSource: res.data})
    })
  }

  isCompanyAndTeamSelected() {
    return !!this.state.selectedCompany && !!this.state.selectedTeam;
  }

  handleDelete(row) {
    deleteTestCase(row.testCaseId).then(res => {
      message.success('Successfully Deleted.');
      this.updateRecords();
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
                <ComponentTitle>Test Cases</ComponentTitle>
                <ButtonHolders>
                  <Tooltip placement="topRight"
                           title={!this.isCompanyAndTeamSelected() ? 'Please select company and team.' : ''}>
                    <ActionBtn type="primary" disabled={!this.isCompanyAndTeamSelected()} onClick={() => {
                      this.props.history.push('create/' + this.state.selectedCompany + '/' + this.state.selectedTeam)
                    }}>
                      <Icon type="plus"/>
                      Add New
                    </ActionBtn>
                  </Tooltip>
                </ButtonHolders>
              </TitleWrapper>
              <Row>
                <Col md={6} sm={24} xs={24} style={margin}>
                  <Select showSearch
                          placeholder="Please Choose Company Name"
                          style={{width: '100%'}}
                          onChange={this.handleCompanyChange}>
                    {companiesOptions}
                  </Select>
                </Col>
                <Col md={6} sm={24} xs={24} style={margin}>
                  <Select showSearch
                          placeholder="Please Choose Team"
                          style={{width: '100%'}}
                          onChange={this.handleTeamChange}>
                    {teamsOptions}
                  </Select>
                </Col>
              </Row>
              <Table
                locale={{emptyText: 'Please Select Company name'}}
                size="middle"
                bordered
                pagination={true}
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
