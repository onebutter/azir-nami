import React from 'react';
import _ from 'lodash';
import Carousel from 'react-slick';
import { connect } from 'react-redux';
import styles from './styles.css';

import Namecard from '../../components/Namecard';

class PublicNamecardsContainer extends React.Component {
  render() {
    const { entities } = this.props;
    const publicNcs = _.map(entities, entity => {
      const { id, services, aliases } = entity;
      return (
        <div key={id}>
          <Namecard services={services} aliases={aliases} />
        </div>
      );
    });
    if (!_.isEmpty(entities)) {
      return (
        <div className={styles.root}>
          <Carousel arrows={false} infinite={false}>
            {publicNcs}
          </Carousel>
        </div>
      );
    }
    return (
      <div className={styles.root}>
        <div className={styles.nothingToShow}>
          {this.props.username} has no other namecards.
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  entities: _.filter(
    _.get(state, `namecard.entities.${props.username}`, []),
    v => v.privacy === 'public'
  )
});

export default connect(mapStateToProps, null)(PublicNamecardsContainer);
