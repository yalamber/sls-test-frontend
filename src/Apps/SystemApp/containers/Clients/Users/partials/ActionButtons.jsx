import React from "react";
import { withRouter } from "react-router";
import { ActionWrapper } from "@utils/crud.style";
import { Tooltip } from "antd";

function ActionButtons(props) {
  const { row, match: { params: { clientId } } } = props;
  return (
    <ActionWrapper>
      <Tooltip title="Edit">
        <a onClick={() => {
            props.history.push({
              pathname: `/client/${clientId}/user/${row.userId}/edit`,
              state: {
                ...row
              }
            });
          }}>
          <i className="ion-android-create" />
        </a>
      </Tooltip>
      <Tooltip title="Show user info">
        <a className="infoBtn" onClick={() => alert("user info here")}>
          <i className="ion-information-circled" />
        </a>
      </Tooltip>
    </ActionWrapper>
  );
}

export default withRouter(ActionButtons);
