import React from 'react';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Route, withRouter } from 'react-router';
import Loading from 'Containers/Loading';
import { loadNamecardRequest } from '../../actions';
import ManageableNamecard from '../ManageableNamecard';
// import AddForm from '../AddForm';
import AddForm from 'Features/AddForm';
import styles from './styles.css';

const sortValueMapping = {
  default: -4,
  public: -3,
  private: -2,
  secret: -1
};

class Manage extends React.Component {
  componentDidMount() {
    const { load, username } = this.props;
    load(username);
  }

  render() {
    const { status, entities } = this.props;
    if (status.request || !entities) {
      return <Loading />;
    }

    const sortedEntities = _.cloneDeep(entities).sort((a, b) => {
      if (a.privacy === b.privacy) {
        const aDate = new Date(a.updatedAt);
        const bDate = new Date(b.updatedAt);
        return bDate - aDate;
      }
      return sortValueMapping[a.privacy] - sortValueMapping[b.privacy];
    });

    const namecardComponents = sortedEntities.map(({ ...props }) => (
      <ManageableNamecard key={props.id} {...props} />
    ));
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
        {sortedEntities.length > 0 ? (
          <div className={styles.namecards}>{namecardComponents}</div>
        ) : (
          <div>You have no namecard yet!</div>
        )}
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
