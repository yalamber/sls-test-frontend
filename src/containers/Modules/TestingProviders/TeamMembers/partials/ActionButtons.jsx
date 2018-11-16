import React from "react";
import Popconfirms from "../../../../../components/feedback/popconfirm";

import {
  ActionWrapper,
} from '../../../crud.style';
import {Tooltip} from "antd";
import {withRouter} from "react-router-dom";

const ActionButtons = function(props) {
  return (
    <ActionWrapper>
      <Tooltip placement="topLeft" title="Edit Record">
        <a onClick={() => props.history.push('/dashboard/providers/users/edit/' + props.row.userId)}>
          <i className="ion-android-create"/>
        </a>
      </Tooltip>
      <Tooltip placement="topLeft" title="Show Details">
        <a onClick={() => alert("show information")}>
          <i className="ion-information-circled" />
        </a>
      </Tooltip>
    </ActionWrapper>
  );
}

export default withRouter(ActionButtons);