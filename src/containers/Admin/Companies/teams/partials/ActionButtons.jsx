import React from "react";
import Popconfirms from '../../../../../components/feedback/popconfirm';
import {
  ActionWrapper,
} from '../../../crud.style';
import {Tooltip} from "antd";
import {withRouter} from "react-router-dom";

const ActionButtons = (props) => {
  return (
    <ActionWrapper>
      <Tooltip placement="topLeft" title="Show Users List">
        <a onClick={() => {
          props.history.push(`/dashboard/company/users/${props.row.clientId}/team/${props.row.clientTeamId}`)
        }}>
          <i className="ion-ios-person"/>
        </a>
      </Tooltip>
        <Tooltip placement="topLeft" title="Edit Record">
          <a onClick={() => props.history.push('/dashboard/company/teams/edit/' + props.row.clientTeamId)}>
            <i className="ion-android-create"/>
          </a>
        </Tooltip>
      <Tooltip placement="topLeft" title="Delete Record">
        <Popconfirms
          title="Are you sure to delete this team ?"
          okText="Yes"
          cancelText="No"
          placement="topRight"
          onConfirm={() => props.delete(props.row)}
        >
          <a className="infoBtn">
            <i className="ion-information-circled"/>
          </a>
        </Popconfirms>
      </Tooltip>
    </ActionWrapper>
  );
}
export default withRouter(ActionButtons);
