import React, { Component } from "react";
import { connect } from 'react-redux';
import { Row, Col, Select, Spin, Button } from "antd";
import styled, { injectGlobal } from "styled-components";
import LayoutWrapper from "../../../../../components/utility/layoutWrapper.js";
import basicStyle from "../../../../../settings/basicStyle";
import Box from "../../../../../components/utility/box";

import {
  TitleWrapper,
  ComponentTitle,
  TableClickable as Table
} from "../../../crud.style";
import {
  getTestQueues,
  testQueueAssign
} from "../../../../../helpers/http-api-client";
import { getErrorDataFromApiResponseError } from "../../../../../util/response-message";

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

class AvailableTests extends Component {
  constructor() {
    super();
    this.state = {
      selectedRowKeys: [],
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
    this.setState(
      {
        loading: true
      },
      async () => {
        try {
          const response = await getTestQueues();
          this.setState({ dataSource: response.data.rows, loading: false });
        } catch (err) {
          this.setState({
            error: getErrorDataFromApiResponseError(err),
            loading: false
          });
        }
      }
    );
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  onAssignToMe = () => {
    if (!this.state.selectedRowKeys.length) {
      return;
    }
    // const { Auth : { idToken = '' }} = this.props
    this.setState({ loading: true }, async () => {
      try {
        let responseTestQueueAssign = await testQueueAssign({
          // assignedUserId: 1,
          testQueueId: this.state.selectedRowKeys[0]
        });

        this.componentDidMount();
      } catch (error) {
        this.setState({ loading: false, error: getErrorDataFromApiResponseError(error) })
      }
    });
  };

  async submitParallel(arr) {
    const promises = arr.map();
  }

  render() {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange
    };
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
                <Col md={3} sm={24} xs={24} style={margin}>
                  <Button type="primary" onClick={this.onAssignToMe}>
                    Assign To Me
                  </Button>
                </Col>
                <Col md={3} sm={24} xs={24} style={assignToTeamBackgroundStyle}>
                  <Button className="greenButton">Assign To Team</Button>
                </Col>
                <Col md={18} sm={24} xs={24} />
              </Row>
              <Spin spinning={this.state.loading}>
                <Table
                  locale={{ emptyText: "Please Select Company name" }}
                  size="middle"
                  bordered
                  pagination={true}
                  rowSelection={rowSelection}
                  columns={this.state.columns}
                  dataSource={this.state.dataSource}
                  onRow={() => ({
                    onDoubleClick: () => {
                      alert("show test case details");
                    }
                  })}
                  rowKey="testQueueId"
                />
              </Spin>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    Auth: {...state.Auth}
  }
}

export default connect(mapStateToProps)(AvailableTests);
