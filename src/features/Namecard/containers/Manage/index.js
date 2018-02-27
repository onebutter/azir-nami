import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Route, withRouter } from 'react-router';
import { loadNamecardRequest } from '../../actions';
import Namecard from '../../components/Namecard';
import AddForm from '../AddForm';
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
        <div className={styles.addNamecard}>
          <Route path="/manage/add" component={AddForm} />
        </div>
        <div className={styles.addButton}>
          <Route
            exact
            path="/manage"
            render={() => <Link to="/manage/add">Add</Link>}
          />
        </div>
        <div className={styles.namecards}>{namecardComponents}</div>
      </div>
    );
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Manage));
