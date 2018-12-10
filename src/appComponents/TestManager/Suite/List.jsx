import React, { Component } from "react";
import { Row, Col, Icon, Select, Tooltip, Spin, Form } from "antd";
import LayoutWrapper from "@components/utility/layoutWrapper";
import PageHeader from "@components/utility/pageHeader";
import basicStyle from "@settings/basicStyle";
import Box from "@components/utility/box";
import ActionButtons from "./partials/ActionButtons";
import Moment from "react-moment";
import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from "@utils/crud.style";
import { dateTime } from "@constants/dateFormat";

const Option = Select.Option;
const FormItem = Form.Item;

class SuiteList extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    const margin = {
      margin: "5px 5px 10px 0px"
    };
    const { rowStyle, colStyle, gutter } = basicStyle;

    const { teams = [] } = this.state;
    const teamsOptions = teams.length ? (
      teams.map(team => (
        <Option key={team.clientTeamId} value={team.clientTeamId}>
          {team.name}
        </Option>
      ))
    ) : (
      <Option key={"dummy"} value={""}>
        {""}
      </Option>
    );

    return (
      <LayoutWrapper>
        <PageHeader>
          {this.state.company ? this.state.company.name : ""} | Test Suite List
        </PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Test Suites </ComponentTitle>
                <ButtonHolders>
                  <Tooltip
                    placement="topRight"
                    title={
                      !this.isTeamSelected()
                        ? "Please select company and team."
                        : ""
                    }
                  >
                    <ActionBtn
                      type="primary"
                      disabled={!this.isTeamSelected()}
                      onClick={() => {
                        this.props.history.push(
                          `/dashboard/company/${
                            this.props.match.params.companyId
                          }/test-manager/suite/create/${
                            this.state.selectedTeam
                          }`
                        );
                      }}
                    >
                      <Icon type="plus" />
                      Add New
                    </ActionBtn>
                  </Tooltip>
                </ButtonHolders>
              </TitleWrapper>
              <Row>
                <Col md={6} sm={24} xs={24} style={margin}>
                  <FormItem label="Team Name:">
                    <Select
                      showSearch
                      placeholder="Please Choose Team"
                      style={{ width: "100%" }}
                      onChange={this.handleTeamChange}
                      value={this.state.selectedTeam}
                    >
                      {teamsOptions}
                    </Select>
                  </FormItem>
                </Col>
              </Row>
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

export default SuiteList;