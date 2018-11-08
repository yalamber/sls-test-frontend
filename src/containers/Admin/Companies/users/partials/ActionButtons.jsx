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
        <a onClick={() => console.log(props.row)}>
          <i className="ion-android-create"/>
        </a>
      </Tooltip>
      <Tooltip placement="topLeft" title="Delete Record">
      <Popconfirms
        title="Are you sure to delete this user ?"
        okText="Yes"
        cancelText="No"
        placement="topRight"
        onConfirm={() => alert('user info here')}
      >
        <a className="infoBtn">
          <i className="ion-information-circled"/>
        </a>
      </Popconfirms>
      </Tooltip>
    </ActionWrapper>
  );
}
