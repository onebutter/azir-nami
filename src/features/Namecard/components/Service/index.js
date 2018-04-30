import React from 'react';
import styles from './styles.css';

const Service = ({ value, label }) => (
  <div className={styles.root}>
    <div className={styles.label}>{label}</div>
    <div className={styles.value}>{value}</div>
  </div>
);

export default Service;
