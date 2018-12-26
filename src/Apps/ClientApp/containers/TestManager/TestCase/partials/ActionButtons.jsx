import React, { Component } from "react";
import { Tooltip, Button, message } from "antd";
import { get } from 'lodash';
import Popconfirms from '@components/feedback/popconfirm';
import {
  ActionWrapper,
} from '@utils/crud.style';

class ActionButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendingToQueue: false,
    };
  }

  render() {
    const { row, sendToQueue, delteItem, history } = this.props;
    return (
      <ActionWrapper>
        <Tooltip title="Queue for Test">
          <Button 
            shape="circle" 
            icon={this.state.sendingToQueue? 'loading': 'cloud'} 
            onClick={async () => {
              this.setState({
                sendingToQueue: true
              });
              try{
                let queue = await sendToQueue(row);
                
              } catch(e) {
                message.error(get(e, 'response.data', 'Something went Wrong!'));
              } finally{
                this.setState({
                  sendingToQueue: false
                });
              }
            }} 
          />
        </Tooltip>
        <Tooltip title="Edit Record">
          <Button 
            shape="circle" 
            icon="edit" 
            onClick={() => {
              history.push(`/my-client/test-manager/test-case/${row.testCaseId}/edit`);
            }} 
          />
        </Tooltip>
        <Tooltip title="Details">
          <Button 
            shape="circle" 
            icon="info" 
            onClick={() => {
              history.push(`/my-client/test-manager/test-case/${row.testCaseId}/details`);
            }} 
          />
        </Tooltip>
        <Tooltip placement="topLeft" title="Delete Record">
          <Popconfirms
            title="Are you sure to delete this test case ?"
            okText="Yes"
            cancelText="No"
            placement="topRight"
            onConfirm={() => delteItem(row)}
          >
            <Button 
              shape="circle" 
              icon="delete" />
          </Popconfirms>
        </Tooltip>
      </ActionWrapper>
    );
  }
}

export default ActionButtons;