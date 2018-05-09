import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import LoginForm from 'Features/Auth/components/LoginForm';
import { loginRequest } from '../../actions';
import styles from './styles.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(redirectTo, credentials) {
    this.props.loginRequest(credentials, redirectTo);
  }

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: '/manage' }
    };
    const { isAuthorized, error } = this.props;
    if (isAuthorized) {
      return <Redirect to={from} />;
    }
    return (
      <div className={styles.root}>
        <LoginForm
          submit={this.handleSubmit.bind(null, from.pathname)}
          error={error}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthorized: state.auth.access.isAuthorized,
  status: state.auth.status,
  error: state.auth.error
});

const mapDisptchToProps = dispatch => ({
  loginRequest: bindActionCreators(loginRequest, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDisptchToProps)(Login));
