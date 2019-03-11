import React from "react";
import { Button, Tooltip } from 'antd';
import { ActionWrapper } from "@utils/crud.style";

const ActionButtons = ({history, row}) => {
  return (
    <ActionWrapper>
      <Tooltip title="Show Members List">
        <Button
          shape="circle"
          icon="user"
          onClick={() => {
            history.push(`/admin/client/team/${row.clientTeamId}/members`);
          }} />
      </Tooltip>
      <Tooltip title="Test Suites">
        <Button
          shape="circle"
          icon="folder"
          onClick={() => {
            history.push(`/admin/client/${row.clientId}/test-manager/test-suite?teamId=${row.clientTeamId}`)
          }} />
      </Tooltip>
      <Tooltip title="Edit Record">
        <Button
          shape="circle"
          icon="edit"
          onClick={() => {
            history.push(`/admin/client/team/${row.clientTeamId}/edit`);
          }} />
      </Tooltip>
      <Tooltip title="Show Team Info">
        <Button
          shape="circle"
          icon="info"
          onClick={() => {
            history.push(`/admin/client/team/${row.clientTeamId}/details`);
          }} />
      </Tooltip>
    </ActionWrapper>
  );
};

export default ActionButtons;
