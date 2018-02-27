import React from 'react';
import { Link } from 'react-router-dom';
import SearchBox from 'Features/SearchBox';
import styles from './styles.css';

const RootView = () => (
  <div className={styles.root}>
    <SearchBox />
    <Link to="/manage">Manage</Link>
  </div>
);

export default RootView;
