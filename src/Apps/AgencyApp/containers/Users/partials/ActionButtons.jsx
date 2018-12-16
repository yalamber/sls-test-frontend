import React from "react";
import { Button, Tooltip } from 'antd';
import { ActionWrapper } from "@utils/crud.style";

function ActionButtons({ history, row, agencyId}) {
  return (
    <ActionWrapper>
      <Tooltip title="Edit">
        <Button
          shape="circle"
          icon="edit" 
          onClick={() => {
            history.push(`/admin/agency/${agencyId}/user/${row.userId}/edit`);
          }} />
      </Tooltip>
      <Tooltip title="User details">
        <Button
          shape="circle"
          icon="info" 
          onClick={() => {
            history.push(`/admin/agency/${agencyId}/user/${row.userId}/details`);
          }} />
      </Tooltip>
    </ActionWrapper>
  );
}

export default ActionButtons;