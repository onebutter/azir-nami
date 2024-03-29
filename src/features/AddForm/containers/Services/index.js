import React from 'react';
import { connect } from 'react-redux';
import ServiceFields from './serviceFields';
import NewService from './newService';
import styles from './styles.css';

class Services extends React.Component {
  render() {
    const { services } = this.props;
    return (
      <div className={styles.services}>
        {services.map((v, i) => <ServiceFields {...v} key={i} idx={i} />)}
        <NewService idx={services.length} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { services } = state.formData.data;
  return {
    services
  };
};

export default connect(mapStateToProps, null)(Services);
