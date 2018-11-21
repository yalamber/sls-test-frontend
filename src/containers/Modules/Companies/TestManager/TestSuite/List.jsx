import React, { Component } from "react";
import { Row, Col, Icon, Select, Tooltip, Spin, Form } from "antd";
import LayoutWrapper from "../../../../../components/utility/layoutWrapper.js";
import basicStyle from "../../../../../settings/basicStyle";
import Box from "../../../../../components/utility/box";
import ActionButtons from "./partials/ActionButtons";
import Moment from "react-moment";

import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from "../../../crud.style";
import {
  getCompanies,
  getCompanyTeams,
  deleteSuite,
  getCompanySuites
} from "../../../../../helpers/http-api-client";
import { dateTime } from "../../../../../constants/dateFormat";

const Option = Select.Option;
const FormItem = Form.Item;

export default class extends Component {
  constructor() {
    super();
    this.state = {
      columns: [
        {
          title: "Title",
          dataIndex: "name",
          key: "title"
        },
        {
          title: "Last Updated",
          render: row => <Moment format={dateTime}>{row.updatedBy}</Moment>,
          key: "lastUpdated"
        },
        {
          title: "Team",
          dataIndex: "clientTeam.name",
          key: "team"
        },
        {
          title: "Last Updated by",
          dataIndex: "lastUpdatedBy",
          key: "lastUpdatedBy"
        },
        {
          title: "Actions",
          key: "actions",
          render: row => <ActionButtons row={row}/>
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
    this.isCompanyAndTeamSelected = this.isCompanyAndTeamSelected.bind(this);
    // this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      try {
        const responseCompanies = await getCompanies();
        this.setState({ companies: responseCompanies.data.rows }, async () => {
          try {
            await this.companyDropdownHasChanged(
              null,
              responseCompanies.data.rows
            );
            const { selectedCompany, teams } = this.state;
            const responseSuites = await this.teamDropdownHasChanged();

            if (
              responseCompanies.data.rows &&
              responseCompanies.data.rows.length
            ) {
              const companyFirst = responseCompanies.data.rows[0];
              const responseCompanyTeams = await getCompanyTeams({
                query: { clientId: companyFirst.clientId }
              });
              if (responseCompanyTeams && responseCompanyTeams.data) {
                this.setState({
                  selectedCompany: companyFirst.clientId,
                  teams: responseCompanyTeams.data.rows,
                  loading: false
                });
              } else {
                this.setState({
                  loading: false,
                  selectedTeam: undefined,
                  teams: []
                });
              }
            } else {
              this.setState({
                loading: false,
                selectedTeam: undefined,
                teams: []
              });
            }
          } catch (errorInner) {
            this.setState({ loading: false });
          }
        });
      } catch (error) {
        this.setState({ loading: false });
      }
    });
  }

  async teamDropdownHasChanged() {
    const { teams, selectedTeam } = this.state;
    let teamId = selectedTeam;
    if (selectedTeam) {
      teamId = selectedTeam;
    } else if (teams && teams.length) {
      teamId = teams[0].clientTeamId;
    } else {
      return Promise.resolve([]);
    }

    return new Promise(async (resolve, reject) => {
      this.setState({ selectedTeam: teamId, loading: true }, async () => {
        try {
          const responseCompanySuites = await getCompanySuites({
            query: {
              clientTeamId: teamId /* clientId: this.state.selectedCompany */
            }
          });
          if (
            responseCompanySuites &&
            responseCompanySuites.data &&
            responseCompanySuites.data.rows &&
            responseCompanySuites.data.rows.length
          ) {
            this.setState(
              {
                dataSource: responseCompanySuites.data.rows,
                loading: false
              },
              () => {
                return resolve(responseCompanySuites.data.rows);
              }
            );
          } else {
            this.setState({ loading: false, dataSource: [] }, () => {
              return resolve([]);
            });
          }
        } catch (error) {
          return reject(error);
        }
      });
    });
  }

