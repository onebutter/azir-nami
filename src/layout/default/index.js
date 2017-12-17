import React from 'react';
import Header from 'Containers/Header';
import styles from './styles.css';

const DefaultLayout = ({ component: Component }) => (
  <div className={styles.root}>
    <div className={styles.header}>
      <Header />
    </div>
    <div className={styles.body}>
      <Component />
    </div>
  </div>
);

export default DefaultLayout;
