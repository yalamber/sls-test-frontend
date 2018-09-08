import React, {Component} from 'react';
import Table from '../../../components/uielements/table';
import {Row, Col, Icon} from 'antd';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import basicStyle from '../../../settings/basicStyle';
import Box from '../../../components/utility/box';
import ActionButtons from "./ActionButtons";

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
          title: 'Client ID',
          dataIndex: 'id',
          key: 'id',
        }, {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        }, {
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
          id: 32,
          name: 'Mike',
          location: '10 Downing Street'
        }, {
          key: '2',
          id: 35,
          name: 'Mike',
          location: '10 Downing Street'
        }]
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
                <ComponentTitle>Clients List</ComponentTitle>

                <ButtonHolders>
                  <ActionBtn type="primary" onClick={()=>{console.log(this.props.history.push('create'))}}>
                    <Icon type="plus"/>
                    Add new client
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              <Table
                bordered
                pagination={false}
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
