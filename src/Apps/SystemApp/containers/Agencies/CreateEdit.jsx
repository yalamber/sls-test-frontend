import React, { Component } from "react";
import { connect } from 'react-redux';
import { Divider, Form, Row, Col, Spin, Icon, Input, message } from "antd";
import { get } from 'lodash';
import Button from "@components/uielements/button";
import LayoutWrapper from "@components/utility/layoutWrapper";
import basicStyle from "@settings/basicStyle";
import { TitleWrapper, ComponentTitle, ActionBtn } from "@utils/crud.style";
import Box from "@components/utility/box";
import clientActions from '@app/SystemApp/redux/agency/actions';
import { clientValidation } from "@validations/clientValidation";
import UserFormFields from "@app/SystemApp/components/User/FormFields";
//TODO migrate to swqa sdk
import { addCompany, editCompany } from "@helpers/http-api-client";

const FormItem = Form.Item;
const {
  requestCurrentAgency, 
  requestAgencyUserRoles,
  requestCreateAgencyUser,
  clearCurrentAgency,
} = clientActions;

class CreateEdit extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.mode = props.match.params.clientId? 'edit': 'add';
  }

  componentDidMount() {
    const { 
      match, 
      requestCurrentAgency, 
      requestAgencyUserRoles,
      clearCurrentAgency,
    } = this.props;
    //get client roles
    requestAgencyUserRoles();
    if(match.params.clientId) {
      //get current client
      requestCurrentAgency(match.params.clientId);
    } else {
      clearCurrentAgency();
    }
  }

  handleSubmit(e) {
    const { history, match, form } = this.props;
    e.preventDefault();
    this.setState({ loading: true });
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if(this.mode === 'edit') {
          console.log(values);
          editCompany(match.params.clientId, values.client)
          .then(res => {
            if (res) {
              this.setState({ loading: false });
              message.success("Successfully Saved");
              history.push(`/admin/agency/${match.params.clientId}/details`);
            }
          })
          .catch(error => {
            this.setState({ loading: false, errors: error });
          });
        } else {  
          addCompany({ ...values.company, owner: values.user }).then(res => {
            if (res.status) {
              this.setState({ loading: false });
              //TODO go to details page
            }
          });
        }
      }
    });
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const {  clientUserRoles, history, form  } = this.props;
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
                        {getFieldDecorator('client.name', {rules: clientValidation.name})(
                          <Input placeholder="Enter Agency Name"/>)}
                      </FormItem>
                    </Col>
                    <Col md={12} sm={24} xs={24}>
                      <FormItem hasFeedback label="Agency Location" style={margin}>
                        {getFieldDecorator('client.location', {rules: clientValidation.location})(
                          <Input placeholder="Enter Agency Location"/>)}
                      </FormItem>
                    </Col>
                  </Row>
                  {this.mode === 'add' && 
                    <div>
                      <Divider orientation="left">Agency Account Owner</Divider>
                      <UserFormFields
                      form={form}
                      roles={clientUserRoles.rows}/>
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
    'client.name': Form.createFormField({
      value: get(currentAgency, 'clientData.name')
    }),
    'client.location': Form.createFormField({
      value: get(currentAgency, 'clientData.location')
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