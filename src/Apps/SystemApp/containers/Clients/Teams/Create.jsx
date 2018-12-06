import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, message, Spin } from "antd";
import LayoutWrapper from "@components/utility/layoutWrapper";
import basicStyle from "@settings/basicStyle";
import ContentHolder from "@components/utility/contentHolder";
import { getErrorMessageFromApiResponseError } from "@utils/response-message";
import { TitleWrapper, ComponentTitle } from "@utils/crud.style";
import Box from "@components/utility/box";
import { addCompanyTeam } from "@helpers/http-api-client";
import clientActions from '@app/SystemApp/redux/client/actions';
import TeamForm from "./partials/TeamForm";

const { requestCurrentClient } = clientActions;

class Create extends Component {
  constructor() {
    super();
    this.state = {
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    this.props.requestCurrentClient(match.params.clientId);
  }

  handleSubmit(formData, resetForm) {
    const { clientId } = this.props.location.state.row;
    this.setState({ loading: true });
    addCompanyTeam({ ...formData, clientId })
      .then(res => {
        resetForm();
        message.success("Successfully Saved.");
      })
      .catch(error => {
        message.error(getErrorMessageFromApiResponseError(error));
      })
      .finally(() => {
        this.setState({ loading: false });
      });
    return true;
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { currentClient = { clientData: { name: '' } }, history, match } = this.props;
    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Box>
              <Spin spinning={this.state.loading}>
                <TitleWrapper>
                  <ComponentTitle>Create Team for  {currentClient.clientData.name} </ComponentTitle>
                </TitleWrapper>
              </Spin>
              <TeamForm submit={this.handleSubmit} />
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

export default connect(
  state => ({
    ...state.Client
  }),
  {
    requestCurrentClient
  }
)(Create);
