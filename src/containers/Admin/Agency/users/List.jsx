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
  getAgency,
  getAgencyTeams,
  getAgencyUsers
} from "../../../../helpers/http-api-client";

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
            <UsersActionButtons
              selectedTeam={this.state.selectedTeam}
              row={row}
              info={this.handleInfo}
            />
          )
        }
      ],
      dataSource: [],
      agencies: [],
      teams: [],
      selectedAgency: undefined,
      selectedTeam: undefined,
      loading: false
    };
    this.handleAgencyChange = this.handleAgencyChange.bind(this);
    this.handleTeamChange = this.handleTeamChange.bind(this);
    this.handleInfo = this.handleInfo.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    getAgency()
      .then(res => {
        this.setState({ agencies: res.data.rows });
        this.handleAgencyChange(this.props.match.params.agencyId);
        // this.handleTeamChange(this.props.match.params.teamId);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  handleAgencyChange(agencyId) {
    this.setState(
      { selectedTeam: undefined, selectedAgency: agencyId },
      () => {
        getAgencyTeams(agencyId).then(res => {
          const { teamId } = this.props.match.params;
          const teamDefault = teamId
            ? teamId + ""
            : res.data[0].agencyTeamId + "";

          this.updateRecords(agencyId, teamDefault, (err, users) => {
            if (err) {
              return this.setState({
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

  updateRecords(agencyId, teamId, cb) {
    this.setState({ loading: true });
    if (cb) {
      return getAgencyUsers(agencyId, teamId)
        .then(res => {
          return cb(null, res);
        })
        .catch(resErr => {
          return cb(resErr);
        });
    }
    getAgencyUsers(agencyId, teamId)
      .then(res => {
        this.setState({ dataSource: res.data });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  handleInfo(row) {
    alert("show info")
    // deleteAgencyUser(row.userId)
    //   .then(res => {
    //     this.updateRecords(this.state.selectedAgency, this.state.selectedTeam);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }

  render() {
    const margin = {
      margin: "5px 5px 10px 0px"
    };
    const { rowStyle, colStyle, gutter } = basicStyle;
    const agenciesOptions = this.state.agencies.map(agency => (
      <Option key={agency.agencyId}>{agency.name}</Option>
    ));
    const teamsOptions = this.state.teams.map(team => (
      <Option key={team.agencyId}>{team.name}</Option>
    ));

    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Agency - Users List</ComponentTitle>
                <ButtonHolders>
                  <ActionBtn
                    type="primary"
                    onClick={() => {
                      this.props.history.push("/dashboard/agency/user/create");
                    }}
                  >
                    <Icon type="plus" />
                    Add new User
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              <Row>
                <Col md={6} sm={24} xs={24} style={margin}>
                  <FormItem label="Agency Name *">
                    <Select
                      showSearch
                      placeholder="Please Choose Agency Name"
                      style={{ width: "100%" }}
                      onChange={this.handleAgencyChange}
                      value={this.state.selectedAgency}
                    >
                      {agenciesOptions}
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
                  locale={{ emptyText: "Please Select Agency name" }}
                  size="middle"
                  bordered
                  pagination={true}
                  columns={this.state.columns}
                  onRow={row => ({
                    onDoubleClick: () => {
                      alert("show user info");
                    }
                  })}
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
