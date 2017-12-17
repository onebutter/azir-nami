import React from 'react';
import Aliases from '../Aliases';
import Services from '../Services';
import styles from './styles.css';

const Namecard = ({ username, tag, services, aliases }) => {
  return (
    <div className={styles.root}>
      <div className={styles.username}>@{username}</div>
      <div className={styles.tag}>{tag}</div>
      <div className={styles.aliases}>
        <Aliases content={aliases} />
      </div>
      <div className={styles.services}>
        <Services content={services} />
      </div>
    </div>
  );
};

export default Namecard;
