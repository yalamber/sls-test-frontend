import React from 'react';
import { Alert } from 'antd';
import { get, isArray, isString } from 'lodash';

function Error ({ error }) {
  let data = get(error, 'response.data');
  let message = '';
  if(isArray(data)) {
    data.map((msg) => {
      message += msg.message;
    });
  } else {
    if(isString(data)) {
      message = data;
    } else {
      message = 'Something Went Wrong!';
    }
  }
  return (
    <Alert message="Error" description={message} />
  );
}

export default Error;
