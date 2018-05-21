import React from 'react';
import styles from './styles.css';

class Service extends React.Component {
  render() {
    const { value, label, action } = this.props;
    if (action && action.type) {
      switch (action.type) {
        case 'email':
          return (
            <a href={`mailto:${action.target}`}>
              <div className={styles.root}>
                <div className={styles.label}>{label}</div>
                <div className={styles.value}>{value}</div>
              </div>
            </a>
          );
        case 'url':
          return (
            <a target="_blank" href={action.target}>
              <div className={styles.root}>
                <div className={styles.label}>{label}</div>
                <div className={styles.value}>{value}</div>
              </div>
            </a>
          );
        case 'tel':
          return (
            <a href={`tel:${action.target}`}>
              <div className={styles.root}>
                <div className={styles.label}>{label}</div>
                <div className={styles.value}>{value}</div>
              </div>
            </a>
          );
        default:
          return (
            <div className={styles.root}>
              <div className={styles.label}>{label}</div>
              <div className={styles.value}>{value}</div>
            </div>
          );
      }
    }
    return (
      <div className={styles.root}>
        <div className={styles.label}>{label}</div>
        <div className={styles.value}>{value}</div>
      </div>
    );
  }
}

export default Service;
