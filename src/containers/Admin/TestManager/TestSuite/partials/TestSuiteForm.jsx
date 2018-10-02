import React, {Component} from 'react';
import {Form, Row, Col, Input, message, Select} from 'antd';
import {withRouter} from 'react-router-dom'
import Button from '../../../../../components/uielements/button';
import {teamValidation} from '../../../../../Validations/teamValidation';
import {
  ActionWrapper,
} from '../../../crud.style';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;

class TeamForm extends Component {
  constructor() {
    super();
    this.state = {
      status: [
        {id: 1, name: 'Active'},
        {id: 2, name: 'Inactive'},
      ],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        message.success("Success");
      }
    });
  }


  render() {
    const statusOptions = this.state.status.map(status => <Option key={status.id}>{status.name}</Option>);
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
                    {getFieldDecorator('team_suite_name', {rules: teamValidation.teamManager})(
                      <Input placeholder="Team Suite Name"/>
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem label="Status" style={margin}>
                    {getFieldDecorator('status', {rules: teamValidation.teamManager})(
                      <Select>
                        {statusOptions}
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <FormItem label="Description" style={margin}>
                    {getFieldDecorator('description', {rules: teamValidation.teamName})(
                      <TextArea placeholder="Description"/>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <FormItem label="Environment Access and Details" style={margin}>
                    {getFieldDecorator('env_access', {rules: teamValidation.teamName})(
                      <TextArea placeholder="Environment Access and Details" rows={10}/>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <FormItem label="Comments" style={margin}>
                    {getFieldDecorator('comments', {})(
                      <TextArea placeholder="Comments"/>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Col>
          </Row>
          <ActionWrapper style={margin}>
            <Button type="primary" style={margin} icon="left" onClick={() => this.props.history.goBack()}>
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
