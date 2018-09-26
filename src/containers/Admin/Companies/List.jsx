import React, {Component} from 'react';
import {Row, Col, Icon} from 'antd';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import basicStyle from '../../../settings/basicStyle';
import Box from '../../../components/utility/box';
import ActionButtons from "./partials/ActionButtons";

import {
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableClickable as Table
} from '../crud.style';
import {getCompanies} from "../../../actions/companyActions";

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
          dataIndex: 'companyAdmin',
          key: 'company_admin',
        },
        {
          title: 'Company Admin Email',
          dataIndex: 'companyAdminEmail',
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
          render: (row) => <ActionButtons row={row}/>
        }
      ],
      dataSource: []
    }
  }

  componentDidMount() {
    getCompanies().then(res => {
      this.setState({dataSource: res.data})
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
              <Table
                pagination={true}
                columns={this.state.columns}
                dataSource={this.state.dataSource}
                onRowClick={(row) => {
                  this.props.history.push('details/' + row.id)
                }}
              />
            </Box>

          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
