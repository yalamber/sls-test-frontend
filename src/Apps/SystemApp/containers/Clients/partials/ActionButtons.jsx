import React from "react";
import { withRouter } from "react-router-dom";
import { Tooltip } from "antd";

import { ActionWrapper } from "@utils/crud.style";

const ActionButtons = props => {
  return (
    <ActionWrapper>
      <Tooltip title="Users">
        <a onClick={() => props.history.push(`client/${props.row.clientId}/users`)}>
          <i className="ion-ios-person" />
        </a>
      </Tooltip>
      <Tooltip title="Teams">
        <a onClick={() => props.history.push(`client/${props.row.clientId}/teams`)}>
          <i className="ion-ios-people" />
        </a>
      </Tooltip>
      <Tooltip title="Edit">
        <a onClick={() => props.history.push(`client/${props.row.clientId}/edit`)}>
          <i className="ion-android-create" />
        </a>
      </Tooltip>
      <Tooltip title="Details">
        <a onClick={() => props.history.push(`client/${props.row.clientId}/details`)}>
          <i className="ion-information-circled" />
        </a>
      </Tooltip>
    </ActionWrapper>
  );
};
export default withRouter(ActionButtons);
