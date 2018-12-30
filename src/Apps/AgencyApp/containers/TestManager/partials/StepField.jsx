import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Divider, Icon, Input, Select, Form } from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;

class StepsField extends Component {

  static propTypes = {
    title: PropTypes.string,
    details: PropTypes.string
  }

  render() {
    const { title, details, form } = this.props;
    const selectBefore = (
      <Icon type="plus-square" theme="outlined" style={{ fontSize: 18 }} />
    );

    const labelIcon = (
      <Icon type="message" theme="filled" style={{ fontSize: 30, position: 'relative', top: -0.5 }} />
    );

    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        lg: { span: 1 },
        md: { span: 1 },
        sm: { span: 2 },
      },
      wrapperCol: {
        lg: { span: 23 },
        md: { span: 23 },
        sm: { span: 22 },
      },
    };

    const selectAfter = (
      <Select defaultValue="Status" style={{ width: 120 }}>
        <Option value="pass">Pass</Option>
        <Option value="fail">Fail</Option>
        <Option value="blocked">Blocked</Option>
        <Option value="broken">Broken</Option>
        <Option value="on hold">On Hold</Option>
        <Option value="question(s)">Question(s)</Option>
      </Select>
    );

    return (
      <div>
        <Divider orientation="left">{title}</Divider>
        <p>{details}</p>
        {
          <FormItem {...formItemLayout} label={labelIcon}>
            {getFieldDecorator('status', {
              rules: [{
              }],
            })(
              <Input addonBefore={selectBefore} addonAfter={selectAfter} />
            )}
          </FormItem>
        }
      </div>
    )
  }
}

export default StepsField;
