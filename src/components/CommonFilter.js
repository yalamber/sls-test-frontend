import React from "react";
import { Col, Radio, Select } from "antd";
const RadioGroup = Radio.Group;
const margin = {
  margin: "5px 5px 10px 0px"
};

const CommonFilter = opts => {
  const {
    margin,
    handleCompanyChange,
    handleTeamChange,
    handleSuiteChange,
    selectedCompany,
    selectedTeam,
    selectedSuite,
    companiesOptions,
    teamsOptions,
    suiteOptions
  } = opts;
  return (
    <div>
      <Col md={5} sm={24} xs={24} style={margin}>
        <p>View Options</p>
        <RadioGroup>
          <Radio value={1} className="who_cares">
            Individual
          </Radio>
          <Radio value={2}>Team</Radio>
        </RadioGroup>
      </Col>
      <Col md={6} sm={24} xs={24} style={margin}>
        <Select
          showSearch
          placeholder="Company Name"
          style={{ width: "100%" }}
          onChange={handleCompanyChange}
          value={selectedCompany}
        >
          {companiesOptions}
        </Select>
      </Col>
      <Col md={6} sm={24} xs={24} style={margin}>
        <Select
          showSearch
          placeholder="Team Name"
          style={{ width: "100%" }}
          onChange={handleTeamChange}
          value={selectedTeam}
        >
          {teamsOptions}
        </Select>
      </Col>
      <Col md={6} sm={24} xs={24} style={margin}>
        <Select
          showSearch
          placeholder="Testing Suite"
          style={{ width: "100%" }}
          onChange={handleSuiteChange}
          value={selectedSuite}
        >
          {suiteOptions}
        </Select>
      </Col>
    </div>
  );
};

export default CommonFilter;
