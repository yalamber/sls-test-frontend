import React from "react";
import Popconfirms from './feedback/popconfirm';

import {
  ActionWrapper,
} from './CommonCrudStyle';
import {Tooltip} from "antd";

export default function ActionButtons(props) {
  return (
    <ActionWrapper>
      <Tooltip placement="topLeft" title="Edit Record">
        <a onClick={props.edit}>
          <i className="ion-android-create"/>
        </a>
      </Tooltip>
      <Tooltip placement="topLeft" title="Delete Record">
      <Popconfirms
        title="Are you sure to delete this user ?"
        okText="Yes"
        cancelText="No"
        placement="topRight"
        onConfirm={() => props.delete(props.row)}
      >
        <a className="deleteBtn">
          <i className="ion-android-delete"/>
        </a>
      </Popconfirms>
      </Tooltip>
    </ActionWrapper>
  );
}
