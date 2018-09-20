import React, {Component} from 'react';
import {Row, Col, Icon, Rate} from 'antd';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import basicStyle from '../../../../settings/basicStyle';
import Box from '../../../../components/utility/box';
import ActionButtons from "./partials/ActionButtons";

import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from '../../crud.style';
import {getTestingProviderTeams} from "../../../../actions/testingProviderActions";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Team Id',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Team Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Team Admin',
          dataIndex: 'teamAdmin',
          key: 'teamAdmin',
        },
        {
          title: 'Rating',
          dataIndex: 'rating',
          key: 'rating',
          render: (value) => <Rate defaultValue={value} disabled/>
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
    getTestingProviderTeams().then(res => {
      this.setState({
        dataSource: res.data,
      })
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
                <ComponentTitle>Testing Providers Teams</ComponentTitle>
                <ButtonHolders>
                  <ActionBtn type="primary" onClick={() => {
                    this.props.history.push('teams/create')
                  }}>
                    <Icon type="usergroup-add"/>
                    Create Team
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              <Table
                size="middle"
                bordered
                pagination={true}
                columns={this.state.columns}
                dataSource={this.state.dataSource}
                onRowClick={(row) => {
                  this.props.history.push('teams/' + row.id + '/team-members')
                }}
              />
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
