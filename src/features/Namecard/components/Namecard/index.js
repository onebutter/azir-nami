import React from 'react';
import Aliases from '../Aliases';
import Services from '../Services';
import styles from './styles.css';

const Namecard = ({ services, aliases }) => {
  const aliasesComponent =
    aliases && aliases.length ? (
      <div className={styles.aliases}>
        <Aliases content={aliases} />
      </div>
    ) : null;
  const servicesComponent =
    services && services.length ? (
      <div className={styles.services}>
        <Services content={services} />
      </div>
    ) : null;
  return (
    <div className={styles.root}>
      {aliasesComponent}
      {servicesComponent}
    </div>
  );
};

export default Namecard;
