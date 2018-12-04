import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Icon, Spin } from "antd";
import { get } from 'lodash';
import LayoutWrapper from "@components/utility/layoutWrapper";
import PageHeader from "@components/utility/pageHeader";
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
const { requestClientUsers } = clientActions;

class List extends Component {
  constructor() {
    super();
    this.onTablePaginationChange = this.onTablePaginationChange.bind(this);
    this.columns = [
      {
        title: "Name",
        dataIndex: "user.username",
        key: "name"
      },
      {
        title: "Rating",
        dataIndex: "rating",
        key: "rating"
      },
      {
        title: "Status",
        dataIndex: "user.status",
        key: "status"
      },
      {
        title: "Actions",
        key: "actions",
        render: row => <ActionButtons row={row} />
      }
    ];
  }

  componentDidMount() {
    console.log(this.props);
    let clientId = get(this.props, 'currentClient.clientData.clientId', false);
    if(clientId) {
      this.onTablePaginationChange(clientId, 1, 5);
    }    
  }

  onTablePaginationChange(clientId, page, pageSize) {
    this.props.requestClientUsers({
      clientId,
      page,
      pageSize
    });
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { currentClient, history, match } = this.props;
    return (
      <LayoutWrapper>
        <PageHeader>
          Company -> {currentClient.clientData.name} -> Users
        </PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>
                  <ActionBtn
                    type="secondary"
                    onClick={() => this.props.history.goBack()}
                  >
                    <Icon type="left" /> Go Back
                  </ActionBtn>
                </ComponentTitle>
                <ButtonHolders>
                  <ActionBtn
                    type="primary"
                    onClick={() => {
                      this.props.history.push(
                        `/client/user/create/${
                          this.state.client.clientId
                        }`
                      );
                    }}
                  >
                    <Icon type="plus" />
                    Add new User
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              <Spin spinning={currentClient.userList.loading}>
                <Table
                  locale={{ emptyText: "No users in client" }}
                  size="middle"
                  bordered
                  pagination={{
                    ...currentClient.userList.paginationOptions,
                    onChange: this.onTablePaginationChange
                  }}
                  columns={this.columns}
                  onRow={row => ({
                    onDoubleClick: () => {
                      history.push({
                        pathname: `/client/${match.params.clientId}/user/${row.userId}/edit`,
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
    requestClientUsers
  }
)(List);
