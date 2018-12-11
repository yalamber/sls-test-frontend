import React, { Component } from "react";
import { Row, Col, message, Spin, Form, Button, Input, Select, Icon } from "antd";
import { get } from 'lodash';
import LayoutWrapper from "@components/utility/layoutWrapper";
import basicStyle from "@settings/basicStyle";
import PageHeader from "@components/utility/pageHeader";
import IntlMessages from '@components/utility/intlMessages';
import { TitleWrapper, ComponentTitle, ActionBtn } from "@utils/crud.style";
import Box from "@components/utility/box";
import Errors from "@utils/Errors";
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
      clientTeam: null,
      error: null,
      formErrors: {
        details: []
      },
      loading: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try{
      let { match } = this.props;
      let clientTeam = await SWQAClient.getClientTeam(match.params.teamId);
      this.setState({
        clientTeam,
        loading: false,
        error: null,
      });
    } catch(e) {
      this.setState({
        loading: false, 
        error: e
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        try{
          let { history } = this.props;
          this.setState({ loading: true });
          let testSuite = await SWQAClient.addTestSuite({ 
            clientTeamId: this.props.match.params.teamId, 
            ...values 
          });
          console.log(testSuite);
          message.success("Successfully Saved");
          history.push(`/admin/`);

            /*
            .catch(error => {
              if (error.response.status === 422) {
                this.setState({ errors: error.response.data });
                scrollToTop();
              } else if (error.response.status === 500) {
                this.setState({ errors: { details: [error.response.data] } }, () => {
                  scrollToTop()
                });
              }
            })
            .finally(() => {
              this.setState({ loading: false });
            });*/
        } catch(e) {
    
        } 
      } else {

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
          Client - {get(this.state, 'clientTeam.client.name')} 
          <br/>
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
                  &nbsp; Create Test Suite
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
                            {getFieldDecorator('name', {rules: testSuiteValidation.name})(
                              <Input maxLength={250} placeholder="Suite Title"/>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem label="Status" style={margin}>
                            {getFieldDecorator('status', {rules: testSuiteValidation.status})(
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
                            {getFieldDecorator('description', {rules: testSuiteValidation.description})(
                              <TextArea maxLength={1000} placeholder="Description"/>
                            )}
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <FormItem label="Environment Access and Details" style={margin}>
                            {getFieldDecorator('accessDetails', {rules: testSuiteValidation.envAccessDetails})(
                              <TextArea maxLength={4000} placeholder="Environment Access and Details" rows={10}/>
                            )}
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <FormItem label="Comments" style={margin}>
                            {getFieldDecorator('comments', {rule: testSuiteValidation.comments})(
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
                        this.props.history.goBack()
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