import React, { Component } from "react";
import { Row, Col, Icon, Spin } from "antd";
import { connect } from 'react-redux';
import _ from "lodash";
import LayoutWrapper from "@components/utility/layoutWrapper";
import PageHeader from "@components/utility/pageHeader";
import basicStyle from "@settings/basicStyle";
import { TitleWrapper, ComponentTitle, ActionBtn } from "@utils/crud.style";
import Box from "@components/utility/box";
import agencyActions from '@app/SystemApp/redux/agency/actions';

const { 
  requestCurrentAgency
} = agencyActions;

class Detail extends Component {
  componentDidMount() {
    const { 
      match, 
      requestCurrentAgency
    } = this.props;
    //get current agency
    requestCurrentAgency(match.params.agencyId);
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { currentAgency, history } = this.props;

    let loading = currentAgency.loading;
    let title = 'Agency Details';
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
                    <Icon type="left" /> Go Back
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
    requestCurrentAgency
  }
)(Detail);