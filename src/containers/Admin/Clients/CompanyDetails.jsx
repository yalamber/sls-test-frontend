import React, {Component} from 'react';
import {Row, Col, Icon} from 'antd';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import basicStyle from '../../../settings/basicStyle';
import {
  TitleWrapper,
  ComponentTitle,
  TableClickable as Table, ButtonHolders, ActionBtn
} from '../crud.style';

import Box from '../../../components/utility/box';
import ActionButtons from "./partials/ActionButtons";
import {getTeams} from "../../../actions/clientActions";

export default class extends Component {
  constructor() {
    super();
    this.state = {
      teamColumns: [
        {
          title: 'Teams',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Actions',
          key: 'actions',
          render: (row) => <ActionButtons row={row}/>
        }
      ],
      teams: [],
      userColumns: [
        {
          title: "Users List",
          children: [
            {
              title: 'Id',
              dataIndex: 'id',
              key: 'id',
            },
            {
              title: 'Type',
              dataIndex: 'type',
              key: 'eyp',
            },
            {
              title: 'Contact Info',
              dataIndex: 'contactInfo',
              key: 'contactInfo',
            },
            {
              title: 'Location',
              dataIndex: 'location',
              key: 'location',
            },
            {
              title: 'Actions',
              key: 'actions',
              render: (row) => <ActionButtons row={row}/>
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
    })
  }

  handleTeamSelect(record) {
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
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper style={margin}>
                <ComponentTitle>
                  EB Pearls Pvt. Ltd. (Kathmandu, Nepal)
                </ComponentTitle>
                <ButtonHolders>
                  <ActionBtn type="primary">
                    <Icon type="plus"/>
                    Add Team
                  </ActionBtn>
                  <ActionBtn type="primary">
                    <Icon type="plus"/>
                    Add User
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
