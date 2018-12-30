import React, { Component } from "react";
import { Row, Col, Icon, Spin, Table } from "antd";
import { connect } from "react-redux";
import { get } from "lodash";
import LayoutWrapper from "@components/utility/layoutWrapper";
import PageHeader from "@components/utility/pageHeader";
import basicStyle from "@settings/basicStyle";
import { TitleWrapper, ComponentTitle, ActionBtn } from "@utils/crud.style";
import Box from "@components/utility/box";
import agencyActions from "@app/SystemApp/redux/agency/actions";

const { requestCurrentAgency } = agencyActions;

class Detail extends Component {
  componentDidMount() {
    const { match, requestCurrentAgency } = this.props;
    //get current agency
    if (isNaN(match.params.agencyId)) {
      this.props.history.goBack();
    }
    requestCurrentAgency(match.params.agencyId);
  }

  getMappedDataSource() {
    const { currentAgency = {} } = this.props;
    const { agencyData = {} } = currentAgency;
    const { owner = {} } = agencyData;
    const { contactInformation = {} } = owner;

    const records = [];
    const agencyName = agencyData.name;
    agencyName && records.push({ field: "Name", description: agencyName });

    const agencyLocation = agencyData.location;
    agencyLocation &&
      records.push({ field: "Location", description: agencyLocation });

    const agencyOwnerUserName = owner.username;
    agencyOwnerUserName &&
      records.push({
        field: "Owner Username",
        description: agencyOwnerUserName
      });

    const agencyOwnerEmailAddress = contactInformation.emailAddress;
    agencyOwnerEmailAddress &&
      records.push({
        field: "Owner Email Address",
        description: agencyOwnerEmailAddress
      });

    return records;
  }

  renderDetails() {
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
        dataSource={this.getMappedDataSource()}
        rowKey="field"
        pagination={false}
      />
    );
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { currentAgency, history } = this.props;

    let loading = currentAgency.loading;
    let title = "Agency Details";
    return (
      <LayoutWrapper>
        <PageHeader>
          Agency - {get(currentAgency, "agencyData.name", "")}
        </PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>
                  <ActionBtn type="secondary" onClick={() => history.goBack()}>
                    <Icon type="left" /> Go Back
                  </ActionBtn>
                  &nbsp; {title}
                </ComponentTitle>
              </TitleWrapper>
              <Spin spinning={loading}>{this.renderDetails()}</Spin>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

export default connect(
  state => ({
    ...state.Agency
  }),
  {
    requestCurrentAgency
  }
)(Detail);
