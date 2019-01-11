import React, { Component } from 'react';
import { Form, Row, Col, Spin } from 'antd';
import { get } from 'lodash';
import LayoutWrapper from '@components/utility/layoutWrapper';
import basicStyle from '@settings/basicStyle';
import Box from '@components/utility/box';
import SWQAClient from '@helpers/apiClient';
import TestCaseWrapper from './partials/TestCase.style';
import Description from './partials/Description';
import StepsField from './partials/StepField';
import StatusAndUpdate from './partials/StatusAndUpdate';
import {
  TitleWrapper,
  ComponentTitle,
} from '@utils/crud.style';

class TestQueueRun extends Component {
  state = {
    loading: true,
    error: null,
    client: {},
    clientTeam: {},
    testSuite: {},
    testCase: {
      testCaseSteps: []
    }
  };

  async componentDidMount() {
    try {
      let testQueue = await SWQAClient.getTestQueue(this.props.match.params.queueId);
      this.setState({
        testCase: get(testQueue, 'testCase'),
        testSuite: get(testQueue, 'testCase.testSuite'),
        clientTeam: get(testQueue, 'testCase.testSuite.clientTeam'),
        client: get(testQueue, 'testCase.testSuite.clientTeam.client'),
      })
    } catch(e) {
      this.setState({
        error: e
      });
    } finally{
      this.setState({
        loading: false
      });
    }
  } 

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    //Top header
    const topHeader = { fontSize: 14, fontWeight: '300' };

    return (
      <TestCaseWrapper>
        <LayoutWrapper>
          <Row style={rowStyle} gutter={gutter} justify="start">
            <Col md={24} sm={24} xs={24} style={colStyle}>
              <Box>
                <Spin spinning={this.state.loading}>
                  <Form>
                    <TitleWrapper>
                      <ComponentTitle style={topHeader}>Client: {this.state.client.name}</ComponentTitle>
                      <ComponentTitle style={topHeader}>Team: {this.state.clientTeam.name}</ComponentTitle>
                      <ComponentTitle style={topHeader}>Suit Name: {this.state.testSuite.name}</ComponentTitle>
                    </TitleWrapper>

                    <Description
                      title={"Description"}
                      details={this.state.testCase.description}
                    />

                    <Description
                      title={"Developer Comments"}
                      details={this.state.testCase.developerComments}
                    />

                    <Description
                      title={"Analysis Comments"}
                      details={this.state.testCase.analystComments}
                    />
                    {this.state.testCase.testCaseSteps.map((step, index) => {
                      return (
                        <StepsField
                          key={index}
                          stepKey={index}
                          form={this.props.form}
                          title={`Step #${index+1}`}
                          details={step.description}
                        />
                      )
                    })}
                    <StatusAndUpdate 
                      form={this.props.form}
                    />
                  </Form>
                </Spin>
              </Box>
            </Col>
          </Row>
        </LayoutWrapper>
      </TestCaseWrapper>
    );
  }
}

const form = Form.create()(TestQueueRun);
export default form;
