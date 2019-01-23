import React from "react";
import { Row, Col, Spin, Icon, Table } from "antd";
import LayoutWrapper from "@components/utility/layoutWrapper";
import PageHeader from "@components/utility/pageHeader";
import IntlMessages from "@components/utility/intlMessages";
import basicStyle from "@settings/basicStyle";
import { ActionBtn, TitleWrapper, ComponentTitle } from "@utils/crud.style";
import Box from "@components/utility/box";

export default ({
  loading,
  pageHeader = null,
  team = {},
  history
}) => {
  const { rowStyle, colStyle, gutter } = basicStyle;
  const records = [];
  if(team.name){
    records.push({ field: "Team Name", description: team.name }); 
  }

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
            </Spin>
          </Box>
        </Col>
      </Row>
    </LayoutWrapper>
  );
};
