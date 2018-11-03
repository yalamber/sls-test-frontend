import React from "react";
import Popconfirms from '../../../../components/feedback/popconfirm';

import {
    ActionWrapper,
} from '../../crud.style';
import { Tooltip, Icon } from "antd";
import { withRouter } from "react-router-dom";

const ActionButtons = function ActionButtons(props) {
    return (
        <ActionWrapper>
            <Tooltip placement="topLeft" title="Edit Record">
                <a onClick={() => alert('edit clicked')}>
                    <i className="ion-android-create" />
                </a>
            </Tooltip>
            <Tooltip placement="topLeft" title="Save Record">
                <a onClick={() => alert("clicked")}>
                    <i className="save" />
                    <Icon type="save" theme="filled" />
                </a>
            </Tooltip>
            <Tooltip placement="topLeft" title="Delete Record">
                <Popconfirms
                    title="Are you sure to delete this team ?"
                    okText="Yes"
                    cancelText="No"
                    placement="topRight"
                    onConfirm={() => alert('delete clicked')}
                >
                    <a className="deleteBtn">
                        <i className="ion-android-delete" />
                    </a>
                </Popconfirms>
            </Tooltip>
        </ActionWrapper>
    );
};
export default withRouter(ActionButtons);