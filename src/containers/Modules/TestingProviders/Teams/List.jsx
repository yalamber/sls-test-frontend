import React, {Component} from 'react';
import {Row, Col, Icon, Rate, Spin, Select} from 'antd';
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
import {getTestingProviderTeams, deleteProviderTeam} from "../../../../helpers/http-api-client";
import {message} from "antd/lib/index";

const Option = Select.Option;
const { _updateForm } = actions;

class TeamsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Agency',
          dataIndex: 'agency',
          key: 'agency',
        },
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
      agencies: [
          {
            clientId: 1,
            name: 'Agency 1'
          },
          {
            clientId: 2,
            name: 'Agency 2'
          },
          {
            clientId: 3,
            name: 'Agency 3'
          },{
            clientId: 4,
            name: 'Agency 4'
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

  updateForm = (key, value) => {
    const { _updateForm } = this.props;
        
    _updateForm(
        Object.assign(this.props[actions.FORM_DATA_AGENCY_KEY], { [key]: value })
    );

  }

  render() {
    const margin = {
      margin: '5px 5px 10px 0'
    };
    const { form_data_agency_key } = this.props;
    const { form_data_selected_agency } = form_data_agency_key;
    const agenciesOptions = this.state.agencies.map(agency => <Option
        key={agency.clientId}>{agency.name}</Option>);
    console.log(this.state.dataSource);
    const {rowStyle, colStyle, gutter} = basicStyle;
    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle className="captialize-data">{form_data_selected_agency.name ? form_data_selected_agency.name : ''} - Teams List</ComponentTitle>
                <ButtonHolders>
                  <ActionBtn type="primary" onClick={() => {
                    this.props.history.push('teams/create')
                  }}>
                    <Icon type="usergroup-add"/>
                    Create Team
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              <Row>
                <Col md={6} sm={24} xs={24}>
                    <Select showSearch placeholder="Please Choose Agency Name" style={{...margin, width: '100%'}}>
                        {agenciesOptions}
                    </Select>
                </Col>
              </Row>
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
                       this.updateForm(actions.FORM_DATA_SELECTED_TEAM_OF_AGENCY, row);
                       this.props.history.push('teams/team-members')
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

export default connect(
  ({ Agency}) => {
    const { form_data_agency_key } = Agency;

    return({form_data_agency_key});
  },
  { _updateForm }
)(TeamsList);
