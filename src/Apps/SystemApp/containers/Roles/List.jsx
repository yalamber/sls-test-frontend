import React, { Component } from 'react';
import { Row, Col, Icon, Spin } from 'antd';
import { connect } from 'react-redux';
//import IntlMessages from '@components/utility/intlMessages';
import LayoutWrapper from '@components/utility/layoutWrapper';
import basicStyle from '@settings/basicStyle';
import Box from '@components/utility/box';
import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from '@utils/crud.style';
import roleActions from '@app/SystemApp/redux/role/actions';
import ActionButtons from "./partials/ActionButtons";
const { requestRoles, deleteRole } = roleActions;

class RolesList extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.onTablePaginationChange = this.onTablePaginationChange.bind(this);
    this.columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Key',
        dataIndex: 'key',
        key: 'key',
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (row) => <ActionButtons row={row} deleteRole={this.handleDelete} />
      }
    ];
  }

  componentDidMount() {
    this.props.requestRoles({
      page: 1,
      pageSize: 5
    });
  }

  onTablePaginationChange(page, pageSize) {
    this.props.requestRoles({
      page,
      pageSize
    });
  }

  handleDelete(row) {
    this.props.deleteRole(row.roleId);
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { history, list } = this.props;
    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Roles</ComponentTitle>
                <ButtonHolders>
                  <ActionBtn type="primary" onClick={() => {
                    history.push('role/create')
                  }}>
                    <Icon type="plus" />
                    Add Role
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              <Spin spinning={list.loading}>
                <Table
                  pagination={{
                    ...list.paginationOptions,
                    onChange: this.onTablePaginationChange
                  }}
                  rowKey="roleId"
                  columns={this.columns}
                  dataSource={list.rows}
                  onRow={row => ({
                    onDoubleClick: () => {
                      history.push(`details/${row.roleId}`);
                    }
                  })}
                />
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
    ...state.Role
  }),
  {
    requestRoles,
    deleteRole
  }
)(RolesList);
