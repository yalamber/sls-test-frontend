import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, List } from 'antd';
import MyStyleWrapper from './my.style';
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
      <MyStyleWrapper className="isoMyPage">
        <div className="isoMyContent">
          <h3>
            Select Your Company
          </h3>
          <div className="isoListHolder">
            { myClients.error && <div className="error-msg">Could not load Client Accounts</div>}
            { myAgencies.error && <div className="error-msg">Could not load Agency Accounts</div>}
            <div className="myList">
              {myClients.data.length > 0 && <div className="list-header">Clients</div>}
              {
                myClients.data.map((myClient, index) => (
                  <div key={index}>
                    <Button block className="login-button" onClick={() => {
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
                  </div>
                ))
              }
            </div>
            <div className="myList">
              {myAgencies.data.length > 0 && <div className="list-header">Agency</div>}
              {
                myAgencies.data.map((myAgency, index) => (
                  <div key={index}>
                    <Button block className="login-button" onClick={() => {
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
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </MyStyleWrapper>
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

