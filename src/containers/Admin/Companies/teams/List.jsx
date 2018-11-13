import React, {Component} from 'react';
import {Row, Col, Icon, message, Spin, Select} from 'antd';
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
import {deleteTeam, getCompanies, getTeams} from "../../../../helpers/http-api-client";

const Option = Select.Option;
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Company',
          dataIndex: 'client.name',
          key: 'clientId',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Team Admin',
          dataIndex: 'client.admin.username',
          key: 'team_admin',
        },

        {
          title: 'Rating',
          dataIndex: 'rating',
          key: 'rating',
        },
        {
          title: 'Actions',
          key: 'actions',
          render: (row) => <ActionButtons row={row} delete={this.handleDelete}/>
        }
      ],
      dataSource: [],
      companies: [],
      selectedCompany: null,
      loading: false,
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
  }

  handleCompanyChange(companyId) {
    this.setState({selectedCompany: companyId});
    this.fetchData(companyId);
  }

  componentDidMount() {
    getCompanies().then(res => {
      this.setState({companies: res.data})
    });
    this.fetchData();
  }

  fetchData(companyId = null) {
    this.setState({loading: true});
    getTeams(companyId).then(res => {
      this.setState({dataSource: res.data, loading: false})
    })
  }

  handleDelete(row) {
    deleteTeam(row.clientTeamId).then(res => {
      message.success('Successfully Deleted.');
      this.fetchData(this.state.selectedCompany);
    })
  }

  render() {
    const margin = {
      margin: '5px 5px 10px 0'
    };
    const {rowStyle, colStyle, gutter} = basicStyle;
    const companiesOptions = this.state.companies.map(company => <Option
      key={company.clientId}>{company.name}</Option>);
    return (

      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Companies List</ComponentTitle>

                <ButtonHolders>
                  <ActionBtn type="primary" onClick={() => {
                    console.log(this.props.history.push('teams/create'))
                  }}>
                    <Icon type="plus"/>
                    Add Team
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              <Row>
                <Col md={6} sm={24} xs={24}>
                  <Select showSearch placeholder="Please Choose Company Name" style={{...margin, width: '100%'}}
                          onChange={this.handleCompanyChange}>
                    {companiesOptions}
                  </Select>
                </Col>
              </Row>
              <Spin spinning={this.state.loading}>
                <Table
                  pagination={true}
                  columns={this.state.columns}
                  dataSource={this.state.dataSource}
                  onRowDoubleClick={(row) => {
                    this.props.history.push('/dashboard/company/users/' + row.clientId + '/' + row.clientTeamId)
                  }}
                  rowKey="clientTeamId"
                />
              </Spin>
            </Box>

          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
