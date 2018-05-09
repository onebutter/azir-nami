import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { upsertAlias, updateNewAlias } from '../../actions';
import styles from './styles.css';

class NewAlias extends React.Component {
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
    const labelEgs = ['Name', 'From', 'the University of Waterloo'];
    const valueEgs = ['Ken', 'Waterloo', 'Computer Engineering'];
    return (
      <div className={styles.newAlias}>
        <div className={styles.newAliasInputs}>
          <input
            ref={this.labelInputRef}
            className={styles.newAliasLabelInput}
            type="text"
            value={label}
            name="label"
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDownForLabel}
            autoFocus={true}
            autoCapitalize="false"
            placeholder={`e.g. ${labelEgs[idx % labelEgs.length]}`}
          />
          <input
            ref={this.valueInputRef}
            className={styles.newAliasValueInput}
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
          className={styles.newAliasButton}
          onClick={this.handleButtonClick}
        >
          +
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { value, label } = state.formData.newItems.aliases;
  return { label, value };
};

const mapDispatchToProps = dispatch => {
  return {
    upsert: bindActionCreators(upsertAlias, dispatch),
    update: bindActionCreators(updateNewAlias, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewAlias);
