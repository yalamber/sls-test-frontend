import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Divider, Icon, Input, Select, Form } from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input;

class StepsField extends Component {

  static propTypes = {
    title: PropTypes.string,
    details: PropTypes.string
  }

  render() {
    const { title, details, form, stepKey } = this.props;
    const labelIcon = (
      <Icon type="message" theme="filled" style={{ fontSize: 25, margin: 5 }} />
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

    const selectAfter = getFieldDecorator(`stepStatus[${stepKey}]`, {
      
    })(
      <Select placeholder="status" style={{ width: 120 }}>
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
            {getFieldDecorator(`stepStatusComment[${stepKey}]`, {})(
              <TextArea placeholder="Step comments" autosize={{ maxRows: 5 }} />
            )}
          </FormItem>
        }
        <div style={{float: 'right'}}>
        {selectAfter}
        </div>
      </div>
    )
  }
}

export default StepsField;
