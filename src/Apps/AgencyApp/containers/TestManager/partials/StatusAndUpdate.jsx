import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Divider, Icon, Select, Form, Row, Col, Input, Button } from 'antd';
import { withRouter } from 'react-router-dom'

const Option = Select.Option;
const FormItem = Form.Item;
const TextArea = Input.TextArea;

class StatusAndUpdate extends Component {

    static propTypes = {
        header: PropTypes.string,
    }

    render() {
        const { header } = this.props;
        const margin = {
            margin: '5px 5px 0px 0'
        };
        const selectBefore = (
            <Icon type="plus-square" theme="outlined" style={{ fontSize: 18 }} />
        );

        const labelIcon = (
            <Icon type="wechat" theme="filled" style={{ fontSize: 36, position: 'relative', top: -0.5 }} />
        );

        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Divider orientation="left">{header}</Divider>
                <FormItem label={""}>
                    {getFieldDecorator('status', {
                        rules: [{
                        }],
                    })(
                        <TextArea rows={5} />
                        )}
                </FormItem>
                <Row type={"flex"} align={'middle'} justify={"start"}>
                    <Col>
                        <Icon type="plus-square" theme="outlined" style={{ fontSize: 18, marginTop: 5, marginRight: 10 }} />
                    </Col>
                    <Col>
                        <Select defaultValue="Status" style={{ width: 120, marginTop: 5, marginRight: 10 }}>
                            <Option value="pass">Pass</Option>
                            <Option value="fail">Fail</Option>
                            <Option value="blocked">Blocked</Option>
                            <Option value="broken">Broken</Option>
                            <Option value="on hold">On Hold</Option>
                            <Option value="question(s)">Question(s)</Option>
                        </Select>
                    </Col>
                    <Col>
                        <Button type="danger" style={{ marginTop: 5, marginRight: 10 }} onClick={() => this.props.history.goBack()}>
                            Cancel
                        </Button>
                    </Col>
                    <Col>
                        <Button id="btnSubmit" style={{ marginTop: 5, marginRight: 10 }} type="primary" onClick={() => alert('clicked')} >
                            Submit Results
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

const form = Form.create()(StatusAndUpdate);
export default withRouter(form);