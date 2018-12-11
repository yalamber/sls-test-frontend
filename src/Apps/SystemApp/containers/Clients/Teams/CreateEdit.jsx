import React, { Component } from "react";
import { Form, Row, Col, message, Spin } from "antd";
import { get } from 'lodash';
import LayoutWrapper from "@components/utility/layoutWrapper";
import PageHeader from "@components/utility/pageHeader";
import basicStyle from "@settings/basicStyle";
import ContentHolder from "@components/utility/contentHolder";
import { getErrorMessageFromApiResponseError } from "@utils/response-message";
import { ActionWrapper, TitleWrapper, ComponentTitle } from "@utils/crud.style";
import Button from '@components/uielements/button';
import Box from "@components/utility/box";
import TeamFormFields from "@appComponents/Team/FormFields";
import SWQAClient from '@helpers/apiClient';

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
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {    
        try{
          this.setState({ loading: true });
          if(this.mode === 'edit'){
            await SWQAClient.updaetClientTeam(this.props.match.teamId, values);
            message.success("Successfully Saved.");
          } else {
            await SWQAClient.addClientTeam({ ...values, clientId: this.props.match.clientId });
            message.success("Successfully Saved.");
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
    const { rowStyle, colStyle, gutter } = basicStyle;
    const margin = {
      margin: '5px 5px 0px 0'
    };
    let pageHeaderTitle = `Client - ${get(this.state, 'client.name', '')}`;
    let title = '';
    if(this.mode === 'edit') {
      title = `Edit Team: ${ get(this.state, 'team.name', '') }`;
    } else {
      title = `Create Team`;
    }
    return (
      <LayoutWrapper>
        <PageHeader>
          {pageHeaderTitle}
        </PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Box>
              <Spin spinning={this.state.loading}>
                <TitleWrapper>
                  <ComponentTitle>{title}</ComponentTitle>
                </TitleWrapper>
              </Spin>
              <Form onSubmit={this.handleSubmit} id="clientForm">
                <TeamFormFields form={this.props.form}  />    
                <ActionWrapper style={margin}>
                  <Button type="primary" style={margin} icon="left" onClick={() => this.props.history.goBack()}>
                    Cancel
                  </Button>
                  <Button id="btnSubmit" type="primary" style={margin} htmlType="submit" className="" icon="save">
                    Submit
                  </Button>
                </ActionWrapper>
              </Form>
            </Box>
          </Col>
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Box title="Instruction">
              <ContentHolder>
                <p>
                  <b>Team Name : </b> Team name must be alphabet with 5 to 25
                  characters.
                </p>
              </ContentHolder>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

const mapPropsToFields = (props) => {
  if (!props.hasOwnProperty('team')) {
    return;
  }
  return {
    clientId: Form.createFormField({
      value: props.team.clientId ? props.team.clientId.toString() : ''
    }),
    name: Form.createFormField({
      value: props.team.name
    })
  };
};

const form = Form.create({mapPropsToFields})(CreateEdit);

export default form;
