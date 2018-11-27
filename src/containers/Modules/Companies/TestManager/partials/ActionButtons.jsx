import React from "react";
import {withRouter} from 'react-router-dom'
import Popconfirms from '../../../../../components/feedback/popconfirm';

import {
  ActionWrapper,
} from '../../../crud.style';
import {Tooltip} from "antd";

const ActionButtons = (props) => {
  return (
    <ActionWrapper>
      <Tooltip placement="topLeft" title="Show Test Case List">
        <a onClick={() => props.history.push(`${props.row.clientId}/test-manager/test-case/list`)}>
          <i className="ion-ios-flask"/>
        </a>
      </Tooltip>
      <Tooltip placement="topLeft" title="Show Test Suite">
        <a onClick={() => props.history.push(`${props.row.clientId}/test-manager`)}>
          <i className="ion-ios-photos"/>
        </a>
      </Tooltip>
      <Tooltip placement="topLeft" title="Show Test Run">
        <a onClick={() => props.history.push(`${props.row.clientId}/test-manager/test-run`)}>
          <i className="ion-ios-paperplane"/>
        </a>
      </Tooltip>
      <Tooltip placement="topLeft" title="Show Send test to Cloud">
        <a onClick={() => props.history.push('details/' + props.row.clientId)}>
          <i className="ion-ios-cloud"/>
        </a>
      </Tooltip>
    </ActionWrapper>
  );
};
export default withRouter(ActionButtons);
