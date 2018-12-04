import React from "react";
import {withRouter} from 'react-router-dom';
import {Tooltip} from "antd";
import {
  ActionWrapper,
} from '@utils/crud.style';

const ActionButtons = (props) => {
  return (
    <ActionWrapper>
      <Tooltip title="Test Suites">
        <a onClick={() => props.history.push(`${props.row.clientId}/test-manager/test-suite`)}>
          <i className="ion-ios-photos"/>
        </a>
      </Tooltip>
      <Tooltip title="Test Cases">
        <a onClick={() => props.history.push(`client/${props.row.clientId}/test-manager/test-case`)}>
          <i className="ion-ios-flask"/>
        </a>
      </Tooltip>
      <Tooltip title="Test Run">
        <a onClick={() => props.history.push(`client/${props.row.clientId}/test-manager/test-run`)}>
          <i className="ion-ios-paperplane"/>
        </a>
      </Tooltip>
      <Tooltip title="Test Queue">
        <a onClick={() => props.history.push(`client/${props.row.clientId}/test-manager/test-queue`)}>
          <i className="ion-ios-cloud"/>
        </a>
      </Tooltip>
    </ActionWrapper>
  );
};
export default withRouter(ActionButtons);