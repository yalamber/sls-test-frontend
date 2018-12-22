import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Button, Tooltip } from 'antd';
import { withRouter } from 'react-router-dom';
import { get, isEmpty } from 'lodash';
//ui
import IntlMessages from '@components/utility/intlMessages';
import Loader from '@components/utility/loader';
//actions
import appActions from '@redux/app/actions';
import authAction from '@redux/auth/actions';
import myAction from '@redux/my/actions';
//settings
import { themeConfig } from '@settings';
import themes from '@settings/themes';
//components
import TopbarUser from './TopbarUser';
import TopbarCompany from './TopbarCompany';
import TopbarWrapper from './topbar.style';

const { Header } = Layout;
const customizedTheme = themes[themeConfig.theme];

const { toggleCollapsed, closeAll } = appActions;
const { logout } = authAction;
const {
  requestMyAgencies,
  requestAgencyLogin,
  requestMyClients,
  requestClientLogin,
  switchSystemAdmin
} = myAction;

class Topbar extends Component {

  componentDidMount() {
    this.props.requestMyAgencies();
    this.props.requestMyClients();
  }

  appSwitch() {
    const { 
      history, 
      activeAppType, 
      myAgencies = { data: [], loading: true, error: false },
      myClients = { data: [], loading: true, error: false },
      userTokenData
    } = this.props;
    return (
      <div>
        { (myAgencies.loading || myClients.loading) && <Loader /> }
        <TopbarCompany {...this.props} />
        { activeAppType !== 'system' && get(userTokenData, 'systemRole.key', false) === 'system-admin' &&
          <Tooltip placement="right" title={<IntlMessages id="topbar.switchSystemAdmin" />}>
            <Button className="switch-link" icon="lock" shape="circle" onClick={() => {
              this.props.switchSystemAdmin({
                history
              });
            }}></Button>
          </Tooltip>
        }
      </div>
    );
  }

  getTopBarTitle() {
    try {
      const { activeCompanyTokenData, userTokenData, appSwitching } = this.props;
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
          {this.appSwitch()}
        </div>
      )
    } catch (e) {
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
    ...state.My,
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
