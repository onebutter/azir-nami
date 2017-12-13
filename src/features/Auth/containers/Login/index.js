import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import LoginForm from 'Features/Auth/components/LoginForm';
import { loginRequest } from '../../actions';
import styles from './styles.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { isAuthorized, redirect, redirectTo } = this.props;
    if (isAuthorized) {
      redirect(redirectTo);
    }
  }

  handleSubmit(credentials) {
    const { loginRequest, redirectTo } = this.props;
    loginRequest(credentials, redirectTo);
  }

  render() {
    return (
      <div className={styles.root}>
        <LoginForm submit={this.handleSubmit} />
      </div>
    );
  }
}

Login.defaultProps = {
  redirectTo: '/'
};

const mapStateToProps = state => ({
  isAuthorized: state.auth.isAuthorized
});

const mapDisptchToProps = dispatch => ({
  redirect: bindActionCreators(push, dispatch),
  loginRequest: bindActionCreators(loginRequest, dispatch)
});

export default connect(mapStateToProps, mapDisptchToProps)(Login);
