import React from "react";
import Popconfirms from '@components/feedback/popconfirm';

import {
  ActionWrapper,
} from '@utils/crud.style';
import {Tooltip, Popover} from "antd";
import {withRouter} from "react-router-dom";

const ActionButtons = function ActionButtons(props) {
  return (
    <ActionWrapper>
      <Tooltip placement="topLeft" title="Edit Record">
        <a onClick={() => props.history.push('edit/' + props.row.dashboardId)}>
          <i className="ion-android-create"/>
        </a>
      </Tooltip>
      <Tooltip placement="topLeft" title="Delete Record">
        <Popconfirms
          title="Are you sure to delete this board ?"
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
      <Tooltip placement="topLeft" title="Show Details">
        <a>
          <Popover content={
            <p>Other Information will be shown here</p>
          } title={props.row.name} trigger="click">
            <i className="ion-information-circled"/>
          </Popover>
        </a>
      </Tooltip>
    </ActionWrapper>
  );
}

export default withRouter(ActionButtons);