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
    const { history, row, sendToQueue, deleteTestSuite } = this.props;
    return(
    <ActionWrapper>
      <Tooltip title="Queue for Test">
        <Button
          shape="circle"
          icon={this.state.sendingToQueue? 'loading': 'cloud'}
          onClick={async () => {
            this.setState({
              sendingToQueue: true
            });
            try {
              let queue = await sendToQueue(row);
              message.success(`${queue.length} Test Case queued successfully`);
            } catch(e) {
              console.log(e);
              message.error(get(e, 'response.data', 'Something went Wrong!'));
            } finally{
              this.setState({
                sendingToQueue: false
              });
            }
          }}
        />
      </Tooltip>
      <Tooltip title="Test Cases">
        <Button
          shape="circle"
          icon="experiment"
          onClick={() => {
            history.push(`/my-client/test-manager/test-cases?suiteId=${row.testSuiteId}`)
          }}
        />
      </Tooltip>
      <Tooltip title="Edit Record">
        <Button
          shape="circle"
          icon="edit"
          onClick={() => {
            history.push(`/my-client/test-manager/test-suite/${row.testSuiteId}/edit`);
          }} />
      </Tooltip>
      <Tooltip title="Details">
        <Button
          shape="circle"
          icon="info"
          onClick={() => {
            history.push(`/my-client/test-manager/test-suite/${row.testSuiteId}/details`);
          }} />
      </Tooltip>
      <Tooltip title="Delete Record">
        <Popconfirms
          title="Are you sure to delete this test suite ?"
          okText="Yes"
          cancelText="No"
          placement="topRight"
          onConfirm={() => {
            deleteTestSuite(row.testSuiteId);
          }}
        >
          <Button
            shape="circle"
            icon="delete"
            />
        </Popconfirms>
      </Tooltip>
    </ActionWrapper>
    )
  }

}

export default ActionButtons;
