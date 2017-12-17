import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.css';

class SearchBox extends React.Component {
  render() {
    return (
      <div>
        <div>searchbox bleh</div>
        <Link to="/namecard">Manage</Link>
      </div>
    );
  }
}

const RootView = () => (
  <div className={styles.root}>
    <SearchBox />
  </div>
);

export default RootView;
