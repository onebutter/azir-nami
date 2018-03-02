import React from 'react';
import Aliases from '../Aliases';
import Services from '../Services';
import styles from './styles.css';

const Namecard = ({ tag, services, aliases }) => {
  return (
    <div className={styles.root}>
      <div className={styles.tag}>{tag}</div>
      <div className={styles.card}>
        <div className={styles.aliases}>
          {aliases && <Aliases content={aliases} />}
        </div>
        <div className={styles.services}>
          {services && <Services content={services} />}
        </div>
      </div>
    </div>
  );
};

export default Namecard;
