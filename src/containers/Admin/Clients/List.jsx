import React, {Component} from 'react';
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
  TableClickable as Table
} from '../crud.style';
import {getClients} from "../../../actions/clientActions";

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
      dataSource: []
    }
  }

  componentDidMount() {
    getClients().then(res => {
      this.setState({dataSource: res.data})
    })
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
                  <ActionBtn type="primary" onClick={() => {
                    console.log(this.props.history.push('create'))
                  }}>
                    <Icon type="plus"/>
                    Add new client
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              <Table
                pagination={true}
                columns={this.state.columns}
                dataSource={this.state.dataSource}
                onRowClick={(row) => {
                  this.props.history.push('details/' + row.id)
                }}
              />
            </Box>

          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
