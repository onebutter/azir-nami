import React from 'react';
import Aliases from '../Aliases';
import Services from '../Services';
import styles from './styles.css';

const Namecard = ({ username, tag, services, aliases, privacy }) => {
  return (
    <div className={styles.root}>
      <div className={styles.username}>@{username}</div>
      <div className={styles.tag}>{tag}</div>
      <div className={styles.privacy}>{privacy}</div>
      <div className={styles.aliases}>
        {aliases && <Aliases content={aliases} />}
      </div>
      <div className={styles.services}>
        {services && <Services content={services} />}
      </div>
      <hr />
    </div>
  );
};

export default Namecard;
