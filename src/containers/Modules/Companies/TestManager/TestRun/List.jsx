import React, { Component } from "react";
import { Row, Col, Icon, Select, Tooltip, Spin, Form } from "antd";
import LayoutWrapper from "../../../../../components/utility/layoutWrapper.js";
import PageHeader from "../../../../../components/utility/pageHeader";
import basicStyle from "../../../../../settings/basicStyle";
import Box from "../../../../../components/utility/box";
import ActionButtons from "./partials/ActionButtons";
import Moment from "react-moment";

import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from "../../../crud.style";
import {
  getCompanies,
  getCompanyTestRun
  // addCompanyTestRun
} from "../../../../../helpers/http-api-client";
import { dateTime } from "../../../../../constants/dateFormat";

const Option = Select.Option;
const FormItem = Form.Item;

export default class extends Component {
  constructor() {
    super();
    this.state = {
      columns: [
        {
          title: "Team",
          dataIndex: "team",
          key: "team"
        },
        {
          title: "Run Title",
          dataIndex: "runTitle",
          key: "runTitle"
        },
        {
          title: "Created",
          render: row => <Moment format={dateTime}>{row.createdAt}</Moment>,
          key: "createdAt"
        },
        {
          title: "TC Count",
          dataIndex: "tcCount",
          key: "tcCount"
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status" + ""
        }
      ],
      dataSource: [],
      loading: false
    };
  }

  componentDidMount() {
    const { companyId } = this.props.match.params;
    this.setState({ loading: true }, async () => {
      try {
        const responseTestRun = await getCompanyTestRun({
          query: { clientId: companyId }
        });

        const {
          data: { rows = [] }
        } = responseTestRun;
        this.setState({
          dataSource: rows,
          loading: false
        });
      } catch (error) {
        this.setState({ loading: false });
      }
    });
  }

  render() {
    const margin = {
      margin: "5px 5px 10px 0px"
    };
    const { rowStyle, colStyle, gutter } = basicStyle;

    return (
      <LayoutWrapper>
        <PageHeader>
          {this.state.company ? this.state.company.name : ""} -> Test Run List
        </PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Test Run</ComponentTitle>
                <ButtonHolders>
                  <ActionBtn
                    type="primary"
                    onClick={() => {
                      this.props.history.push(
                        `/dashboard/company/${
                          this.props.match.params.companyId
                        }/test-manager/suite/create/`
                      );
                    }}
                  >
                    <Icon type="plus" />
                    Add New
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <Table
                  locale={{ emptyText: "Please Select Company name" }}
                  size="middle"
                  bordered
                  pagination={true}
                  columns={this.state.columns}
                  dataSource={this.state.dataSource}
                  rowKey="testSuiteId"
                />
              </Spin>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
