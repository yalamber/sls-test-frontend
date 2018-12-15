import React from "react";
import { Tooltip, Button } from "antd";

import { ActionWrapper } from "@utils/crud.style";

const ActionButtons = ({ history, row }) => {
  return (
    <ActionWrapper>
      <Tooltip placement="topLeft" title="Show Available Test Queue">
        <Button
          shape="circle"
          icon="cloud"
          onClick={() => {
            history.push(`agencies/test-manager/${row.agencyId}/available-tests`)
          }}
        />
      </Tooltip>
      <Tooltip placement="topLeft" title="Show Assigned Test">
        <Button
          shape="circle"
          icon="paper"
          onClick={() => {
            history.push(`agencies/test-manager/${row.agencyId}/assigned-tests`)
          }}
        />
      </Tooltip>
      <Tooltip placement="topLeft" title="Show Completed Test">
        <Button
          shape="circle"
          icon="circle"
          onClick={() => {
            history.push(`agencies/test-manager/${row.agencyId}/assigned-tests`)
          }}
        />
      </Tooltip>
    </ActionWrapper>
  );
};
export default ActionButtons
