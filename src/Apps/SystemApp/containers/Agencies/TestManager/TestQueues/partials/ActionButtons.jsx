import React from "react";
import { withRouter } from "react-router";
import { Tooltip } from "antd";

import Popconfirm from "@components/feedback/popconfirm";
import { ActionWrapper } from "@utils/crud.style";

function ActionButtons(props) {
  const { agencyId } = props.match.params;
  const { row, selectedTeam } = props;
  return (
    <ActionWrapper>
      <Tooltip placement="topLeft" title="Unassign Test Case">
        <Popconfirm
          title="Are you sure you want to unassign this?"
          okText="Yes"
          cancelText="No"
          placement="topRight"
          onConfirm={() => props.unassign(props.row)}
        >
          <a className="deleteBtn">
            <i className="ion-android-delete" />
          </a>
        </Popconfirm>
      </Tooltip>
    </ActionWrapper>
  );
}

export default withRouter(ActionButtons);
