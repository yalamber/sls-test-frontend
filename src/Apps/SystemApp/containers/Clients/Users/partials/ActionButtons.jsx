import React from "react";
import { Button, Tooltip } from 'antd';
import { ActionWrapper } from "@utils/crud.style";

function ActionButtons({ history, row, clientId}) {
  return (
    <ActionWrapper>
      <Tooltip title="Edit">
        <Button
          shape="circle"
          icon="edit" 
          onClick={() => {
            history.push({
              pathname: `/admin/client/${clientId}/user/${row.userId}/edit`,
              state: {
                ...row
              }
            });
          }} />
      </Tooltip>
      <Tooltip title="User details">
        <Button
          shape="circle"
          icon="info" 
          onClick={() => {
            history.push({
              pathname: `/admin/client/${clientId}/user/${row.userId}/details`,
              state: {
                ...row
              }
            });
          }} />
      </Tooltip>
    </ActionWrapper>
  );
}

export default ActionButtons;
