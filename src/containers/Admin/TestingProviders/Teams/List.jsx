import React, {Component} from 'react';
import {Row, Col, Icon, Rate, Spin} from 'antd';
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
import {getTestingProviderTeams, deleteProviderTeam} from "../../../../actions/testingProviderActions";
import {message} from "antd/lib/index";

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
          dataIndex: 'manager.username',
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
          render: (row) => <ActionButtons row={row} delete={this.handleDelete}/>
        }
      ],
      dataSource: [],
      loading: false
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.setState({loading: true});
    getTestingProviderTeams().then(res => {
      this.setState({
        dataSource: res.data,
      })
    }).finally(() => {
      this.setState({loading: false});
    });
  }

  handleDelete(row) {
    this.setState({loading: true});
    deleteProviderTeam(row.providerTeamId).then(res => {
      message.success('Successfully Deleted.');
      this.fetchData();
    }).finally(() => {
      this.setState({loading: false});
    });
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
              <Spin spinning={this.state.loading}>
                <Table
                  size="middle"
                  bordered
                  pagination={true}
                  columns={this.state.columns}
                  dataSource={this.state.dataSource}
                  rowKey="providerTeamId"
                  onRow={(row) => ({
                    onDoubleClick: () => {
                      this.props.history.push('teams/team-members/' + row.providerTeamId)
                    },
                  })}
                />
              </Spin>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
