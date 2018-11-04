import React from "react";
import Popconfirms from '../../../../components/feedback/popconfirm';
import { Row, Col } from 'antd';

import {
    ActionWrapper,
} from '../../crud.style';
import { Tooltip, Icon } from "antd";
import { withRouter } from "react-router-dom";

const ActionButtons = function ActionButtons(props) {
    const { iconStyle } = styles;

    return (
        <Row type={"flex"} justify="center" align={"middle"}>
            <Col>
                <Tooltip placement="topLeft" title="Edit Record">
                    <a onClick={() => alert('edit clicked')} style={iconStyle}>
                        <i className="ion-android-create" />
                    </a>
                </Tooltip>
            </Col>
            <Col>
                <Tooltip placement="topLeft" title="Save Record">
                    <a onClick={() => alert("clicked")} style={iconStyle}>
                        <i className="save" />
                        <Icon type="save" theme="filled" />
                    </a>
                </Tooltip>
            </Col>
            <Col>
                <Tooltip placement="topLeft" title="Delete Record">
                    <Popconfirms
                        title="Are you sure to delete this team ?"
                        okText="Yes"
                        cancelText="No"
                        placement="topRight"
                        onConfirm={() => alert('delete clicked')}
                    >
                        <a className="deleteBtn" style={iconStyle}>
                            <i className="ion-android-delete" />
                        </a>
                    </Popconfirms>
                </Tooltip>
            </Col>
        </Row>
    );
};
export default withRouter(ActionButtons);

const styles = {
    iconStyle: {
        padding: 5,
        fontSize: 18
    }
};