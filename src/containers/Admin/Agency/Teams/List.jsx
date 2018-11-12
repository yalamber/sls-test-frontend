import React, { Component } from "react";
import { Row, Col, Icon, Rate, Spin, Select } from "antd";
import LayoutWrapper from "../../../../components/utility/layoutWrapper.js";
import basicStyle from "../../../../settings/basicStyle";
import Box from "../../../../components/utility/box";
import ActionButtons from "./partials/ActionButtons";
import { connect } from "react-redux";

import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from "../../crud.style";
import {
  getAgencyTeams
  // deleteProviderTeam
} from "../../../../actions/agencyActions";
import { message } from "antd/lib/index";

const Option = Select.Option;

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
    console.log("location.state", location.state);
    const defaultAgency = agencyId
      ? agencyId
      : agencyIdfromLocation
        ? agencyIdfromLocation
        : "";
    console.log("defaultAgency", defaultAgency, agencyId, agencyIdfromLocation);
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
      getAgencyTeams({ agencyId })
        .then(res => {
          this.setState({
            dataSource: res.data,
            agencyName:
              res.data && res.data.length ? res.data[0].agency.name : "",
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

    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <Spin spinning={this.state.loading}>
                <TitleWrapper>
                  <ComponentTitle className="captialize-data">
                    {this.state.agencyName} - Teams List
                  </ComponentTitle>
                  <ButtonHolders>
                    <ActionBtn
                      type="primary"
                      onClick={() => {
                        this.props.history.push("teams/create");
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
                      console.log("we gotta row", row);
                      this.props.history.push("teams/team-members");
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
