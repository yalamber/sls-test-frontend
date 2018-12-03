import React from "react";
import { Tooltip } from "antd";
import { withRouter } from "react-router-dom";
import { ActionWrapper } from "@util/crud.style";
const ActionButtons = props => {
  return (
    <ActionWrapper>
      <Tooltip placement="topLeft" title="Edit Record">
        <a
          onClick={() =>
            props.history.push(
              "/dashboard/agency/teams/edit/" + props.row.agencyTeamId
            )
          }
        >
          <i className="ion-android-create" />
        </a>
      </Tooltip>
      <Tooltip placement="topLeft" title="Show Team Info">
        <a className="infoBtn" onClick={() => props.info(props.row)}>
          <i className="ion-information-circled" />
        </a>
      </Tooltip>
    </ActionWrapper>
  );
};
export default withRouter(ActionButtons);
