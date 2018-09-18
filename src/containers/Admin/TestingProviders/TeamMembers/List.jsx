import React, {Component} from 'react';
import {Row, Col, Icon} from 'antd';
import LayoutWrapper from '~/components/utility/layoutWrapper.js';
import basicStyle from '~/settings/basicStyle';
import Box from '~/components/utility/box';
import ActionButtons from "../partials/ActionButtons";
import PageHeader from "~/components/utility/pageHeader";

import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from '../../crud.style';
import {getTestingProviderTeamMembers} from "../../../../actions/testingProviderActions";

export default class extends Component {
  constructor() {
    super();
    this.state = {
      columns: [
        {
          title: "Team Member List",
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
      dataSource: []
    }
  }

  componentDidMount() {
    getTestingProviderTeamMembers().then(res => {
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
                  <ActionBtn type="secondary" onClick={()=>this.props.history.goBack()}>
                    <Icon type="left"/>Go Back
                  </ActionBtn>
                </ComponentTitle>
                <ButtonHolders>
                  <ActionBtn type="primary" onClick={() => {
                    alert("this will show form to create Testing Provider Team members")
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
