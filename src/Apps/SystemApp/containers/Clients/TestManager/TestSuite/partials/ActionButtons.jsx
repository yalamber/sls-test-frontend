import React from "react";
import { Tooltip, Button } from "antd";
import Popconfirms from '@components/feedback/popconfirm';
import {
  ActionWrapper,
} from '@utils/crud.style';

export default function ActionButtons({push, row, deleteTestSuite}) {
  return (
    <ActionWrapper>
      <Tooltip title="Test Cases">
        <Button
          shape="circle"
          icon="experiment"
          onClick={() => push(`/admin/client/${row.clientTeam.client.clientId}/test-manager/test-cases?suiteId=${row.testSuiteId}`)}
        />
      </Tooltip>
      <Tooltip title="Edit Record">
        <Button
          shape="circle"
          icon="edit"
          onClick={() => push(`/admin/client/test-manager/test-suite/${row.testSuiteId}/edit`)} />
      </Tooltip>
      <Tooltip title="Details">
        <Button
          shape="circle"
          icon="info"
          onClick={() => push(`/admin/client/test-manager/test-suite/${row.testSuiteId}/details`)} />
      </Tooltip>
      <Tooltip title="Delete Record">
        <Popconfirms
          title="Are you sure to delete this test suite ?"
          okText="Yes"
          cancelText="No"
          placement="topRight"
          onConfirm={() => {
            deleteTestSuite(row.testSuiteId);
          }}
        >
          <Button
            shape="circle"
            icon="delete"
            />
        </Popconfirms>
      </Tooltip>
    </ActionWrapper>
  );
}
