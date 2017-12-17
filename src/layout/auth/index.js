import React from 'react';
import styles from './styles.css';

const AuthLayout = ({ component: Component }) => (
  <div className={styles.root}>
    <Component />
  </div>
);

export default AuthLayout;
