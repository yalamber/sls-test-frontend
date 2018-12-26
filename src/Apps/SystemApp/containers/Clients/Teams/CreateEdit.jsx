import React, { Component } from "react";
import { Form, message } from "antd";
import { get } from 'lodash';
import { getErrorMessageFromApiResponseError } from "@utils/response-message";
import SWQAClient from '@helpers/apiClient';
import TeamCreateEdit from "@appComponents/Team/CreateEdit";

class CreateEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      client: {},
      team: {}
    };
    this.mode = props.match.params.teamId ? 'edit' : 'add';
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try{
      const { match } = this.props;
      //if team id we get team details
      if(this.mode === 'edit') {
        let clientTeam = await SWQAClient.getClientTeam(match.params.teamId);
        this.setState({
          team: clientTeam,
          client: clientTeam.client
        });
      } else {
        let client = await SWQAClient.getClient(match.params.clientId);
        this.setState({
          client: client
        });
      }
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

  handleSubmit(e) {
    e.preventDefault();
    let { history, match, form } = this.props;
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {    
        try{
          this.setState({ loading: true });
          if(this.mode === 'edit'){
            await SWQAClient.updateClientTeam(match.params.teamId, values);
            message.success("Successfully Saved.");

          } else {
            let team = await SWQAClient.addClientTeam({ ...values, clientId: match.params.clientId });
            message.success("Successfully Saved.");
            history.replace(`/admin/client/team/${team.clientTeamId}/details`);
          }

        } catch(e) {
          message.error(getErrorMessageFromApiResponseError(e));
          this.setState({ error: e });
        } finally {
          this.setState({ loading: false });
        }
      }
    });
  }

  render() {
    let pageHeaderTitle = `Client - ${get(this.state, 'client.name', '')}`;
    return (
      <TeamCreateEdit {...this.props} 
        initialData={this.state.team}
        pageHeader={pageHeaderTitle}
        mode={this.mode} 
        loading={this.state.loading}
        handleSubmit={this.handleSubmit}/>
    );
  }
}

const form = Form.create()(CreateEdit);

export default form;
