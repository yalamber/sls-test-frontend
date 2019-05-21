import React from "react";
import { Button } from 'antd';
import Popconfirms from "@components/feedback/popconfirm";

import { ActionWrapper } from "@utils/crud.style";
import { Tooltip } from "antd";

const ActionButtons = ({push, row, deleteUser}) => {
  return (
    <ActionWrapper>
      <Tooltip placement="topLeft" title="Edit Record">
        <Button 
          shape="circle" 
          icon="edit"
          onClick={() => push(`user/${row.systemUser.userId}/edit`)} 
        />
      </Tooltip>
      <Tooltip placement="topLeft" title="Delete record">
        <Popconfirms
          title="Are you sure to delete this role ?"
          okText="Yes"
          cancelText="No"
          placement="topRight"
          onConfirm={() => deleteUser(row)}
        >
          <Button 
            shape="circle" 
            icon="delete"
          />
        </Popconfirms>
      </Tooltip>
    </ActionWrapper>
  );
};
export default ActionButtons;
