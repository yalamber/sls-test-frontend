import React from "react";
import { Provider } from "react-redux";
import axios from 'axios';
import { ThemeProvider } from "styled-components";
import { LocaleProvider } from "antd";
import { IntlProvider } from "react-intl";
import { store, history } from "@redux/store";
import Boot from "@redux/boot";
import authActions from "@redux/auth/actions";
import { themeConfig } from "@settings";
import themes from "@settings/themes";
import AppLocale from "./languageProvider";
import config, {
  getCurrentLanguage
} from "@containers/LanguageSwitcher/config";
import PublicRoutes from "./router";
import DashAppHolder from "./dashAppStyle";


/** Intercept any unauthorized request.
* dispatch logout action accordingly **/
const { dispatch } = store; // direct access to redux store.
axios.interceptors.response.use(
  response => response,
  error => {
    const {status} = error.response;
    if (status === 401) {
      dispatch(authActions.logout());
    }
    return Promise.reject(error);
  }
);

const currentAppLocale =
  AppLocale[getCurrentLanguage(config.defaultLanguage || "english").locale];

const DashApp = () => (
  <LocaleProvider locale={currentAppLocale.antd}>
    <IntlProvider
      textComponent={React.Fragment}
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <ThemeProvider theme={themes[themeConfig.theme]}>
        <DashAppHolder>
          <Provider store={store}>
            <PublicRoutes history={history} />
          </Provider>
        </DashAppHolder>
      </ThemeProvider>
    </IntlProvider>
  </LocaleProvider>
);
Boot()
  .then(() => DashApp())
  .catch(error => console.error(error));

export default DashApp;
export { AppLocale };
