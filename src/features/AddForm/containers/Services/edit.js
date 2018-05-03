import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetMeta } from '../../actions';
import styles from './styles.css';

class Edit extends React.Component {
  // prop = idx, keyName, data, onUpdate()
  state = { data: this.props.data };

  handleChange = e => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({ data: value });
  };

  handleKeyDown = e => {
    const { keyCode } = e;
    if (keyCode === 13) {
      e.preventDefault();
      this.triggerOnUpdate();
    }
  };

  handleBlur = () => {
    this.props.resetMeta();
  };

  componentWillUnmount() {
    this.triggerOnUpdate();
  }

  triggerOnUpdate() {
    const { onUpdate, keyName } = this.props;
    const { data } = this.state;
    onUpdate({ [keyName]: data });
  }

  render() {
    return (
      <input
        type="text"
        className={styles[`${this.props.keyName}Input`]}
        value={this.state.data}
        name={this.props.keyName}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleBlur}
        autoFocus={true}
        autoCapitalize="false"
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  resetMeta: bindActionCreators(resetMeta, dispatch)
});

export default connect(null, mapDispatchToProps)(Edit);
