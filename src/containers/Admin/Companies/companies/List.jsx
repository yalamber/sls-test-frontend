import React, {Component} from 'react';
import {Row, Col, Icon, message, Spin} from 'antd';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import basicStyle from '../../../../settings/basicStyle';
import Box from '../../../../components/utility/box';
import ActionButtons from "./partials/ActionButtons";

import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from '../../crud.style';
import {deleteCompany, getCompanies} from "../../../../actions/companyActions";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Company Admin',
          dataIndex: 'owner.username',
          key: 'company_admin',
        },
        {
          title: 'Company Admin Email',
          dataIndex: 'owner.contactInformation.emailAddress',
          key: 'company_admin_email',
        },
        {
          title: 'Location',
          dataIndex: 'location',
          key: 'location',
        },
        {
          title: 'Actions',
          key: 'actions',
          render: (row) => <ActionButtons row={row} delete={this.handleDelete}/>
        }
      ],
      dataSource: [],
      loading: false,
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.setState({loading: true});
    getCompanies().then(res => {
      this.setState({dataSource: res.data, loading: false})
    });
  }

  handleDelete(row) {
    deleteCompany(row.clientId).then(res => {
      message.success('Successfully Deleted.');
      this.fetchData();
    })
  }

  render() {
    const {rowStyle, colStyle, gutter} = basicStyle;
    return (

      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>Companies List</ComponentTitle>

                <ButtonHolders>
                  <ActionBtn type="primary" onClick={() => {
                    console.log(this.props.history.push('create'))
                  }}>
                    <Icon type="plus"/>
                    Add Company
                  </ActionBtn>
                </ButtonHolders>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <Table
                  pagination={true}
                  rowKey="clientId"
                  columns={this.state.columns}
                  dataSource={this.state.dataSource}
                  onRow={(row) => ({
                    onDoubleClick: () => {
                      // this.props.history.push('details/' + row.clientId)
                      // this.props.history.push(`users/${row.clientId}/1`)
                      alert("show teams list here.")
                    },
                  })}
                />
              </Spin>
            </Box>

          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
