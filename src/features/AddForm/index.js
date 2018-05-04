import React from 'react';
import Form from './containers/Form';
import styles from './styles.css';

class AddForm extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <Form />
      </div>
    );
  }
}

export default AddForm;
