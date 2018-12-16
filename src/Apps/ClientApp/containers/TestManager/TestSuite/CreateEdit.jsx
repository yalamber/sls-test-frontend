import React, { Component } from "react";
import { Row, Col, message, Spin, Form, Button, Input, Select, Icon } from "antd";
import { get } from 'lodash';
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
import { testSuiteValidation } from "@validations/testSuiteValidation";
import testSuiteStatus from '@constants/testSuiteStatus';
import SWQAClient from '@helpers/apiClient';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;

class CreateEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: null,
      clientTeam: null,
      testSuite: null,
      error: null,
      loading: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.mode = props.match.params.suiteId ? 'edit': 'add';
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try{
      let { match } = this.props;
      if(match.params.suiteId) {
        let testSuite = await SWQAClient.getTestSuite(match.params.suiteId);  
        this.setState({
          clientTeam: testSuite.clientTeam,
          client: testSuite.clientTeam.client,
          testSuite: testSuite,
          loading: false,
          error: null,
        });
      } else {
        let clientTeam = await SWQAClient.getClientTeam(match.params.teamId);  
        this.setState({
          clientTeam,
          client: clientTeam.client,
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
    let { history, match } = this.props;
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        try{
          this.setState({ loading: true });
          if(this.mode === 'edit') {
            await SWQAClient.updateTestSuite(match.params.suiteId, values);
            message.success("Successfully Updated");
          } else {
            let testSuite = await SWQAClient.addTestSuite({ 
              clientTeamId: this.props.match.params.teamId, 
              ...values 
            });
            message.success("Successfully Saved");
            history.push(`/my-client/test-manager/test-suite/${testSuite.testSuiteId}/details`);
          }
        } catch(e) {
          this.setState({ error: e }, () => {
            scrollToTop();
          });
        } finally {
          this.setState({ loading: false });
        }
      }
    });
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { form, history } = this.props;
    const { getFieldDecorator } = form;
    const margin = {
      margin: '5px 5px 0px 0'
    };
    const statusOptions = testSuiteStatus.map(status => <Option key={status.id}>{status.label}</Option>);

    return (
      <LayoutWrapper>
        <PageHeader>
          Team - {get(this.state, 'clientTeam.name')}
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
                  &nbsp; {this.mode === 'edit'? 'Edit': 'Add'} Test Suite
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
                        <Col span={12}>
                          <FormItem label="Suite Title" style={margin}>
                            {getFieldDecorator('name', {
                              rules: testSuiteValidation.name,
                              initialValue: get(this.state, 'testSuite.name', '')
                            })(
                              <Input maxLength={250} placeholder="Suite Title"/>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem label="Status" style={margin}>
                            {getFieldDecorator('status', {
                              rules: testSuiteValidation.status,
                              initialValue: get(this.state, 'testSuite.status', '')
                            })(
                              <Select showSearch>
                                {statusOptions}
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <FormItem label="Description" style={margin}>
                            {getFieldDecorator('description', {
                              rules: testSuiteValidation.description,
                              initialValue: get(this.state, 'testSuite.description', '')
                            })(
                              <TextArea maxLength={1000} placeholder="Description"/>
                            )}
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <FormItem label="Environment Access and Details" style={margin}>
                            {getFieldDecorator('accessDetails', {
                              rules: testSuiteValidation.envAccessDetails,
                              initialValue: get(this.state, 'testSuite.accessDetails', '')
                            })(
                              <TextArea maxLength={4000} placeholder="Environment Access and Details" rows={10}/>
                            )}
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <FormItem label="Comments" style={margin}>
                            {getFieldDecorator('comments', {
                              rule: testSuiteValidation.comments,
                              initialValue: get(this.state, 'testSuite.comments', '')
                            })(
                              <TextArea maxLength={1000} placeholder="Comments"/>
                            )}
                          </FormItem>
                        </Col>
                      </Row>
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
  //let { currentTestSuite } = props;
  let currentTestSuite = {
    status: 'active',
  };
  return {
    status: Form.createFormField({
      value: get(currentTestSuite, 'status')
    }),
  };
};
const form = Form.create({ mapPropsToFields })(CreateEdit);

export default form;