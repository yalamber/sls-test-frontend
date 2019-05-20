import React from "react";
import { Tooltip, Button } from "antd";
import {
  ActionWrapper,
} from '@utils/crud.style';

const ActionButtons = ({ push, row }) => {
  return (
    <ActionWrapper>
      <Tooltip title="Assigned Tests">
        <Button
          shape="circle"
          icon="caret-right"
          onClick={() => push(`agency/${row.agencyId}/test-manager/assigned-tests`)}
        />
      </Tooltip>
      <Tooltip title="Completed Tests">
        <Button
          shape="circle"
          icon="check"
          onClick={() => push(`agency/${row.agencyId}/test-manager/completed-tests`)}
        />
      </Tooltip>
    </ActionWrapper>
  );
};
export default ActionButtons;
