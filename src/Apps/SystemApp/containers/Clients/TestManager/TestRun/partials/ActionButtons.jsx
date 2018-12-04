import React from "react";
import {Tooltip} from "antd";
import Popconfirms from '@components/feedback/popconfirm';
import {
  ActionWrapper,
} from '@utils/crud.style';

export default function ActionButtons(props) {
  const rotate = {display: 'inline-block', transform: 'rotate(-45deg)'};
  return (
    <ActionWrapper>
      <a>
        <i className="ion-jet" style={rotate}/>
      </a>
      <Tooltip placement="topLeft" title="Edit Record">
        <a onClick={() => alert("Edit Form")}>
          <i className="ion-android-create"/>
        </a>
      </Tooltip>
      <Tooltip placement="topLeft" title="Delete Record">
        <Popconfirms
          title="Are you sure to delete this suite ?"
          okText="Yes"
          cancelText="No"
          placement="topRight"
          onConfirm={() => alert("...")}
        >
          <a className="deleteBtn">
            <i className="ion-android-delete"/>
          </a>
        </Popconfirms>
      </Tooltip>
    </ActionWrapper>
  );
}
