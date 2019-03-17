import React, { Component } from "react";
import { Row, Col, Icon, Spin } from "antd";
import { connect } from 'react-redux';
import { get } from "lodash";
import Moment from "react-moment";
import LayoutWrapper from "@components/utility/layoutWrapper";
import PageHeader from "@components/utility/pageHeader";
import IntlMessages from '@components/utility/intlMessages';
import basicStyle from "@settings/basicStyle";
import { dateTime } from "@constants/dateFormat";
import { TitleWrapper, ComponentTitle, ActionBtn } from "@utils/crud.style";
import Box from "@components/utility/box";
import SWQAClient from "@helpers/apiClient";

class Detail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      testRunData: {},
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {  
      const { match } = this.props;
      this.setState({ loading: true });
      let testRunData = await SWQAClient.getTestRun(match.params.runId);
      this.setState({
        testRunData
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
    const { history } = this.props;
    return (
      <LayoutWrapper>
        <PageHeader>
          Test Suite - { get(this.state, 'testRunData.testQueue.testCase.testSuite.name', '') }
          <br />
          Test Case - { get(this.state, 'testRunData.testQueue.testCase.title', '') }
        </PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>        
              <TitleWrapper>
                <ComponentTitle>
                  <ActionBtn
                    type="secondary"
                    onClick={() => history.goBack()}
                  >
                    <Icon type="left" /> <IntlMessages id="back" />
                  </ActionBtn>
                  &nbsp; Test Run Details
                </ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                {this.state.error && <div>Unable to load Test run</div>}
                {!this.state.error && !!this.state.testRunData && <div>
                  Run Date: <Moment format={dateTime}>{this.state.testRunData.createdAt}</Moment>
                  <br /> 
                  Log File Url: {this.state.testRunData.logFileUrl}
                </div>}
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