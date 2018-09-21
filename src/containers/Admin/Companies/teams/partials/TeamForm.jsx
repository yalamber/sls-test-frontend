import React, {Component} from 'react';
import {Form, Select, Row, Col, Input, message} from 'antd';
import {withRouter} from 'react-router-dom'
import Button from '../../../../../components/uielements/button';
import {teamValidation} from '../../../../../Validations/teamValidation';
import {
  ActionWrapper,
} from '../../../crud.style';
import {getCompanies} from "../../../../../actions/companyActions";

const FormItem = Form.Item;
const Option = Select.Option;

class TeamForm extends Component {
  constructor() {
    super();
    this.state = {
      clients: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    getCompanies().then(res => {
      this.setState({clients: res.data})
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        message.success("Success");
      }
    });
  }


  render() {
    const margin = {
      margin: '5px 5px 0px 0'
    };
    const clientsOptions = this.state.clients.map(company => <Option key={company.id}>{company.name}</Option>);
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} id="clientForm">
          <Row gutter={16}>
            <Col span={24}>
              <Row>
                <Col span={24}>
                  <FormItem label="Company Name" style={margin}>
                    {getFieldDecorator('company', {
                      rules: teamValidation.companyName,
                      initialValue: this.props.match.params.id
                    })(
                      <Select placeholder="Company">
                        {clientsOptions}
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <FormItem label="Team Name" style={margin}>
                    {getFieldDecorator('team', {rules: teamValidation.teamName})(
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

const form = Form.create()(TeamForm);
export default withRouter(form);
