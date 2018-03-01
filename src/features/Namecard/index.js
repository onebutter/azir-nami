import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadNamecardRequest } from './actions';
import styles from './styles.css';

import Namecard from './components/Namecard';
import ErrorUserNotFound from './components/ErrorUserNotFound';

class NamecardContainer extends Component {
  componentDidMount() {
    const { username } = this.props.computedMatch.params;
    this.props.load(username);
  }

  render() {
    const { status, entities } = this.props;
    const { username } = this.props.computedMatch.params;
    if (status.success && entities) {
      const namecardComponents = entities.map(
        ({ id, tag, services, aliases, privacy }) => (
          <Namecard
            key={id}
            tag={tag}
            privacy={privacy}
            services={services}
            aliases={aliases}
            username={username}
          />
        )
      );
      return (
        <div className={styles.root}>
          <h3>{username}</h3>
          <div>{namecardComponents}</div>
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
    entities: state.namecard.entities && state.namecard.entities[username]
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NamecardContainer);
