import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
// import { logoutRequest } from 'Features/Auth/actions';
import styles from './styles.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickLogout = this.handleClickLogout.bind(this);
  }

  handleClickLogout() {
    console.log('i wanna logout');
  }

  render() {
    const { isAuthorized, username } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.logo}>REACHAF</div>
        <div className={styles.right}>
          {isAuthorized ? (
            <div>
              <div className={styles.username}>{username}</div>
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

export default connect(mapStateToProps)(Header);
