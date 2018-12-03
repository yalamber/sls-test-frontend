import React from "react";
import { Row, Col, Tooltip } from "antd";
import { withRouter } from "react-router-dom";
const styles = {
  iconStyle: {
    padding: 5,
    fontSize: 18
  }
};

const ActionButtons = function ActionButtons(props) {
  const { iconStyle } = styles;
  const { row, onPress } = props;
  return (
    <Row type={"flex"} justify="center" align={"middle"}>
      <Col>
        <Tooltip placement="topLeft" title="Users List">
          <a
            onClick={() => {
              props.history.push({
                pathname: `agency/users/${row.agencyId}`,
                state: {
                  ...row
                }
              });
            }}
            style={iconStyle}
          >
            <i className="ion-ios-person" />
          </a>
        </Tooltip>
      </Col>
      <Col>
        <Tooltip placement="topLeft" title="Teams List">
          <a
            onClick={() => {
              props.history.push({
                pathname: `agency/teams/${row.agencyId}`,
                state: {
                  ...row
                }
              });
            }}
            style={iconStyle}
          >
            <i className="ion-ios-people" />
          </a>
        </Tooltip>
      </Col>
      <Col>
        <Tooltip placement="topLeft" title="Edit Record">
          <a
            onClick={() => {
              props.history.push({
                pathname: `agency/edit/${row.agencyId}`,
                state: {
                  ...row
                }
              });
            }}
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