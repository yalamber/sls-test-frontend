import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import { get, isEmpty } from 'lodash';

import appActions from '@redux/app/actions';
import authAction from '@redux/auth/actions';
import userAction from '@redux/user/actions';
import IntlMessages from '@components/utility/intlMessages';
import Loader from '@components/utility/loader';
import { themeConfig } from '@settings';
import themes from '@settings/themes';
import TopbarUser from './TopbarUser';
import TopbarClient from './TopbarClient';
import TopbarAgency from './TopbarAgency';
import TopbarWrapper from './topbar.style';

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
    const {history} = this.props;
    return (
      <a className="switch-link" onClick={() => {
        this.props.switchSystemAdmin({
          history
        });
      }}><IntlMessages id="topbar.switchSystemAdmin" /></a>
    )
  }

  getTopBarTitle() {
    try {
      const { activeCompanyTokenData, activeAppType, userTokenData, appSwitching } = this.props;
      if(appSwitching) {
        return <Loader />;
      }
      let title = '';
      if (!isEmpty(activeCompanyTokenData)) {
        if (activeCompanyTokenData.type === 'agencyUser') {
          title = activeCompanyTokenData.agencyData.name;
        } else if (activeCompanyTokenData.type === 'clientUser') {
          title = activeCompanyTokenData.clientData.name;
        }
      } else {
        if (get(userTokenData, 'systemRole.key', false) === 'system-admin') {
          title = <IntlMessages id="topbar.systemAdministration" />
        }
      }
      return (
        <div className="title-holder">
          <h1>{title}</h1>
          {activeAppType !== 'system' && this.systemAdminSwitch()}
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
            {(myAgencies.loading || myClients.loading) && <li><Loader /></li>}
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
)(withRouter(Topbar));
