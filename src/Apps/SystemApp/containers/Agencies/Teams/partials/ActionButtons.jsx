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
            history.push(`/admin/agency/team/${row.agencyTeamId}/members`);
          }} />
      </Tooltip>
      <Tooltip title="Edit Record">
        <Button
          shape="circle"
          icon="edit" 
          onClick={() => {
            history.push(`/admin/agency/team/${row.agencyTeamId}/edit`);
          }} />
      </Tooltip>
      <Tooltip title="Show Team Info">
        <Button
          shape="circle"
          icon="info" 
          onClick={() => {
            history.push(`/admin/agency/team/${row.agencyTeamId}/details`);
          }} />
      </Tooltip>
    </ActionWrapper>
  );
};

export default ActionButtons;
