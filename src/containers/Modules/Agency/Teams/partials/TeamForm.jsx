import React, {Component} from 'react';
import {Form, Row, Col, Input, message, Select} from 'antd';
import {withRouter} from 'react-router-dom'
import Button from '../../../../../components/uielements/button';
import {teamValidation} from '../../../../../Validations/teamValidation';
import {
  ActionWrapper,
} from '../../../crud.style';
import {getCompanyUsers} from "../../../../../helpers/http-api-client";;

const FormItem = Form.Item;
const Option = Select.Option;

class TeamForm extends Component {
  constructor() {
    super();
    this.state = {
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentDidMount() {
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.submit(values, this.resetForm);
      }
    });
  }

  resetForm() {
    message.success("Successfully Saved");
    this.props.form.resetFields();
    this.props.history.goBack();
  }


  render() {
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
                <Col span={24}>
                  <FormItem label="Team Name" style={margin}>
                    {getFieldDecorator('name', {rules: teamValidation.teamName})(
                      <Input placeholder="Team Name"/>
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

const mapPropsToFields = (props) => {
  if (!props.hasOwnProperty('team')) {
    return;
  }
  return {
    name: Form.createFormField({
      value: props.team.name
    }),
  };
};
const form = Form.create({mapPropsToFields})(TeamForm);
export default withRouter(form);