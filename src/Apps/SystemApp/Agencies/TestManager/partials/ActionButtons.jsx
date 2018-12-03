import React from "react";
import { withRouter } from "react-router-dom";
import { Tooltip, Icon } from "antd";

import { ActionWrapper } from "@utils/crud.style";

const ActionButtons = props => {
  return (
    <ActionWrapper>
      <Tooltip placement="topLeft" title="Show Available Test Queue">
        <a onClick={() => props.history.push(`/dashboard/agency/test-manager/${props.row.agencyId}/available-tests`)}>
          <i className="ion-ios-cloud" />
        </a>
      </Tooltip>
      <Tooltip placement="topLeft" title="Show Assigned Test">
        <a onClick={() => props.history.push(`/dashboard/agency/test-manager/${props.row.agencyId}/assigned-tests`)}>
          <i className="ion-ios-paper" />
        </a>
      </Tooltip>
      <Tooltip placement="topLeft" title="Show Completed Test">
        <a onClick={() => props.history.push("edit/" + props.row.agencyId)}>
          <Icon type="check-circle" style={{ marginTop: 4 }} />
        </a>
      </Tooltip>
    </ActionWrapper>
  );
};
export default withRouter(ActionButtons);
