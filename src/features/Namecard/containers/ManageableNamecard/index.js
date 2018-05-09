import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteNamecardRequest } from '../../actions';
import Namecard from '../../components/Namecard';
import styles from './styles.css';

class ManageableNamecard extends React.Component {
  handleClick = e => {
    e.preventDefault();
    const { id, remove } = this.props;
    remove(id);
  };

  render() {
    const { privacy } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.topBar}>
          <div className={styles[privacy]}>{this.props.privacy}</div>
          <div className={styles.deleteButton} onClick={this.handleClick}>
            x
          </div>
        </div>
        <Namecard {...this.props} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  remove: bindActionCreators(deleteNamecardRequest, dispatch)
});

export default connect(null, mapDispatchToProps)(ManageableNamecard);
