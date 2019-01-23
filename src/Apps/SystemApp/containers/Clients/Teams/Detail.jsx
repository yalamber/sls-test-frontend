import React, { Component } from "react";
import { get } from "lodash";
import { Table } from "antd";
import TeamDetail from "@appComponents/Team/Detail";
import SWQAClient from "@helpers/apiClient";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      team: {}
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  renderDetailsTable() {
    const { team = {} } = this.state;
    if (!team) {
      return <div />;
    }

    const { client = {} } = team;
    const { owner = {} } = client;
    const { contactInformation = {} } = owner;

    const records = [];
    team.name && records.push({ field: "Team Name", description: team.name });

    const clientName = client.name;
    clientName &&
      records.push({ field: "Client Name", description: clientName });

    const clientLocation = client.location;
    clientLocation &&
      records.push({ field: "Client Location", description: clientLocation });

    const clientOwnerUserName = owner.username;
    clientOwnerUserName &&
      records.push({
        field: "Owner Username",
        description: clientOwnerUserName
      });

    const clientOwnerEmailAddress = contactInformation.emailAddress;
    clientOwnerEmailAddress &&
      records.push({
        field: "Owner Email Address",
        description: clientOwnerEmailAddress
      });

    return (
      <Table
        columns={[
          {
            title: "Field",
            key: "field",
            dataIndex: "field"
          },

          {
            title: "Description",
            key: "description",
            dataIndex: "description"
          }
        ]}
        dataSource={records}
        rowKey="field"
        pagination={false}
      />
    );
  }

  async fetchData() {
    try {
      const { match } = this.props;
      //if team id we get team details
      let clientTeam = await SWQAClient.getClientTeam(match.params.teamId);
      this.setState({
        team: clientTeam
      });
    } catch (e) {
      this.setState({
        error: e
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <TeamDetail
        pageHeader={[
          `Client - ${get(this.state, "team.client.name", "")}`,
          <br />,
          `Team - ${get(this.state, "team.name", "")}`
        ]}
        team={this.state.team}
        loading={this.state.loading}
      />
    );
  }
}

export default Detail;
