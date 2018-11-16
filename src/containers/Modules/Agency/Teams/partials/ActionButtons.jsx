import React from "react";
import Popconfirms from "../../../../../components/feedback/popconfirm";

import { ActionWrapper } from "../../../crud.style";
import { Tooltip } from "antd";
import { withRouter } from "react-router-dom";

const ActionButtons = function ActionButtons(props) {
  return (
    <ActionWrapper>
      <Tooltip placement="topLeft" title="Show Users List">
        <a
          className="infoBtn"
          onClick={() =>
            props.history.push(`/dashboard/agency/teams/${props.row.agencyId}/members`)
          }
        >
          <i className="ion-ios-person" />
        </a>
      </Tooltip>
      <Tooltip placement="topLeft" title="Edit Record">
        <a
          onClick={() =>
            props.history.push("teams/edit/" + props.row.agencyId)
          }
        >
          <i className="ion-android-create" />
        </a>
      </Tooltip>
      <Tooltip placement="topLeft" title="Show Record">
        <a
          onClick={() =>
            alert("show info")
          }
        >
          <i className="ion-information-circled" />
        </a>
      </Tooltip>
    </ActionWrapper>
  );
};
export default withRouter(ActionButtons);
