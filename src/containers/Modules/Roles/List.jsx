import React, { Component } from 'react';
import { Row, Col, Icon, Spin } from 'antd';
import { connect } from 'react-redux';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import basicStyle from '../../../settings/basicStyle';
import Box from '../../../components/utility/box';
import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from '../crud.style';
import ActionButtons from "./partials/ActionButtons";
import roleActions from '../../../redux/role/actions';

const { requestRoles, deleteRole } = roleActions;

const columns = [
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
    render: (row) => <ActionButtons row={row} delete={this.handleDelete} />
  }
];

class RolesList extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.onTablePaginationChange = this.onTablePaginationChange.bind(this);
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
    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Roles</ComponentTitle>
                <ButtonHolders>
                  <ActionBtn type="primary" onClick={() => {
                    this.props.history.push('role/create')
                  }}>
                    <Icon type="plus" />
                    Add Role
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              <Spin spinning={this.props.list.loading}>
                <Table
                  pagination={{
                    ...this.props.list.paginationOptions,
                    onChange: this.onTablePaginationChange
                  }}
                  rowKey="roleId"
                  columns={columns}
                  dataSource={this.props.list.rows}
                  onRow={row => ({
                    onDoubleClick: () => {
                      this.props.history.push(`details/${row.roleId}`);
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
    ...state.Roles
  }),
  {
    requestRoles,
    deleteRole
  }
)(RolesList);
