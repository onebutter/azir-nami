import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { upsertService, updateNewService } from '../../actions';
import styles from './styles.css';

class NewService extends React.Component {
  constructor(props) {
    super(props);
    this.valueInputRef = React.createRef();
    this.labelInputRef = React.createRef();
  }

  state = {
    label: this.props.label,
    value: this.props.value
  };

  static getDerivedStateFromProps(props) {
    const { label, value } = props;
    return { label, value };
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    const existingState = {
      label: this.state.label,
      value: this.state.value
    };
    this.props.update({
      ...existingState,
      [name]: value
    });
  };

  handleButtonClick = e => {
    e.preventDefault();
    const { label, value } = this.state;
    const { update, upsert, idx } = this.props;
    if (label.length + value.length > 0) {
      upsert({ label, value }, idx);
      const resetObject = { label: '', value: '' };
      update(resetObject);
    }
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
    const { update, upsert, idx } = this.props;
    const { label, value } = this.state;
    if (keyCode === 13 && label.length + value.length > 0) {
      e.preventDefault();
      upsert({ label, value }, idx);
      const resetObject = { label: '', value: '' };
      update(resetObject);
      this.labelInputRef.current.focus();
    }
  };

  render() {
    const { label, value, idx } = this.props;
    const labelEgs = ['email', 'website', 'facebook'];
    const valueEgs = [
      'contact@reachaf.com',
      'http://reachaf.com',
      'www.facebook.com/donkeysmash'
    ];
    return (
      <div className={styles.newService}>
        <div className={styles.newServiceInputs}>
          <input
            ref={this.labelInputRef}
            className={styles.newServiceLabelInput}
            type="text"
            value={label}
            name="label"
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDownForLabel}
            onBlur={this.handleBlur}
            autoCapitalize="false"
            placeholder={`e.g. ${labelEgs[idx % labelEgs.length]}`}
          />
          <input
            ref={this.valueInputRef}
            className={styles.newServiceValueInput}
            type="text"
            value={value}
            name="value"
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDownForValue}
            onBlur={this.handleBlur}
            autoCapitalize="false"
            placeholder={`e.g. ${valueEgs[idx % valueEgs.length]}`}
          />
        </div>
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

const mapStateToProps = state => {
  const { value, label } = state.formData.newItems.services;
  return { label, value };
};

const mapDistpatchToProps = dispatch => {
  return {
    upsert: bindActionCreators(upsertService, dispatch),
    update: bindActionCreators(updateNewService, dispatch)
  };
};

export default connect(mapStateToProps, mapDistpatchToProps)(NewService);
