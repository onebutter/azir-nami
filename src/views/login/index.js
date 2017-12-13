import React from 'react';
import styles from './styles.css';
import Login from 'Features/Auth/containers/Login';

const LoginView = () => (
  <div className={styles.root}>
    <Login />
  </div>
);

export default LoginView;
