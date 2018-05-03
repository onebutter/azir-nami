import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Services from '../Services';

class Form extends React.Component {
  render() {
    return (
      <form>
        <Services />
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
