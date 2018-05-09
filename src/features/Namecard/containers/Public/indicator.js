import React from 'react';
import findIdx from 'lodash/findIndex';
import styles from './styles.css';

class Indicator extends React.Component {
  render() {
    const { namecards, ncid } = this.props;
    const idx = findIdx(namecards, { id: Number(ncid) });
    return (
      <div className={styles.indicator}>
        <span>
          {idx + 1} / {namecards.length}
        </span>
      </div>
    );
  }
}

export default Indicator;
