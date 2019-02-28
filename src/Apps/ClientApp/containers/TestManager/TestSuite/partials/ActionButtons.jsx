import React from "react";
import { Tooltip, Button } from "antd";
import Popconfirms from '@components/feedback/popconfirm';
import {
  ActionWrapper,
} from '@utils/crud.style';

export default function ActionButtons({history, row, sendToQueue, deleteTestSuite}) {
  return (
    <ActionWrapper>
      <Tooltip title="Queue for Test">
        <Button
          shape="circle"
          icon="cloud"
          onClick={() => {
            sendToQueue(row);
          }}
        />
      </Tooltip>
      <Tooltip title="Test Cases">
        <Button
          shape="circle"
          icon="experiment"
          onClick={() => {
            history.push(`/my-client/test-manager/test-cases?suiteId=${row.testSuiteId}`)
          }}
        />
      </Tooltip>
      <Tooltip title="Edit Record">
        <Button
          shape="circle"
          icon="edit"
          onClick={() => {
            history.push(`/my-client/test-manager/test-suite/${row.testSuiteId}/edit`);
          }} />
      </Tooltip>
      <Tooltip title="Details">
        <Button
          shape="circle"
          icon="info"
          onClick={() => {
            history.push(`/my-client/test-manager/test-suite/${row.testSuiteId}/details`);
          }} />
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
