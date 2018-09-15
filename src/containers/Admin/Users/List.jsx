import React, {Component} from 'react';
import {Table} from 'antd';
import {Row, Col, Icon} from 'antd';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import basicStyle from '../../../settings/basicStyle';
import Box from '../../../components/utility/box';
import ActionButtons from "./partials/ActionButtons";

import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
} from '../crud.style';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'User ID',
          dataIndex: 'userId',
          key: 'userId',
        },
        {
          title: 'Client Name',
          dataIndex: 'clientName',
          key: 'clientName',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
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
      ],
      dataSource: [
        {
          key: '1',
          userId: 32,
          clientName: 'Yalamber',
          status: 'Active',
          location: '10 Downing Street'
        }, {
          key: '2',
          userId: 35,
          clientName: 'Amrit',
          status: 'Active',
          location: '10 Downing Street'
        },
        {
          key: '3',
          userId: 35,
          clientName: 'Pat',
          status: 'Active',
          location: '10 Downing Street'
        }
        ]
    }
  }

  render() {
    const {rowStyle, colStyle, gutter} = basicStyle;
    return (

      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Users List</ComponentTitle>

                <ButtonHolders>
                  <ActionBtn type="primary" onClick={() => {
                    console.log(this.props.history.push('create'))
                  }}>
                    <Icon type="plus"/>
                    Add new user
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              <Table
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
