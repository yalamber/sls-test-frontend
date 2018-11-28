import React from "react";
import Popconfirms from "../../../../../../components/feedback/popconfirm";
import { withRouter } from "react-router";

import { ActionWrapper } from "../../../../crud.style";
import { Tooltip } from "antd";

function ActionButtons(props) {
  const { agencyId } = props.match.params;
  const { row, selectedTeam } = props;
  return (
    <ActionWrapper>
      <Tooltip placement="topLeft" title="Unassign Test Case">
        <Popconfirms
          title="Are you sure you want to unassign this?"
          okText="Yes"
          cancelText="No"
          placement="topRight"
          onConfirm={() => props.unassign(props.row)}
        >
          <a className="deleteBtn">
            <i className="ion-android-delete" />
          </a>
        </Popconfirms>
      </Tooltip>
    </ActionWrapper>
  );
}

export default withRouter(ActionButtons);
