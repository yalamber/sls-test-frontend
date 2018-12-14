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
          icon="caret-right" 
          onClick={() => {
            history.push(`agency/${row.agencyId}/test-manager/assigned`)
          }} 
        />
      </Tooltip>
      <Tooltip title="Completed Tests">
        <Button 
          shape="circle" 
          icon="check" 
          onClick={() => {
            history.push(`agency/${row.agencyId}/test-manager/completed`)
          }} 
        />
      </Tooltip>
    </ActionWrapper>
  );
};
export default ActionButtons;