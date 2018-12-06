import React, { Component } from "react";
// import { Row, Col, Icon, Spin } from "antd";
// import { connect } from "react-redux";
// import LayoutWrapper from "@components/utility/layoutWrapper";
// import IntlMessages from "@components/utility/intlMessages";
// import basicStyle from "@settings/basicStyle";
// import Box from "@components/utility/box";
// import {
//   ActionBtn,
//   TitleWrapper,
//   ButtonHolders,
//   ComponentTitle
// } from "@utils/crud.style";
// import clientActions from "@app/SystemApp/redux/client/actions";
// // import ActionButtons from "./partials/ActionButtons";
// // import TestManagerActionButtons from './partials/TestManagerActionButtons';
// const { requestClients, deleteClient } = clientActions;

function TableListingBase(props) {
  const {
    components: { Table, LayoutWrapper, Row, Col, Box, TitleWrapperWithContents, Spin },
    tableOptions,
    list,
    history,
    loading,
    rowStyle,
    gutter,
    colStyle
  } = props;

  return (
    <LayoutWrapper>
      <Row>
        <Col>
          <Box>
            <TitleWrapperWithContents />
            <Spin spinning={loading}>
              <Table {...tableOptions} />
            </Spin>
          </Box>
        </Col>
      </Row>
    </LayoutWrapper>
  );
}

export default TableListingBase;
