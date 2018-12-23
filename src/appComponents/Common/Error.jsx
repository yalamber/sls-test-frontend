import React from 'react';
import { Alert } from 'antd';
import { get } from 'lodash';

function Error ({ error }) {
  return (
    <Alert message="Error" description="Something Went wrong!" />
  );
}

export default Error;
