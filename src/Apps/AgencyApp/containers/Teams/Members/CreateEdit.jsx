import React, { Component } from "react";
import { Row, Col, Icon, Spin, message, Form } from "antd";
import { get } from "lodash";
import LayoutWrapper from "@components/utility/layoutWrapper";
import PageHeader from "@components/utility/pageHeader";
import IntlMessages from "@components/utility/intlMessages";
import basicStyle from "@settings/basicStyle";
import Button from "@components/uielements/button";
import { getErrorDataFromApiResponseError } from "@utils/response-message";
import { ActionWrapper, TitleWrapper, ComponentTitle, ActionBtn } from "@utils/crud.style";
import Box from "@components/utility/box";
import MemberFormFields from "@appComponents/Team/Members/partials/FormFields";
import SWQAClient from '@helpers/apiClient';

class CreateEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      membershipData: {},
      team: {},
      users: [],
      roles: [],
      errors: {
        details: []
      },
      loading: true
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.mode = props.match.params.userId? 'edit': 'add';
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const { teamId, userId } = this.props.match.params;
    this.setState({ loading: true });
    try {
      let agencyTeam = await SWQAClient.getAgencyTeam(teamId);
      let agencyUsers = await SWQAClient.getAgencyUsers(agencyTeam.agency.agencyId, {
        limit: 50,
      });
      let agencyRoles = await SWQAClient.getRoles({
        type: 'agencyTeamUser',
        limit: 10
      });
      let myState = {
        loading: false,
        team: agencyTeam,
        roles: agencyRoles.rows,
        users: agencyUsers.rows
      };
      if(userId) {
        let membershipData = await SWQAClient.getAgencyTeamMembership(teamId, userId);
        myState.membershipData = membershipData;
      }
      this.setState(myState);
    } catch (e) {
      message.error("Problem occured.");
      this.setState({ loading: false });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        try {  
          if(this.mode === 'edit') {
            const { teamId } = this.props.match.params;
            const { status, userId, roleId } = values;
            this.setState({ loading: true });
            let agencyTeamMember = await SWQAClient.editAgencyTeamMember({
              userId,
              teamId,
              status,
              roleId,
            });
            //TODO check for agencyTeamMember field for success
            if(agencyTeamMember){  
              message.success("Successfully updated");
              this.props.form.resetFields();
              this.setState({ errors: { details: [] } });
              this.props.history.goBack();
            }
          } else {
            const { teamId } = this.props.match.params;
            const { status, userId, roleId } = values;
            this.setState({ loading: true });
            let agencyTeamMember = await SWQAClient.addAgencyTeamMember({
              userId,
              teamId,
              status,
              roleId,
            });
            //TODO check for agencyTeamMember field for success
            if(agencyTeamMember){  
              message.success("Successfully Saved");
              this.props.form.resetFields();
              this.setState({ errors: { details: [] } });
              this.props.history.goBack();
            }
          }
        } catch (error) {
          this.setState({ errors: getErrorDataFromApiResponseError(error) });
        } finally {
          this.setState({ loading: false });
        }
      }
    });
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const margin = {
      margin: "5px 5px 0px 0"
    };
    const { history } = this.props;

    return (
      <LayoutWrapper>
        <PageHeader>
          Team - { get(this.state, 'team.name', '') }
        </PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>
                  <ActionBtn
                    type="secondary"
                    onClick={() => history.goBack()}>
                    <Icon type="left" /> <IntlMessages id="back" />
                  </ActionBtn> {this.mode === 'edit'? 'Edit': 'Add'} Team Member
                </ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <Form onSubmit={this.handleSubmit} id="agencyForm">
                  <MemberFormFields
                    form={this.props.form}
                    users={this.state.users}
                    roles={this.state.roles}
                    membershipData={this.state.membershipData}
                  />
                  <ActionWrapper style={margin}>
                    <Button
                      type="primary"
                      style={margin}
                      icon="left"
                      onClick={() => history.goBack()}
                    >
                      Cancel
                    </Button>
                    <Button
                      id="btnSubmit"
                      type="primary"
                      style={margin}
                      htmlType="submit"
                      className=""
                      icon="save"
                    >
                      Submit
                    </Button>
                  </ActionWrapper>
                </Form>
              </Spin>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

const form = Form.create()(CreateEdit);

export default form;