import React from "react";
import { Tooltip, Button } from "antd";
import { ActionWrapper } from "@utils/crud.style";

const ActionButtons = ({ history, row, setCurrentClient }) => {
  return (
    <ActionWrapper>
      <Tooltip title="Users">
        <Button 
          shape="circle" 
          icon="user" 
          onClick={() => {
            //set current Client
            setCurrentClient(row);
            history.push(`client/${row.clientId}/users`);
          }} 
        />
      </Tooltip>
      <Tooltip title="Teams">
        <Button 
          shape="circle" 
          icon="team"
          onClick={() => {
            setCurrentClient(row);
            history.push(`client/${row.clientId}/teams`);
          }} 
        />
      </Tooltip>
      <Tooltip title="Edit">
        <Button 
          shape="circle" 
          icon="edit"
          onClick={() => {
            setCurrentClient(row);
            history.push(`client/${row.clientId}/edit`);
          }} 
        />
      </Tooltip>
      <Tooltip title="Details">
        <Button  
          shape="circle" 
          icon="info"
          onClick={() => {
            setCurrentClient(row);
            history.push(`client/${row.clientId}/details`)
          }} 
        />
      </Tooltip>
    </ActionWrapper>
  );
};
export default ActionButtons;
