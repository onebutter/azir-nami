import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  upsertService,
  removeService,
  resetMeta,
  updateMeta
} from '../../actions';
import Edit from './edit';
import styles from './styles.css';

// props: label, value, idx

class ServiceFields extends React.Component {
  addService = data => {
    const { upsert, label, value, idx } = this.props;
    upsert({ label, value, ...data }, idx);
  };

  activateLabelField = () => {
    const { updateMeta, idx } = this.props;
    updateMeta({
      activeKey: 'services',
      activeField: 'label',
      activeIdx: idx
    });
  };

  activateValueField = () => {
    const { updateMeta, idx } = this.props;
    updateMeta({
      activeKey: 'services',
      activeField: 'value',
      activeIdx: idx
    });
  };

  render() {
    const { label, value, activeField, idx } = this.props;
    const displayLabel = (
      <div className={styles.displayLabel} onClick={this.activateLabelField}>
        {label}
      </div>
    );
    const displayValue = (
      <div className={styles.displayValue} onClick={this.activateValueField}>
        {value}
      </div>
    );
    if (activeField === '') {
      return (
        <div className={styles.service}>
          {displayLabel}
          {displayValue}
        </div>
      );
    }

    if (activeField === 'value') {
      return (
        <div className={styles.service}>
          {displayLabel}
          <Edit
            idx={idx}
            keyName={activeField}
            data={value}
            onUpdate={this.addService}
          />
        </div>
      );
    }

    if (activeField === 'label') {
      return (
        <div className={styles.service}>
          <Edit
            idx={idx}
            keyName={activeField}
            data={label}
            onUpdate={this.addService}
          />
          {displayValue}
        </div>
      );
    }

    return null;
  }
}

const mapDispatchToProps = dispatch => ({
  upsert: bindActionCreators(upsertService, dispatch),
  remove: bindActionCreators(removeService, dispatch),
  resetMeta: bindActionCreators(resetMeta, dispatch),
  updateMeta: bindActionCreators(updateMeta, dispatch)
});

const mapStateToProps = (state, props) => {
  const { activeKey, activeIdx, activeField } = state.formData.meta;
  return {
    activeField:
      activeKey === 'services' && activeIdx === props.idx ? activeField : ''
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceFields);
