import React from 'react';
import styles from './styles.css';

const ServiceLabel = ({ label }) => <div className={styles.label}>{label}</div>;
const ServiceValue = ({ value }) => <div className={styles.value}>{value}</div>;

class Service extends React.Component {
  static Label = ServiceLabel;
  static Value = ServiceValue;
}

export default Service;
