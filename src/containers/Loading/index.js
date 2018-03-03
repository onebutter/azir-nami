import React from 'react';
import styles from './styles.css';
import bars from './bars.svg';

class Loading extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <img src={bars} />
      </div>
    );
  }
}

export default Loading;
