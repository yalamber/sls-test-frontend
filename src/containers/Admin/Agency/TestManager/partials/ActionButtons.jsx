import React from "react";
import { withRouter } from "react-router-dom";
import Popconfirms from "../../../../../components/feedback/popconfirm";

import { ActionWrapper } from "../../../crud.style";
import { Tooltip, Icon } from "antd";

const ActionButtons = props => {
  return (
    <ActionWrapper>
      <Tooltip placement="topLeft" title="Show Available Test Queue">
        <a onClick={() => props.history.push(`users/${props.row.clientId}/1`)}>
          <i className="ion-ios-cloud" />
        </a>
      </Tooltip>
      <Tooltip placement="topLeft" title="Show Assigned Test">
        <a onClick={() => props.history.push("details/" + props.row.clientId)}>
          <i className="ion-ios-paper" />
        </a>
      </Tooltip>
      <Tooltip placement="topLeft" title="Show Completed Test">
        <a onClick={() => props.history.push("edit/" + props.row.clientId)}>
          <Icon type="check-circle" style={{ marginTop: 4 }} />
        </a>
      </Tooltip>
    </ActionWrapper>
  );
};
export default withRouter(ActionButtons);
