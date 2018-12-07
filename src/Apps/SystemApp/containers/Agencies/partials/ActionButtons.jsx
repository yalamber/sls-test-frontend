import React from "react";
import { Tooltip, Button } from "antd";
import { ActionWrapper } from "@utils/crud.style";

const ActionButtons = ({ history, row }) => {
  return (
    <ActionWrapper>
      <Tooltip title="Users">
        <Button 
          shape="circle" 
          icon="user" 
          onClick={() => {
            history.push(`agency/${row.clientId}/users`);
          }} 
        />
      </Tooltip>
      <Tooltip title="Teams">
        <Button 
          shape="circle" 
          icon="team"
          onClick={() => {
            history.push(`agency/${row.clientId}/teams`);
          }} 
        />
      </Tooltip>
      <Tooltip title="Edit">
        <Button 
          shape="circle" 
          icon="edit"
          onClick={() => {
            history.push(`agency/${row.clientId}/edit`);
          }} 
        />
      </Tooltip>
      <Tooltip title="Details">
        <Button  
          shape="circle" 
          icon="info"
          onClick={() => {
            history.push(`agency/${row.clientId}/details`)
          }} 
        />
      </Tooltip>
    </ActionWrapper>
  );
};
export default ActionButtons;
