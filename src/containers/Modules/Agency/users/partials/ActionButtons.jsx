import React from "react";
import Popconfirms from "../../../../../components/feedback/popconfirm";
import { withRouter } from "react-router";

import { ActionWrapper } from "../../../crud.style";
import { Tooltip } from "antd";

function ActionButtons(props) {
  const { agencyId } = props.match.params;
  const { row, selectedTeam } = props;
  return (
    <ActionWrapper>
      <Tooltip placement="topLeft" title="Edit Record">
        <a
          onClick={() => {
            props.history.push({
              pathname: `/dashboard/agency/user/${agencyId}/edit/${row.userId}`,
              state: {
                ...row
              }
            });
          }}
        >
          <i className="ion-android-create" />
        </a>
      </Tooltip>
      <Tooltip placement="topLeft" title="Show user info">
        <a className="infoBtn" onClick={() => alert("user info here")}>
          <i className="ion-information-circled" />
        </a>
      </Tooltip>
    </ActionWrapper>
  );
}

export default withRouter(ActionButtons);
