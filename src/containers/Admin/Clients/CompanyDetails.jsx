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
      teams: [
        {
          id: 1, name: 'Project Manager', users: [
            {id: 1, type: 'Manager', contactInfo: '10th street Downtown Demo', location: 'Nepal'},
            {id: 2, type: 'Manager', contactInfo: '10th street Downtown', location: 'Nepal'},
            {id: 3, type: 'Manager', contactInfo: '10th street Downtown Demo', location: 'Nepal'},
            {id: 4, type: 'Manager', contactInfo: '10th street Downtown', location: 'Nepal'},
            {id: 5, type: 'Manager', contactInfo: '10th street Downtown Demo', location: 'Nepal'},
            {id: 6, type: 'Manager', contactInfo: '10th street Downtown', location: 'Nepal'},
            {id: 7, type: 'Manager', contactInfo: '10th street Downtown Demo', location: 'Nepal'},
            {id: 8, type: 'Manager', contactInfo: '10th street Downtown', location: 'Nepal'},
            {id: 9, type: 'Manager', contactInfo: '10th street Downtown Demo', location: 'Nepal'},
            {id: 10, type: 'Manager', contactInfo: '10th street Downtown', location: 'Nepal'},
            {id: 11, type: 'Manager', contactInfo: '10th street Downtown Demo', location: 'Nepal'},
            {id: 12, type: 'Manager', contactInfo: '10th street Downtown', location: 'Nepal'},
            {id: 13, type: 'Manager', contactInfo: '10th street Downtown Demo', location: 'Nepal'},
            {id: 14, type: 'Manager', contactInfo: '10th street Downtown', location: 'Nepal'},
            {id: 15, type: 'Manager', contactInfo: '10th street Downtown Demo', location: 'Nepal'},
            {id: 16, type: 'Manager', contactInfo: '10th street Downtown', location: 'Nepal'},
            {id: 17, type: 'Manager', contactInfo: '10th street Downtown Demo', location: 'Nepal'},
            {id: 18, type: 'Manager', contactInfo: '10th street Downtown', location: 'Nepal'},
            {id: 19, type: 'Manager', contactInfo: '10th street Downtown Demo', location: 'Nepal'},
            {id: 20, type: 'Manager', contactInfo: '10th street Downtown', location: 'Nepal'},
          ]
        },
        {
          id: 2, name: 'Business Analyst', users: [
            {id: 1, type: 'Business Analyst', contactInfo: 'Pokhara', location: 'Nepal'},
            {id: 2, type: 'Business Analyst', contactInfo: 'Kathmandu', location: 'Nepal'},
          ]
        },
        {
          id: 3, name: 'Quality Assurance', users: [
            {id: 1, type: 'Tester', contactInfo: '10th street Downtown', location: 'Nepal'},
            {id: 2, type: 'Tester', contactInfo: '10th street Downtown', location: 'Nepal'},
          ]
        },
        {
          id: 4, name: 'Operation and Management', users: [
            {id: 1, type: 'Tester', contactInfo: '10th street Downtown', location: 'Nepal'},
            {id: 2, type: 'Tester', contactInfo: '10th street Downtown', location: 'Nepal'},
          ]
        },
      ],
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

  handleTeamSelect(record) {
    this.setState({
      userColumns: [
        {
          title: record.name,
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
                  pagination={{ pageSize: 5 }}
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
