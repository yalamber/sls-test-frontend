import React, { Component } from "react";
import { Row, Col, Icon, Spin } from "antd";
import LayoutWrapper from "@components/utility/layoutWrapper";
import IntlMessages from "@components/utility/intlMessages";
import basicStyle from "@settings/basicStyle";
import Box from "@components/utility/box";
import { compose, withProps } from "recompose";
import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from "@utils/crud.style";

import TableListingBase from "@commons/table/tableListingBase";

function TableListing(props) {
  const {
    history,
    loading
  } = props;
  const { rowStyle, colStyle, gutter } = basicStyle;

  const EnhancedRow = compose(
    withProps({ style: rowStyle, gutter, justify: "start" })
  )(Row);
  const EnhancedCol = compose(
    withProps({ md: 24, sm: 24, xs: 24, style: colStyle })
  )(Col);

  return (
    <TableListingBase
      {...{
        loading: props.loading,
        components: Object.assign({
          Table,
          Box,
          LayoutWrapper,
          Spin,
          Row: EnhancedRow,
          Col: EnhancedCol,
          TitleWrapperWithContents: () => (
            <TitleWrapper>
              <ComponentTitle>
                <IntlMessages id="clients" />
              </ComponentTitle>
              <ButtonHolders>
                <ActionBtn
                  type="primary"
                  onClick={() => {
                    history.push("client/create");
                  }}
                >
                  <Icon type="plus" />
                  <IntlMessages id="client.add" />
                </ActionBtn>
              </ButtonHolders>
            </TitleWrapper>
          )
        }, props.components),
        tableOptions: Object.assign(
          {
            locale: { emptyText: "No Clients" },
            bordered: true,
          },
          props.tableOptions
        )
      }}
    />
  );
}

export default TableListing;
