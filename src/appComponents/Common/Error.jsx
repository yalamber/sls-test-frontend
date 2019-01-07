import React from 'react';
import { Alert } from 'antd';

function Error ({ error }) {
  return (
    <Alert message="Error" description="Something Went wrong!" />
  );
}

export default Error;
