import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import styles from './styles.css';

import Namecard from '../../components/Namecard';

class DefaultNamecardContainer extends React.Component {
  render() {
    const { entity } = this.props;
    if (entity) {
      const { id, tag, services, aliases } = entity;
      return (
        <div className={styles.root}>
          <Namecard key={id} tag={tag} services={services} aliases={aliases} />
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = (state, props) => ({
  entity: _.get(state, `namecard.entities.${props.username}.default[0]`, {})
});

export default connect(mapStateToProps, null)(DefaultNamecardContainer);
