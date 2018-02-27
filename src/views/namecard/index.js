import React from 'react';
import styles from './styles.css';
import Namecard from 'Features/Namecard';

const NamecardView = ({ computedMatch }) => (
  <div className={styles.root}>
    <Namecard computedMatch={computedMatch} />
  </div>
);

export default NamecardView;
