import React from "react";
import Popconfirms from '../../../../../components/feedback/popconfirm';

import {
  ActionWrapper,
} from '../../../crud.style';
import {Tooltip} from "antd";

export default function ActionButtons(props) {
  return (
    <ActionWrapper>
      <Tooltip placement="topLeft" title="Edit Record">
        <a onClick={() => alert(JSON.stringify(props.row))}>
          <i className="ion-android-create"/>
        </a>
      </Tooltip>
      <Tooltip placement="topLeft" title="Delete Record">
        <Popconfirms
          title="Are you sure to delete this article？"
          okText="Yes"
          cancelText="No"
          placement="topRight"
          onConfirm={() => alert(JSON.stringify(props.row))}
        >
          <a className="deleteBtn">
            <i className="ion-android-delete"/>
          </a>
        </Popconfirms>
      </Tooltip>
      <Tooltip placement="topLeft" title="Show Details">
        <a onClick={() => alert(JSON.stringify(props.row))}>
          <i className="ion-information-circled"/>
        </a>
      </Tooltip>
    </ActionWrapper>
  );
}