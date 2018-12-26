import React from "react";
import {Tooltip, Button} from "antd";
import Popconfirms from '@components/feedback/popconfirm';
import {
  ActionWrapper,
} from '@utils/crud.style';

export default function ActionButtons({ history, row }) {
  return (
    <ActionWrapper>
      <Tooltip title="View details">
        <Button 
          shape="circle" 
          icon="edit" 
          onClick={() => {
            history.push(`/my-client/test-manager/test-run/${row.testRunId}/details`);
          }} 
        />
      </Tooltip>
    </ActionWrapper>
  );
}
