import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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

  dropdownContent(myAgencies, requestAgencyLogin, history) {
    return (
      <TopbarDropdownWrapper className="isoUserDropdown">
        { myAgencies.error && <div className="error-msg">Could not load Agencies</div>}
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
    const { myAgencies, requestAgencyLogin, history } = this.props;
    return (
      <Popover
        content={this.dropdownContent(myAgencies, requestAgencyLogin, history)}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        arrowPointAtCenter={true}
        placement="bottomLeft"
      >
        <div className="isoIconWrapper">
          <i className="ion-grid" /> 
          &nbsp; <IntlMessages id="agency" />
        </div>
      </Popover>
    );
  }
}

export default withRouter(TopbarAgency);
