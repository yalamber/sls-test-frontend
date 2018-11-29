import React, { Component } from "react";
import { Row, Col, Select, Spin, Checkbox, Radio, message } from "antd";
import LayoutWrapper from "../../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../../components/utility/pageHeader";
import basicStyle from "../../../../../settings/basicStyle";
import Box from "../../../../../components/utility/box";
import ActionButtons from "./partials/AssignTestsActionButtons";

import {
  TitleWrapper,
  ComponentTitle,
  TableClickable as Table
} from "../../../crud.style";
import {
  getAgency,
  getTeams,
  getTestQueuesAssigned,
  testQueueUnAssign
} from "../../../../../helpers/http-api-client";

const Option = Select.Option;
const RadioGroup = Radio.Group;

export default class extends Component {
  constructor() {
    super();
    this.state = {
      columns: [
        {
          title: "Number",
          dataIndex: "number",
          key: "number"
        },
        {
          title: "Test Case Title",
          dataIndex: "testCase.title",
          key: "title",
          sorter: true
        },
        {
          title: "Test Run",
          dataIndex: "runTitle",
          key: "runTitle",
          sorter: true
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
          sorter: true
        },
        {
          title: "Actions",
          key: "actions",
          render: row => (
            <ActionButtons row={row} unassign={this.handleUnassign} />
          )
        }
      ],
      paginationOptions: {
        defaultCurrent: 1,
        current: 1,
        pageSize: 5,
        total: 1
      },
      agency: {},
      dataSource: [],
      loading: false
    };

    this.onTablePaginationChange = this.onTablePaginationChange.bind(this);
    this.handleUnassign = this.handleUnassign.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      try {
        const responseAgency = await getAgency(
          this.props.match.params.agencyId
        );
        const responseAssignTestCases = await getTestQueuesAssigned({
          paginationOptions: this.state.paginationOptions
        });

        const {
          data: { rows = [], count = 1 }
        } = responseAssignTestCases;

        this.setState({
          loading: false,
          agency: responseAgency.data,
          dataSource: rows,
          paginationOptions: {
            ...this.state.paginationOptions,
            total: count
          }
        });
      } catch (error) {
        this.setState({ loading: false });
      }
    });
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
        try {
          let responseData = await getTestQueuesAssigned({
            paginationOptions: this.state.paginationOptions
          });
          const {
            data: { rows = [], count = 1 }
          } = responseData;
          this.setState({
            loading: false,
            dataSource: rows,
            paginationOptions: {
              ...this.state.paginationOptions,
              total: count
            }
          });
        } catch (e) {
          this.setState({ loading: false, dataSource: [] });
        }
      }
    );
  }

  handleUnassign({ testQueueId }) {
    this.setState(
      {
        loading: true
      },
      async () => {
        try {
          let responseData = await testQueueUnAssign(testQueueId);
          message.success("Successfully unassigned test case");
          this.componentDidMount();
          this.setState({ loading: false });
        } catch (e) {
          this.setState({ loading: false });
        }
      }
    );
  }

  render() {
    const margin = {
      margin: "5px 5px 10px 0px"
    };
    const { rowStyle, colStyle, gutter } = basicStyle;

    return (
      <LayoutWrapper>
        <PageHeader>
          {this.state.agency && this.state.agency.name
            ? this.state.agency.name
            : ""}{" "}
          - Test Cases
        </PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>{`Assigned Test Cases`}</ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <Table
                  size="middle"
                  onRow={() => ({
                    onDoubleClick: () => alert("now running the test!")
                  })}
                  pagination={{
                    ...this.state.paginationOptions,
                    onChange: this.onTablePaginationChange
                  }}
                  columns={this.state.columns}
                  dataSource={this.state.dataSource}
                  rowKey="testCaseId"
                />
              </Spin>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
