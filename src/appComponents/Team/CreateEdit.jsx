import React from "react";
import { Form, Row, Col, Spin, Icon } from "antd";
import LayoutWrapper from "@components/utility/layoutWrapper";
import PageHeader from "@components/utility/pageHeader";
import IntlMessages from '@components/utility/intlMessages';
import basicStyle from "@settings/basicStyle";
import ContentHolder from "@components/utility/contentHolder";
import { ActionBtn, ActionWrapper, TitleWrapper, ComponentTitle } from "@utils/crud.style";
import Button from '@components/uielements/button';
import Box from "@components/utility/box";
import TeamFormFields from "./partials/FormFields";

export default ({
  loading,
  pageHeader = null,
  mode = 'add',
  initialData,
  handleSubmit,
  form,
  history
}) => {
  const { rowStyle, colStyle, gutter } = basicStyle;
  const margin = {
    margin: '5px 5px 0px 0'
  };
  let title = '';
  if(mode === 'edit') {
    title = `Edit Team: ${ initialData.name }`;
  } else {
    title = `Create Team`;
  }
  return (
    <LayoutWrapper>
      { pageHeader && 
        <PageHeader>
          {pageHeader}
        </PageHeader>
      }
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col md={12} sm={12} xs={24} style={colStyle}>
          <Box>
            <Spin spinning={loading}>
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
            </Spin>
            <Form onSubmit={handleSubmit} id="clientForm">
              <TeamFormFields form={form}  />    
              <ActionWrapper style={margin}>
                <Button type="primary" style={margin} icon="left" onClick={() => history.goBack()}>
                  Cancel
                </Button>
                <Button id="btnSubmit" type="primary" style={margin} htmlType="submit" className="" icon="save">
                  Submit
                </Button>
              </ActionWrapper>
            </Form>
          </Box>
        </Col>
        <Col md={12} sm={12} xs={24} style={colStyle}>
          <Box title="Instruction">
            <ContentHolder>
              <p>
                <b>Team Name : </b> Team name must be alphabet with 5 to 25
                characters.
              </p>
            </ContentHolder>
          </Box>
        </Col>
      </Row>
    </LayoutWrapper>
  )
}