import React, {Component} from 'react';
import {Row, Col, Icon, Select, Tooltip} from 'antd';
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
import {getCompanies, getTeams} from "../../../../actions/companyActions";
import {getCases} from "../../../../actions/testManagerActions";

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
          dataIndex: 'lastUpdated',
          key: 'lastUpdated',
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
          render: (row) => <ActionButtons row={row}/>
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
  }

  componentDidMount() {
    getCompanies().then(res => {
      this.setState({companies: res.data})
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

  render() {
    const margin = {
      margin: '5px 5px 10px 0'
    };
    const {rowStyle, colStyle, gutter} = basicStyle;
    const companiesOptions = this.state.companies.map(company => <Option key={company.id}>{company.name}</Option>);
    const teamsOptions = this.state.teams.map(team => <Option key={team.id}>{team.name}</Option>);

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
                <Col md={6} sm={24} xs={24}>
                  <Select placeholder="Please Choose Company Name" style={{...margin, width: '100%'}}
                          onChange={this.handleCompanyChange}>
                    {companiesOptions}
                  </Select>
                </Col>
                <Col md={6} sm={24} xs={24}>
                  <Select placeholder="Please Choose Team" style={{width: '100%', margin: '5px 5px 10px 20px'}}
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
              />
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
