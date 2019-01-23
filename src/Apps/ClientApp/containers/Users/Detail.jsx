import React, { Component } from "react";
import { Row, Col, Icon, Spin } from "antd";
import { connect } from 'react-redux';
import { get } from "lodash";
import LayoutWrapper from "@components/utility/layoutWrapper";
import IntlMessages from '@components/utility/intlMessages';
import basicStyle from "@settings/basicStyle";
import { TitleWrapper, ComponentTitle, ActionBtn } from "@utils/crud.style";
import Box from "@components/utility/box";
import clientActions from '@app/SystemApp/redux/client/actions';

const { 
  requestCurrentClient, 
  requestCurrentClientUser
} = clientActions;

class Detail extends Component {

  componentDidMount() {
    const { 
      match, 
      requestCurrentClient, 
      requestCurrentClientUser
    } = this.props;
    //get current client
    let activeCompanyTokenData = this.props.activeCompanyTokenData;
    let clientId = get(activeCompanyTokenData, 'clientData.clientId', null);
    if(get(activeCompanyTokenData, 'type') === 'clientUser' && clientId) {
      requestCurrentClient(clientId);
      requestCurrentClientUser(match.params.userId);
    }
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { currentClient, currentClientUser, history } = this.props;

    let loading = currentClient.loading || currentClientUser.loading;
    let title = 'User Details';
    return (
      <LayoutWrapper>
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
    ...state.Client,
    ...state.My
  }),
  {
    requestCurrentClient,
    requestCurrentClientUser,
  }
)(Detail);