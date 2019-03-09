import React, { Component } from "react";
import { Row, Col, Icon, Spin, Table } from "antd";
import { get } from "lodash";
import LayoutWrapper from "@components/utility/layoutWrapper";
import PageHeader from "@components/utility/pageHeader";
import IntlMessages from '@components/utility/intlMessages';
import basicStyle from "@settings/basicStyle";
import { TitleWrapper, ComponentTitle, ActionBtn } from "@utils/crud.style";
import Box from "@components/utility/box";
import SWQAClient from "@helpers/apiClient";

class Detail extends Component {

  state = {
    loading: true,
    error: null,
    suiteData: {},
  };

  fetchData = async () => {
    try {
      const { match } = this.props;
      this.setState({ loading: true });
      const suiteData = await SWQAClient.getTestSuite(match.params.suiteId);
      this.setState({
        suiteData
      });
    } catch(e) {
      this.setState({
        error: e
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { history, appType } = this.props;
    const dataSource = [{
      key: '1',
      field: 'Name',
      details: this.state.suiteData.name,
    }, {
      key: '2',
      field: 'Description',
      details: this.state.suiteData.description,
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
          { appType === 'system' &&  <span>Client - { get(this.state, 'suiteData.clientTeam.client.name', '') }</span> }
          <br />
          Team - { get(this.state, 'suiteData.clientTeam.name', '') }
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
                  &nbsp; Suite Details
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

export default Detail;
