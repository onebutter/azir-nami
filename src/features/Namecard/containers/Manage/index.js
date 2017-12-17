import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadNamecardRequest } from '../../actions';
import Namecard from '../../components/Namecard';
import styles from './styles.css';

class Manage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { load, username } = this.props;
    load(username);
  }

  render() {
    const { status, entities, username } = this.props;
    if (!status.success) {
      return <div>loading...</div>;
    }
    if (entities.length === 0) {
      return <div>Create your namecard</div>;
    }

    const namecardComponents = entities.map(
      ({ id, tag, services, aliases }) => (
        <Namecard
          key={id}
          tag={tag}
          services={services}
          aliases={aliases}
          username={username}
        />
      )
    );
    return <div className={styles.root}>{namecardComponents}</div>;
  }
}

const mapStateToProps = state => {
  const { username } = state.auth.user;
  const { status, entities } = state.namecard;
  return {
    username,
    status,
    entities: entities[username]
  };
};

const mapDispatchToProps = dispatch => ({
  load: bindActionCreators(loadNamecardRequest, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
