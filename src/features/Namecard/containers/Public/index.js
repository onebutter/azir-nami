import React from 'react';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Swipeable from 'react-swipeable';
import { Redirect } from 'react-router';
import { push } from 'react-router-redux';
import QRCode from 'qrcode.react';
import styles from './styles.css';

import Indicator from './indicator';
import Namecard from '../../components/Namecard';
import QRCodeWrapper from '../QRCodeWrapper';

class PublicNamecardsContainer extends React.Component {
  state = { isShowingQRCode: false };

  onClickQRCode = () => {
    this.setState(({ isShowingQRCode }) => ({
      isShowingQRCode: !isShowingQRCode
    }));
  };

  prev = () => {
    const { namecards, ncid, redirectTo, username } = this.props;
    if (namecards.length === 1) return;
    for (let i = 0; i < namecards.length; ++i) {
      const namecard = namecards[i];
      if (namecard.id.toString() === ncid) {
        if (i === 0) {
          return redirectTo(
            `/${username}/public/${namecards[namecards.length - 1].id}`
          );
        }
        return redirectTo(
          `/${username}/public/${namecards[(i - 1) % namecards.length].id}`
        );
      }
    }
  };

  next = () => {
    const { namecards, ncid, redirectTo, username } = this.props;
    if (namecards.length === 1) return;
    for (let i = 0; i < namecards.length; ++i) {
      const namecard = namecards[i];
      if (namecard.id.toString() === ncid) {
        return redirectTo(
          `/${username}/public/${namecards[(i + 1) % namecards.length].id}`
        );
      }
    }
  };

  render() {
    const { username, namecards, ncid } = this.props;

    if (!_.isEmpty(namecards)) {
      if (typeof ncid === 'undefined') {
        return <Redirect to={`/${username}/public/${namecards[0].id}`} />;
      }
      const filteredNamecards = _.filter(
        namecards,
        x => x.id.toString() === ncid
      );
      if (filteredNamecards.length === 0) {
        return <Redirect to={`/${username}/public/${namecards[0].id}`} />;
      }
      const { services, aliases } = filteredNamecards[0];
      return (
        <div className={styles.root}>
          <Swipeable onSwipedLeft={this.next} onSwipedRight={this.prev}>
            <QRCodeWrapper
              value={`${window.location.origin}/${username}/public/${ncid}`}
              showOverlay={this.state.isShowingQRCode}
              onClick={this.onClickQRCode}
            >
              <Namecard services={services} aliases={aliases} />
              <div
                className={styles.qrtemp}
                onClick={this.state.isShowingQRCode ? null : this.onClickQRCode}
              >
                <QRCode
                  value={`${window.location.origin}/${username}`}
                  size={24}
                />
              </div>
            </QRCodeWrapper>
          </Swipeable>
          {namecards.length > 1 && (
            <div className={styles.buttons}>
              <button onClick={this.prev}>{'⇦'}</button>
              <Indicator namecards={namecards} ncid={ncid} />
              <button onClick={this.next}>{'⇨'}</button>
            </div>
          )}
        </div>
      );
    }
    return (
      <div className={styles.root}>
        <div className={styles.nothingToShow}>
          {this.props.username} has no other namecards.
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  namecards: _.filter(
    _.get(state, `namecard.entities.${props.username}`, []),
    v => v.privacy === 'public'
  )
});

const mapDispatchToProps = dispatch => ({
  redirectTo: bindActionCreators(push, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  PublicNamecardsContainer
);
