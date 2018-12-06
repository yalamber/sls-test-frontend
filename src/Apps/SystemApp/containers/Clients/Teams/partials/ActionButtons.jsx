import React from "react";
import { Button, Tooltip } from 'antd';
import { ActionWrapper } from "@utils/crud.style";

const ActionButtons = ({history, row}) => {
  return (
    <ActionWrapper>
      <Tooltip placement="topLeft" title="Show Members List">
        <Button
          shape="circle"
          icon="user" 
          onClick={() => {
            history.push(`/admin/client/${row.clientId}/team/${row.clientTeamId}/members`);
          }} />
      </Tooltip>
      <Tooltip placement="topLeft" title="Test Suites">
        <Button
          shape="circle"
          icon="folder" 
          onClick={() => {
            history.push(`client/${row.clientId}/test-manager/test-suite?teamId=${row.clientTeamId}`)
          }} />
      </Tooltip>
      <Tooltip placement="topLeft" title="Edit Record">
        <Button
          shape="circle"
          icon="edit" 
          onClick={() => {
            history.push(`/admin/client/${row.clientId}/team/${row.clientTeamId}/edit`);
          }} />
      </Tooltip>
      <Tooltip placement="topLeft" title="Show Team Info">
        <Button
          shape="circle"
          icon="info" 
          onClick={() => {
            history.push(`/admin/client/${row.clientId}/team/${row.clientTeamId}/details`);
          }} />
      </Tooltip>
    </ActionWrapper>
  );
};

export default ActionButtons;
