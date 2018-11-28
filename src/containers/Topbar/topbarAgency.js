import React, { Component } from 'react';
import { Spin } from "antd";
import Popover from '../../components/uielements/popover';
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
    const { myAgencies, myAgenciesLoading, requestAgencyLogin } = this.props;
    return (
      <TopbarDropdownWrapper className="isoUserDropdown">
        { myAgencies.loading && <Spin />}
        { myAgencies.error && <div className="error-msg">Could not load Agencies</div>}
        {
          myAgencies.data.map((myAgency, index) => (
            <div key={index}>
              <a className="isoDropdownLink" onClick={() => {
                requestAgencyLogin({ agencyId: myAgency.agency.agencyId  });
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
        <div className="isoIconWrapper">
          <i
            className="ion-grid"
          /> &nbsp;
          Agencies 
        </div>
      </Popover>
    );
  }
}

export default TopbarAgency;
