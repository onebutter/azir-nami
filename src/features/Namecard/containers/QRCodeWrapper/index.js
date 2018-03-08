import React from 'react';
import QRCode from 'qrcode.react';
import styles from './styles.css';

class QRCodeWrapper extends React.Component {
  render() {
    const { children, value, showOverlay } = this.props;
    if (!showOverlay) {
      return <div className={styles.root}>{children}</div>;
    }
    return (
      <div onClick={this.props.onClick} className={styles.root}>
        <div className={styles.qrcodeBlock}>
          <div className={styles.qrcode}>
            <QRCode bgColor="#171e27" fgColor="aliceblue" value={value} />
          </div>
        </div>
        {children}
      </div>
    );
  }
}

export default QRCodeWrapper;
