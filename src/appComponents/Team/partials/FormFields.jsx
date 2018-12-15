import React from 'react';
import {Form, Row, Col, Input} from 'antd';
import {teamValidation} from '@validations/teamValidation';
const FormItem = Form.Item;

function TeamFormFields({ form }) {
  const margin = {
    margin: '5px 5px 0px 0'
  };
  const { getFieldDecorator } = form;
  return (
    <div>
      <Row gutter={16}>
        <Col span={24}>
          <Row>
            <Col span={24}>
              <FormItem label="Team Name" style={margin}>
                {getFieldDecorator('name', {
                  rules: teamValidation.teamName
                })(
                  <Input placeholder="Team Name"/>
                )}
              </FormItem>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default TeamFormFields;
