import React from "react";
import { Tooltip, Button } from "antd";
import { ActionWrapper } from "@utils/crud.style";

const ActionButtons = ({ push, row }) => {
  return (
    <ActionWrapper>
      <Tooltip title="Users">
        <Button
          shape="circle"
          icon="user"
          onClick={() => push(`agency/${row.agencyId}/users`)}
        />
      </Tooltip>
      <Tooltip title="Teams">
        <Button
          shape="circle"
          icon="team"
          onClick={() => push(`agency/${row.agencyId}/teams`)}
        />
      </Tooltip>
      <Tooltip title="Edit">
        <Button
          shape="circle"
          icon="edit"
          onClick={() => push(`agency/${row.agencyId}/edit`)}
        />
      </Tooltip>
      <Tooltip title="Details">
        <Button
          shape="circle"
          icon="info"
          onClick={() => push(`agency/${row.agencyId}/details`)}
        />
      </Tooltip>
    </ActionWrapper>
  );
};
export default ActionButtons;
