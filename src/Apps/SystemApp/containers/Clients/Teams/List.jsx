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
const { requestClientTeams, requestCurrentClient } = clientActions;

class List extends Component {
  constructor(props) {
    super(props);
    this.onTablePaginationChange = this.onTablePaginationChange.bind(this);
    this.columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        className: 'column-actions',
        title: "Actions",
        key: "actions",
        render: row => <ActionButtons 
          row={row}
          clientId={props.match.params.clientId}
          history={this.props.history} />
      }
    ];
  }

  componentDidMount() {
    const { match } = this.props;
    this.props.requestCurrentClient(match.params.clientId);
    this.onTablePaginationChange(match.params.clientId)(1, 5);    
  }

  onTablePaginationChange(clientId) {
    return (page, pageSize) => {  
      this.props.requestClientTeams(clientId, {
        page,
        pageSize
      });
    }
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
                  &nbsp; Company - {currentClient.clientData.name} - Teams
                </ComponentTitle>
                <ButtonHolders>
                  <ActionBtn
                    type="primary"
                    onClick={() => {
                      history.push(`/admin/client/${match.params.clientId}/team/create/`);
                    }}>
                    <Icon type="plus" />
                    Add new Team
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              <Spin spinning={currentClient.teamList.loading}>
                <Table
                  locale={{ emptyText: "No Teams in client" }}
                  pagination={{
                    ...currentClient.teamList.paginationOptions,
                    onChange: this.onTablePaginationChange(match.params.clientId)
                  }}
                  bordered
                  columns={this.columns}
                  onRow={row => ({
                    onDoubleClick: () => {
                      history.push(`/admin/client/${match.params.clientId}/team/${row.clientTeamId}/details`);
                    }
                  })}
                  dataSource={currentClient.teamList.rows}
                  rowKey="clientTeamId"
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
    requestClientTeams
  }
)(List);
