import React, { Component } from 'react';
import { Row, Col, Icon, Spin } from 'antd';
import { connect } from 'react-redux';
import IntlMessages from '@components/utility/intlMessages';
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
import systemUserActions from '@app/SystemApp/redux/systemUser/actions';
import ActionButtons from "./partials/ActionButtons";

const { requestSystemUsers, deleteSystemUser } = systemUserActions;

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.onTablePaginationChange = this.onTablePaginationChange.bind(this);
    this.columns = [
      {
        title: 'Username',
        dataIndex: 'systemUser.username',
        key: 'title',
      },
      {
        title: 'Email',
        dataIndex: 'systemUser.contactInformation.emailAddress',
        key: 'email',
      },
      {
        title: 'Role',
        dataIndex: 'role.title',
        key: 'role',
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (row) => <ActionButtons row={row} deleteUser={this.handleDelete} />
      }
    ];
  }

  componentDidMount() {
    this.onTablePaginationChange(1, 5);
  }

  onTablePaginationChange(page, pageSize) {
    this.props.requestSystemUsers({
      page,
      pageSize
    });
  }

  handleDelete(row) {
    this.props.deleteSystemUser(row.userId);
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
                <ComponentTitle><IntlMessages id="system.users" /></ComponentTitle>
                <ButtonHolders>
                  <ActionBtn type="primary" onClick={() => {
                    history.push('user/create')
                  }}>
                    <Icon type="plus" />
                    Add System User
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              <Spin spinning={list.loading}>
                <Table
                  pagination={{
                    ...list.paginationOptions,
                    onChange: this.onTablePaginationChange
                  }}
                  rowKey="userId"
                  columns={this.columns}
                  dataSource={list.rows}
                  onRow={row => ({
                    onDoubleClick: () => {
                      history.push(`details/${row.systemUserId}`);
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
    ...state.SystemUser
  }),
  {
    requestSystemUsers,
    deleteSystemUser
  }
)(UsersList);
