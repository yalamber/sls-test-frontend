import React, { Component } from 'react';
import { Row, Col, Icon, Spin } from 'antd';
import { connect } from 'react-redux';
import LayoutWrapper from '@components/utility/layoutWrapper';
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
import agencyActions from '@app/SystemApp/redux/agency/actions';
import ActionButtons from "./partials/ActionButtons";
import TestManagerActionButtons from './partials/TestManagerActionButtons';
const { requestAgencies, deleteAgency } = agencyActions;

class AgencyList extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.onTablePaginationChange = this.onTablePaginationChange.bind(this);
    this.columns = [
      {
        title: <IntlMessages id="agency.name"/>,
        dataIndex: "name",
        key: "name"
      },
      {
        title: <IntlMessages id="agency.owner"/>,
        dataIndex: "owner.username",
        key: "agency_owner"
      },
      {
        title: <IntlMessages id="agency.owner.email"/>,
        dataIndex: "owner.contactInformation.emailAddress",
        key: "agency_owner_email"
      },
      {
        title: <IntlMessages id="agency.location"/>,
        dataIndex: "location",
        key: "location"
      },
      {
        title: <IntlMessages id="agency.testManagerActions"/>,
        key: "testManagerActions",
        render: row => <TestManagerActionButtons
          row={row}
          history={this.props.history}
          delete={this.handleDelete}
          setCurrentAgency={props.setCurrentAgency} />
      },
      {
        title: <IntlMessages id="actions"/>,
        key: "actions",
        render: row => <ActionButtons
          row={row}
          history={this.props.history}
          delete={this.handleDelete}
          setCurrentAgency={props.setCurrentAgency} />
      }
    ];
  }

  componentDidMount() {
    this.props.requestAgencies({
      page: 1,
      pageSize: 5
    });
  }

  onTablePaginationChange(page, pageSize) {
    this.props.requestAgencies({
      page,
      pageSize
    });
  }

  handleDelete(row) {
    this.props.deleteAgency(row.agencyId);
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { list, history } = this.props;
    console.log(list);
    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle><IntlMessages id="agencies"/></ComponentTitle>
                <ButtonHolders>
                  <ActionBtn
                    type="primary"
                    onClick={() => {
                      history.push("agency/create");
                    }}>
                    <Icon type="plus" />
                    <IntlMessages id="agency.add"/>
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              <Spin spinning={list.loading}>
                <Table
                  locale={{ emptyText: "No Agencies" }}
                  pagination={{
                    ...list.paginationOptions,
                    onChange: this.onTablePaginationChange
                  }}
                  bordered
                  rowKey="agencyId"
                  columns={this.columns}
                  dataSource={list.rows}
                  onRow={row => ({
                    onDoubleClick: () => {
                      history.push(`agency/${row.agencyId}/details`);
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
    ...state.Agency
  }),
  {
    requestAgencies,
    deleteAgency
  }
)(AgencyList);
