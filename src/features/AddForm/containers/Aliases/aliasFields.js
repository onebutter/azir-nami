import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { upsertAlias, removeAlias, resetMeta, updateMeta } from '../../actions';
import Edit from './edit';
import styles from './styles.css';

class AliasFields extends React.Component {
  addAlias = data => {
    const { upsert, label, value, idx } = this.props;
    upsert({ label, value, ...data }, idx);
  };

  activateLabelField = () => {
    const { updateMeta, idx } = this.props;
    updateMeta({
      activeKey: 'aliases',
      activeField: 'label',
      activeIdx: idx
    });
  };

  activateValueField = () => {
    const { updateMeta, idx } = this.props;
    updateMeta({
      activeKey: 'aliases',
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
        <div className={styles.alias}>
          {displayLabel}
          {displayValue}
        </div>
      );
    }
    if (activeField === 'value') {
      return (
        <div className={styles.alias}>
          {displayLabel}
          <Edit
            idx={idx}
            keyName={activeField}
            data={value}
            onUpdate={this.addAlias}
          />
        </div>
      );
    }

    if (activeField === 'label') {
      return (
        <div className={styles.alias}>
          <Edit
            idx={idx}
            keyName={activeField}
            data={label}
            onUpdate={this.addAlias}
          />
          {displayValue}
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = (state, props) => {
  const { activeKey, activeIdx, activeField } = state.formData.meta;
  return {
    activeField:
      activeKey === 'aliases' && activeIdx === props.idx ? activeField : ''
  };
};

const mapDispatchToProps = dispatch => ({
  upsert: bindActionCreators(upsertAlias, dispatch),
  remove: bindActionCreators(removeAlias, dispatch),
  resetMeta: bindActionCreators(resetMeta, dispatch),
  updateMeta: bindActionCreators(updateMeta, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AliasFields);
