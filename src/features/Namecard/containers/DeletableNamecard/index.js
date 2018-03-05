import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteNamecardRequest } from '../../actions';
import Namecard from '../../components/Namecard';
import styles from './styles.css';

class DeletableNamecard extends React.Component {
  render() {
    if (!_.isEmpty(this.props.entity)) {
      return (
        <div className={styles.root}>
          <Namecard
            {...this.props.entity}
            onDelete={id => this.props.remove(id)}
          />
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = (state, props) => {
  const { username, privacy, id } = props;
  return {
    entity: _.get(state, `namecard.entities.${username}.${privacy}.${id}`, {})
  };
};

const mapDispatchToProps = dispatch => ({
  remove: bindActionCreators(deleteNamecardRequest, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DeletableNamecard);
