import React from "react";
import { withRouter } from "react-router-dom";
import Popconfirms from "../../../../../components/feedback/popconfirm";

import { ActionWrapper } from "../../../crud.style";
import { Tooltip } from "antd";

const ActionButtons = props => {
  return (
    <ActionWrapper>
      <Tooltip placement="topLeft" title="Show Users List">
        <a
          onClick={() => props.history.push(`users/${props.row.clientId}/team`)}
        >
          <i className="ion-ios-person" />
        </a>
      </Tooltip>
      <Tooltip placement="topLeft" title="Show Teams List">
        <a
          onClick={() =>
            props.history.push(
              { pathname: "details/" + props.row.clientId },
              {
                row: {
                  ...props.row
                }
              }
            )
          }
        >
          <i className="ion-ios-people" />
        </a>
      </Tooltip>
      <Tooltip placement="topLeft" title="Edit Record">
        <a onClick={() => props.history.push("edit/" + props.row.clientId)}>
          <i className="ion-android-create" />
        </a>
      </Tooltip>
      <Tooltip placement="topLeft" title="Show Details">
        <a onClick={() => props.history.push("details/" + props.row.clientId)}>
          <i className="ion-information-circled" />
        </a>
      </Tooltip>
    </ActionWrapper>
  );
};
export default withRouter(ActionButtons);
