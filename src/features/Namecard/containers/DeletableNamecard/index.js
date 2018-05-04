import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteNamecardRequest, loadNamecardRequest } from '../../actions';
import Namecard from '../../components/Namecard';
import styles from './styles.css';

class DeletableNamecard extends React.Component {
  deleteAndReload = id => {
    this.props.remove(id);
    this.props.load();
  };

  render() {
    return (
      <div className={styles.root}>
        <Namecard {...this.props} onDelete={this.deleteAndReload} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  remove: bindActionCreators(deleteNamecardRequest, dispatch),
  load: bindActionCreators(loadNamecardRequest, dispatch)
});

export default connect(null, mapDispatchToProps)(DeletableNamecard);
