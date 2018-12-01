import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import jwtDecode from "jwt-decode";
import appActions from "../../redux/app/actions";
import authAction from '../../redux/auth/actions';
import userAction from '../../redux/user/actions';
import TopbarUser from "./topbarUser";
// import TopbarClient from "./topbarClient";
import TopbarAgency from "./topbarAgency";
import TopbarWrapper from "./topbar.style";
import themes from "../../settings/themes";
import { themeConfig } from "../../settings";

const { Header } = Layout;
const { toggleCollapsed, closeAll } = appActions;
const { logout } = authAction;
const { requestMyAgencies, requestAgencyLogin, requestMyClients, requestClientLogin } = userAction;
const customizedTheme = themes[themeConfig.theme];

class Topbar extends Component {
  state = {
    userTokenData: {}
  };

  componentDidMount() {
    this.props.requestMyAgencies();
    this.props.requestMyClients();
  }

  getCompanyTitle() {
    const { activeCompanyToken } = this.props;
    try {
      if(activeCompanyToken){
        const companyTokenData = jwtDecode(activeCompanyToken);
        let title = '';
        if(companyTokenData.type === 'agencyUser'){
          title = companyTokenData.agencyData.name;
        } else if(companyTokenData.type === 'clientUser') {
          title = companyTokenData.clientData.name;
        }
        return (
          <h1 className="company-name">{ title }</h1>
        )
      }
    } catch (e) {
      return (
        <div>
          Something went wrong
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
      userToken,
    } = this.props;
    const userTokenData = jwtDecode(userToken);
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
            {this.getCompanyTitle()}
          </div>

          <ul className="isoRight">
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
                {/*<TopbarClient myClients={myClients}
                  requestClientLogin={requestClientLogin} />*/}
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
  }
)(Topbar);
