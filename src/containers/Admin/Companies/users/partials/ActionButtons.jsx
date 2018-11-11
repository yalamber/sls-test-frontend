import React from "react";
import Popconfirms from "../../../../../components/feedback/popconfirm";
import { withRouter } from "react-router";

import { ActionWrapper } from "../../../crud.style";
import { Tooltip } from "antd";

function ActionButtons(props) {
  const { companyId } = props.match.params;
  const { row, selectedTeam } = props;
  return (
    <ActionWrapper>
      <Tooltip placement="topLeft" title="Edit Record">
        <a
          onClick={() => {
            props.history.push({
              pathname: `/dashboard/company/user/${companyId}/edit/${
                row.userId
              }`,
              state: {
                row,
                selectedTeam: selectedTeam
              }
            });
          }}
        >
          <i className="ion-android-create" />
        </a>
      </Tooltip>
      <Tooltip placement="topLeft" title="Delete Record">
        <Popconfirms
          title="Are you sure to delete this user ?"
          okText="Yes"
          cancelText="No"
          placement="topRight"
          onConfirm={() => alert("user info here")}
        >
          <a className="infoBtn">
            <i className="ion-information-circled" />
          </a>
        </Popconfirms>
      </Tooltip>
    </ActionWrapper>
  );
}

export default withRouter(ActionButtons);
