import React from 'react';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Route, withRouter } from 'react-router';
import Loading from 'Containers/Loading';
import { loadNamecardRequest } from '../../actions';
import Namecard from '../../components/Namecard';
import AddForm from '../AddForm';
import styles from './styles.css';

class Manage extends React.Component {
  componentDidMount() {
    const { load } = this.props;
    load();
  }

  render() {
    const { status, entities } = this.props;
    if (!status.success || !entities) {
      return <Loading />;
    }

    const flattenEntities = _.reduce(
      entities,
      (acc, v) => {
        return _.concat(acc, _.toArray(v));
      },
      []
    );

    const namecardComponents = flattenEntities.map(
      ({ id, tag, services, aliases, privacy }) => (
        <Namecard
          key={id}
          tag={tag}
          services={services}
          aliases={aliases}
          privacy={privacy}
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
        {flattenEntities.length > 0 ? (
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
