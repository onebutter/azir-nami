import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { submitCredentialRequest } from './actions';
import CredentialForm from './components/CredentialForm';
import AuthRequiredRoute from 'Features/Auth/containers/AuthRequired';
import styles from './styles.css';

class RegisterContainer extends Component {
  render() {
    const { submit } = this.props;
    return (
      <div className={styles.root}>
        <Route
          exact
          path="/register"
          render={props => {
            return <CredentialForm submit={submit} {...props} />;
          }}
        />
        <AuthRequiredRoute
          exact
          path="/register/addcard"
          render={() => {
            return <div>aspodasdfasdfjfasd</div>;
          }}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  submit: bindActionCreators(submitCredentialRequest, dispatch)
});

export default withRouter(connect(null, mapDispatchToProps)(RegisterContainer));
