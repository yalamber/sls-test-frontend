import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Tooltip } from 'antd';
import IntlMessages from '@components/utility/intlMessages';
import Popover from '@components/uielements/popover';
import TopbarDropdownWrapper from './topbarDropdown.style';

class TopbarAgency extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: false
    };
  }

  hide() {
    this.setState({ visible: false });
  }

  handleVisibleChange() {
    this.setState({ visible: !this.state.visible });
  }

  dropdownContent() {
    const { myAgencies, requestAgencyLogin, myClients, requestClientLogin, history } = this.props;
    return (
      <TopbarDropdownWrapper className="isoUserDropdown">
        { myClients.error && <div className="error-msg">Could not load Client Accounts</div>}
        { myAgencies.error && <div className="error-msg">Could not load Agency Accounts</div>}
        {myClients.data.length > 0 && <div className="dropdownTitle">Clients</div>}
        {
          myClients.data.map((myClient, index) => (
            <div key={index}>
              <a className="isoDropdownLink" onClick={() => {
                requestClientLogin({
                  history, 
                  clientData: { 
                    clientId: myClient.client.clientId 
                  }
                });
                this.hide();
              }}>
                {myClient.client.name} 
                <br />
                <span className="smallText">
                  &nbsp; {myClient.role.title}
                </span>
              </a>
            </div>
          ))
        }
        {myAgencies.data.length > 0 && <div className="dropdownTitle">Agency</div>}
        {
          myAgencies.data.map((myAgency, index) => (
            <div key={index}>
              <a className="isoDropdownLink" onClick={() => {
                requestAgencyLogin({
                  history,
                  agencyData: {
                    agencyId: myAgency.agency.agencyId
                  }
                });
                this.hide();
              }}>
                {myAgency.agency.name}
                <br />
                <span className="smallText">
                  &nbsp; {myAgency.role.title}
                </span>
              </a>
            </div>
          ))
        }
      </TopbarDropdownWrapper>
    )
  }

  render() {
    return (
      <Popover
        content={this.dropdownContent()}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        arrowPointAtCenter={true}
        placement="bottomLeft"
      >
        <Tooltip placement="right" title={<IntlMessages id="Accounts" />}>
          <Button className="switch-link" icon="appstore" shape="circle" />
        </Tooltip>
      </Popover>
    );
  }
}

export default withRouter(TopbarAgency);
