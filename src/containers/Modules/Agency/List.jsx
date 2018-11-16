import React, { Component } from "react";
import { Row, Col, Icon, Spin } from "antd";
import LayoutWrapper from "../../../components/utility/layoutWrapper.js";
import PageHeader from "../../../components/utility/pageHeader";
import basicStyle from "../../../settings/basicStyle";
import Box from "../../../components/utility/box";
import { getAgencies, deleteAgency } from "../../../helpers/http-api-client";
import ActionButtons from "./partials/ActionButtons";

import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from "../crud.style";

import { message } from "antd/lib/index";
import actions from "../../../redux/agency/actions";
import { connect } from "react-redux";
const { _updateForm } = actions;

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
          title: "Actions",
          key: "actions",
          render: row => <ActionButtons row={row} delete={this.handleDelete} />
        }
      ],
      data: [],
      paginationOptions: {
        defaultCurrent: 1,
        current: 1,
        pageSize: 5,
        total: 1
      },
      loading: false
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onTablePaginationChange = this.onTablePaginationChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try{
      this.setState({ loading: true });
      let agencies = await getAgencies({
        paginationOptions: this.state.paginationOptions
      });
      this.setState({
        loading: false,
        data: agencies.data.rows,
        paginationOptions: {
          ...this.state.paginationOptions,
          total: agencies.data.count
        }
      });
    } catch(e) {
      message.error("Something went wrong.");
      this.setState({ loading: false });
    }
  }

  onTablePaginationChange(page, pageSize) {
    this.setState(
      {
        loading: true,
        paginationOptions: {
          ...this.state.paginationOptions,
          current: page,
          pageSize
        }
      },
      async () => {
        try{
          let agencies = await getAgencies({
            paginationOptions: this.state.paginationOptions
          });
          this.setState({
            loading: false,
            data: agencies.data.rows,
            paginationOptions: {
              ...this.state.paginationOptions,
              total: agencies.data.count
            }
          });
        } catch(e) {
          this.setState({ loading: false, data: [] });
        }
      }
    );
  }

  handleDelete(row) {
    deleteAgency(row.agencyId).then(res => {
      message.success("Successfully Deleted.");
      this.fetchData();
    });
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;

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
              <Spin spinning={this.state.loading}>
                <Table
                  pagination={{
                    ...this.state.paginationOptions,
                    onChange: this.onTablePaginationChange
                  }}
                  rowKey="agencyId"
                  columns={this.state.columns}
                  dataSource={this.state.data}
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

export default connect(
  ({ Agency }) => {
    const { form_data_agency_key } = Agency;

    return { form_data_agency_key };
  },
  { _updateForm }
)(List);
