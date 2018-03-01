import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { loadNamecardRequest } from 'Features/Namecard/actions';
import styles from './styles.css';

import Namecard from '../../components/Namecard';
import ErrorUserNotFound from '../../components/ErrorUserNotFound';

class DefaultNamecardContainer extends Component {
  componentDidMount() {
    const { username } = this.props.computedMatch.params;
    this.props.load(username);
  }

  render() {
    const { status, entity } = this.props;
    const { username } = this.props.computedMatch.params;
    if (status.success && entity) {
      const { id, tag, services, aliases, privacy } = entity;
      const namecardComponent = (
        <Namecard
          key={id}
          tag={tag}
          privacy={privacy}
          services={services}
          aliases={aliases}
          username={username}
        />
      );
      return (
        <div className={styles.root}>
          <h3>{username}</h3>
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
  const { username } = props.computedMatch.params;
  return {
    status: state.namecard.status,
    entity: _.get(state, `namecard.entities.${username}.default[0]`, [])
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  DefaultNamecardContainer
);
