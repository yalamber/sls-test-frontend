import React from "react";
import Popconfirms from "../../../../../../components/feedback/popconfirm";
import { ActionWrapper } from "../../../../crud.style";
import { Tooltip } from "antd";
import { withRouter } from "react-router-dom";

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
