import React from "react";
import {Tooltip, Button} from "antd";
import Popconfirms from '@components/feedback/popconfirm';
import {
  ActionWrapper,
} from '@utils/crud.style';

export default function ActionButtons({row, deleteTestCase, history}) {
  return (
    <ActionWrapper>
      <Tooltip title="Edit Record">
        <Button
          shape="circle"
          icon="edit"
          onClick={() => {
            history.push(`/admin/client/test-manager/test-case/${row.testCaseId}/edit`);
          }}
        />
      </Tooltip>
      <Tooltip title="Details">
        <Button
          shape="circle"
          icon="info"
          onClick={() => {
            history.push(`/admin/client/test-manager/test-case/${row.testCaseId}/details`);
          }}
        />
      </Tooltip>
      <Tooltip placement="topLeft" title="Delete Record">
        <Popconfirms
          title="Are you sure to delete this test case ?"
          okText="Yes"
          cancelText="No"
          placement="topRight"
          onConfirm={() => deleteTestCase(row.testCaseId)}
        >
          <Button
            shape="circle"
            icon="delete" />
        </Popconfirms>
      </Tooltip>
    </ActionWrapper>
  );
}
