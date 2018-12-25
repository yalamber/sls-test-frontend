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
    const { row, delteItem } = this.props;
    return (
      <ActionWrapper>
        <Tooltip placement="topRight" title="Remove from Queue">
          <Popconfirms
            title="Are you sure?"
            okText="Yes"
            cancelText="No"
            placement="left"
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