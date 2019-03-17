import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Divider, Select, Form, Row, Col, Input, Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

class StatusAndUpdate extends Component {

  static propTypes = {
    header: PropTypes.string,
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        <Divider orientation="left">Final Test Case Status and Update</Divider>
        <FormItem label={""}>
          {getFieldDecorator('statusText', {
            rules: [{
              required: true,
              whitespace: true,
              message: "Please input final comments.",
            }],
          })(
            <TextArea placeholder="Final Comments" rows={5} />
          )}
        </FormItem>
        <Row type={"flex"} align={'middle'} justify={"start"}>
          <Col>
            <FormItem label={""} style={{margin: 0, padding: 0}}>
              {getFieldDecorator('status', {
                initialValue: this.props.status,
                rules: [{
                  required: true,
                  whitespace: true,
                  message: "Please input status.",
                }],
              })(
                <Select placeholder="Final Status" style={{ width: 120, marginTop: 5, marginRight: 10 }}>
                  <Option value="pass">Pass</Option>
                  <Option value="fail">Fail</Option>
                  <Option value="blocked">Blocked</Option>
                  <Option value="broken">Broken</Option>
                  <Option value="on hold">On Hold</Option>
                  <Option value="question(s)">Question(s)</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col>
            <Button type="danger" style={{ marginTop: 5, marginRight: 10 }} onClick={() => this.props.history.goBack()}>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button id="btnSubmit" style={{ marginTop: 5, marginRight: 10 }} type="primary" htmlType="submit">
              Submit Results
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default StatusAndUpdate;