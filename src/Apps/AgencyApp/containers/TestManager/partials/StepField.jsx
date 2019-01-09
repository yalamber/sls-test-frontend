import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Divider, Icon, Input, Select, Form, Row, Col } from 'antd';
import ArtifactSelector from '@appComponents/Common/ArtifactSelector';

const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input;

class StepsField extends Component {

  static propTypes = {
    title: PropTypes.string,
    details: PropTypes.string
  }

  state = {
    artifacts: []
  }

  onArtifactSelect = (artifacts) => {
    this.setState({
      artifacts: [...this.state.artifacts, ...artifacts]
    });
  }

  onArtifactRemove = (index) => {

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
          <div style={{padding: 20, background: '#EEE', borderRadius: 4}}>
            <FormItem {...formItemLayout} style={{marginBottom: 0}} label={labelIcon}>
              {getFieldDecorator(`stepStatusComment[${stepKey}]`, {})(
                <TextArea placeholder="Step comments" autosize={{ maxRows: 5 }} />
              )}
            </FormItem>
            <Row>
              <Col lg={1} md={1} sm={2}></Col>
              <Col lg={11} md={11} sm={11}>
                <ArtifactSelector onArtifactSelect={this.onArtifactSelect} />
              </Col>
              <Col lg={12} md={12} sm={11}>
                <div style={{float: 'right'}}>
                  {selectAfter}
                </div>
              </Col>
            </Row>
            <div>
              <ul>
                {this.state.artifacts.map((artifact, index) => {
                  return (
                    <li key={index}>
                      {artifact.name}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default StepsField;
