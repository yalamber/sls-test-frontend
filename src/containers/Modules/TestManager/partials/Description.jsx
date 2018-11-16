import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Divider, Icon, Input, Select, Form } from 'antd';
import { withRouter } from 'react-router-dom'

const Option = Select.Option;
const FormItem = Form.Item;

class Description extends Component {

    static propTypes = {
        header: PropTypes.string,
        data: PropTypes.string,
        isInput: PropTypes.bool
    }

    static defaultProps = {
        isInput: false
    }

    render() {
        const { header, data, isInput } = this.props;
        const selectBefore = (
            <Icon type="plus-square" theme="outlined" style={{ fontSize: 18 }} />
        );

        const labelIcon = (
            <Icon type="wechat" theme="filled" style={{ fontSize: 36, position: 'relative', top: -0.5 }} />
        );

        const { getFieldDecorator } = this.props.form;
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
                <Divider orientation="left">{header}</Divider>
                <p>{data}</p>
                {
                    isInput ?
                        <FormItem {...formItemLayout} label={labelIcon}>
                            {getFieldDecorator('status', {
                                rules: [{
                                }],
                            })(
                                <Input addonBefore={selectBefore} addonAfter={selectAfter} />
                                )}
                        </FormItem> : null
                }
            </div>
        )
    }
}

const form = Form.create()(Description);
export default withRouter(form);