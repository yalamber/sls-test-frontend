import React from "react";
import { Tooltip, Button } from "antd";
import {
  ActionWrapper,
} from '@utils/crud.style';

const ActionButtons = ({ push, row }) => {
  return (
    <ActionWrapper>
      <Tooltip title="Test Suites">
        <Button 
          shape="circle" 
          icon="folder" 
          onClick={() => push(`client/${row.clientId}/test-manager/test-suites`)} 
        />
      </Tooltip>
      <Tooltip title="Test Cases">
        <Button 
          shape="circle" 
          icon="experiment" 
          onClick={() => push(`client/${row.clientId}/test-manager/test-cases`)} 
        />
      </Tooltip>
      <Tooltip title="Test Run">
        <Button 
          shape="circle" 
          icon="reconciliation" 
          onClick={() => push(`client/${row.clientId}/test-manager/test-run`)} 
        />
      </Tooltip>
      <Tooltip title="Test Queue">
        <Button 
          shape="circle" 
          icon="cloud" 
          onClick={() => push(`client/${row.clientId}/test-manager/test-queue`)} 
        />
      </Tooltip>
    </ActionWrapper>
  );
};
export default ActionButtons;