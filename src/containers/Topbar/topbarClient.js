import React, { Component } from 'react';
import { Spin } from 'antd';
import { withRouter } from 'react-router-dom';
import Popover from '../../components/uielements/popover';
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

  dropdownContent() {
    const { myClients, requestClientLogin, history } = this.props;
    return (
      <TopbarDropdownWrapper className="isoUserDropdown">
        { myClients.loading && <Spin />}
        { myClients.error && <div className="error-msg">Could not load Clients</div>}
        {
          myClients.data.map((myClient, index) => (
            <div key={index}>
              <a className="isoDropdownLink" onClick={() => {
                console.log(myClient);
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
        <div className="isoIconWrapper">
          <i
            className="ion-grid"
          /> &nbsp;
          Client 
        </div>
      </Popover>
    );
  }
}

export default withRouter(TopbarClient);
