import React, {Component} from 'react';
import {Row, Col, Icon, Select, Tooltip} from 'antd';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import basicStyle from '../../../settings/basicStyle';
import Box from '../../../components/utility/box';
import ActionButtons from "./partials/ActionButtons";

import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from '../crud.style';
import {deleteDashboard, getDashboards} from "../../../helpers/http-api-client";
import {getCompanies} from "../../../helpers/http-api-client";
import {message} from "antd/lib/index";

const Option = Select.Option;


export default class extends Component {
  constructor() {
    super();
    this.state = {
      columns: [
        {
          title: 'Board Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Team Name',
          dataIndex: 'clientTeam.name',
          key: 'team_name',
        },
        {
          title: 'Team Admin',
          dataIndex: 'clientTeam.client.admin.username',
          key: 'team_admin',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: 'Actions',
          key: 'actions',
          render: (row) => <ActionButtons row={row} delete={this.handleDelete}/>
        }
      ],
      dataSource: [],
      companies: [],
      selectedCompany: {},
      isCompanySelected: false,
    };
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    getCompanies().then(res => {
      this.setState({companies: res.data})
    });
    this.fetchData();
  }

  handleCompanyChange(companyId) {
    getDashboards(companyId).then(res => {
      this.setState({dataSource: res.data, isCompanySelected: true, selectedCompany: companyId})
    });
  }

  handleDelete(row) {
    deleteDashboard(row.dashboardId).then(res => {
      message.success('Successfully Deleted.');
      this.fetchData();
    })
  }

  fetchData() {
    getDashboards().then(res => {
      this.setState({dataSource: res.data})
    });
  }

  render() {
    const margin = {
      margin: '5px 5px 10px 0'
    };
    const {rowStyle, colStyle, gutter} = basicStyle;
    const companiesOptions = this.state.companies.map(company => <Option
      key={company.clientId}>{company.name}</Option>);

    return (

      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Dashboard List</ComponentTitle>
                <ButtonHolders>
                  <Tooltip placement="topRight" title={!this.state.isCompanySelected ? 'Please select company.' : ''}>
                    <ActionBtn type="primary" disabled={!this.state.isCompanySelected} onClick={() => {
                      this.props.history.push('create/' + this.state.selectedCompany)
                    }}>
                      <Icon type="plus"/>
                      Add New
                    </ActionBtn>
                  </Tooltip>
                </ButtonHolders>
              </TitleWrapper>
              <Row>
                <Col md={6} sm={24} xs={24}>
                  <Select showSearch placeholder="Please Choose Company Name" style={{...margin, width: '100%'}}
                          onChange={this.handleCompanyChange}>
                    {companiesOptions}
                  </Select>
                </Col>
              </Row>
              <Table
                locale={{emptyText: 'Selected company has not any dashboard list.'}}
                size="middle"
                bordered
                pagination={true}
                columns={this.state.columns}
                dataSource={this.state.dataSource}
                rowKey="dashboardId"
              />
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
