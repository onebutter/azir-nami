import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Aliases from '../Aliases';
import Services from '../Services';
import Privacy from '../Privacy';
import ControlButtons from '../ControlButtons';
import styles from './styles.css';

class Form extends React.Component {
  render() {
    return (
      <form>
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

const mapStateToProps = (state, props) => {
  return null;
};

const mapDispatchToProps = dispatch => {
  return null;
};

export default connect(null, null)(Form);
