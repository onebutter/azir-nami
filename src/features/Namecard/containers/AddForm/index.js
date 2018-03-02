import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import clone from 'lodash/fp/cloneDeep';
import { createNamecardRequest } from '../../actions';
import Namecard from '../../components/Namecard';
import styles from './styles.css';

class AddForm extends React.Component {
  state = {
    tag: '',
    privacy: 'public',
    aliases: [],
    aCounter: 0,
    services: [],
    sCounter: 0
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleArrayChange = e => {
    const { value, name, dataset } = e.target;
    if (name === 'services') {
      const { services, sCounter } = this.state;
      const newArray = AddForm.updateArray(
        services,
        sCounter,
        dataset.key,
        value
      );
      return this.setState({
        services: newArray
      });
    }
    if (name === 'aliases') {
      const { aliases, aCounter } = this.state;
      const newArray = AddForm.updateArray(
        aliases,
        aCounter,
        dataset.key,
        value
      );
      return this.setState({
        aliases: newArray
      });
    }
  };

  static updateArray(arr, i, key, value) {
    let resultArr = clone(arr);
    if (resultArr.length === 0) {
      return [{ [key]: value }];
    }
    if (!resultArr[i]) {
      resultArr[i] = { [key]: value };
      return resultArr;
    }
    if (resultArr[i]) {
      resultArr[i][key] = value;
      return resultArr;
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { tag, privacy, services, aliases } = this.state;
    this.props.create({
      tag,
      privacy,
      services,
      aliases
    });
  };

  handleCancel = e => {
    e.preventDefault();
    this.props.redirectTo('/manage');
  };

  addService = () => {
    this.setState({
      sCounter: this.state.sCounter + 1
    });
  };

  addAlias = () => {
    this.setState({
      aCounter: this.state.aCounter + 1
    });
  };

  render() {
    const { tag, services, aliases, privacy, sCounter, aCounter } = this.state;
    const { username } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.namecard}>
          <Namecard
            tag={tag}
            services={services}
            aliases={aliases}
            username={username}
          />
        </div>
        <div className={styles.formDiv}>
          <form className={styles.form}>
            <div className={styles.row}>
              <select
                className={styles.privacySelect}
                value={privacy}
                onChange={this.handleChange}
                name="privacy"
              >
                <option value="default">default</option>
                <option value="public">public</option>
                <option value="private">private</option>
                <option value="secret">secret</option>
              </select>
              <input
                className={styles.tag}
                name="tag"
                type="text"
                value={tag}
                onChange={this.handleChange}
                placeholder="tag of this namecard"
              />
            </div>
            <div className={styles.row}>
              <input
                className={styles.aliasType}
                name="aliases"
                type="text"
                value={normalize(aliases, aCounter, 'type')}
                onChange={this.handleArrayChange}
                placeholder="alias type"
                data-key="type"
              />
              <input
                className={styles.aliasValue}
                name="aliases"
                type="text"
                value={normalize(aliases, aCounter, 'value')}
                onChange={this.handleArrayChange}
                placeholder="alias value"
                data-key="value"
              />
              <button
                className={styles.addAliasButton}
                type="button"
                onClick={this.addAlias}
              >
                +
              </button>
            </div>
            <div className={styles.row}>
              <input
                className={styles.serviceType}
                name="services"
                type="text"
                value={normalize(services, sCounter, 'type')}
                onChange={this.handleArrayChange}
                placeholder="service type"
                data-key="type"
              />
              <input
                className={styles.serviceValue}
                name="services"
                type="text"
                value={normalize(services, sCounter, 'value')}
                onChange={this.handleArrayChange}
                placeholder="service value"
                data-key="value"
              />
              <button
                className={styles.addServiceButton}
                type="button"
                onClick={this.addService}
              >
                +
              </button>
            </div>
            <div className={styles.controlRow}>
              <button
                className={styles.submitButton}
                type="button"
                onClick={this.handleSubmit}
              >
                Submit
              </button>
              <button
                className={styles.cancelButton}
                type="button"
                onClick={this.handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const normalize = (arr, counter, key) => {
  if (!arr[counter]) return '';
  if (!arr[counter][key]) return '';
  return arr[counter][key];
};

const mapStateToProps = state => {
  const { username } = state.auth.user;
  return {
    username
  };
};

const mapDispatchToProps = dispatch => ({
  create: bindActionCreators(createNamecardRequest, dispatch),
  redirectTo: bindActionCreators(push, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
