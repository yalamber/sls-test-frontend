import React from "react";
import TestSuiteDetail from '@appComponents/TestManager/TestSuite/Detail';

function Detail(props) {
  return (
    <TestSuiteDetail {...props} appType="system" />
  )
}

export default Detail;