import React, { Component } from "react";
import { Row, Col, Icon, Spin } from "antd";
import { connect } from 'react-redux';
import _ from "lodash";
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
    requestCurrentAgency(match.params.agencyId);
    requestCurrentAgencyUser(match.params.userId);
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { currentAgency, currentAgencyUser, history } = this.props;

    let loading = currentAgency.loading || currentAgencyUser.loading;
    let title = 'User Details';
    return (
      <LayoutWrapper>
        <PageHeader>Agency - {currentAgency.agencyData.name}</PageHeader>
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
    ...state.Agency
  }),
  {
    requestCurrentAgency,
    requestCurrentAgencyUser,
  }
)(Detail);