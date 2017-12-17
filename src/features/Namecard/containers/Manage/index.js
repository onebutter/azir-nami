import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadNamecardRequest } from '../../actions';

class Manage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { load, username } = this.props;
    load(username);
  }

  render() {
    return <div>some scrubs</div>;
  }
}

const mapStateToProps = state => ({
  username: state.auth.user.username
});

const mapDispatchToProps = dispatch => ({
  load: bindActionCreators(loadNamecardRequest, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
