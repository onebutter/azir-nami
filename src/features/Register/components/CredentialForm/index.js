import React from 'react';
import styles from './styles.css';

class CredentialForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { submit } = this.props;
    submit(this.state);
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.title}>Create your account</div>
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
          <input className={styles.submitButton} type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CredentialForm;
