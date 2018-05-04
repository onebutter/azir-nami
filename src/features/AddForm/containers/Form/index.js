import React from 'react';
import { connect } from 'react-redux';
import Aliases from '../Aliases';
import Services from '../Services';
import Privacy from '../Privacy';
import ControlButtons from '../ControlButtons';
import styles from './styles.css';

class Form extends React.Component {
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
      </form>
    );
  }
}

const mapStateToProps = state => {
  const { status, error } = state.namecard;
  return {
    status,
    error
  };
};

export default connect(mapStateToProps, null)(Form);
