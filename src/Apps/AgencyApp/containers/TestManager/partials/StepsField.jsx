import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { filter } from 'lodash';
import { Divider, Icon, Input, Select, Form, Row, Col, Button } from 'antd';
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
  };

  onArtifactSelect = (artifacts) => {
    this.setState({
      artifacts: [...this.state.artifacts, ...artifacts]
    }, () => {
      this.props.updateArtifacts(this.props.stepKey, this.state.artifacts);
    });
  }

  onArtifactRemove = (index) => {
    return () => {  
      let artifacts = filter(this.state.artifacts, (artifact, i) => {
        if(index !== i) {
          return true;
        }
        return false;
      });
      this.setState({
        artifacts
      }, () => {
        this.props.updateArtifacts(this.props.stepKey, this.state.artifacts);
      });
    }
  }

  render() {
    const { title, details, form, stepKey, handleStepStatus } = this.props;
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

    const selectAfter = getFieldDecorator(`stepResult[${stepKey}]['status']`, {
      rules: [{
        required: true,
        whitespace: true,
        message: "Please select Status.",
      }]
    })(
      <Select placeholder="status" style={{ width: 120 }} onChange={handleStepStatus}>
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
              {getFieldDecorator(`stepResult[${stepKey}]['comment']`, {
                rules: [{
                  required: true,
                  whitespace: true,
                  message: "Please input comments.",
                }]
              })(
                <TextArea placeholder="Step comments" autosize={{ maxRows: 5 }} />
              )}
            </FormItem>
            <Row>
              <Col lg={1} md={1} sm={2}></Col>
              <Col lg={11} md={11} sm={11}>
                <ArtifactSelector onArtifactSelect={this.onArtifactSelect} />
              </Col>
              <Col lg={12} md={12} sm={11}>
                <FormItem style={{float: 'right'}}>
                  {selectAfter}
                </FormItem>
              </Col>
            </Row>
            {this.state.artifacts.length > 0 &&
              <div>
                <h3>Artifacts </h3>
                <ul>
                  {this.state.artifacts.map((artifact, index) => {
                    return (
                      <li key={index}>
                        {artifact.name?artifact.name:artifact.link} 
                        &nbsp; 
                        <Button type="primary" 
                          shape="circle" 
                          icon="delete" 
                          size="small" 
                          onClick={this.onArtifactRemove(index)} 
                        />
                      </li>
                    )
                  })}
                </ul>
              </div>
            }
          </div>
        }
      </div>
    )
  }
}

export default StepsField;
