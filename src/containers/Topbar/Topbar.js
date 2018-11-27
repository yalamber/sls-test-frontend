import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import appActions from "../../redux/app/actions";
import authAction from '../../redux/auth/actions';
import userAction from '../../redux/user/actions';
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
const { requestMyAgencies } = userAction;
const customizedTheme = themes[themeConfig.theme];

class Topbar extends Component {
  state = {
    userTokenData: {}
  };

  componentDidMount() {
    this.props.requestMyAgencies();
    //TODO: make these available throuh redux store
    this.getUserTokenData();
  }

  getUserTokenData() {
    let userTokenData = getUserTokenData();
    if(userTokenData) {
      this.setState({ userTokenData });
    }
  }

  render() {
    const { userTokenData } = this.state;
    const { toggleCollapsed, logout, closeAll, myAgencies = [] } = this.props;
    console.log(myAgencies);
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
            { userTokenData.agencyCount > 0 && 
              <li
                onClick={() => this.setState({ selectedItem: "agency" })}
                className="isoAgency"
              >
                <TopbarAgency agencies={myAgencies} />
              </li>
            }
            { userTokenData.clientCompanyCount > 0 && 
              <li
                onClick={() => this.setState({ selectedItem: "company" })}
                className="isoCompany"
              >
                <TopbarCompany companies={[]} />
              </li>
            }
            {userTokenData && userTokenData.userData &&
            <li
              onClick={() => this.setState({ selectedItem: "user" })}
              className="isoUser"
            >
              <TopbarUser userData={userTokenData.userData} logout={logout} closeAll={closeAll} />
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
    ...state.User
  }),
  { toggleCollapsed, logout, closeAll, requestMyAgencies }
)(Topbar);