  async companyDropdownHasChanged(selectedCompanyId, companies) {
    let companyId = selectedCompanyId;
    if (selectedCompanyId) {
      companyId = selectedCompanyId;
    } else if (companies && companies.length) {
      companyId = companies[0].clientId;
    } else {
      return Promise.resolve([]);
    }

    return new Promise((resolve, reject) => {
      this.setState(
        {
          selectedCompany: companyId,
          teams: [],
          selectedTeam: undefined,
          loading: true
        },
        async () => {
          try {
            const responseTeams = await getCompanyTeams({
              query: { clientId: companyId }
            });

            if (
              responseTeams &&
              responseTeams.data &&
              responseTeams.data.rows &&
              responseTeams.data.rows.length
            ) {
              const { rows } = responseTeams.data;
              this.setState(
                {
                  teams: rows,
                  selectedTeam: rows[0].clientTeamId,
                  loading: false
                },
                () => {
                  return resolve(rows);
                }
              );
            } else {
              this.setState(
                { loading: false, selectedTeam: undefined, teams: [] },
                () => {
                  return resolve([]);
                }
              );
            }
          } catch (error) {
            return reject(error);
          }
        }
      );
    });
  }

  handleCompanyChange(companyId) {
    this.setState(
      {
        selectedCompany: companyId,
        selectedTeam: undefined,
        dataSource: [],
        teams: [],
        loading: true
      },
      async () => {
        try {
          const { selectedCompany } = this.state;
          const responseTeams = await this.companyDropdownHasChanged(
            selectedCompany
          );
          if (responseTeams && responseTeams.length) {
            this.handleTeamChange(responseTeams[0].clientTeamId);
          } else {
            this.setState({ loading: false });
          }
        } catch (e) {
          this.setState({ loading: false });
        }
      }
    );
  }

  handleTeamChange(teamId) {
    if (!teamId || !this.state.teams.length) {
      return this.setState({ selectedTeam: undefined, dataSource: [] });
    }

    this.setState(
      { selectedTeam: teamId, dataSource: [], loading: true },
      async () => {
        try {
          const { selectedCompany } = this.state;
          const responseSuites = await this.teamDropdownHasChanged();
        } catch (e) {
          this.setState({ loading: false });
        }
      }
    );
  }

  isCompanyAndTeamSelected() {
    return !!this.state.selectedCompany && !!this.state.selectedTeam;
  }

  // handleDelete(id) {
  //   deleteSuite(id)
  //     .then(res => {
  //       this.updateRecords(this.state.selectedCompany, this.state.selectedTeam);
  //     })
  //     .catch(error => {
  //       this.updateRecords(this.state.selectedCompany, this.state.selectedTeam);
  //       console.log(error);
  //     });
  // }

  render() {
    const margin = {
      margin: "5px 5px 10px 0px"
    };
    const { rowStyle, colStyle, gutter } = basicStyle;
    const companiesOptions = this.state.companies.map(company => (
      <Option key={company.clientId} value={company.clientId}>
        {company.name}
      </Option>
    ));
    const { teams = [] } = this.state;
    const teamsOptions = teams.length ? (
      teams.map(team => (
        <Option key={team.clientTeamId} value={team.clientTeamId}>
          {team.name}
        </Option>
      ))
    ) : (
      <Option key={"dummy"} value={""}>
        {""}
      </Option>
    );

    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Test Suites </ComponentTitle>
                <ButtonHolders>
                  <Tooltip
                    placement="topRight"
                    title={
                      !this.isCompanyAndTeamSelected()
                        ? "Please select company and team."
                        : ""
                    }
                  >
                    <ActionBtn
                      type="primary"
                      disabled={!this.isCompanyAndTeamSelected()}
                      onClick={() => {
                        this.props.history.push(
                          "/dashboard/test-manager/suite/create/" +
                            this.state.selectedCompany +
                            "/" +
                            this.state.selectedTeam
                        );
                      }}
                    >
                      <Icon type="plus" />
                      Add New
                    </ActionBtn>
                  </Tooltip>
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
                  dataSource={this.state.dataSource}
                  rowKey="testSuiteId"
                />
              </Spin>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
