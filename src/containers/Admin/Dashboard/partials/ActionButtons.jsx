import React from "react";
import Popconfirms from '../../../../components/feedback/popconfirm';

import {
  ActionWrapper,
} from '../../crud.style';
import {Tooltip} from "antd";
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
          title="Are you sure to delete this article？"
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
        <a onClick={() => alert(JSON.stringify(props.row))}>
          <i className="ion-information-circled"/>
        </a>
      </Tooltip>
    </ActionWrapper>
  );
}

export default withRouter(ActionButtons);