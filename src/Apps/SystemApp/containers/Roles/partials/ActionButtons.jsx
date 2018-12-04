import React from "react";
import { withRouter } from "react-router-dom";
import { Button } from 'antd';
import Popconfirms from "@components/feedback/popconfirm";

import { ActionWrapper } from "@utils/crud.style";
import { Tooltip } from "antd";

const ActionButtons = ({history, row, deleteRole}) => {
  return (
    <ActionWrapper>
      <Tooltip placement="topLeft" title="Edit Record">
        <Button 
          shape="circle" 
          icon="edit"
          onClick={() => {
            history.push({ pathname: `edit` }, { ...row })
          }} 
        />
      </Tooltip>
      <Tooltip placement="topLeft" title="Delete record">
        <Popconfirms
          title="Are you sure to delete this role ?"
          okText="Yes"
          cancelText="No"
          placement="topRight"
          onConfirm={() => deleteRole(row)}
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
export default withRouter(ActionButtons);
