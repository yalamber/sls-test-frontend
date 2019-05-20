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
          onClick={() => push(`/admin/agency/team/${row.agencyTeamId}/members`)} />
      </Tooltip>
      <Tooltip title="Edit Record">
        <Button
          shape="circle"
          icon="edit" 
          onClick={() => push(`/admin/agency/team/${row.agencyTeamId}/edit`)} />
      </Tooltip>
      <Tooltip title="Show Team Info">
        <Button
          shape="circle"
          icon="info" 
          onClick={() => push(`/admin/agency/team/${row.agencyTeamId}/details`)} />
      </Tooltip>
    </ActionWrapper>
  );
};

export default ActionButtons;
