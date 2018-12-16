import React, { Component } from "react";
import { Row, Col, Icon, Spin } from "antd";
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
      const { caseId } = this.props.match.params;
      this.setState({ loading: true });
      let caseData = await SWQAClient.getTestCase(caseId);
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
    const { history } = this.props;
    return (
      <LayoutWrapper>
        <PageHeader>
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
                    onClick={() => history.goBack()}
                  >
                    <Icon type="left" /> <IntlMessages id="back" />
                  </ActionBtn>
                  &nbsp; Test Case Details
                </ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                
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