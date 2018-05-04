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
      <div className={styles.newService}>
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
          placeholder="e.g.) website"
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
          placeholder="e.g.) http://reachaf.com"
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { value, label } = state.formData.newItems.services;
  return {
    persistedLabel: label,
    persistedValue: value
  };
};

const mapDistpatchToProps = dispatch => {
  return {
    upsert: bindActionCreators(upsertService, dispatch),
    update: bindActionCreators(updateNewService, dispatch)
  };
};

export default connect(mapStateToProps, mapDistpatchToProps)(NewService);
