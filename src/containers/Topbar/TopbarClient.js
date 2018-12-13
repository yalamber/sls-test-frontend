import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import IntlMessages from '@components/utility/intlMessages';
import Popover from '@components/uielements/popover';
import TopbarDropdownWrapper from './topbarDropdown.style';

class TopbarClient extends Component {
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

  dropdownContent( myClients, requestClientLogin, history ) {
    return (
      <TopbarDropdownWrapper className="isoUserDropdown">
        { myClients.error && <div className="error-msg">Could not load Clients</div>}
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
      </TopbarDropdownWrapper>
    )
  }

  render() {
    const { myClients, requestClientLogin, history } = this.props;
    return (
      <Popover
        content={this.dropdownContent(myClients, requestClientLogin, history)}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        arrowPointAtCenter={true}
        placement="bottomLeft">
        <div className="isoIconWrapper">
          <i className="ion-grid"/>
          &nbsp; <IntlMessages id="client" />
        </div>
      </Popover>
    );
  }
}

export default withRouter(TopbarClient);
