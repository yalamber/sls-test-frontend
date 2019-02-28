import React from 'react';
import { Alert } from 'antd';
import { get } from 'lodash';

function Error ({ error }) {
  let data = get(error, 'response.data');
  let message = '';
  if(data && data.length > 0) {
    data.map((msg) => {
      message += msg.message;
    });
  } else {
    message = 'Something Went Wrong!';
  }
  return (
    <Alert message="Error" description={message} />
  );
}

export default Error;
