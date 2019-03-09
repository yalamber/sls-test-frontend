import React from 'react';
import { Row, Col, Icon, Spin } from 'antd';
import LayoutWrapper from '@components/utility/layoutWrapper';
import PageHeader from "@components/utility/pageHeader";
import IntlMessages from '@components/utility/intlMessages';
import basicStyle from '@settings/basicStyle';
import Box from '@components/utility/box';
import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from '@utils/crud.style';
const { rowStyle, colStyle, gutter } = basicStyle;

export default ({
  columns,
  history,
  paginationOptions,
  loading,
  data = [],
  onTablePaginationChange,
  onTableRow,
  pageHeader = null,
  emptyText = 'No Teams available',
  createLink = '',
  createText = 'Add new',
  rowKey
}) => {
  return (
    <LayoutWrapper>
      { pageHeader &&
        <PageHeader>
          {pageHeader}
        </PageHeader>
      }
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col md={24} sm={24} xs={24} style={colStyle}>
          <Box>
            <TitleWrapper>
              <ComponentTitle>
                <ActionBtn
                  type="secondary"
                  onClick={() => history.goBack()}
                >
                  <Icon type="left" /> <IntlMessages id="back" />
                </ActionBtn> Teams
              </ComponentTitle>
              {createLink &&
                <ButtonHolders>
                  <ActionBtn
                    type="primary"
                    onClick={() => {
                      history.push(createLink);
                    }}>
                    <Icon type="plus" />
                    {createText}
                  </ActionBtn>
                </ButtonHolders>
              }
            </TitleWrapper>
            <Spin spinning={loading}>
              <Table
                locale={{ emptyText }}
                pagination={{
                  ...paginationOptions,
                  onChange: onTablePaginationChange
                }}
                bordered
                columns={columns}
                onRow={onTableRow}
                dataSource={data}
                rowKey={rowKey}
              />
            </Spin>
          </Box>
        </Col>
      </Row>
    </LayoutWrapper>
  );
}
