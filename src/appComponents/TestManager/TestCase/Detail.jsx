import React, { Component } from "react";
import { Row, Col, Icon, Spin, Table } from "antd";
import { connect } from 'react-redux';
import { get } from "lodash";
import LayoutWrapper from "@components/utility/layoutWrapper";
import PageHeader from "@components/utility/pageHeader";
import IntlMessages from '@components/utility/intlMessages';
import basicStyle from "@settings/basicStyle";
import { TitleWrapper, ComponentTitle, ActionBtn } from "@utils/crud.style";
import Box from "@components/utility/box";
import SWQAClient from "@helpers/apiClient";

class Detail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      caseData: {},
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const { match } = this.props;
      this.setState({ loading: true });
      let caseData = await SWQAClient.getTestCase(match.params.caseId);
      this.setState({
        caseData
      });
    } catch(e) {
      this.setState({
        error: e
      });
    } finally {
      this.setState({
        loading: false,
      })
    }
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { history, appType } = this.props;
    const dataSource = [{
      key: '1',
      field: 'Title',
      details: this.state.caseData.title,
    }, {
      key: '2',
      field: 'Description',
      details: this.state.caseData.description,
    }];

    const columns = [{
      title: 'Field',
      dataIndex: 'field',
      key: 'field',
    }, {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
    }];
    return (
      <LayoutWrapper>
        <PageHeader>
          {appType === 'system' && <span>Client - { get(this.state, 'caseData.testSuite.clientTeam.client.name', '') }</span>}
          <br />
          Team - { get(this.state, 'caseData.testSuite.clientTeam.name', '') }
          <br />
          Test Suite - { get(this.state, 'caseData.testSuite.name', '') }
        </PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>
                  <ActionBtn
                    type="secondary"
                    onClick={() => history.goBack()}>
                    <Icon type="left" /> <IntlMessages id="back" />
                  </ActionBtn>
                  &nbsp; Test Case Details
                </ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <Table dataSource={dataSource} columns={columns} pagination={false} />
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
  null
)(Detail);
