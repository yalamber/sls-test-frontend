import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import authAction from '@redux/auth/actions';
import IntlMessages from '@components/utility/intlMessages';
import { getUserToken } from '@helpers/utility';
import SignInStyleWrapper from './signin.style';
import LoginForm from './partials/loginForm';

const { login } = authAction;

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false
    };  
    this.handleLogin = this.handleLogin.bind(this);
  }
  
  componentDidMount(){
    const token = getUserToken();
    if (token) {
       this.props.history.push('/dashboard');
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
    const from = { pathname: '/dashboard' };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <IntlMessages id="page.signInTitle" />
            </div>
            <div className="isoSignInForm">
              <LoginForm submit={this.handleLogin}/>
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.userToken !== null ? true : false
  }),
  { login }
)(SignIn);
