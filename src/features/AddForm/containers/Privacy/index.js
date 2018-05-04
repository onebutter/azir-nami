import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';
import { bindActionCreators } from 'redux';
import { updatePrivacty } from '../../actions';

class PrivacySelect extends React.Component {
  handleChange = e => {
    const { value } = e.target;
    this.props.update(value);
  };

  render() {
    const { privacy } = this.props;
    return (
      <div className={styles.root}>
        <select
          className={styles.select}
          onChange={this.handleChange}
          name="privacy"
          value={privacy}
        >
          <option value="default">default</option>
          <option value="public">public</option>
        </select>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { privacy } = state.formData.data;
  return { privacy };
};

const mapDispatchToProps = dispatch => {
  return {
    update: bindActionCreators(updatePrivacty, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivacySelect);
