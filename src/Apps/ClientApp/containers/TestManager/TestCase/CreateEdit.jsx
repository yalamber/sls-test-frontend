import React from "react";
import TestCaseCreateEdit from '@appComponents/TestManager/TestCase/CreateEdit';

function CreateEdit(props) {
  return (
    <TestCaseCreateEdit {...props} appType="client" />
  )
}

export default CreateEdit;