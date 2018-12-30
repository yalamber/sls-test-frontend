import React, { Component } from "react";
import { Row, Col, Icon, Spin, Table } from "antd";
import { connect } from "react-redux";
import { get } from "lodash";
import LayoutWrapper from "@components/utility/layoutWrapper";
import PageHeader from "@components/utility/pageHeader";
import IntlMessages from "@components/utility/intlMessages";
import basicStyle from "@settings/basicStyle";
import { TitleWrapper, ComponentTitle, ActionBtn } from "@utils/crud.style";
import Box from "@components/utility/box";
import SWQAClient from "@helpers/apiClient";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      membershipData: {}
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const { teamId, userId } = this.props.match.params;
      this.setState({ loading: true });
      let membershipData = await SWQAClient.getClientTeamMembership(
        teamId,
        userId
      );
      this.setState({
        membershipData
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
    if (!this.state.membershipData) {
      return <div />;
    }

    const { membershipData = {} } = this.state;
    const { clientTeam = {}, user = {}, status } = membershipData;

    const records = [];

    const userName = user.username;
    userName && records.push({ field: "Username", description: userName });

    const userStatus = user.status;
    typeof user.status !== "undefined" &&
      records.push({ field: "User Status", description: userStatus });

    clientTeam.client &&
      records.push({
        field: "Client Name",
        description: clientTeam.client.name
      });

    const clientTeamName = clientTeam.name;
    clientTeamName &&
      records.push({ field: "Client Team Name", description: clientTeamName });

    const membershipStatus = status;
    membershipStatus &&
      records.push({
        field: "Membership Status",
        description: membershipStatus
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
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { history } = this.props;
    return (
      <LayoutWrapper>
        <PageHeader>
          Client -{" "}
          {get(this.state, "membershipData.clientTeam.client.name", "")}
          <br />
          Team - {get(this.state, "membershipData.clientTeam.name", "")}
        </PageHeader>

        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>
                  <ActionBtn type="secondary" onClick={() => history.goBack()}>
                    <Icon type="left" /> <IntlMessages id="back" />
                  </ActionBtn>
                  &nbsp; Member details
                </ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                {this.renderDetailsTable()}
              </Spin>
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
  {}
)(Detail);
