import React, {Component} from 'react';
import {Row, Col, Icon, Select, Spin} from 'antd';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import basicStyle from '../../../../settings/basicStyle';
import Box from '../../../../components/utility/box';
import ActionButtons from "./partials/ActionButtons";
import actions from '../../../../redux/agency/actions';
import { connect } from 'react-redux';

import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from '../../crud.style';
import {
  deleteProviderUser,
  getTestingProviderTeamMembers,
  getTestingProviderTeams,
  getTestingProviderTeam
} from "../../../../helpers/http-api-client";
import {message} from "antd/lib/index";

const Option = Select.Option;

class List extends Component {
  constructor() {
    super();
    this.state = {
      columns: [
        {
          title: "Team Member List",
          children: [
            {
              title: 'Username',
              dataIndex: 'username',
              key: 'username',
              sorter: true
            },
            {
              title: 'Rating',
              dataIndex: 'contactInformation.postalAddress',
              key: 'location',
              sorter: true
            },
            {
              title: 'Status',
              dataIndex: 'contactInformation.postalAddress',
              key: 'status',
              sorter: true
            },
            {
              title: 'Actions',
              key: 'actions',
              render: (row) => <ActionButtons row={row} delete={this.handleDelete}/>
            }
          ]
        }
      ],
      teams: [],
      selectedTeam: null,
      dataSource: [],
      loading: false
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.handleTeamChange = this.handleTeamChange.bind(this);
  }

  handleTeamChange(teamId) {
    this.setState({selectedTeam: teamId});
    this.fetchData(teamId);
  }

  handleDelete(row) {
    deleteProviderUser(row.userId).then(res => {
      message.success('Successfully Deleted.');
      this.fetchData(this.state.selectedTeam);
    })
  }

  componentDidMount() {
    getTestingProviderTeams().then(res => {
      this.setState({teams: []});
    });
    this.setState({selectedTeam: this.props.match.params.id});
    this.fetchData(this.props.match.params.id);
  }

  fetchData(teamId = null) {
    this.setState({loading: true});
    getTestingProviderTeamMembers(teamId).then(res => {
      console.log("res.data", this.props);
      this.setState({
        dataSource: res.data,
      })
    }).finally(() => {
      this.setState({loading: false});
    });
  }

  render() {
    const { form_data_agency_key } = this.props;
    const { form_data_selected_team_of_agency } = form_data_agency_key;

    const {rowStyle, colStyle, gutter} = basicStyle;
    const margin = {
      margin: '5px 5px 10px 0'
    };
    const teamOptions = this.state.teams.map(team => <Option
      key={team.providerTeamId}>{team.name}</Option>);
    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>
                  {`${form_data_selected_team_of_agency.agency ? form_data_selected_team_of_agency.agency.name+'-' : form_data_selected_team_of_agency.name } ${form_data_selected_team_of_agency.agency ? form_data_selected_team_of_agency.name : '' }`}
                </ComponentTitle>
                <ButtonHolders>
                  <ActionBtn type="primary" onClick={() => {
                    this.props.history.push('/dashboard/providers/users/create')
                  }}>
                    <Icon type="user-add"/>
                    Create Team Member
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              {/*<Row>
                <Col md={6} sm={24} xs={24}>
                  <Select showSearch
                          value={this.state.selectedTeam}
                          placeholder="Please Choose Company Name"
                          style={{...margin, width: '100%'}}
                          onChange={this.handleTeamChange}>
                    {teamOptions}
                  </Select>
                </Col>
              </Row>*/}
              <Spin spinning={this.state.loading}>
                <Table
                  bordered
                  size="middle"
                  pagination={{pageSize: 5}}
                  rowKey="userId"
                  columns={this.state.columns}
                  dataSource={this.state.dataSource}
                  onRow={() => ({
                    onDoubleClick: () => alert("on double click, show information")
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

export default connect(
  ({ Agency}) => {
    const { form_data_agency_key } = Agency;

    return({form_data_agency_key});
  },
  { }
)(List);
