import React, {Component} from 'react';
import {Row, Col, Icon, message, Spin} from 'antd';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from "../../../../components/utility/pageHeader";
import {withRouter} from 'react-router-dom'

import basicStyle from '../../../../settings/basicStyle';
import {
  TitleWrapper,
  ComponentTitle,
  TableClickable as Table, ButtonHolders, ActionBtn
} from '../../crud.style';

import Box from '../../../../components/utility/box';
import UsersActionButtons from "./../users/partials/ActionButtons";
import TeamActionButtons from "./../teams/partials/ActionButtons";
import {
  deleteCompanyUser,
  deleteTeam,
  getCompany,
  getCompanyUsersByTeamId,
  getTeams
} from "../../../../actions/companyActions";

class CompanyDetails extends Component {
  constructor() {
    super();
    this.state = {
      teamColumns: [
        {
          title: 'Teams',
          dataIndex: 'name',
          key: 'name',
          render: text => <p><Icon type="team"/> {text}</p>,
        },
        {
          title: 'Actions',
          key: 'actions',
          render: (row) => <TeamActionButtons row={row} delete={this.handleDelete}/>
        }
      ],
      teams: [],
      company: null,
      userColumns: [
        {
          title: "Users List",
          children: [
            {
              title: 'Name',
              dataIndex: 'username',
              key: 'name',
            },
            {
              title: 'Address',
              dataIndex: 'contactInformation.postalAddress',
              key: 'address',
            },
            {
              title: 'Email',
              dataIndex: 'contactInformation.emailAddress',
              key: 'email',
            },
            {
              title: 'Actions',
              key: 'actions',
              render: (row) => <UsersActionButtons row={row} delete={this.handleDeleteUser}/>
            }
          ]
        }
      ],
      selectedTeam: {},
      users: [],
      loading: false
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    getTeams(this.props.match.params.id).then(res => {
      this.setState({teams: res.data});
      if (this.state.teams.length) {
        this.handleTeamSelect(this.state.teams[0])
      }
    });
    getCompany(this.props.match.params.id).then(res=>{
      this.setState({company: res.data});
    })
  }

  handleTeamSelect(record) {
    this.setState({loading:true});
    this.setState({
      userColumns: [
        {
          ...this.state.userColumns[0],
          title: record.name,
        }
      ]
    });
    this.setState({
      selectedTeam: record,
    });
    this.state.teams.map((row) => {
      return row.isSelected = row.clientTeamId === record.clientTeamId;
    });
    getCompanyUsersByTeamId(record.clientTeamId).then(res => {
      this.setState({users: res.data, loading: false});
    })
  }

  handleDelete(row) {
    deleteTeam(row.clientTeamId).then(res => {
      message.success("Successfully Deleted");
      this.fetchData();
    });
  }

  handleDeleteUser(row) {
    deleteCompanyUser(row.userId).then(res => {
      message.success("Successfully Deleted");
      this.fetchData();
    })
  }

  render() {
    const {rowStyle, colStyle, gutter} = basicStyle;
    const margin = {
      margin: '10px 20px 18px 10px'
    };
    return (
      <LayoutWrapper>
        <PageHeader>{this.state.company ? this.state.company.name : ''}</PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper style={margin}>
                <ComponentTitle>
                  <ActionBtn type="secondary" onClick={() => this.props.history.goBack()}>
                    <Icon type="left"/>Go Back
                  </ActionBtn>
                </ComponentTitle>
                <ButtonHolders>
                  <ActionBtn type="primary" onClick={() => {
                    this.props.history.push('../teams/create/' + this.props.match.params.id)
                  }}>
                    <Icon type="usergroup-add"/>
                    Add Team
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              <Col md={8} sm={24} xs={24}>
                <Table
                  size="middle"
                  style={margin}
                  columns={this.state.teamColumns}
                  dataSource={this.state.teams}
                  pagination={false}
                  rowClassName={(record) => record.isSelected ? 'selected' : ''}
                  onRow={(record) => {
                    return {
                      onClick: () => this.handleTeamSelect(record)
                    };
                  }}
                  bordered
                />
              </Col>
              <Col md={16} sm={24} xs={24}>
                <Spin spinning={this.state.loading}>
                  <Table
                    size="middle"
                    style={margin}
                    columns={this.state.userColumns}
                    dataSource={this.state.users}
                    pagination={{pageSize: 5}}
                    bordered
                  />
                </Spin>
              </Col>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

export default withRouter(CompanyDetails)
