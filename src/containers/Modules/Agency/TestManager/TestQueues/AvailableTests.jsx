import React, { Component } from "react";
import { Row, Col, Select, Spin, Button, Checkbox } from "antd";
import styled, { injectGlobal } from "styled-components";
import LayoutWrapper from "../../../../../components/utility/layoutWrapper.js";
import basicStyle from "../../../../../settings/basicStyle";
import Box from "../../../../../components/utility/box";

import {
  TitleWrapper,
  ComponentTitle,
  TableClickable as Table
} from "../../../crud.style";
import { getTestQueues } from "../../../../../helpers/http-api-client";
import { getErrorDataFromApiResponseError } from '../../../../../util/response-message';

const Option = Select.Option;

const margin = {
  margin: "5px 5px 10px 0px"
};
const assignToTeamBackgroundStyle = Object.assign({}, margin, {
  background: "rgb(0, 220, 0)",
  maxWidth: 130
});

const assignToTeamBtnStyle = {
  color: "#fff",
  borderColor: "rgb(0, 220, 0)"
};

injectGlobal`
  button.greenButton {
    color: #FFF;
    background: rgb(0, 220, 0) !important;
    border: rgb(0, 220, 0) !important;
  }

  button.greenButton:hover {
    color: #FFF;
    background: rgb(0, 235, 0) !important;
  }
`;

export default class extends Component {
  constructor() {
    super();
    this.state = {
      columns: [
        {
          title: "",
          render: () => <Checkbox />,
          key: "check",
          width: "1%"
        },
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
          dataIndex: "title",
          key: "testRun",
          sorter: true
        },
        {
          title: "Date Added",
          dataIndex: "date",
          key: "date",
          sorter: true
        }
      ],
      dataSource: [],
      loading: false
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    }, async () => {
      try {
        const response = await getTestQueues();
        this.setState({ dataSource: response.data.rows, loading: false });
      } catch (err) {
        this.setState({ error: getErrorDataFromApiResponseError(err), loading: false });
      }
    })
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;

    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>
                  Agency - Available for Assignment{" "}
                </ComponentTitle>
              </TitleWrapper>
              <Row>
                <Col md={1} sm={24} xs={24} style={margin}>
                  <Button shape="circle" icon="check" />
                </Col>
                <Col md={3} sm={24} xs={24} style={margin}>
                  <Button type="primary">
                    Assign To Me
                  </Button>
                </Col>
                <Col md={3} sm={24} xs={24} style={assignToTeamBackgroundStyle}>
                  <Button className="greenButton">
                    Assign To Team
                  </Button>
                </Col>
                <Col md={18} sm={24} xs={24} />
              </Row>
              <Spin spinning={this.state.loading}>
                <Table
                  locale={{ emptyText: "Please Select Company name" }}
                  size="middle"
                  bordered
                  pagination={true}
                  columns={this.state.columns}
                  dataSource={this.state.dataSource}
                  onRow={() => ({
                    onDoubleClick: () => {
                      alert("show test case details")
                    }
                  })}
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
