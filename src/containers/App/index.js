import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { Debounce } from 'react-throttle';
import WindowResizeListener from 'react-window-size-listener';
import { ThemeProvider } from 'styled-components';

import authAction from '@redux/auth/actions';
import appActions from '@redux/app/actions';
import Sidebar from '@containers/Sidebar/Sidebar';
import Topbar from '@containers/Topbar/Topbar';
import { siteConfig, themeConfig } from '@settings';
import themes from '@settings/themes';
import AppRouter from './AppRouter';
import systemRoutes from '@app/SystemApp/router';
import clientRoutes from '@app/ClientApp/router';
import agencyRoutes from '@app/AgencyApp/router';
import freelancerRoutes from '@app/FreelancerApp/router';
import AppHolder from './commonStyle';
import './global.css';

const { Content, Footer } = Layout;
const { logout } = authAction;
const { toggleAll } = appActions;

export class App extends Component {

  render() {
    const { url } = this.props.match;
    const { height, appType } = this.props;
    const appHeight = window.innerHeight;
    let routes = [];
    switch(appType) {
      default:
      case 'system':
        routes = systemRoutes;
        break;
      case 'client':
        routes = clientRoutes;
        break; 
      case 'agency':
        routes = agencyRoutes;
        break;
      case 'freelancer':
        routes = freelancerRoutes;
        break; 
    }
    return (
      <ThemeProvider theme={themes[themeConfig.theme]}>
        <AppHolder>
          <Layout style={{ height: appHeight }}>
            <Debounce time="1000" handler="onResize">
              <WindowResizeListener
                onResize={windowSize =>
                  this.props.toggleAll(
                    windowSize.windowWidth,
                    windowSize.windowHeight
                  )
                }
              />
            </Debounce>
            <Topbar url={url} />
            <Layout style={{ flexDirection: 'row', overflowX: 'hidden' }}>
              <Sidebar url={url} />
              <Layout
                className="isoContentMainLayout"
                style={{
                  height: height
                }}
              >
                <Content
                  className="isomorphicContent"
                  style={{
                    padding: '70px 0 0',
                    flexShrink: '0',
                    background: '#f1f3f6',
                    position: 'relative'
                  }}
                >
                  <AppRouter url={url} routes={routes} />
                </Content>
                <Footer
                  style={{
                    background: '#ffffff',
                    textAlign: 'center',
                    borderTop: '1px solid #ededed'
                  }}
                >
                  {siteConfig.footerText}
                </Footer>
              </Layout>
            </Layout>
          </Layout>
        </AppHolder>
      </ThemeProvider>
    );
  }
}

export default connect(
  state => ({
    auth: state.Auth,
    height: state.App.height
  }),
  { logout, toggleAll }
)(App);
