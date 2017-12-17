import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { submitCredentialRequest } from './actions';
import CredentialForm from './components/CredentialForm';
import styles from './styles.css';

class RegisterContainer extends Component {
  render() {
    const { isAuthorized, submit } = this.props;
    if (isAuthorized) {
      return <Redirect to="/" />;
    }
    return (
      <div className={styles.root}>
        <CredentialForm submit={submit} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  submit: bindActionCreators(submitCredentialRequest, dispatch)
});

const mapStateToProps = state => ({
  isAuthorized: state.auth.access.isAuthorized
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
