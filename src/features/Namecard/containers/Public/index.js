import React from 'react';
import _ from 'lodash';
import Carousel from 'react-slick';
import { connect } from 'react-redux';
import styles from './styles.css';

import Namecard from '../../components/Namecard';

class PublicNamecardsContainer extends React.Component {
  render() {
    const { entities } = this.props;
    const temp = entities.map(entity => {
      const { id, tag, services, aliases } = entity;
      return (
        <div key={id}>
          <Namecard tag={tag} services={services} aliases={aliases} />
        </div>
      );
    });
    if (entities.length) {
      return (
        <div className={styles.root}>
          <Carousel arrows={false} infinite={false}>
            {temp}
          </Carousel>
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = (state, props) => ({
  entities: _.get(state, `namecard.entities.${props.username}.public`, [])
});

export default connect(mapStateToProps, null)(PublicNamecardsContainer);
