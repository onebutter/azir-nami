import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Aliases from '../Aliases';
import Services from '../Services';
import styles from './styles.css';

class Form extends React.Component {
  render() {
    return (
      <form>
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
