import React from "react";
import Popconfirms from "../../../../components/feedback/popconfirm";
import { Row, Col } from "antd";

import { ActionWrapper } from "../../crud.style";
import { Tooltip, Icon } from "antd";
import { withRouter } from "react-router-dom";
import actions from '../../../../redux/agency/actions';

const ActionButtons = function ActionButtons(props) {
  const { iconStyle } = styles;
  const { row, onPress } = props;

  const openPate = ( path ) => {

  }

  return (
    <Row type={"flex"} justify="center" align={"middle"}>
      <Col>
        <Tooltip placement="topLeft" title="Users List">
          <a
            onClick={onPress.bind(this, `/dashboard/providers/teams/team-members`, actions.FORM_DATA_SELECTED_TEAM_OF_AGENCY, row)}
            style={iconStyle}
          >
            <i className="ion-ios-person" />
          </a>
        </Tooltip>
      </Col>
      <Col>
        <Tooltip placement="topLeft" title="Teams List">
          <a
            onClick={onPress.bind(this, `/dashboard/providers/teams`, actions.FORM_DATA_SELECTED_AGENCY, row)}
            style={iconStyle}
          >
            <i className="ion-ios-people" />
          </a>
        </Tooltip>
      </Col>
      <Col>
        <Tooltip placement="topLeft" title="Edit Record">
          <a
            onClick={onPress.bind(this, `/providers/teams/team-members`, actions.FORM_DATA_SELECTED_AGENCY, row)}
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
