import React from 'react';
import classNames from 'classnames';
import Aliases from '../Aliases';
import Services from '../Services';
import styles from './styles.css';

const Namecard = ({ tag, services, aliases, privacy }) => {
  const privacyClassNames = classNames(styles.privacy, styles[privacy]);
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <div className={styles.tag}>{tag}</div>
        {privacy && <div className={privacyClassNames}>{privacy}</div>}
      </div>
      <div className={styles.card}>
        {aliases &&
          aliases.length && (
            <div className={styles.aliases}>
              <Aliases content={aliases} />
            </div>
          )}
        {services &&
          services.length && (
            <div className={styles.services}>
              <Services content={services} />
            </div>
          )}
      </div>
    </div>
  );
};

export default Namecard;
