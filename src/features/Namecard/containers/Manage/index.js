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
    const { load, username } = this.props;
    load(username);
  }

  render() {
    const { status, entities } = this.props;
    const flattenEntities = _.flatMapDeep(entities);
    if (!status.success || !entities) {
      return <Loading />;
    }

    const namecardComponents = flattenEntities.map(
      ({ id, tag, services, aliases }) => (
        <Namecard key={id} tag={tag} services={services} aliases={aliases} />
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
