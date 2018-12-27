import React from "react";
import { Button, Tooltip } from 'antd';
import { ActionWrapper } from "@utils/crud.style";

const ActionButtons = ({history, row}) => {
  return (
    <ActionWrapper>
      <Tooltip title="Run Test">
        <Button
          shape="circle"
          icon="play" 
          onClick={() => {
            history.push(`/my-agency/test-manager/test-queue/${row.testQueueId}/run`);
          }} />
      </Tooltip>
    </ActionWrapper>
  );
};

export default ActionButtons;
