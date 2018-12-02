import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { isEmpty, get } from 'lodash';

import authActions from '../../../redux/auth/actions';
import IntlMessages from '../../../components/utility/intlMessages';
import SignInStyleWrapper from './signin.style';
import LoginForm from './partials/loginForm';

const { login } = authActions;

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false
    };  
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    const { 
      isLoggedIn, 
      activeSystemAdmin, 
      history, 
      activeCompanyTokenData 
    } = this.props;

    if(isLoggedIn) {
      if(activeSystemAdmin) {
        return history.push('/admin');
      }
      if(!isEmpty(activeCompanyTokenData)) {
        if(activeCompanyTokenData.type === 'agencyUser'){
          return history.push("/my-agency");  
        }
        if(activeCompanyTokenData.type === 'clientUser'){
          return history.push("/my-client");  
        }
        if(activeCompanyTokenData.type === 'freelanceUser'){
          return history.push("/my");  
        }
      }
      history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }

  handleLogin(values) {
    const { login, history } = this.props;
    login({ history, userInfo : values});
  }
  
  render() {
    const { loginProcessing } = this.props;
    const from = { pathname: '/' };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <h1><IntlMessages id="page.signInTitle" /></h1>
            </div>
            <div className="isoSignInForm">
              <LoginForm submit={this.handleLogin} loginProcessing={loginProcessing} />
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.userToken !== null ? true : false,
    activeCompanyTokenData: state.User.activeCompanyTokenData,
    activeSystemAdmin: state.User.activeSystemAdmin,
    loginProcessing: state.Auth.loginProcessing,
  }),
  { login }
)(SignIn);
