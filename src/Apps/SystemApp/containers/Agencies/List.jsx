import React, { Component } from "react";
import { Row, Col, Icon, Spin, message } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import LayoutWrapper from "@components/utility/layoutWrapper";
import PageHeader from "@components/utility/pageHeader";
import basicStyle from "@settings/basicStyle";
import Box from "@components/utility/box";
import { deleteAgency } from "@helpers/http-api-client";
import ActionButtons from "./partials/ActionButtons";
import TestManagerActionButtons from "./TestManager/partials/ActionButtons";
import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from "@utils/crud.style";
import * as agenciesListActions from "@redux/agencies/actions";
import { getDefaultPaginationOptions } from "@utils/default-objects";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "Agency Name",
          dataIndex: "name",
          key: "name",
          sorter: true
        },
        {
          title: "Agency Admin",
          dataIndex: "owner.username",
          key: "owner.username",
          sorter: true
        },
        {
          title: "Location",
          dataIndex: "location",
          key: "location",
          sorter: true
        },
        {
          title: "Test Manager Actions",
          key: "testManagerActions",
          render: row => <TestManagerActionButtons row={row} />
        },
        {
          title: "Actions",
          key: "actions",
          render: row => <ActionButtons row={row} delete={this.handleDelete} />
        }
      ],
      data: [],
      paginationOptions: getDefaultPaginationOptions().paginationOptions
    };
    // this.fetchData = this.fetchData.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onTablePaginationChange = this.onTablePaginationChange.bind(this);
  }

  componentDidMount() {
    this.props.actions.agenciesListDidMount();
  }

  onTablePaginationChange(page, pageSize) {
    this.setState(
      {
        paginationOptions: {
          ...this.state.paginationOptions,
          current: page,
          pageSize
        }
      }, () => {
        const { paginationOptions } = this.state;
        this.props.actions.agenciesListFetch({ paginationOptions });
      }
    );
  }

  handleDelete(row) {
    deleteAgency(row.agencyId).then(res => {
      message.success("Successfully Deleted.");
      // this.fetchData();
    });
  }

  getPaginationOptions() {
    const { count } = this.props.Agencies;
    return { ...this.state.paginationOptions, total: count };
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { rows, loading } = this.props.Agencies;

    return (
      <LayoutWrapper>
        <PageHeader>
           Agencies
        </PageHeader>

        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle />
                <ButtonHolders>
                  <ActionBtn
                    type="primary"
                    onClick={() => {
                      this.props.history.push("/dashboard/agency/create");
                    }}
                  >
                    + Create Agency
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              <Spin spinning={loading}>
                <Table
                  pagination={{
                    ...this.getPaginationOptions(),
                    onChange: this.onTablePaginationChange
                  }}
                  rowKey="agencyId"
                  columns={this.state.columns}
                  dataSource={rows}
                  onRow={row => ({
                    onDoubleClick: () => {
                      // this.props.history.push('details/' + row.clientId)
                      //this.props.history.push(`details/${row.clientId}`);
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

const mapStateToProps = (state) => {
  return {
    ...state
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(agenciesListActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
