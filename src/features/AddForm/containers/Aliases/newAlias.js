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
    label: this.props.persistedLabel,
    value: this.props.persistedValue
  };

  static getDerivedStateFromProps(props) {
    return {
      label: props.persistedLabel,
      value: props.persistedValue
    };
  }

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

  handleBlur = () => {
    const { value, label } = this.state;
    this.props.update({ label, value });
  };

  render() {
    const { label, value } = this.state;
    return (
      <div className={styles.newAlias}>
        <input
          ref={this.labelInputRef}
          className={styles.newAliasLabelInput}
          type="text"
          value={label}
          name="label"
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDownForLabel}
          onBlur={this.handleBlur}
          autoCapitalize="false"
          placeholder="e.g.) Name"
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
          placeholder="John Doe"
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { value, label } = state.formData.newItems.aliases;
  return {
    persistedLabel: label,
    persistedValue: value
  };
};

const mapDispatchToProps = dispatch => {
  return {
    upsert: bindActionCreators(upsertAlias, dispatch),
    update: bindActionCreators(updateNewAlias, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewAlias);
