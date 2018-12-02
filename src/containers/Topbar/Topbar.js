import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Spin } from "antd";
import appActions from "../../redux/app/actions";
import authAction from '../../redux/auth/actions';
import userAction from '../../redux/user/actions';
import TopbarUser from "./topbarUser";
import TopbarClient from "./topbarClient";
import TopbarAgency from "./topbarAgency";
import TopbarWrapper from "./topbar.style";
import themes from "../../settings/themes";
import { themeConfig } from "../../settings";
import { get, isEmpty } from "lodash";

const { Header } = Layout;
const { toggleCollapsed, closeAll } = appActions;
const { logout } = authAction;
const {
  requestMyAgencies,
  requestAgencyLogin,
  requestMyClients,
  requestClientLogin,
  switchSystemAdmin
} = userAction;
const customizedTheme = themes[themeConfig.theme];

class Topbar extends Component {

  componentDidMount() {
    this.props.requestMyAgencies();
    this.props.requestMyClients();
  }

  systemAdminSwitch() {
    return (
      <a className="switch-link" onClick={() => {
        this.props.switchSystemAdmin();
      }}>[ Switch to System Admin ]</a>
    )
  }

  getTopBarTitle() {
    try {
      const { activeCompanyTokenData, activeSystemAdmin, userTokenData } = this.props;
      let title = '';
      if (!isEmpty(activeCompanyTokenData)) {
        if (activeCompanyTokenData.type === 'agencyUser') {
          title = activeCompanyTokenData.agencyData.name;
        } else if (activeCompanyTokenData.type === 'clientUser') {
          title = activeCompanyTokenData.clientData.name;
        }
      } else {
        if (get(userTokenData, 'systemRole.key', false) === 'system-admin') {
          title = "System Administration"
        }
      }
      return (
        <div className="title-holder">
          <h1>{title}</h1>
          {!activeSystemAdmin && this.systemAdminSwitch()}
        </div>
      )
    } catch (e) {
      console.log(e);
      return (
        <div>
          Something went wrong, <a onClick={() => {

          }}>Retry</a>
        </div>
      );
    }
  }

  render() {
    const {
      toggleCollapsed,
      logout,
      closeAll,
      myAgencies = { data: [], loading: true, error: false },
      myClients = { data: [], loading: true, error: false },
      requestAgencyLogin,
      requestClientLogin,
      userTokenData,
    } = this.props;
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
            {this.getTopBarTitle()}
          </div>

          <ul className="isoRight">
            {(myAgencies.loading || myClients.loading) && <li><Spin /></li>}
            {myAgencies.data.length > 0 &&
              <li
                onClick={() => this.setState({ selectedItem: "agency" })}
                className="isoAgency"
              >
                <TopbarAgency myAgencies={myAgencies}
                  requestAgencyLogin={requestAgencyLogin} />
              </li>
            }
            {myClients.data.length > 0 &&
              <li
                onClick={() => this.setState({ selectedItem: "company" })}
                className="isoCompany"
              >
                <TopbarClient myClients={myClients}
                  requestClientLogin={requestClientLogin} />
              </li>
            }
            {userTokenData && userTokenData.userData &&
              <li
                onClick={() => this.setState({ selectedItem: "user" })}
                className="isoUser"
              >
                <TopbarUser userData={userTokenData.userData}
                  logout={logout}
                  closeAll={closeAll} />
              </li>
            }
          </ul>
        </Header>
      </TopbarWrapper>
    );
  }
}

export default connect(
  state => ({
    ...state.App,
    ...state.User,
    ...state.Auth
  }),
  {
    toggleCollapsed,
    logout,
    closeAll,
    requestMyAgencies,
    requestMyClients,
    requestAgencyLogin,
    requestClientLogin,
    switchSystemAdmin
  }
)(Topbar);
