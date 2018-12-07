import React from "react";
import { Tooltip, Button } from "antd";

import {
  ActionWrapper,
} from '@utils/crud.style';

const ActionButtons = ({ history, row }) => {
  return (
    <ActionWrapper>
      <Tooltip title="Test Suites">
        <Button 
          shape="circle" 
          icon="folder" 
          onClick={() => {
            history.push(`agency/${row.clientId}/test-manager/test-suite`)
          }} 
        />
      </Tooltip>
      <Tooltip title="Test Cases">
        <Button 
          shape="circle" 
          icon="experiment" 
          onClick={() => {
            history.push(`agency/${row.clientId}/test-manager/test-case`)
          }} 
        />
      </Tooltip>
      <Tooltip title="Test Run">
        <Button 
          shape="circle" 
          icon="reconciliation" 
          onClick={() => {
            history.push(`agency/${row.clientId}/test-manager/test-run`);
          }} 
        />
      </Tooltip>
      <Tooltip title="Test Queue">
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