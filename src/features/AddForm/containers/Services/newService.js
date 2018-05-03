import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { upsertService } from '../../actions';
import styles from './styles.css';

class NewService extends React.Component {
  constructor(props) {
    super(props);
    this.valueInputRef = React.createRef();
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
    if (keyCode === 13) {
      e.preventDefault();
      upsert({ label, value }, idx);
      this.setState({ label: '', value: '' });
    }
  };

  handleButtonClick = e => {
    e.preventDefault();
    const { upsert, idx } = this.props;
    const { label, value } = this.state;
    upsert({ label, value }, idx);
    this.setState({ label: '', value: '' });
  };

  render() {
    const { label, value } = this.state;
    return (
      <div className={styles.newService}>
        <input
          type="text"
          value={label}
          name="label"
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDownForLabel}
          autoCapitalize="false"
        />
        <input
          ref={this.valueInputRef}
          type="text"
          value={value}
          name="value"
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDownForValue}
          autoCapitalize="false"
        />
        <button onClick={this.handleButtonClick}>+</button>
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
