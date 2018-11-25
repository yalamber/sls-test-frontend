import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import appActions from "../../redux/app/actions";
import authAction from '../../redux/auth/actions';
import TopbarUser from "./topbarUser";
import TopbarCompany from "./topbarCompany";
import TopbarAgency from "./topbarAgency";
import TopbarWrapper from "./topbar.style";
import themes from "../../settings/themes";
import { themeConfig } from "../../settings";
import { getUserTokenData } from '../../helpers/utility';

const { Header } = Layout;
const { toggleCollapsed, closeAll } = appActions;
const { logout } = authAction;
const customizedTheme = themes[themeConfig.theme];

class Topbar extends Component {
  state = {
    userData: {}
  };

  componentDidMount() {
    this.getUserName();
  }

  getUserName() {
    var userData = getUserTokenData();
    if(userData) {
      console.log(userData);
      this.setState({userData: userData});
    }
  }

  render() {
    const { userData } = this.state;
    const { toggleCollapsed, logout, closeAll } = this.props;
    const collapsed = this.props.collapsed && !this.props.openDrawer;
    const styling = {
      background: customizedTheme.backgroundColor,
      position: "fixed",
      width: "100%",
      height: 70
    };
    return (
      <TopbarWrapper>
        <Header
          style={styling}
          className={
            collapsed ? "isomorphicTopbar collapsed" : "isomorphicTopbar"
          }
        >
          <div className="isoLeft">
            <button
              className={
                collapsed ? "triggerBtn menuCollapsed" : "triggerBtn menuOpen"
              }
              style={{ color: customizedTheme.textColor }}
              onClick={toggleCollapsed}
            />
          </div>

          <ul className="isoRight">
          
            <li
              onClick={() => this.setState({ selectedItem: "agency" })}
              className="isoAgency"
            >
              <TopbarAgency />
            </li>
            <li
              onClick={() => this.setState({ selectedItem: "company" })}
              className="isoCompany"
            >
              <TopbarCompany />
            </li>
            <li
              onClick={() => this.setState({ selectedItem: "user" })}
              className="isoUser"
            >
              <TopbarUser userData={userData} logout={logout} closeAll={closeAll} />
            </li>
          </ul>
        </Header>
      </TopbarWrapper>
    );
  }
}

export default connect(
  state => ({
    ...state.App
  }),
  { toggleCollapsed, logout, closeAll }
)(Topbar);
