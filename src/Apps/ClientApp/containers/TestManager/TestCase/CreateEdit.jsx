import React, { Component } from "react";
import { Row, Col, message, Spin, Form, Button, Input, Select, Icon, Divider } from "antd";
import { get, omit, range } from 'lodash';
import LayoutWrapper from "@components/utility/layoutWrapper";
import basicStyle from "@settings/basicStyle";
import PageHeader from "@components/utility/pageHeader";
import IntlMessages from '@components/utility/intlMessages';
import { TitleWrapper, ComponentTitle, ActionBtn } from "@utils/crud.style";
import Box from "@components/utility/box";
import { scrollToTop } from '@utils/dom-util';
import {
  ActionWrapper,
} from '@utils/crud.style';
import {testCaseValidation} from "@validations/testCaseValidation";
import testCaseStatus from '@constants/testCaseStatus';
import SWQAClient from '@helpers/apiClient';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;

let stepCount = 0;
class CreateEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: null,
      clientTeam: null,
      testSuite: null,
      testCase: null,
      error: null,
      loading: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.mode = props.match.params.caseId ? 'edit': 'add';
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try{
      let { match } = this.props;
      if(match.params.caseId) {
        let testCase = await SWQAClient.getTestCase(match.params.caseId);  
        this.setState({
          client: get(testCase, 'testSuite.clientTeam.client', null),
          clientTeam: get(testCase, 'testSuite.clientTeam', null),
          testSuite: get(testCase, 'testSuite', null),
          testCase,
          loading: false,
          error: null,
        });
      } else {
        let testSuite = await SWQAClient.getTestSuite(match.params.suiteId);  
        this.setState({
          testSuite,
          clientTeam: get(testSuite, 'clientTeam', null),
          client: get(testSuite, 'clientTeam.client', null),
          loading: false,
          error: null,
        });
      }
    } catch(e) {
      this.setState({
        loading: false, 
        error: e
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let { history, match, form } = this.props;
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        try{
          this.setState({ loading: true });
          if(this.mode === 'edit') {
            await SWQAClient.updateTestCase(match.params.caseId, omit(values, ['keys']));
            message.success("Successfully Updated");
          } else {
            let testCase = await SWQAClient.addTestCase({
              testSuiteId: match.params.suiteId,
              ...omit(values, ['keys']) 
            });
            message.success("Successfully Saved");
            history.replace(`/my-client/test-manager/test-case/${testCase.testCaseId}/details`);
          }
        } catch(e) {
          console.log(e);
          this.setState({ error: e }, () => {
            scrollToTop();
          });
        } finally {
          this.setState({ loading: false });
        }
      } else {
        console.log(err);
      }
    });
  }

  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one test case step
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(++stepCount);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { form, history } = this.props;
    const { getFieldDecorator , getFieldValue} = form;
    const statusOptions = testCaseStatus.map(status => <Option key={status.id}>{status.label}</Option>);
    const margin = {
      margin: '5px 5px 0px 0'
    };
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 21 },
      },
    };
    //get keys initial value
    let keysCount = get(this.state, 'testCase.testCaseSteps', [0]).length;

    getFieldDecorator('keys', { initialValue: range(keysCount) });
    const keys = getFieldValue('keys');
    const testCaseSteps = keys.map((k, index) => (
      <FormItem
        {...formItemLayout}
        label={`Steps #${(index+1)}`}
        required={false}
        key={k}
      >
        {getFieldDecorator(`testCaseSteps[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            whitespace: true,
            message: "Please input Test Case Step or delete this field.",
          }],
          initialValue: get(this.state, `testCase.testCaseSteps[${k}].description`, '')
        })(
          <TextArea placeholder="Steps" rows={5} style={{ width: '80%', marginRight: 8 }}/>
        )}
        {keys.length > 1 ? (
          <Button
            type="circle"
            icon="minus"
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
          />
        ) : null}
      </FormItem>
    ));
    return (
      <LayoutWrapper>
        <PageHeader>
          Team - {get(this.state, 'clientTeam.name')}
          <br/>
          Test Suite - {get(this.state, 'testSuite.name')}
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
                  &nbsp; {this.mode === 'edit'? 'Edit': 'Add'} Test Case
                </ComponentTitle>
              </TitleWrapper>
              <Row gutter={24}>
                <Col span={24}>
                  {/*this.state.errors.details.length ? (
                    <Errors errors={this.state.errors} />
                  ) : (
                    ""
                  )*/}
                </Col>
              </Row>
              <Spin spinning={this.state.loading}>
                <Form onSubmit={this.handleSubmit} id="clientForm">
                  <Row gutter={16}>
                    <Col span={24}>
                      <Row>
                        <Col md={6} sm={24} xs={24}>
                          <FormItem label="Status" style={margin}>
                            {getFieldDecorator('status', {
                              rules: testCaseValidation.status,
                              initialValue: get(this.state, 'testCase.status', '')
                            })(
                              <Select showSearch placeholder="Choose Status">
                                {statusOptions}
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={24} sm={24} xs={24}>
                          <FormItem label="Title" style={margin}>
                            {getFieldDecorator('title', {
                              rules: testCaseValidation.title,
                              initialValue: get(this.state, 'testCase.title', '')
                            })(
                              <Input placeholder="Title" />
                            )}
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={24} sm={24} xs={24}>
                          <FormItem label="Description" style={margin}>
                            {getFieldDecorator('description', {
                              rules: testCaseValidation.description,
                              initialValue: get(this.state, 'testCase.description', '')
                            })(
                              <TextArea placeholder="Description"/>
                            )}
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} sm={24} xs={24}>
                          <FormItem label="Developer Comment" style={margin}>
                            {getFieldDecorator('developerComments', {
                              initialValue: get(this.state, 'testCase.developerComments', '')
                            })(
                              <TextArea placeholder="Developer Comments" rows={5}/>
                            )}
                          </FormItem>
                        </Col>
                        <Col md={12} sm={24} xs={24}>
                          <FormItem label="Analyst Comment" style={margin}>
                            {getFieldDecorator('analystComments', {
                              initialValue: get(this.state, 'testCase.analystComments', '')
                            })(
                              <TextArea placeholder="Analyst Comments" rows={5}/>
                            )}
                          </FormItem>
                        </Col>
                      </Row>
                      <Divider>Test Step(s)</Divider>
                      {testCaseSteps}
                      <FormItem>
                        <Button type="dashed" style={margin} block onClick={this.add}>
                          <Icon type="plus" /> Add Steps
                        </Button>
                      </FormItem>
                    </Col>
                  </Row>
                  <ActionWrapper style={margin}>
                    <Button type="primary" style={margin} icon="left"
                      onClick={() => {
                        history.goBack()
                      }}>
                      Cancel
                    </Button>
                    <Button id="btnSubmit" type="primary" style={margin} htmlType="submit" icon="save">
                      Submit
                    </Button>
                  </ActionWrapper>
                </Form>
              </Spin>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

const mapPropsToFields = (props) => {
  let currentTestCase = {
    status: 'active',
  };
  return {
    status: Form.createFormField({
      value: get(currentTestCase, 'status')
    }),
  };
};
const form = Form.create({ mapPropsToFields })(CreateEdit);

export default form;
