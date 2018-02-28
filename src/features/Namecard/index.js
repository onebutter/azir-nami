import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadNamecardRequest } from './actions';
import styles from './styles.css';

import Namecard from './components/Namecard';

class NamecardContainer extends Component {
  componentDidMount() {
    const { username } = this.props.computedMatch.params;
    this.props.load(username);
  }

  render() {
    const { status, entities } = this.props;
    if (status.success && entities) {
      const { username } = this.props.computedMatch.params;
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
