import React, { Component } from "react";
import { connect } from 'react-redux';
import { Divider, Form, Row, Col, Spin, Icon, Input, message } from "antd";
import { get } from 'lodash';
import { setFormValidaitonError } from '@helpers/utility';
import Button from "@components/uielements/button";
import LayoutWrapper from "@components/utility/layoutWrapper";
import basicStyle from "@settings/basicStyle";
import { TitleWrapper, ComponentTitle, ActionBtn } from "@utils/crud.style";
import Box from "@components/utility/box";
import agencyActions from '@app/SystemApp/redux/agency/actions';
import { agencyValidation } from "@validations/agencyValidation";
import UserFormFields from "@appComponents/User/FormFields";
import SWQAClient from '@helpers/apiClient';

const FormItem = Form.Item;
const {
  requestCurrentAgency, 
  requestAgencyUserRoles,
  requestCreateAgencyUser,
  clearCurrentAgency,
} = agencyActions;

class CreateEdit extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.mode = props.match.params.agencyId? 'edit': 'add';
  }

  componentDidMount() {
    const { 
      match, 
      requestCurrentAgency, 
      requestAgencyUserRoles,
      clearCurrentAgency,
    } = this.props;
    //get agency roles
    requestAgencyUserRoles();
    if(match.params.agencyId) {
      //get current agency
      requestCurrentAgency(match.params.agencyId);
    } else {
      clearCurrentAgency();
    }
  }

  handleSubmit(e) {
    const { history, match, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        try {
          this.setState({ loading: true });
          if(this.mode === 'edit') {
            let agency = await SWQAClient.updateAgency(match.params.agencyId, values);
            if (agency) {
              this.setState({ loading: false });
              message.success("Successfully Saved");
            }
          } else {
            let agency = await SWQAClient.createAgency(values);
            history.replace(`/admin/agency/${agency.clientId}/details`);
          }
        } catch(e) {
          message.error("something went wrong");
          this.setState({ error: e });
          setFormValidaitonError(form, e);
          form.validateFieldsAndScroll({scroll: {offsetTop: 120}});
        } finally{
          this.setState({ loading: false });
        }
      }
    });
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const {  agencyUserRoles, history, form  } = this.props;
    const margin = {
      margin: '0px 10px 10px 0px'
    };
    let title = this.mode === 'edit'? 'Edit Cient' : 'Add Agency';
    const { getFieldDecorator } = form;
    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <TitleWrapper>
                <ComponentTitle> 
                  <ActionBtn
                    type="secondary"
                    onClick={() => history.goBack()}>
                    <Icon type="left" />Back
                  </ActionBtn>
                  &nbsp; {title}
                </ComponentTitle>
              </TitleWrapper>
              <Spin spinning={this.state.loading}>
                <Form onSubmit={this.handleSubmit} id="companyForm">
                  <Row>
                    <Col md={12} sm={24} xs={24}>
                      <FormItem hasFeedback label="Agency Name" style={margin}>
                        {getFieldDecorator('name', {rules: agencyValidation.name})(
                          <Input placeholder="Enter Agency Name"/>)}
                      </FormItem>
                    </Col>
                    <Col md={12} sm={24} xs={24}>
                      <FormItem hasFeedback label="Agency Location" style={margin}>
                        {getFieldDecorator('location', {rules: agencyValidation.location})(
                          <Input placeholder="Enter Agency Location"/>)}
                      </FormItem>
                    </Col>
                  </Row>
                  {this.mode === 'add' && 
                    <div>
                      <Divider orientation="left">Agency Account Owner</Divider>
                      <UserFormFields
                        fieldName="owner"
                        form={form}
                        mode={this.mode}
                        roles={agencyUserRoles.rows} />
                    </div>
                  }
                  <Row style={{marginTop: '10px'}}>
                    <Col span={24}>
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button
                          type="primary"
                          icon="left"
                          onClick={() => history.goBack()}
                        >
                          Cancel
                        </Button>

                        <Button
                          id="btnSubmit"
                          type="primary"
                          htmlType="submit"
                          className=""
                          icon="save"
                        >
                          Submit
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Spin>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}


const mapPropsToFields = (props) => {
  let { currentAgency } = props;
  return {
    'name': Form.createFormField({
      value: get(currentAgency, 'agencyData.name')
    }),
    'location': Form.createFormField({
      value: get(currentAgency, 'agencyData.location')
    })
  };
};
const form = Form.create({mapPropsToFields})(CreateEdit);

export default connect(
  state => ({
    ...state.Agency
  }),
  {
    requestAgencyUserRoles,
    requestCurrentAgency,
    requestCreateAgencyUser,
    clearCurrentAgency,
  }
)(form);