import React, {Component} from 'react';
import {Row, Col, Icon} from 'antd';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import PageHeader from "../../../components/utility/pageHeader";
import {withRouter} from 'react-router-dom'

import basicStyle from '../../../settings/basicStyle';
import {
  TitleWrapper,
  ComponentTitle,
  TableClickable as Table, ButtonHolders, ActionBtn
} from '../crud.style';

import Box from '../../../components/utility/box';
import UsersActionButtons from "./users/partials/ActionButtons";
import TeamActionButtons from "./teams/partials/ActionButtons";
import {getTeams} from "../../../actions/companyActions";

class CompanyDetails extends Component {
  constructor() {
    super();
    this.state = {
      teamColumns: [
        {
          title: 'Teams',
          dataIndex: 'name',
          key: 'name',
          render: text => <p><Icon type="team"/>  {text}</p>,
        },
        {
          title: 'Actions',
          key: 'actions',
          render: (row) => <TeamActionButtons row={row}/>
        }
      ],
      teams: [],
      userColumns: [
        {
          title: "Users List",
          children: [
            {
              title: 'Role',
              dataIndex: 'role',
              key: 'role',
            },
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Address',
              dataIndex: 'address',
              key: 'address',
            },
            {
              title: 'Email',
              dataIndex: 'email',
              key: 'email',
            },
            {
              title: 'Location',
              dataIndex: 'location',
              key: 'location',
            },
            {
              title: 'Actions',
              key: 'actions',
              render: (row) => <UsersActionButtons row={row}/>
            }
          ]
        }
      ],
      selectedTeam: {}
    }
  }

  componentDidMount() {
    getTeams(this.props.match.params.id).then(res => {
      this.setState({teams: res.data});
      if(this.state.teams.length){
        this.handleTeamSelect(this.state.teams[0])
      }
    });
  }

  handleTeamSelect(record) {
    console.log(record);
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
      return row.isSelected = row.id === record.id;
    })
  }

  render() {
    const {rowStyle, colStyle, gutter} = basicStyle;
    const margin = {
      margin: '10px 20px 18px 10px'
    };
    return (
      <LayoutWrapper>
        <PageHeader>ACME Software Company</PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
                <TitleWrapper style={margin}>
                  <ComponentTitle>
                    <ActionBtn type="secondary" onClick={()=>this.props.history.goBack()}>
                      <Icon type="left"/>Go Back
                    </ActionBtn>
                  </ComponentTitle>
                  <ButtonHolders>
                    <ActionBtn type="primary" onClick={()=>{this.props.history.push('../teams/create/'+this.props.match.params.id)}}>
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
                <Table
                  size="middle"
                  style={margin}
                  columns={this.state.userColumns}
                  dataSource={this.state.selectedTeam.users}
                  pagination={{pageSize: 5}}
                  bordered
                />
              </Col>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

export default withRouter(CompanyDetails)
