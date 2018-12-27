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
      agency: {},
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
        let agencyTeam = await SWQAClient.getAgencyTeam(match.params.teamId);
        this.setState({
          team: agencyTeam,
          agency: agencyTeam.agency
        });
      } else {
        let agency = await SWQAClient.getAgency(match.params.agencyId);
        this.setState({
          agency: agency
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
            await SWQAClient.updaetAgencyTeam(match.params.teamId, values);
            message.success("Successfully Saved.");
          } else {
            let team = await SWQAClient.addAgencyTeam({ ...values, agencyId: match.params.agencyId });
            message.success("Successfully Saved.");
            history.replace(`/admin/agency/team/${team.agencyTeamId}/details`);
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
    let pageHeaderTitle = `Agency - ${get(this.state, 'agency.name', '')}`;
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
