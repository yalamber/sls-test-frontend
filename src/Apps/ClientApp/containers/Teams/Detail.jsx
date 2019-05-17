import React, { Component } from "react";
import { get } from 'lodash';
import TeamDetail from '@appComponents/Team/Detail';
import SWQAClient from '@helpers/apiClient';

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
    try{
      const { match } = this.props;
      //if team id we get team details
      let clientTeam = await SWQAClient.getClientTeam(match.params.teamId);
      this.setState({
        team: clientTeam
      });
    } catch(e) {
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
        pageHeader={`Team - ${get(this.state, 'team.name')}`}
        team={this.state.team}
        loading={this.state.loading}
        history={this.props.history}
      />
    );
  }
}

export default Detail;
