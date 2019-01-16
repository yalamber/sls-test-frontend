import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import authActions from '@redux/auth/actions';
import IntlMessages from '@components/utility/intlMessages';
import SignInStyleWrapper from './signin.style';
import LoginForm from './partials/LoginForm';

const { login } = authActions;

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false
    };
  }

  componentDidMount() {
    const { 
      isLoggedIn, 
      activeAppType, 
      history
    } = this.props;

    if(isLoggedIn) {
      switch(activeAppType) {
        case 'system':
          return history.push('/admin');
        case 'client':
          return history.push("/my-client");
        case 'agency':
          return history.push("/my-agency");
        case 'freelancer':
          return history.push("/freelancer");
        default:
          return history.push("/my");
      }
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

  handleLogin = (values) => {
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
    activeCompanyTokenData: state.My.activeCompanyTokenData,
    activeAppType: state.My.activeAppType,
    loginProcessing: state.Auth.loginProcessing,
  }),
  { login }
)(SignIn);