import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { loadNamecardRequest } from 'Features/Namecard/actions';
import styles from './styles.css';

import Namecard from '../../components/Namecard';
import ErrorUserNotFound from '../../components/ErrorUserNotFound';

class DefaultNamecardContainer extends Component {
  render() {
    const { username, status, entity } = this.props;
    if (status.success && entity) {
      const { id, tag, services, aliases } = entity;
      const namecardComponent = (
        <Namecard key={id} tag={tag} services={services} aliases={aliases} />
      );
      return (
        <div className={styles.root}>
          <div>{namecardComponent}</div>
        </div>
      );
    }

    if (status.error) {
      return (
        <div className={styles.root}>
          <ErrorUserNotFound username={username} />
        </div>
      );
    }
    return null;
  }
}

const mapDispatchToProps = {
  load: loadNamecardRequest
};

const mapStateToProps = (state, props) => {
  return {
    status: state.namecard.status,
    entity: _.get(state, `namecard.entities.${props.username}.default[0]`, [])
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  DefaultNamecardContainer
);
