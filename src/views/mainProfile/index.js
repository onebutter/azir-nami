import React from 'react';
import { withRouter } from 'react-router';
import styles from './styles.css';
import Curator from 'Features/Curator';

class MainProfileView extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <Curator.Main username={this.props.computedMatch.params.username} />
      </div>
    );
  }
}

export default withRouter(MainProfileView);
