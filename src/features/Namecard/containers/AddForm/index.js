import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Namecard from '../../components/Namecard';
import clone from 'lodash/fp/cloneDeep';
import styles from './styles.css';

class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: '',
      privacy: 'public',
      aliases: [],
      aCounter: 0,
      services: [],
      sCounter: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleArrayChange = this.handleArrayChange.bind(this);
    this.addAlias = this.addAlias.bind(this);
    this.addService = this.addService.bind(this);
  }

  handleChange(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  }

  updateArray(arr, i, key, value) {
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

  handleArrayChange(e) {
    const { value, name, dataset } = e.target;
    if (name === 'services') {
      const { services, sCounter } = this.state;
      const newArray = this.updateArray(services, sCounter, dataset.key, value);
      return this.setState({
        services: newArray
      });
    }
    if (name === 'aliases') {
      const { aliases, aCounter } = this.state;
      const newArray = this.updateArray(aliases, aCounter, dataset.key, value);
      return this.setState({
        aliases: newArray
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    const { services, aliases } = this.state;
    console.log('picked', { services, aliases });
  }

  addService() {
    this.setState({
      sCounter: this.state.sCounter + 1
    });
  }

  addAlias() {
    this.setState({
      aCounter: this.state.aCounter + 1
    });
  }

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
          <form className={styles.form} onSubmit={this.handleSubmit}>
            <input
              className={styles.tag}
              name="tag"
              type="text"
              value={tag}
              onChange={this.handleChange}
              placeholder="tag of this namecard"
            />
            <select value={privacy} onChange={this.handleChange} name="privacy">
              <option value="default">default</option>
              <option value="public">public</option>
              <option value="private">private</option>
              <option value="secret">secret</option>
            </select>
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
              Add Service
            </button>
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
              Add Alias
            </button>
            <button className={styles.submitButton} type="submit">
              Submit
            </button>
          </form>
        </div>
        <div>
          <Link to="/namecard">Cancel</Link>
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

export default connect(mapStateToProps, null)(AddForm);
