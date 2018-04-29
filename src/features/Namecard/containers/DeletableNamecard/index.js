import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteNamecardRequest } from '../../actions';
import Namecard from '../../components/Namecard';
import styles from './styles.css';

class DeletableNamecard extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <Namecard {...this.props} onDelete={id => this.props.remove(id)} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  remove: bindActionCreators(deleteNamecardRequest, dispatch)
});

export default connect(null, mapDispatchToProps)(DeletableNamecard);
