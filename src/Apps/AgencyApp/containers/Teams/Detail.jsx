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

  render() {
    return (
      <TeamDetail
        pageHeader={`Team - ${get(this.state, "team.name")}`}
        team={this.state.team}
        loading={this.state.loading}
      />
    );
  }
}

export default Detail;
