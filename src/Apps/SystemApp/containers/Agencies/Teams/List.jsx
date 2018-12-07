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
const { requestAgencyTeams, requestCurrentAgency } = agencyActions;

class List extends Component {
  constructor(props) {
    super(props);
    this.onTablePaginationChange = this.onTablePaginationChange.bind(this);
    this.columns = [
      {
        title: "Team Name",
        dataIndex: "name",
        key: "name"
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
      this.props.requestAgencyTeams(agencyId, {
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
                  &nbsp; Company - {currentAgency.agencyData.name} - Teams
                </ComponentTitle>
                <ButtonHolders>
                  <ActionBtn
                    type="primary"
                    onClick={() => {
                      history.push(`/admin/agency/${match.params.agencyId}/team/create/`);
                    }}>
                    <Icon type="plus" />
                    Add new Team
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              <Spin spinning={currentAgency.teamList.loading}>
                <Table
                  locale={{ emptyText: "No Teams in agency" }}
                  pagination={{
                    ...currentAgency.teamList.paginationOptions,
                    onChange: this.onTablePaginationChange(match.params.agencyId)
                  }}
                  bordered
                  columns={this.columns}
                  onRow={row => ({
                    onDoubleClick: () => {
                      history.push(`/admin/agency/${match.params.agencyId}/team/${row.agencyTeamId}/details`);
                    }
                  })}
                  dataSource={currentAgency.teamList.rows}
                  rowKey="agencyTeamId"
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
    requestAgencyTeams
  }
)(List);
