import React from "react";
import Popconfirms from "@components/feedback/popconfirm";
import { withRouter } from "react-router";

import { ActionWrapper } from "@utils/crud.style";
import { Tooltip } from "antd";

function ActionButtons(props) {
  const { companyId } = props.match.params;
  const { row } = props;
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
