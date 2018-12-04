import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Icon, Spin } from "antd";
import LayoutWrapper from "@components/utility/layoutWrapper";
import basicStyle from "@settings/basicStyle";
import Box from "@components/utility/box";
import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from "@utils/crud.style";
import clientActions from '@app/SystemApp/redux/client/actions';
import ActionButtons from "./partials/ActionButtons";
const { requestClientUsers, requestCurrentClient } = clientActions;

class List extends Component {
  constructor(props) {
    super(props);
    this.onTablePaginationChange = this.onTablePaginationChange.bind(this);
    this.columns = [
      {
        title: "Name",
        dataIndex: "user.username",
        key: "name"
      },
      {
        title: "Status",
        dataIndex: "user.status",
        key: "status"
      },
      {
        className: 'column-actions',
        title: "Actions",
        key: "actions",
        render: row => <ActionButtons 
          row={row}
          cilentId={props.match.params.clientId}
          history={this.props.history} />
      }
    ];
  }

  componentDidMount() {
    const { match } = this.props;
    this.props.requestCurrentClient(match.params.clientId);
    this.onTablePaginationChange(match.params.clientId, 1, 5);    
  }

  onTablePaginationChange(clientId, page, pageSize) {
    this.props.requestClientUsers(clientId, {
      page,
      pageSize
    });
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { currentClient = { clientData: { name: '' } }, history, match } = this.props;
    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>
                  <ActionBtn
                    type="secondary"
                    onClick={() => history.goBack()}
                  >
                    <Icon type="left" /> Go Back
                  </ActionBtn>
                  &nbsp; Company - {currentClient.clientData.name} - Users
                </ComponentTitle>
                <ButtonHolders>
                  <ActionBtn
                    type="primary"
                    onClick={() => {
                      history.push(`/admin/client/${match.params.clientId}/user/create/`);
                    }}>
                    <Icon type="plus" />
                    Add new User
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              <Spin spinning={currentClient.userList.loading}>
                <Table
                  locale={{ emptyText: "No users in client" }}
                  pagination={{
                    ...currentClient.userList.paginationOptions,
                    onChange: this.onTablePaginationChange
                  }}
                  bordered
                  columns={this.columns}
                  onRow={row => ({
                    onDoubleClick: () => {
                      history.push({
                        pathname: `/admin/client/${match.params.clientId}/user/${row.userId}/edit`,
                        state: {
                          ...row
                        }
                      });
                    }
                  })}
                  dataSource={currentClient.userList.rows}
                  rowKey="userId"
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
    ...state.Client
  }),
  {
    requestCurrentClient,
    requestClientUsers
  }
)(List);
