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
import agencyActions from '@app/SystemApp/redux/agency/actions';
import ActionButtons from "./partials/ActionButtons";
const { requestAgencyUsers, requestCurrentAgency } = agencyActions;

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
        title: "Role",
        dataIndex: "role.title",
        key: "role"
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status"
      },
      {
        className: 'column-actions',
        title: "Actions",
        key: "actions",
        render: row => <ActionButtons 
          row={row}
          agencyId={props.match.params.agencyId}
          history={this.props.history} />
      }
    ];
  }

  componentDidMount() {
    const { match } = this.props;
    this.props.requestCurrentAgency(match.params.agencyId);
    this.onTablePaginationChange(match.params.agencyId)(1, 5);    
  }

  onTablePaginationChange(agencyId) {
    return (page, pageSize) => {  
      this.props.requestAgencyUsers(agencyId, {
        page,
        pageSize
      });
    }
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { currentAgency = { agencyData: { name: '' } }, history, match } = this.props;
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
                  &nbsp; Company - {currentAgency.agencyData.name} - Users
                </ComponentTitle>
                <ButtonHolders>
                  <ActionBtn
                    type="primary"
                    onClick={() => {
                      history.push(`/admin/agency/${match.params.agencyId}/user/create/`);
                    }}>
                    <Icon type="plus" />
                    Add new User
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              <Spin spinning={currentAgency.userList.loading}>
                <Table
                  locale={{ emptyText: "No users in agency" }}
                  pagination={{
                    ...currentAgency.userList.paginationOptions,
                    onChange: this.onTablePaginationChange(match.params.agencyId)
                  }}
                  bordered
                  columns={this.columns}
                  onRow={row => ({
                    onDoubleClick: () => {
                      history.push({
                        pathname: `/admin/agency/${match.params.agencyId}/user/${row.userId}/edit`,
                        state: {
                          ...row
                        }
                      });
                    }
                  })}
                  dataSource={currentAgency.userList.rows}
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
    ...state.Agency
  }),
  {
    requestCurrentAgency,
    requestAgencyUsers
  }
)(List);
