import React from 'react';
import { connect } from 'react-redux';
import ServiceFields from './serviceFields';
import NewService from './newService';
import styles from './styles.css';

class Services extends React.Component {
  render() {
    const { services } = this.props;
    const fields = services.map((v, i) => (
      <ServiceFields {...v} key={i} idx={i} />
    ));
    const newService = <NewService idx={services.length} />;

    return (
      <div className={styles.row}>
        {fields}
        {newService}
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
