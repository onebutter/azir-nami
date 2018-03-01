import React from 'react';
import styles from './styles.css';
import DefaultNamecard from 'Features/Namecard/containers/Default';

const NamecardView = ({ computedMatch }) => (
  <div className={styles.root}>
    <DefaultNamecard computedMatch={computedMatch} />
  </div>
);

export default NamecardView;
