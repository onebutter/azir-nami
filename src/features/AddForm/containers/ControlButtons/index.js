import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { resetData } from '../../actions';
import { createNamecardRequest } from 'Features/Namecard/actions';
import styles from './styles.css';

class ControlButtons extends React.Component {
  handleClear = e => {
    e.preventDefault();
    this.props.clear();
  };

  handleCreate = e => {
    e.preventDefault();
    const { create, data, newItems } = this.props;
    const mergedData = mergeNewItems(data, newItems);
    create({ ...mergedData });
  };

  handleCancel = e => {
    e.preventDefault();
    this.props.cancel('/manage');
  };

  render() {
    return (
      <div className={styles.root}>
        <button className={styles.clearButton} onClick={this.handleClear}>
          clear
        </button>
        <button className={styles.createButton} onClick={this.handleCreate}>
          create
        </button>
        <button className={styles.cancelButton} onClick={this.handleCancel}>
          cancel
        </button>
      </div>
    );
  }
}

const mergeNewItems = (data, newItems) => {
  let merged = { ...data };
  const { aliases, services } = newItems;
  if (aliases.value.length + aliases.label.length > 0) {
    merged.aliases.push(aliases);
  }
  if (services.value.length + services.label.length > 0) {
    merged.services.push(services);
  }
  return merged;
};

const mapStateToProps = state => {
  const { data, newItems } = state.formData;
  return { data, newItems };
};

const mapDispatchToProps = dispatch => {
  return {
    clear: bindActionCreators(resetData, dispatch),
    create: bindActionCreators(createNamecardRequest, dispatch),
    cancel: bindActionCreators(push, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlButtons);
