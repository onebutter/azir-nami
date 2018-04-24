import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import QRCode from 'qrcode.react';
import styles from './styles.css';
import QRCodeWrapper from '../QRCodeWrapper';

import Namecard from '../../components/Namecard';

class DefaultNamecardContainer extends React.Component {
  state = { isShowingQRCode: false };

  onClickQRCode = () => {
    this.setState(({ isShowingQRCode }) => ({
      isShowingQRCode: !isShowingQRCode
    }));
  };

  render() {
    const entity = this.props.entity[Object.keys(this.props.entity)[0]];
    if (entity) {
      const { id, services, aliases } = entity;
      return (
        <div className={styles.root}>
          <QRCodeWrapper
            value={`${window.location.origin}/${
              this.props.match.params.username
            }`}
            showOverlay={this.state.isShowingQRCode}
            onClick={this.onClickQRCode}
          >
            <Namecard key={id} services={services} aliases={aliases} />
            <div
              className={styles.qrtemp}
              onClick={this.state.isShowingQRCode ? null : this.onClickQRCode}
            >
              <QRCode
                value={`${window.location.origin}/${
                  this.props.match.params.username
                }`}
                size={24}
              />
            </div>
          </QRCodeWrapper>
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = (state, props) => ({
  entity: _.get(state, `namecard.entities.${props.username}.default`, {})
});

export default withRouter(
  connect(mapStateToProps, null)(DefaultNamecardContainer)
);
