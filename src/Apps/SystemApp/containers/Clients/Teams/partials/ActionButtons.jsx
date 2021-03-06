import React from "react";
import { Button, Tooltip } from 'antd';
import { ActionWrapper } from "@utils/crud.style";

const ActionButtons = ({push, row}) => {
  return (
    <ActionWrapper>
      <Tooltip title="Show Members List">
        <Button
          shape="circle"
          icon="user"
          onClick={() => push(`/admin/client/team/${row.clientTeamId}/members`)} />
      </Tooltip>
      <Tooltip title="Test Suites">
        <Button
          shape="circle"
          icon="folder"
          onClick={() => push(`/admin/client/${row.clientId}/test-manager/test-suite?teamId=${row.clientTeamId}`)} />
      </Tooltip>
      <Tooltip title="Edit Record">
        <Button
          shape="circle"
          icon="edit"
          onClick={() => push(`/admin/client/team/${row.clientTeamId}/edit`)} />
      </Tooltip>
      <Tooltip title="Show Team Info">
        <Button
          shape="circle"
          icon="info"
          onClick={() => push(`/admin/client/team/${row.clientTeamId}/details`)} />
      </Tooltip>
    </ActionWrapper>
  );
};

export default ActionButtons;
