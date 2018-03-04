import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import styles from './styles.css';

import Namecard from '../../components/Namecard';

class PublicNamecardsContainer extends React.Component {
  render() {
    return <div className={styles.root}>some junks</div>;
  }
}

const mapStateToProps = (state, props) => ({
  entities: _.get(state, `namecard.entities.${props.username}.public`, [])
});

export default connect(mapStateToProps, null)(PublicNamecardsContainer);
