import React from "react";
import { Button, Tooltip } from 'antd';
import { ActionWrapper } from "@utils/crud.style";

function ActionButtons({ push, row}) {
  return (
    <ActionWrapper>
      <Tooltip title="Edit">
        <Button
          shape="circle"
          icon="edit"
          onClick={() => push(`/my-client/user/${row.userId}/edit`)} />
      </Tooltip>
      <Tooltip title="User details">
        <Button
          shape="circle"
          icon="info"
          onClick={() => push(`/my-client/user/${row.userId}/details`)} />
      </Tooltip>
    </ActionWrapper>
  );
}

export default ActionButtons;
