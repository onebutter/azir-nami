import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.css';

class PrivacyBar extends React.Component {
  render() {
    const { username } = this.props;
    return (
      <div className={styles.root}>
        <NavLink
          className={styles.navlink}
          exact
          to={`/${username}`}
          activeClassName={styles.active}
        >
          {username}
        </NavLink>
        <NavLink
          className={styles.navlink}
          exact
          to={`/${username}/public`}
          activeClassName={styles.active}
        >
          public
        </NavLink>
      </div>
    );
  }
}

export default PrivacyBar;
