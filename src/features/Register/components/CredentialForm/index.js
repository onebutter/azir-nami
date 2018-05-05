import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.css';

class CredentialForm extends React.Component {
  state = {
    username: '',
    password: '',
    submitted: false,
    submittedUsername: ''
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
      submitted: false
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { submit } = this.props;
    const { submitted, password, username } = this.state;
    if (!submitted) {
      if (password.length > 0 && username.length > 0) {
        this.setState(
          {
            submitted: true,
            submittedUsername: username
          },
          () => {
            submit(this.state);
          }
        );
      } else {
        this.setState({
          submitted: true
        });
      }
    }
  };

  render() {
    const { code, message } = this.props.error;
    const { username, password, submitted, submittedUsername } = this.state;
    const usernameErrorMsg =
      (code === 'USER_EXISTS' ||
        code === 'USERNAME_INVALID_LENGTH' ||
        code === 'USERNAME_BAD') &&
      submittedUsername === username
        ? message
        : submitted && username.length === 0 ? `Type your username` : null;
    const passwordErrorMsg =
      code === 'PASSWORD_INVALID_LENGTH' && submittedUsername === username
        ? message
        : submitted && password.length === 0 ? `Password is required` : null;
    const usernameStyle = usernameErrorMsg ? styles.usernameE : styles.username;
    const passwordStyle = passwordErrorMsg ? styles.passwordE : styles.password;
    return (
      <div className={styles.root}>
        <div className={styles.title}>Create your account</div>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <input
            className={usernameStyle}
            name="username"
            type="text"
            autoCorrect="off"
            autoCapitalize="none"
            value={this.state.username}
            onChange={this.handleChange}
            placeholder="username"
            autoFocus={true}
          />
          <div className={styles.usernameError}>{usernameErrorMsg}</div>
          <input
            className={passwordStyle}
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="password"
          />
          <div className={styles.passwordError}>{passwordErrorMsg}</div>
          <button className={styles.submitButton} type="submit">
            Submit
          </button>
        </form>
        <div className={styles.linkLogin}>
          <Link to="/login">Login</Link>
        </div>
      </div>
    );
  }
}

export default CredentialForm;
