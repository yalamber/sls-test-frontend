import React, {Component} from 'react';
import {Row, Col, Icon, Select, Tooltip, Spin} from 'antd';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import basicStyle from '../../../../settings/basicStyle';
import Box from '../../../../components/utility/box';
import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from '../../crud.style';
import {getCompanies} from "../../../../helpers/http-api-client";

const Option = Select.Option;
export default class extends Component {
  constructor() {
    super();
    this.state = {
      columns: [
        {
          title: 'Team',
          dataIndex: 'team',
          key: 'team',
        },
        {
          title: 'Run Title',
          dataIndex: 'runTitle',
          key: 'runTitle',
        },
        {
          title: 'Created Date Time',
          dataIndex: 'createdDateTime',
          key: 'createdDateTime',
        },
        {
          title: 'TC Count',
          dataIndex: 'tcCount',
          key: 'tcCount',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status' +
            '',
        }
      ],
      dataSource: [],
      companies: [],
      selectedCompany: null,
      loading: false
    };
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
  }

  componentDidMount() {
    getCompanies().then(res => {
      this.setState({companies: res.data});
    });

  }

  handleCompanyChange(companyId) {
    this.setState({selectedCompany: companyId});
    this.updateRecords();
  }

  updateRecords() {
  }

  render() {
    const margin = {
      margin: '5px 5px 10px 0'
    };
    const {rowStyle, colStyle, gutter} = basicStyle;
    const companiesOptions = this.state.companies.map(company => <Option
      key={company.clientId}>{company.name}</Option>);

    return (

      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Test Run </ComponentTitle>
                <ButtonHolders>
                  <Tooltip placement="topRight">
                    <ActionBtn type="primary" onClick={() => {
                      alert("Form on development")
                    }}>
                      <Icon type="plus"/>
                      Add New
                    </ActionBtn>
                  </Tooltip>
                </ButtonHolders>
              </TitleWrapper>
              <Row>
                <Col md={6} sm={24} xs={24}>
                  <Select showSearch placeholder="Please Choose Company Name" style={{...margin, width: '100%'}}
                          onChange={this.handleCompanyChange}>
                    {companiesOptions}
                  </Select>
                </Col>
              </Row>
              <Spin spinning={this.state.loading}>
                <Table
                  locale={{emptyText: 'Please Select Company name'}}
                  size="middle"
                  bordered
                  pagination={true}
                  columns={this.state.columns}
                  dataSource={this.state.dataSource}
                />
              </Spin>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
