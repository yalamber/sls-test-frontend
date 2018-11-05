import React, {Component} from 'react';
import {Form, Row, Col, Input, Select} from 'antd';
import {withRouter} from 'react-router-dom'
import Button from '../../../../../components/uielements/button';
import {
  ActionWrapper,
} from '../../../crud.style';
import {testSuiteValidation} from "../../../../../Validations/testSuiteValidation";

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;

class TeamForm extends Component {
  constructor() {
    super();
    this.state = {
      status: [
        {key: 'active', value: 'Active'},
        {key: 'inactive', value: 'Inactive'},
      ],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.submit(values, this.resetForm)
      }
    });
  }

  resetForm() {
    this.props.form.resetFields();
  }

  render() {
    const statusOptions = this.state.status.map(status => <Option key={status.key}>{status.value}</Option>);
    const margin = {
      margin: '5px 5px 0px 0'
    };
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} id="clientForm">
          <Row gutter={16}>
            <Col span={24}>
              <Row>
                <Col span={12}>
                  <FormItem label="Team Suite Name" style={margin}>
                    {getFieldDecorator('name', {rules: testSuiteValidation.name})(
                      <Input maxLength={250} placeholder="Team Suite Name"/>
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
                      this.props.history.push('../../list/' + this.props.match.params.companyId + '/' + this.props.match.params.teamId)
                    }}>
              Cancel
            </Button>
            <Button id="btnSubmit" type="primary" style={margin} htmlType="submit" className="" icon="save">
              Submit
            </Button>
          </ActionWrapper>
        </Form>
      </div>
    );
  }
}

const form = Form.create()(TeamForm);
export default withRouter(form);
