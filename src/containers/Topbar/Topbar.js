import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import jwtDecode from "jwt-decode";
import appActions from "../../redux/app/actions";
import authAction from '../../redux/auth/actions';
import userAction from '../../redux/user/actions';
import TopbarUser from "./topbarUser";
import TopbarCompany from "./topbarCompany";
import TopbarAgency from "./topbarAgency";
import TopbarWrapper from "./topbar.style";
import themes from "../../settings/themes";
import { themeConfig } from "../../settings";

const { Header } = Layout;
const { toggleCollapsed, closeAll } = appActions;
const { logout } = authAction;
const { requestMyAgencies, requestAgencyLogin, } = userAction;
const customizedTheme = themes[themeConfig.theme];

class Topbar extends Component {
  state = {
    userTokenData: {}
  };

  componentDidMount() {
    this.props.requestMyAgencies();
  }

  getCompanyTitle() {
    const { activeCompanyToken } = this.props;
    try {
      const companyTokenData = jwtDecode(activeCompanyToken);
      return (
        <h1 className="company-name">{ companyTokenData.agencyData.name }</h1>
      )
    } catch (e) {
      console.log(e)
      return (
        <div>
          
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
      requestAgencyLogin,
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
            {userTokenData.agencyCount > 0 &&
              <li
                onClick={() => this.setState({ selectedItem: "agency" })}
                className="isoAgency"
              >
                <TopbarAgency myAgencies={myAgencies}
                  requestAgencyLogin={requestAgencyLogin} />
              </li>
            }
            {userTokenData.clientCompanyCount > 0 &&
              <li
                onClick={() => this.setState({ selectedItem: "company" })}
                className="isoCompany"
              >
                <TopbarCompany myCompanies={[]} />
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
  { toggleCollapsed, logout, closeAll, requestMyAgencies, requestAgencyLogin }
)(Topbar);
