import React from "react";
import { Button, Tooltip } from 'antd';
import { ActionWrapper } from "@utils/crud.style";

const ActionButtons = ({history, row, unassign}) => {
  return (
    <ActionWrapper>
      <Tooltip title="Run Test">
        <Button
          shape="circle"
          icon="caret-right" 
          onClick={() => {
            history.push(`/my-agency/test-manager/test-case-run/${row.testQueueId}`);
          }} />  
      </Tooltip>
      <Tooltip title="Unassign">
        <Button
          shape="circle"
          icon="delete"
          onClick={() => unassign(row)} />
      </Tooltip>
    </ActionWrapper>
  );
};

export default ActionButtons;
