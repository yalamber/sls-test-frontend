import React from "react";
import {Tooltip, Button} from "antd";
import {
  ActionWrapper,
} from '@utils/crud.style';

export default function ActionButtons({ push, row }) {
  return (
    <ActionWrapper>
      <Tooltip title="View details">
        <Button 
          shape="circle" 
          icon="info" 
          onClick={() => push(`/my-client/test-manager/test-run/${row.testQueueRunId}/details`)} 
        />
      </Tooltip>
    </ActionWrapper>
  );
}
