import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, List } from 'antd';
import FourZeroFourStyleWrapper from '../Common/404.style';
//actions
import myAction from '@redux/my/actions';

const {
  requestMyAgencies,
  requestAgencyLogin,
  requestMyClients,
  requestClientLogin,
  switchSystemAdmin
} = myAction;

class My extends Component {
  
  componentDidMount() {
    this.props.requestMyAgencies();
    this.props.requestMyClients();
  }

  render() {
    const { myAgencies, requestAgencyLogin, myClients, requestClientLogin, history } = this.props;
    return (
      <FourZeroFourStyleWrapper className="iso404Page">
        <div className="iso404Content">
          <h3>
            Select Your Company
          </h3>
          <div>
            { myClients.error && <div className="error-msg">Could not load Client Accounts</div>}
            { myAgencies.error && <div className="error-msg">Could not load Agency Accounts</div>}
            <List 
              header={<div>Client Accounts</div>}
              dataSource={myClients.data}
              bordered
              renderItem={myClient => (<List.Item>
                <Button block onClick={() => {
                    requestClientLogin({
                      history, 
                      clientData: { 
                        clientId: myClient.client.clientId 
                      }
                    });
                  }}>
                    {myClient.client.name} 
                    <br />
                    <span className="smallText">
                      &nbsp; {myClient.role.title}
                    </span>
                  </Button>
              </List.Item>) }
            />
            
            <List
              header={<div>Agency Accounts</div>}
              dataSource={myAgencies.data}
              bordered
              renderItem={myAgency => (<List.Item>
                <Button block onClick={() => {
                    requestAgencyLogin({
                      history, 
                      agencyData: { 
                        agencyId: myAgency.agency.agencyId 
                      }
                    });
                  }}>
                    {myAgency.agency.name} 
                    <br />
                    <span className="smallText">
                      &nbsp; {myAgency.role.title}
                    </span>
                  </Button>
              </List.Item>) }
            />
          </div>
        </div>
      </FourZeroFourStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    ...state.My
  }),
  {
    requestMyAgencies,
    requestMyClients,
    requestAgencyLogin,
    requestClientLogin,
    switchSystemAdmin
  }
)(My);

