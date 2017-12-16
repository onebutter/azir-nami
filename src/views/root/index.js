import React from 'react';
import styles from './styles.css';
import { Link } from 'react-router-dom';

const RootView = () => (
  <div className={styles.root}>
    <Link to="/login">login</Link>
  </div>
);

export default RootView;
