import React from "react";
import { Tooltip, Button } from "antd";

import {
  ActionWrapper,
} from '@utils/crud.style';

const ActionButtons = ({ history, row }) => {
  return (
    <ActionWrapper>
      <Tooltip title="Assigend Tests">
        <Button 
          shape="circle" 
          icon="folder" 
          onClick={() => {
            history.push(`agency/${row.clientId}/test-manager/test-suite`)
          }} 
        />
      </Tooltip>
      <Tooltip title="Completed Tests">
        <Button 
          shape="circle" 
          icon="cloud" 
          onClick={() => {
            history.push(`agency/${row.clientId}/test-manager/test-queue`);
          }} 
        />
      </Tooltip>
    </ActionWrapper>
  );
};
export default ActionButtons;