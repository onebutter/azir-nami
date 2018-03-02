import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { logoutRequest } from 'Features/Auth/actions';
import styles from './styles.css';

class Header extends React.Component {
  handleClickLogo = () => {
    if (this.props.location.pathname !== '/') {
      this.props.redirectTo('/');
    }
  };

  handleClickLogout = () => {
    this.props.logout();
  };

  handleClickUsername = () => {
    this.props.redirectTo('/manage');
  };

  render() {
    const { isAuthorized, username } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.logo} onClick={this.handleClickLogo}>
          REACHAF
        </div>
        <div className={styles.right}>
          {isAuthorized ? (
            <div>
              <div
                className={styles.username}
                onClick={this.handleClickUsername}
              >
                {username}
              </div>
              <div className={styles.logout} onClick={this.handleClickLogout}>
                Logout
              </div>
            </div>
          ) : (
            <Link to="/login">login</Link>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthorized: state.auth.access.isAuthorized,
  username: state.auth.user.username
});

const mapDistpatchToProps = dispatch => ({
  logout: bindActionCreators(logoutRequest, dispatch),
  redirectTo: bindActionCreators(push, dispatch)
});

export default withRouter(
  connect(mapStateToProps, mapDistpatchToProps)(Header)
);
