import React from "react";
import Button from "@components/uielements/button";
import Popconfirms from "@components/feedback/popconfirm";
import { ActionWrapper } from "@utils/crud.style";
import { Tooltip } from "antd";

const ActionButtons = ({ push, row, deleteMember }) => {
  return (
    <ActionWrapper>
      <Tooltip title="Edit Membership">
        <Button
          shape="circle"
          icon="edit"
          onClick={() => push(`/admin/agency/team/${row.teamId}/member/${row.userId}/edit`)}
        />
      </Tooltip>
      <Tooltip title="Membership Details">
        <Button
          shape="circle"
          icon="info"
          onClick={() => push(`/admin/agency/team/${row.teamId}/member/${row.userId}/details`)}
        />
      </Tooltip>
      <Tooltip title="Delete">
        <Popconfirms
          title="Are you sure to delete memebr?"
          okText="Yes"
          cancelText="No"
          placement="topRight"
          onConfirm={() => deleteMember(row)}
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
