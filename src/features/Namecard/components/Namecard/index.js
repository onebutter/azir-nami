import React from 'react';
import classNames from 'classnames';
import Aliases from '../Aliases';
import Services from '../Services';
import styles from './styles.css';

const Namecard = ({ id, services, aliases, privacy, onDelete }) => {
  const privacyClassNames = classNames(styles.privacy, styles[privacy]);
  const deleteIcon = (
    <div className={styles.deleteIcon} onClick={() => onDelete(id)}>
      X
    </div>
  );
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
      <div className={styles.title}>
        {onDelete && deleteIcon}
        {privacy && <div className={privacyClassNames}>{privacy}</div>}
      </div>
      <div className={styles.card}>
        {aliasesComponent}
        {servicesComponent}
      </div>
    </div>
  );
};

export default Namecard;
