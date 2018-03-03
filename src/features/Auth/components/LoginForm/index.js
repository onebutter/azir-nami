import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.css';

class LoginForm extends React.Component {
  state = {
    username: '',
    password: ''
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { submit } = this.props;
    submit(this.state);
  };

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.title}>Log In</div>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <input
            className={styles.username}
            name="username"
            type="text"
            value={this.state.username}
            onChange={this.handleChange}
            placeholder="username"
          />
          <input
            className={styles.password}
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="password"
          />
          <button className={styles.submitButton} type="submit">
            Submit
          </button>
        </form>
        <div className={styles.linkRegister}>
          <Link to="/register">Register</Link>
        </div>
      </div>
    );
  }
}

export default LoginForm;
