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

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.username.length) {
      this.props.navigate(`/${this.state.username}`);
    }
  };

  render() {
    return (
      <div className={styles.root}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <input
            className={styles.username}
            onChange={this.handleChange}
            type="text"
            placeholder="username?"
            value={this.state.username}
          />
          <button className={styles.navigate} type="submit">
            go
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(push, dispatch)
});

export default connect(null, mapDispatchToProps)(SearchBox);
