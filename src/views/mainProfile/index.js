import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './styles.css';
import DefaultNamecard from 'Features/Namecard/containers/Default';

class MainProfileView extends React.Component {

  render() {
    return (
      <div className={styles.root}>
        <DefaultNamecard username={this.props.computedMatch.params.username} />
      </div>
    );
  }
}

export default withRouter(MainProfileView);
