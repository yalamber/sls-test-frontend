import React, { Component } from "react";
import { Form, message } from "antd";
import { getErrorMessageFromApiResponseError } from "@utils/response-message";
import SWQAClient from '@helpers/apiClient';
import TeamCreateEdit from "@appComponents/Team/CreateEdit";

class CreateEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
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
          team: clientTeam
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
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {    
        try{
          this.setState({ loading: true });
          if(this.mode === 'edit'){
            await SWQAClient.updateClientTeam(this.props.match.params.teamId, values);
            message.success("Successfully Saved.");
          } else {
            await SWQAClient.addClientTeam({ ...values});
            message.success("Successfully Added.");
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
    return (
      <TeamCreateEdit {...this.props} 
        initialData={this.state.team} 
        mode={this.mode} 
        loading={this.state.loading}
        handleSubmit={this.handleSubmit}/>
    );
  }
}

const form = Form.create()(CreateEdit);

export default form;
