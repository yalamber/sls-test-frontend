import React, { Component } from "react";
import { Row, Col, Icon, Rate, Spin } from "antd";
import LayoutWrapper from "@components/utility/layoutWrapper";
import basicStyle from "@settings/basicStyle";
import Box from "@components/utility/box";
import ActionButtons from "./partials/ActionButtons";
import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from "@utils/crud.style";
import {
  getAgencyTeams
  // deleteProviderTeam
} from "@helpers/http-api-client";

class TeamsList extends Component {
  constructor(props) {
    super(props);

    const { location } = this.props;
    const agencyIdfromLocation =
      location && location.state && location.state.agencyId
        ? location.state.agencyId + ""
        : "";
    const agencyName =
      location && location.state && location.state.name
        ? location.state.name + ""
        : "";
    const { agencyId } = this.props.match.params;
    const defaultAgency = agencyId
      ? agencyId
      : agencyIdfromLocation
        ? agencyIdfromLocation
        : "";
    this.state = {
      selectedAgency: undefined,
      agencyName,
      columns: [
        {
          title: "Team Name",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "Team Admin",
          dataIndex: "manager.username",
          key: "teamAdmin"
        },
        {
          title: "Rating",
          dataIndex: "rating",
          key: "rating",
          render: value => <Rate defaultValue={value} disabled />
        },
        {
          title: "Actions",
          key: "actions",
          render: row => <ActionButtons row={row} delete={this.handleDelete} />
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
    const { agencyId } = this.props.match.params;
    this.setState({ loading: true }, () => {
      getAgencyTeams({ query: { agencyId } })
        .then(res => {
          this.setState({
            dataSource: res.rows,
            loading: false
          });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    });
  }

  handleDelete(row) {
    this.setState({ loading: true });
    // deleteProviderTeam(row.providerTeamId)
    //   .then(res => {
    //     message.success("Successfully Deleted.");
    //     this.fetchData();
    //   })
    //   .finally(() => {
    //     this.setState({ loading: false });
    //   });
  }

  render() {
    const margin = {
      margin: "5px 5px 10px 0"
    };

    const { rowStyle, colStyle, gutter } = basicStyle;
    const { agencyId } = this.props.match.params;

    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <Spin spinning={this.state.loading}>
                <TitleWrapper>
                  <ComponentTitle className="captialize-data">
                    Agency -> {this.state.agencyName} - Team List
                  </ComponentTitle>
                  <ButtonHolders>
                    <ActionBtn
                      type="primary"
                      onClick={() => {
                        this.props.history.push(
                          {
                            pathname: `/dashboard/agency/team/${agencyId}/create`
                          },
                          {
                            ...this.props.location.state
                          }
                        );
                      }}
                    >
                      <Icon type="usergroup-add" />
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
                  rowKey="providerTeamId"
                  onRow={row => ({
                    onDoubleClick: () => {
                      this.props.history.push(
                        `/dashboard/agency/teams/${row.agencyTeamId}/members`
                      );
                    }
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

export default TeamsList;
