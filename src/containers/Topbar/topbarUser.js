import React, { Component } from 'react';
import Popover from '../../components/uielements/popover';
import IntlMessages from '../../components/utility/intlMessages';
import TopbarDropdownWrapper from './topbarDropdown.style';

class TopbarUser extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: false,
    };
  }

  hide() {
    this.setState({ visible: false });
  }

  handleVisibleChange() {
    this.setState({ visible: !this.state.visible });
  }

  dropdownContent() {
    const { logout, closeAll } = this.props;
    const content = (
      <TopbarDropdownWrapper className="isoUserDropdown">
        <a
          className="isoDropdownLink"
          onClick={() => {
            logout();
            closeAll();
          }}
        >
          <IntlMessages id="topbar.logout" />
        </a>
      </TopbarDropdownWrapper>
    );
    return content;
  }

  render() {
    const { userData } = this.props;
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
          <i className="ion-ios-person-outline"/> &nbsp;
          {userData.username}
        </div>
      </Popover>
    );
  }
}

export default TopbarUser;
