import React from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import styles from './styles.css';

class SearchBox extends React.Component {
  state = { username: '' };

  handleChange = e => {
    this.setState({ username: e.target.value });
  };

  handleClick = () => {
    this.props.navigate(`/${this.state.username}`);
  };

  render() {
    return (
      <div className={styles.root}>
        <input
          onChange={this.handleChange}
          type="text"
          value={this.state.username}
        />
        <button onClick={this.handleClick}>go</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(push, dispatch)
});

export default connect(null, mapDispatchToProps)(SearchBox);
