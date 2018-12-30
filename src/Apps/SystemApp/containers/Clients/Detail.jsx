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

const { requestCurrentClient } = clientActions;

class Detail extends Component {
  componentDidMount() {
    const { match, requestCurrentClient } = this.props;
    //get current client
    requestCurrentClient(match.params.clientId);
  }

  renderDetailsTable() {
    const { currentClient } = this.props;

    if (!currentClient) {
      return <div />;
    }

    const { clientData = {} } = currentClient;
    const { owner = {} } = clientData;
    const { contactInformation = {} } = owner;

    const records = [];
    const clientName = clientData.name;
    clientName && records.push({ field: "Name", description: clientName });

    const clientLocation = clientData.location;
    clientLocation &&
      records.push({ field: "Location", description: clientLocation });

    const ownerUserName = owner.username;
    ownerUserName &&
      records.push({
        field: "Owner Username",
        description: ownerUserName
      });

    const ownerEmailAddress = contactInformation.emailAddress;
    ownerEmailAddress &&
      records.push({
        field: "Owner Email Address",
        description: ownerEmailAddress
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
    const { currentClient, history } = this.props;

    let loading = currentClient.loading;
    let title = "Client Details";
    return (
      <LayoutWrapper>
        <PageHeader>
          Client - {get(currentClient, "clientData.name")}
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
    requestCurrentClient
  }
)(Detail);
