import React from 'react';
import _ from 'lodash';
import { Route, withRouter, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { loadNamecardRequest } from 'Features/Namecard/actions';
import styles from './styles.css';
import DefaultNamecard from 'Features/Namecard/containers/Default';
import PublicNamecard from 'Features/Namecard/containers/Public';
import ErrorUserNotFound from '../../components/ErrorUserNotFound';
import PrivacyBar from '../../components/PrivacyBar';
import Loading from 'Containers/Loading';

class MainProfile extends React.Component {
  componentDidMount() {
    const { load, username } = this.props;
    load(username);
  }

  render() {
    const { status, username, counts } = this.props;
    if (status.success) {
      if (!counts) {
        return (
          <div className={styles.root}>
            <div className={styles.profile}>@{username} has no namecard</div>
          </div>
        );
      }

      return (
        <div className={styles.root}>
          <div className={styles.privacyBar}>
            <PrivacyBar username={username} />
          </div>

          <div className={styles.namecard}>
            <Route
              exact
              path="/:username"
              render={() => <DefaultNamecard username={username} />}
            />
            <Route
              exact
              path="/:username/:privacy"
              render={props => {
                const { privacy, username } = props.match.params;
                switch (privacy) {
                  case 'default':
                    return <DefaultNamecard username={username} />;
                  case 'public':
                    return <PublicNamecard username={username} />;
                  default:
                    return <Redirect to={`/${username}`} />;
                }
              }}
            />
          </div>
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

const mapStateToProps = (state, props) => {
  const counts = _.get(state, `namecard.entities.${props.username}`, []).length;
  return {
    status: state.namecard.status,
    counts
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainProfile)
);
