import React from "react";
import TestSuiteCreateEdit from '@appComponents/TestManager/TestSuite/CreateEdit';

function CreateEdit(props) {
  return (
    <TestSuiteCreateEdit {...props} appType="system" />
  )
}

export default CreateEdit;