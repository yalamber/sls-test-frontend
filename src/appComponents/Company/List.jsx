import React from 'react';
import { Row, Col, Icon, Spin } from 'antd';
import LayoutWrapper from '@components/utility/layoutWrapper';
import IntlMessages from '@components/utility/intlMessages';
import Box from '@components/utility/box';
import basicStyle from '@settings/basicStyle';
import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from '@utils/crud.style';

function List ({
  listType = 'agency', 
  list, 
  history, 
  onTablePaginationChange,
  columns
}) {
  const { rowStyle, colStyle, gutter } = basicStyle;
  let titleKey = 'agencies';
  if(listType === 'client'){
    titleKey = 'clients'
  }
  return (
    <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle><IntlMessages id={titleKey}/></ComponentTitle>
                <ButtonHolders>
                  <ActionBtn
                    type="primary"
                    onClick={() => {
                      history.push(`${listType}/create`);
                    }}>
                    <Icon type="plus" />
                    <IntlMessages id={`${listType}.add`} />
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              <Spin spinning={list.loading}>
                <Table
                  locale={{ emptyText: "List is empty" }}
                  pagination={{
                    ...list.paginationOptions,
                    onChange: onTablePaginationChange
                  }}
                  bordered
                  rowKey={`${listType}Id`}
                  columns={columns}
                  dataSource={list.rows}
                  onRow={row => ({
                    onDoubleClick: () => {
                      history.push(`${listType}/${row[`${listType}Id`]}/details`);
                    }
                  })}
                />
              </Spin>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
  )
}

export default List;