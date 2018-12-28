import React from "react";
import { Row, Col, Spin, Icon, Table } from "antd";
import LayoutWrapper from "@components/utility/layoutWrapper";
import PageHeader from "@components/utility/pageHeader";
import IntlMessages from "@components/utility/intlMessages";
import basicStyle from "@settings/basicStyle";
import { ActionBtn, TitleWrapper, ComponentTitle } from "@utils/crud.style";
import Box from "@components/utility/box";

const DisplayDetailsTable = ({ team = {} }) => {
  if (!team) {
    return <div />;
  }

  const { agency = {} } = team;
  const { owner = {} } = agency;
  const { contactInformation = {} } = owner;

  const records = [];
  team.name && records.push({ field: "Team Name", description: team.name });

  const agencyName = agency.name;
  agencyName && records.push({ field: "Agency Name", description: agencyName });

  const agencyLocation = agency.location;
  agencyLocation &&
    records.push({ field: "Agency Location", description: agencyLocation });

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
};

export default ({ loading, pageHeader = null, team = {}, history }) => {
  const { rowStyle, colStyle, gutter } = basicStyle;
  return (
    <LayoutWrapper>
      {pageHeader && <PageHeader>{pageHeader}</PageHeader>}
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col md={24} sm={24} xs={24} style={colStyle}>
          <Box>
            <Spin spinning={loading}>
              <TitleWrapper>
                <ComponentTitle>
                  <ActionBtn type="secondary" onClick={() => history.goBack()}>
                    <Icon type="left" /> <IntlMessages id="back" />
                  </ActionBtn>
                  &nbsp; Details
                </ComponentTitle>
              </TitleWrapper>
              <DisplayDetailsTable team={team} />
            </Spin>
          </Box>
        </Col>
      </Row>
    </LayoutWrapper>
  );
};
