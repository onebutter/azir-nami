import React from 'react';
import styles from './styles.css';

const ErrorUserNotFound = ({ username }) => {
  return (
    <div className={styles.root}>
      <span className={styles.username}>{username}</span>
      <span className={styles.message}> is not found</span>
    </div>
  );
};

export default ErrorUserNotFound;
