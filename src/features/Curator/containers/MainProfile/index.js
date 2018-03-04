import React from 'react';
import { Route, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { loadNamecardRequest } from 'Features/Namecard/actions';
import styles from './styles.css';
import DefaultNamecard from 'Features/Namecard/containers/Default';
import ErrorUserNotFound from '../../components/ErrorUserNotFound';
import Loading from 'Containers/Loading';

class MainProfile extends React.Component {
  componentDidMount() {
    const { load, username } = this.props;
    load(username);
  }

  render() {
    const { status, username } = this.props;
    if (status.success) {
      return (
        <div className={styles.root}>
          <Route
            exact
            path="/:username"
            render={() => <DefaultNamecard username={username} />}
          />
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

    return (
      <div className={styles.root}>
        <Loading />
      </div>
    );
  }
}

const mapDispatchToProps = {
  load: loadNamecardRequest
};

const mapStateToProps = state => ({
  status: state.namecard.status
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainProfile)
);
