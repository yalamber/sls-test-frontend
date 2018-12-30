import React, { Component } from "react";
import { Table } from "antd";
import { get } from "lodash";
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

  async fetchData() {
    try {
      const { match } = this.props;
      //if team id we get team details
      let agencyTeam = await SWQAClient.getAgencyTeam(match.params.teamId);
      this.setState({
        team: agencyTeam
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

  renderDetailsTable() {
    const { team = {} } = this.state;
    if (!team) {
      return <div />;
    }

    const { agency = {} } = team;
    const { owner = {} } = agency;
    const { contactInformation = {} } = owner;

    const records = [];
    team.name && records.push({ field: "Team Name", description: team.name });

    const agencyName = agency.name;
    agencyName &&
      records.push({ field: "Agency Name", description: agencyName });

    const agencyLocation = agency.location;
    agencyLocation &&
      records.push({ field: "Agency Location", description: agencyLocation });

    const agencyOwnerUserName = owner.username;
    agencyOwnerUserName &&
      records.push({
        field: "Owner Username",
        description: agencyOwnerUserName
      });

    const agencyOwnerEmailAddress = contactInformation.emailAddress;
    agencyOwnerEmailAddress &&
      records.push({
        field: "Owner Email Address",
        description: agencyOwnerEmailAddress
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

  render() {
    return (
      <TeamDetail
        {...this.state}
        {...this.props}
        renderDetailsTable={this.renderDetailsTable.bind(this)}
        pageHeader={[
          `Agency - ${get(this.state, "team.agency.name", "")}`,
          <br />,
          `Team - ${get(this.state, "team.name", "")}`
        ]}
      />
    );
  }
}

export default Detail;
