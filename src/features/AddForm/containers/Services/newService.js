import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { upsertService } from '../../actions';
import styles from './styles.css';

class NewService extends React.Component {
  constructor(props) {
    super(props);
    this.valueInputRef = React.createRef();
    this.labelInputRef = React.createRef();
  }

  state = {
    label: '',
    value: ''
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleKeyDownForLabel = e => {
    const { keyCode } = e;
    if (keyCode === 13) {
      e.preventDefault();
      this.valueInputRef.current.focus();
    }
  };

  handleKeyDownForValue = e => {
    const { keyCode } = e;
    const { upsert, idx } = this.props;
    const { label, value } = this.state;
    if (keyCode === 13 && label.length + value.length > 0) {
      e.preventDefault();
      upsert({ label, value }, idx);
      this.setState({ label: '', value: '' });
      this.labelInputRef.current.focus();
    }
  };

  handleButtonClick = e => {
    e.preventDefault();
    const { upsert, idx } = this.props;
    const { label, value } = this.state;
    if (label.length + value.length > 0) {
      upsert({ label, value }, idx);
      this.setState({ label: '', value: '' });
      this.labelInputRef.current.focus();
    }
  };

  render() {
    const { label, value } = this.state;
    return (
      <div className={styles.newService}>
        <input
          ref={this.labelInputRef}
          className={styles.newServiceLabelInput}
          type="text"
          value={label}
          name="label"
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDownForLabel}
          autoCapitalize="false"
        />
        <input
          ref={this.valueInputRef}
          className={styles.newServiceValueInput}
          type="text"
          value={value}
          name="value"
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDownForValue}
          autoCapitalize="false"
        />
        <button
          className={styles.newServiceButton}
          onClick={this.handleButtonClick}
        >
          +
        </button>
      </div>
    );
  }
}

const mapDistpatchToProps = dispatch => {
  return {
    upsert: bindActionCreators(upsertService, dispatch)
  };
};

export default connect(null, mapDistpatchToProps)(NewService);
