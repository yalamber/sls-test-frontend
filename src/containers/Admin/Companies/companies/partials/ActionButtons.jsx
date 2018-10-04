import React from "react";
import {withRouter} from 'react-router-dom'
import Popconfirms from '../../../../../components/feedback/popconfirm';

import {
  ActionWrapper,
} from '../../../crud.style';
import {Tooltip} from "antd";

const ActionButtons = (props) => {
  return (
    <ActionWrapper>
      <Tooltip placement="topLeft" title="Go to Dashboard">
        <a onClick={(e) => {
          e.preventDefault();
        }}>
          <i className="ion-android-apps"/>
        </a>
      </Tooltip>
      <Tooltip placement="topLeft" title="Edit Record">
        <a onClick={() => props.history.push('edit/'+props.row.clientId)}>
          <i className="ion-android-create"/>
        </a>
      </Tooltip>
      <Tooltip placement="topLeft" title="Delete Record">
        <Popconfirms
          title="Are you sure to delete this article？"
          okText="Yes"
          cancelText="No"
          placement="topRight"
          onConfirm={() => props.delete(props.row) }
        >
          <a className="deleteBtn">
            <i className="ion-android-delete"/>
          </a>
        </Popconfirms>
      </Tooltip>
      <Tooltip placement="topLeft" title="Show Details">
        <a onClick={() => props.history.push('details/' + props.row.clientId)}>
          <i className="ion-information-circled"/>
        </a>
      </Tooltip>
    </ActionWrapper>
  );
};
export default withRouter(ActionButtons);