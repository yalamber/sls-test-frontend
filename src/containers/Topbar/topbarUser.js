import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popover from '../../components/uielements/popover';
import IntlMessages from '../../components/utility/intlMessages';
import authAction from '../../redux/auth/actions';
import appAction from '../../redux/app/actions';
import TopbarDropdownWrapper from './topbarDropdown.style';
import { getToken } from '../../helpers/utility';

const { logout } = authAction;
const { closeAll } = appAction;

class TopbarUser extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: false,
      userName: ''
    };
  }

  componentDidMount = () => {
    this.getUserName();
  }

  hide() {
    this.setState({ visible: false });
  }

  handleVisibleChange() {
    this.setState({ visible: !this.state.visible });
  }

  getUserName() {
    var token = getToken().get('idToken');

    var tokenData = token.split('.')[1]
    var decodedTokenData = JSON.parse(window.atob(tokenData))

    this.setState({ userName: decodedTokenData && decodedTokenData.username ? decodedTokenData.username : "No name found" });
  }

  render() {
    const { userName } = this.state;

    const content = (
      <TopbarDropdownWrapper className="isoUserDropdown">
        <a className="isoDropdownLink">
          <IntlMessages id="themeSwitcher.settings" />
        </a>
        <a
          className="isoDropdownLink"
          onClick={() => {
            this.props.logout();
            this.props.closeAll();
          }}
        >
          <IntlMessages id="topbar.logout" />
        </a>
      </TopbarDropdownWrapper>
    );

    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        arrowPointAtCenter={true}
        placement="bottomLeft"
      >
        <h3>{userName}</h3>
      </Popover>
    );
  }
}

export default connect(null, { logout, closeAll })(TopbarUser);
