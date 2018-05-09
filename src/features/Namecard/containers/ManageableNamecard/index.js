import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteNamecardRequest } from '../../actions';
import { push } from 'react-router-redux';
import Namecard from '../../components/Namecard';
import styles from './styles.css';

class ManageableNamecard extends React.Component {
  handleRemove = e => {
    e.preventDefault();
    const { id, remove } = this.props;
    remove(id);
  };

  handleShow = () => {
    const { username, redirectTo, id, privacy } = this.props;
    switch (privacy) {
      case 'default':
        redirectTo(`/${username}/${privacy}`);
        break;
      default:
        redirectTo(`/${username}/${privacy}/${id}`);
        break;
    }
  };

  render() {
    const { privacy } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.topBar}>
          <div className={styles[privacy]}>{this.props.privacy}</div>
          <div className={styles.deleteButton} onClick={this.handleRemove}>
            x
          </div>
        </div>
        <Namecard {...this.props} />
        <div className={styles.bottomBar}>
          <div className={styles.showThisCard} onClick={this.handleShow}>
            🎉
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { username } = state.auth.user;
  return {
    username
  };
};

const mapDispatchToProps = dispatch => ({
  remove: bindActionCreators(deleteNamecardRequest, dispatch),
  redirectTo: bindActionCreators(push, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageableNamecard);
