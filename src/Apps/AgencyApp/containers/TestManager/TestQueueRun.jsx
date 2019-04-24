import React, { Component } from 'react';
import { Form, Row, Col, Spin, message } from 'antd';
import { get } from 'lodash';
import LayoutWrapper from '@components/utility/layoutWrapper';
import basicStyle from '@settings/basicStyle';
import Box from '@components/utility/box';
import SWQAClient from '@helpers/apiClient';
import TestCaseWrapper from './partials/TestCase.style';
import Description from './partials/Description';
import StepsField from './partials/StepsField';
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
    },
    stepArtifacts: [],
    finalStatus: undefined,
  };

  async componentDidMount() {
    try {
      let { match } = this.props;
      let testQueue = await SWQAClient.getTestQueue(match.params.queueId);
      //init test queue run
      if(['assigned', 'running'].indexOf(testQueue.status) === -1 ) {
        throw new Error('Test queue status must be assigned or running.');
      }
      if(testQueue.status === 'assigned') {
        //init test run if not already running
        await SWQAClient.initTestQueueRun(match.params.queueId);
      }
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

  handleStepStatus = () => {
    setImmediate(() => {
      let values = this.props.form.getFieldsValue();
      let allStepStatus = get(values, 'stepResult', []);
      let checkAllStepFilled = true;
      let finalStatus = 'pass';
      allStepStatus.forEach((value) => {
        //set false if any status field undefined
        if(!value.status) {
          checkAllStepFilled = false;
          return false;
        }
        if(value.status !== 'pass') {
          finalStatus = 'fail';
        }
      });
      if(checkAllStepFilled) {  
        this.setState({
          finalStatus: finalStatus
        });
      }
    });
  }

  updateArtifacts = (key, artifacts) => {
    let stepArtifacts = [...this.state.stepArtifacts];
    stepArtifacts[key] = artifacts;
    this.setState({
      stepArtifacts
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { match, form, history } = this.props;
    form.validateFields(async (err, values) => {
      if (!err) {
        try {   
          //format data to send to test run
          let stepResults = values.stepResult.map((result, key) => {
            result.artifacts = this.state.stepArtifacts[key];
            return result;
          });
          let testRun = {
            testQueueId: match.params.queueId,
            stepResults,
            comment: values.comment,
            status: values.status,
          };
          await SWQAClient.createTestRun(testRun);
          message.success('Submitted Test results successfully');
          //redirect to complted tests page
          history.replace('/my-agency/test-manager/completed-tests');
        } catch(e) {
          message.error('Something went wrong!');
        }
      }
    });
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
                  {this.state.error && <div>Cannot load Test queue Run</div>}
                  {!this.state.error && <Form onSubmit={this.handleSubmit}>
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
                            handleStepStatus={this.handleStepStatus}
                            updateArtifacts={this.updateArtifacts}
                          />
                        )
                      })}
                      <StatusAndUpdate 
                        form={this.props.form}
                        history={this.props.history}
                        status={this.state.finalStatus}
                      />
                    </Form>
                  }
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
