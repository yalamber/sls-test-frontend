import React, { Component } from "react";
import { Form, Select, Row, Col, Input } from "antd";
import { get } from 'lodash';
import { userValidation } from "@validations/usersValidation";
import Card from "@components/uielements/styles/card.style";
import userStatus from "@constants/userStatus";

const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup = Input.Group;

class MemberForm extends Component {

  render() {
    const margin = {
      margin: "5px 5px 0px 0"
    };
    const statusOptions = userStatus.map(status => (
      <Option key={status.id}>{status.label}</Option>
    ));
    const { getFieldDecorator } = this.props.form;
    //Responsive span
    const formResSpan = {
      xl: { span: 12 },
      lg: { span: 12 },
      md: { span: 24 },
      sm: { span: 24 }
    };
    const roleOptions = this.props.roles.map(role => (
      <Option key={role.roleId} value={role.roleId}>
        {role.title}
      </Option>
    ));
    const userOptions = this.props.users.map(userData => {
      return (
        <Option key={userData.userId} value={userData.userId}>
          {userData.user.username}
        </Option>
      )
    });
    return (
      <div>
        <Row gutter={16}>
          <Col {...formResSpan}>
            {
              !get(this.props, 'membershipData.userId', false) &&
              <FormItem label="Select User" style={margin}>
                {getFieldDecorator("userId", {
                  rules: userValidation.userId
                })(
                  <Select
                    showSearch
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    placeholder="Please select user"
                    style={{ width: "100%" }}
                  >
                    {userOptions}
                  </Select>
                )}
              </FormItem>
            }
            {
              get(this.props, 'membershipData.userId', false) &&
              <FormItem label="User" style={margin}>
                {get(this.props, 'membershipData.user.username')}
              </FormItem>
            }
            <Row>
              <Col span={24}>
                <FormItem label="Status" style={margin}>
                  {getFieldDecorator("status", {
                    rules: userValidation.status,
                    initialValue: get(this.props, 'membershipData.status')
                  })(
                    <Select showSearch placeholder="Status">
                      {statusOptions}
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col {...formResSpan}>
            <Card title="Role">
              <FormItem style={margin} label="Select Role">
                <InputGroup size="large">
                  <Col span={22}>
                    {getFieldDecorator("roleId", {
                      rules: userValidation.role,
                      initialValue: get(this.props, 'membershipData.roleId')
                    })(
                      <Select
                        showSearch
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        placeholder="Please choose role"
                        style={{ width: "100%" }}
                      >
                        {roleOptions}
                      </Select>
                    )}
                  </Col>
                </InputGroup>
              </FormItem>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MemberForm;
