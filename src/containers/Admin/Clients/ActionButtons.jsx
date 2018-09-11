import React from "react";
import Popconfirms from '../../../components/feedback/popconfirm';

import {
  ActionWrapper,
} from '../crud.style';

export default function ActionButtons(props) {
  return (
    <ActionWrapper>
      <a onClick={() => alert(JSON.stringify(props.row))}>
        <i className="ion-android-create"/>
      </a>
      <Popconfirms
        title="Are you sure to delete this article？"
        okText="Yes"
        cancelText="No"
        placement="topRight"
        onConfirm={() => alert(JSON.stringify(props.row))}
      >
        <a className="deleteBtn">
          <i className="ion-android-delete"/>
        </a>
      </Popconfirms>
    </ActionWrapper>
  );
}