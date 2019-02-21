import React from "react";
import TestCaseDetail from '@appComponents/TestManager/TestCase/Detail';

function Detail(props) {
  return (
    <TestCaseDetail {...props} appType="client" />
  )
}

export default Detail;