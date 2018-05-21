import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Aliases from '../Aliases';
import Services from '../Services';
import Privacy from '../Privacy';
import ControlButtons from '../ControlButtons';
import ExternalServices from 'Features/ExtService/containers/Services';
import DiscordExtService from 'Features/ExtService/containers/Discord';
import GithubExtService from 'Features/ExtService/containers/Github';
import styles from './styles.css';
import { upsertService } from '../../actions';

class Form extends React.Component {
  addExtService = extService => {
    this.props.addService({ ...extService });
  };

  render() {
    const { status, error } = this.props;
    return (
      <form>
        {status.error && <div className={styles.error}>{error.message}</div>}
        <div className={styles.topbar}>
          <div className={styles.topbarItem}>
            <Privacy />
          </div>
          <div className={styles.topbarItem}>
            <ControlButtons />
          </div>
        </div>
        <div className={styles.namecard}>
          <Aliases />
          <Services />
        </div>
        <div className={styles.extServices}>
          <ExternalServices>
            <DiscordExtService
              onSuccess={this.addExtService}
              disabled={false}
            />
            <GithubExtService onSuccess={this.addExtService} disabled={false} />
          </ExternalServices>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addService: bindActionCreators(upsertService, dispatch)
  };
};

const mapStateToProps = state => {
  const { status, error } = state.namecard;
  return {
    status,
    error
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
