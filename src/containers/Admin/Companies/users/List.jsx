import React, { Component } from "react";
import { Row, Col, Icon, Select, Spin, Form } from "antd";
import LayoutWrapper from "../../../../components/utility/layoutWrapper.js";
import basicStyle from "../../../../settings/basicStyle";
import Box from "../../../../components/utility/box";
import UsersActionButtons from "./partials/ActionButtons";

import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from "../../crud.style";
import {
  getCompanies,
  getTeams,
  getUsers,
  deleteCompanyUser
} from "../../../../actions/companyActions";

const Option = Select.Option;
const FormItem = Form.Item;

export default class extends Component {
  constructor() {
    super();
    this.state = {
      columns: [
        {
          title: "Name",
          dataIndex: "username",
          key: "name",
          sorter: (a, b) => a.name >= b.name
        },
        {
          title: "Rating",
          dataIndex: "rating",
          key: "rating",
          sorter: (a, b) => a.rating >= b.rating
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
          sorter: (a, b) => a.status >= b.status
        },
        {
          title: "Actions",
          key: "actions",
          render: row => (
            <UsersActionButtons selectedTeam={this.state.selectedTeam} row={row} delete={this.handleDelete} />
          )
        }
      ],
      dataSource: [],
      companies: [],
      teams: [],
      selectedCompany: undefined,
      selectedTeam: undefined,
      loading: false
    };
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.handleTeamChange = this.handleTeamChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    getCompanies()
      .then(res => {
        this.setState({ companies: res.data });
        this.handleCompanyChange(this.props.match.params.companyId);
        this.handleTeamChange(this.props.match.params.teamId);
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  handleCompanyChange(companyId) {
    this.setState(
      { selectedTeam: undefined, selectedCompany: companyId },
      () => {
        getTeams(companyId).then(res => {
          const teamDefault = res.data.length
            ? res.data[0].clientTeamId + ""
            : undefined;
          this.updateRecords(companyId, teamDefault, (err, users) => {
            if (err) {
              return this.setState({
                teams: res.data,
                selectedTeam: teamDefault,
                dataSource: users.data,
                loading: false
              });
            }
            this.setState({
              teams: res.data,
              selectedTeam: teamDefault,
              dataSource: users.data,
              loading: false
            });
          });
        });
      }
    );
  }

  handleTeamChange(teamId) {
    this.setState({ selectedTeam: teamId });
    this.updateRecords(null, teamId);
  }

  updateRecords(companyId, teamId, cb) {
    this.setState({ loading: true });
    if (cb) {
      return getUsers(companyId, teamId)
        .then(res => {
          return cb(null, res);
        })
        .catch(resErr => {
          return cb(resErr);
        });
    }
    getUsers(companyId, teamId)
      .then(res => {
        this.setState({ dataSource: res.data });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  handleDelete(row) {
    deleteCompanyUser(row.userId)
      .then(res => {
        this.updateRecords(this.state.selectedCompany, this.state.selectedTeam);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const margin = {
      margin: "5px 5px 10px 0px"
    };
    const { rowStyle, colStyle, gutter } = basicStyle;
    const companiesOptions = this.state.companies.map(company => (
      <Option key={company.clientId}>{company.name}</Option>
    ));
    const teamsOptions = this.state.teams.map(team => (
      <Option key={team.clientTeamId}>{team.name}</Option>
    ));

    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Company - Users List</ComponentTitle>
                <ButtonHolders>
                  <ActionBtn
                    type="primary"
                    onClick={() => {
                      this.props.history.push("/dashboard/company/user/create");
                    }}
                  >
                    <Icon type="plus" />
                    Add new User
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              <Row>
                <Col md={6} sm={24} xs={24} style={margin}>
                  <FormItem label="Company Name *">
                    <Select
                      showSearch
                      placeholder="Please Choose Company Name"
                      style={{ width: "100%" }}
                      onChange={this.handleCompanyChange}
                      value={this.state.selectedCompany}
                    >
                      {companiesOptions}
                    </Select>
                  </FormItem>
                </Col>
                <Col md={6} sm={24} xs={24} style={margin}>
                  <FormItem label="Team Name:">
                    <Select
                      showSearch
                      placeholder="Please Choose Team"
                      style={{ width: "100%" }}
                      onChange={this.handleTeamChange}
                      value={this.state.selectedTeam}
                    >
                      {teamsOptions}
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Spin spinning={this.state.loading}>
                <Table
                  locale={{ emptyText: "Please Select Company name" }}
                  size="middle"
                  bordered
                  pagination={true}
                  columns={this.state.columns}
                  dataSource={
                    this.state.dataSource && this.state.dataSource.length
                      ? this.state.dataSource
                      : []
                  }
                  rowKey="userId"
                />
              </Spin>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
