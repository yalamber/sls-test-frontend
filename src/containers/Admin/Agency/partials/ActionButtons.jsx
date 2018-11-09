import React from "react";
import Popconfirms from "../../../../components/feedback/popconfirm";
import { Row, Col } from "antd";

import { ActionWrapper } from "../../crud.style";
import { Tooltip, Icon } from "antd";
import { withRouter } from "react-router-dom";

const ActionButtons = function ActionButtons(props) {
  const { iconStyle } = styles;

  return (
    <Row type={"flex"} justify="center" align={"middle"}>
      <Col>
        <Tooltip placement="topLeft" title="Users List">
          <a
            onClick={() =>
              props.history.push(`/dashboard/providers/teams/team-members`)
            }
            style={iconStyle}
          >
            <i className="ion-ios-person" />
          </a>
        </Tooltip>
      </Col>
      <Col>
        <Tooltip placement="topLeft" title="Teams List">
          <a
            onClick={() => props.history.push(`/dashboard/providers/teams`)}
            style={iconStyle}
          >
            <i className="ion-ios-people" />
          </a>
        </Tooltip>
      </Col>
      <Col>
        <Tooltip placement="topLeft" title="Edit Record">
          <a
            onClick={() => props.history.push(`/providers/teams/team-members`)}
            style={iconStyle}
          >
            <i className="ion-android-create" />
          </a>
        </Tooltip>
      </Col>
      <Col>
        <Tooltip placement="topLeft" title="Show Info">
          <a
            className="infoBtn"
            onClick={() => alert("show info")}
            style={iconStyle}
          >
            <i className="ion-information-circled" />
          </a>
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
