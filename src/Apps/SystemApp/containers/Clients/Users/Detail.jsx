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
import clientActions from "@app/SystemApp/redux/client/actions";

const { requestCurrentClient, requestCurrentClientUser } = clientActions;

class Detail extends Component {
  componentDidMount() {
    const {
      match,
      requestCurrentClient,
      requestCurrentClientUser
    } = this.props;
    //get current client
    requestCurrentClient(match.params.clientId);
    requestCurrentClientUser(match.params.clientId, match.params.userId);
  }

  renderDetailsTable() {
    const { currentClientUser } = this.props;
    if (!currentClientUser) {
      return <div />;
    }

    const { data = {} } = currentClientUser;
    const { client = {}, user = {}, role = {} } = data;

    const records = [];
    user.username &&
      records.push({ field: "User Name", description: user.username });

    const userStatus = user.status;
    userStatus &&
      records.push({ field: "User Status", description: userStatus });

    const clientName = client.name;
    clientName && records.push({ field: "Client", description: clientName });

    const roleTitle = role.title;
    roleTitle && records.push({ field: "Role", description: roleTitle });

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
    const { currentClient, currentClientUser, history } = this.props;

    let loading = currentClient.loading || currentClientUser.loading;
    let title = "User Details";
    return (
      <LayoutWrapper>
        <PageHeader>
          Client - {get(currentClient, "clientData.name", "")}
        </PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>
                  <ActionBtn type="secondary" onClick={() => history.goBack()}>
                    <Icon type="left" /> <IntlMessages id="back" />
                  </ActionBtn>
                  &nbsp; {title}
                </ComponentTitle>
              </TitleWrapper>
              <Spin spinning={loading}>{this.renderDetailsTable()}</Spin>
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
    requestCurrentClient,
    requestCurrentClientUser
  }
)(Detail);
