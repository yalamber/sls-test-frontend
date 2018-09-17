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
import {getTestingProviderTeams} from "../../../actions/testingProviderActions";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
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
                    this.props.history.push('create')
                  }}>
                    <Icon type="usergroup-add"/>
                    Create Team
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
