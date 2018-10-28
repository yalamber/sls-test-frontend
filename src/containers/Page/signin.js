import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//import Input from '../../components/uielements/input';
//import Checkbox from '../../components/uielements/checkbox';
//import Button from '../../components/uielements/button';
import authAction from '../../redux/auth/actions';
import IntlMessages from '../../components/utility/intlMessages';
import SignInStyleWrapper from './signin.style';
import LoginForm from './partials/loginForm';

const { login } = authAction;

class SignIn extends Component {
  state = {
    redirectToReferrer: false,
    userCred :[],
    error: null
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }
  handleLogin = (values) => {
    //console.log(values)
    const { login } = this.props;
    login(values);
    this.props.history.push('/dashboard');
  };
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
              <Link to="/dashboard">
                <IntlMessages id="page.signInTitle" />
              </Link>
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
    isLoggedIn: state.Auth.idToken !== null ? true : false
  }),
  { login }
)(SignIn);
