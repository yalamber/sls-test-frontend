import React, { Component } from "react";
import { Row, Col, Icon, Spin, Table } from "antd";
import { connect } from 'react-redux';
import { get } from "lodash";
import LayoutWrapper from "@components/utility/layoutWrapper";
import PageHeader from "@components/utility/pageHeader";
import IntlMessages from '@components/utility/intlMessages';
import basicStyle from "@settings/basicStyle";
import { TitleWrapper, ComponentTitle, ActionBtn } from "@utils/crud.style";
import Box from "@components/utility/box";
import agencyActions from '@app/SystemApp/redux/agency/actions';

const {
  requestCurrentAgency,
  requestCurrentAgencyUser
} = agencyActions;

class Detail extends Component {
  componentDidMount() {
    const {
      match,
      requestCurrentAgency,
      requestCurrentAgencyUser
    } = this.props;
    //get current agency
    let activeCompanyTokenData = this.props.activeCompanyTokenData;
    let agencyId = get(activeCompanyTokenData, 'agencyData.agencyId', null);
    if(activeCompanyTokenData.type === 'agencyUser' && agencyId) {
        requestCurrentAgency(agencyId);
        requestCurrentAgencyUser(agencyId, match.params.userId);
    }
  }

  renderDetailsTable() {
    const { currentAgencyUser } = this.props;
    if (!currentAgencyUser) {
      return <div />;
    }

    const { data = {} } = currentAgencyUser;
    const { agency = {}, user = {}, role = {} } = data;

    const records = [];
    user.username &&
      records.push({ field: "User Name", description: user.username });

    const userStatus = user.status;
    userStatus &&
      records.push({ field: "User Status", description: userStatus });

    const agencyName = agency.name;
    agencyName && records.push({ field: "Agency", description: agencyName });

    const roleTitle = role.title;
    roleTitle && records.push({ field: "Role", description: roleTitle });

    return (
      <Table
        columns={[
          {
            title: "Field",
            key: "field",
            dataIndex: "field"
          },

          {
            title: "Description",
            key: "description",
            dataIndex: "description"
          }
        ]}
        dataSource={records}
        rowKey="field"
        pagination={false}
      />
    );
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { currentAgency, currentAgencyUser, history } = this.props;

    let loading = currentAgency.loading || currentAgencyUser.loading;
    let title = 'User Details';
    return (
      <LayoutWrapper>
        <PageHeader>User Detail</PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle>
                  <ActionBtn
                    type="secondary"
                    onClick={() => history.goBack()}
                  >
                    <Icon type="left" /> <IntlMessages id="back" />
                  </ActionBtn>
                  &nbsp; {title}
                </ComponentTitle>
              </TitleWrapper>
              <Spin spinning={loading}>
                {this.renderDetailsTable()}
              </Spin>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

export default connect(
  state => ({
    ...state.Agency,
    ...state.My
  }),
  {
    requestCurrentAgency,
    requestCurrentAgencyUser,
  }
)(Detail);
