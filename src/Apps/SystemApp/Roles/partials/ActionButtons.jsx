import React from "react";
import { withRouter } from "react-router-dom";
import Popconfirms from "@components/feedback/popconfirm";

import { ActionWrapper } from "@utils/crud.style";
import { Tooltip } from "antd";

const ActionButtons = props => {
  return (
    <ActionWrapper>
      <Tooltip placement="topLeft" title="Edit Record">
        <a
          onClick={() =>
            props.history.push({ pathname: `edit` }, { ...props.row })
          }
        >
          <i className="ion-android-create" />
        </a>
      </Tooltip>
      <Tooltip placement="topLeft" title="Delete record">
        <Popconfirms
          title="Are you sure to delete this role ?"
          okText="Yes"
          cancelText="No"
          placement="topRight"
          onConfirm={() => props.delete(props.row)}
        >
          <a className="deleteBtn">
            <i className="ion-android-delete" />
          </a>
        </Popconfirms>
      </Tooltip>
    </ActionWrapper>
  );
};
export default withRouter(ActionButtons);
