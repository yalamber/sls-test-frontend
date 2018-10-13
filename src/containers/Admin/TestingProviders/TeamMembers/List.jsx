import React, {Component} from 'react';
import {Row, Col, Icon} from 'antd';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import basicStyle from '../../../../settings/basicStyle';
import Box from '../../../../components/utility/box';
import ActionButtons from "./partials/ActionButtons";
import PageHeader from "../../../../components/utility/pageHeader";

import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from '../../crud.style';
import {
  deleteProviderUser,
  getTestingProviderTeamMembers
} from "../../../../actions/testingProviderActions";
import {message} from "antd/lib/index";

export default class extends Component {
  constructor() {
    super();
    this.state = {
      columns: [
        {
          title: "Team Member List",
          children: [
            {
              title: 'Type',
              dataIndex: 'type',
              key: 'eyp',
            },
            {
              title: 'Contact Info',
              dataIndex: 'username',
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
              render: (row) => <ActionButtons row={row} delete={this.handleDelete}/>
            }
          ]
        }
      ],
      dataSource: []
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  handleDelete(row) {
    deleteProviderUser(row.userId).then(res => {
      message.success('Successfully Deleted.');
      this.fetchData();
    })
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    getTestingProviderTeamMembers(this.props.match.params.id).then(res => {
      this.setState({
        dataSource: res.data,
      })
    })
  }

  render() {
    const {rowStyle, colStyle, gutter} = basicStyle;
    return (
      <LayoutWrapper>
        <PageHeader>Team Nepal</PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>
                  <ActionBtn type="secondary" onClick={() => this.props.history.goBack()}>
                    <Icon type="left"/>Go Back
                  </ActionBtn>
                </ComponentTitle>
                <ButtonHolders>
                  <ActionBtn type="primary" onClick={() => {
                    this.props.history.push('../../users/create')
                  }}>
                    <Icon type="user-add"/>
                    Create Team Member
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              <Table
                bordered
                size="middle"
                pagination={{pageSize: 5}}
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
